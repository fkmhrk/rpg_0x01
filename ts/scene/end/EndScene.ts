/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>

class EndScene implements Scene {
    app: Application;
    ractive: Ractive.Ractive;

    constructor(app: Application) {
        this.app = app;
    }  

    onCreate() {
        this.app.getTemplate('endTemplate').then((t : string) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
            });
            this.ractive.on({
                start: () => {
                    this.app.showScene(new SetupScene(this.app));
                },
            });
        });
    }
}