/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../maze/MazeScene.ts"/>

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
                    name: "0x01",
                    isEmpty: (v: string) => {
                        return v.length == 0;
                    }
                }
            });
            this.ractive.on({
                submit: () => {
                    this.submit();
                }
            });
            document.getElementById('name').focus();
        });
    }

    private submit() {
        let name = this.ractive.get('name');
        this.app.initParty(name);
        this.app.maze.loadFloor(0);
        this.app.showScene(new MazeScene(this.app));
    }
}