/// <reference path="./scene/Scene.ts"/>
/// <reference path="./ractive.d.ts"/>
class Application {
    start() {
        this.scene.onCreate();
    }
    getTemplate(name) {
        return Promise.resolve(document.getElementById(name).innerHTML);
    }
}
/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
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
        });
    }
}
/// <reference path="./Application.ts"/>
/// <reference path="./scene/title/TitleScene.ts"/>
(() => {
    var a = new Application();
    a.scene = new TitleScene(a);
    a.start();
})();
