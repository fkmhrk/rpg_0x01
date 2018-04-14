/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../maze/MazeScene.ts"/>
/// <reference path="./BattleEngine.ts"/>

class BattleScene implements Scene {
    app: Application;
    ractive: Ractive.Ractive;
    engine: BattleEngine;

    constructor(app: Application) {
        this.app = app;
        this.engine = new BattleEngine(this);
    }  

    onCreate() {
        this.app.getTemplate('battleTemplate').then((t : string) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
                data: {
                    buttonState: 1,
                }
            });
            this.ractive.on({
                ok: () => {
                    this.engine.doNext();
                },
                run: () => {
                    this.engine.run();
                }
            });
        });
    }

    showPartyCommand() {
        this.ractive.set('buttonState', 2);
    }

    didRun() {
        //TODO update party
        this.app.showScene(new MazeScene(this.app));
    }
}