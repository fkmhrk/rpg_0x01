/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../maze/MazeScene.ts" />

class CampScene implements Scene {
    app: Application;
    ractive: Ractive.Ractive;

    action: number;
    actionCharIndex: number;

    constructor(app: Application) {
        this.app = app;
    }  

    onCreate() {
        this.app.getTemplate('campTemplate').then((t : string) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
                data: {
                    p: null,
                    state: 0,
                    characters: this.app.party.characters,
                }
            });
            this.ractive.on({
                inspect: () => {
                    this.action = 1;
                    this.ractive.set({
                        state: 1,
                    });
                },
                quit: () => {
                    this.app.showScene(new MazeScene(this.app));
                },

                selectChar: (e: any, index: number) => {
                    this.actionCharIndex = index;
                    this.ractive.set({
                        state: 2,
                        p: this.app.party.characters[index],
                    });
                },
                back: () => {
                    this.ractive.set({
                        state: 0,
                        p: null,
                    });
                }
            });
        });
    }
}