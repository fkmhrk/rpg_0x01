/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../maze/MazeScene.ts" />

class ShopScene implements Scene {
    app: Application;
    ractive: Ractive.Ractive;

    items: number[];

    action: number;
    actionCharIndex: number;
    useIndex: number;

    constructor(app: Application, items: number[]) {
        this.app = app;
        this.items = items;
    }  

    onCreate() {
        this.app.getTemplate('shopTemplate').then((t : string) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
                data: {
                    allItem: allItem,
                    gold: this.app.party.gold,
                    msg: 'Hi!',
                    p: null,
                    state: 0,
                    characters: this.app.party.characters,
                }
            });
            this.ractive.on({
                leave: () => {
                    this.app.showScene(new MazeScene(this.app));
                },

                selectChar: (e: any, index: number) => {
                    this.actionCharIndex = index;
                    let char = this.app.party.characters[index];
                    this.ractive.set({
                        state: 1,
                        msg: 'Welcome! ' + char.name,
                        p: char,
                    });                    
                },
                buy: () => {
                    this.ractive.set({
                        items: this.items,
                        state: 2,
                        msg: 'Which item would you buy?',
                    });
                },
                sell: () => {
                    this.ractive.set({
                        items: this.items,
                        state: 3,
                        msg: 'Which item would you sell?',
                    });
                },
                selectBuyItem: (e: any, index: number) => {
                    this.buy(index);
                },
                selectSellItem: (e: any, index: number) => {
                    this.sell(index);
                },
                back: (e: any, type: number) => {
                    switch (type) {
                    case 0: // to top
                        this.ractive.set({
                            state: 0,
                            p: null,
                            msg: 'Hi!',
                        });
                        break;
                    case 1: // to buy/sell
                        this.ractive.set({
                            state: 1,
                        });                    
                        break;
                    }
                }
            });
        });
    }

    private buy(index: number) {
        let char = this.app.party.characters[this.actionCharIndex];
        let item = allItem[this.items[index]];
        if (this.app.party.gold < item.buy) {
            this.ractive.set({
                msg: "You don't have any gold..",
            });
        } else {
            this.app.party.gold -= item.buy;
            char.addItem(this.items[index]);
            this.ractive.set({
                gold: this.app.party.gold,
                state: 1,
                msg: 'Thanks!',
            });
            this.ractive.update();
        }
    }

    private sell(index: number) {
        let char = this.app.party.characters[this.actionCharIndex];
        let item = allItem[this.items[index]];
        char.dropItem(index);
        this.app.party.gold += item.sell;
        this.ractive.set({
            gold: this.app.party.gold,
            state: 1,
            msg: 'Thanks!',
        });
        this.ractive.update();        
    }
}