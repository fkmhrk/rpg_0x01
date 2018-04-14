/// <reference path="./scene/Scene.ts"/>
/// <reference path="./ractive.d.ts"/>
class Application {
    start() {
        this.scene.onCreate();
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
        });
    }
}
/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../setup/SetupScene.ts"/>
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
                }
            });
        });
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
