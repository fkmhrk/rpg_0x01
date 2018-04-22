/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../maze/MazeScene.ts" />

class CampScene implements Scene {
    app: Application;
    ractive: Ractive.Ractive;

    action: number;
    actionCharIndex: number;
    useIndex: number;

    constructor(app: Application) {
        this.app = app;
    }  

    onCreate() {
        this.app.getTemplate('campTemplate').then((t : string) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
                data: {
                    allItem: allItem,
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
                        backAction: 0,
                    });
                },
                quit: () => {
                    this.app.showScene(new MazeScene(this.app));
                },

                selectChar: (e: any, index: number) => {
                    switch(this.action) {
                    case 1: // inspect
                        this.actionCharIndex = index;
                        this.ractive.set({
                            state: 2,
                            p: this.app.party.characters[index],
                        });
                        break;
                    case 2:// item target
                        this.execUseItem(index);
                        break;
                    }
                },
                chooseItem: () => {
                    this.ractive.set({
                        state: 3,
                    });
                },
                selectItem: (e: any, index: number) => {
                    this.useIndex = index;
                    this.ractive.set({
                        state: 4,
                    });
                },
                useItem: () => {
                    this.useItemClicked();
                },  
                back: (e: any, type: number) => {
                    switch (type) {
                    case 0: // to top
                        this.ractive.set({
                            state: 0,
                            p: null,
                        });
                        break;
                    case 1: // to inspect top
                        this.ractive.set({
                            state: 2,
                        });                    
                        break;
                    }
                }
            });
        });
    }

    private useItemClicked() {
        let char = this.app.party.characters[this.actionCharIndex];
        let item = allItem[char.items[this.useIndex]];
        switch(item.type) {
        case 1:// heal HP
            this.action = 2;
            this.ractive.set({
                state: 1,
                backAction: 1,
            });
            break;
        }
    }

    private execUseItem(targetIndex: number) {
        let char = this.app.party.characters[this.actionCharIndex];
        let target = this.app.party.characters[targetIndex];
        let item = allItem[char.items[this.useIndex]];
        switch (item.type) {
        case 1: // heal HP
            target.addHp(item.value);
            char.dropItem(this.useIndex);
            break;
        }        
        this.ractive.set({
            state: 2,
        });
        this.ractive.update();
    }
}