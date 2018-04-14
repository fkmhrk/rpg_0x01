class Party {
    init(name) {
    }
}
/// <reference path="./scene/Scene.ts"/>
/// <reference path="./ractive.d.ts"/>
/// <reference path="./model/party/Party.ts"/>
class Application {
    constructor() {
        this.party = new Party();
    }
    start() {
        this.scene.onCreate();
    }
    initParty(name) {
        this.party.init(name);
    }
    getTemplate(name) {
        return Promise.resolve(document.getElementById(name).innerHTML);
    }
    showScene(nextScene) {
        this.scene = nextScene;
        this.scene.onCreate();
    }
}
/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
class MazeScene {
    constructor(app) {
        this.app = app;
    }
    onCreate() {
        this.app.getTemplate('mazeTemplate').then((t) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
                data: {}
            });
            let canvas = document.getElementById('maze');
            this.context = canvas.getContext('2d');
            this.drawMaze();
        });
    }
    drawMaze() {
        this.context.beginPath();
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, 320, 320);
        this.context.strokeStyle = '#FFFFFF';
        // this.context.strokeRect(48, 48, 224, 224);
        this.context.strokeRect(96, 96, 128, 128);
        this.context.moveTo(0, 0);
        this.context.lineTo(96, 96);
        this.context.moveTo(96, 224);
        this.context.lineTo(0, 320);
        this.context.moveTo(48, 48);
        this.context.lineTo(48, 272);
        this.context.moveTo(320, 0);
        this.context.lineTo(272, 48);
        this.context.lineTo(272, 272);
        this.context.lineTo(320, 320);
        this.context.closePath();
        this.context.stroke();
    }
}
/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../maze/MazeScene.ts"/>
class SetupScene {
    constructor(app) {
        this.app = app;
    }
    onCreate() {
        this.app.getTemplate('setupTemplate').then((t) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
                data: {
                    name: "",
                    isEmpty: (v) => {
                        return v.length == 0;
                    }
                }
            });
            this.ractive.on({
                submit: () => {
                    this.submit();
                }
            });
        });
    }
    submit() {
        let name = this.ractive.get('name');
        this.app.initParty(name);
        this.app.showScene(new MazeScene(this.app));
    }
}
/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../setup/SetupScene.ts"/>
/// <reference path="../maze/MazeScene.ts"/>
class TitleScene {
    constructor(app) {
        this.app = app;
    }
    onCreate() {
        this.app.getTemplate('titleTemplate').then((t) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
            });
            this.ractive.on({
                start: () => {
                    this.app.showScene(new SetupScene(this.app));
                },
                resume: () => {
                    this.resume();
                }
            });
        });
    }
    resume() {
        this.app.showScene(new MazeScene(this.app));
    }
}
/// <reference path="./Application.ts"/>
/// <reference path="./scene/title/TitleScene.ts"/>
var a;
(() => {
    a = new Application();
    a.scene = new TitleScene(a);
    a.start();
})();
