/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../maze/MazeScene.ts"/>

class GameOverScene implements Scene {
    app: Application;
    ractive: Ractive.Ractive;

    constructor(app: Application) {
        this.app = app;
    }  

    onCreate() {
        this.app.getTemplate('gameOverTemplate').then((t : string) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
            });
            this.ractive.on({
                submit: () => {
                    this.app.maze.loadFloor(0);
                    this.app.party.x = 0;
                    this.app.party.y = 0;
                    this.app.party.direction = 3;
                    this.app.showScene(new MazeScene(this.app));
                }
            });
        });
    }
}