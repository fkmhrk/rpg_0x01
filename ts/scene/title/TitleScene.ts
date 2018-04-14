/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>

class TitleScene implements Scene {
    app: Application;
    ractive: Ractive.Ractive;

    constructor(app: Application) {
        this.app = app;
    }  

    onCreate() {
        this.app.getTemplate('titleTemplate').then((t : string) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
            });
        });
    }
}