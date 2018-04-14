/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>

class SetupScene implements Scene {
    app: Application;
    ractive: Ractive.Ractive;

    constructor(app: Application) {
        this.app = app;
    }  

    onCreate() {
        this.app.getTemplate('setupTemplate').then((t : string) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
                data: {
                    name: "",
                    isEmpty: (v: string) => {
                        return v.length == 0;
                    }
                }
            });
        });
    }
}