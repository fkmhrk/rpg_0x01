/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../setup/SetupScene.ts"/>
/// <reference path="../maze/MazeScene.ts"/>

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

    private resume() {
        if (this.app.load()) {
            this.app.showScene(new MazeScene(this.app));
        } else {
            this.app.showScene(new SetupScene(this.app));
        }        
    }
}