/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../maze/MazeScene.ts"/>
/// <reference path="./BattleEngine.ts"/>

class BattleScene implements Scene {
    app: Application;
    ractive: Ractive.Ractive;
    engine: BattleEngine;

    actionIndex: number;
    actionType: number;
    actions: BattleAction[];

    constructor(app: Application, enemies: Character[]) {
        this.app = app;
        this.engine = new BattleEngine(this, app.party.copy(), enemies);
        this.actionType = 0;
    }  

    onCreate() {
        this.app.getTemplate('battleTemplate').then((t : string) => {
            let enemies = [];
            this.engine.enemies.forEach((e: Character) => {
                enemies.push({
                    alive: true,
                });
            })
            this.ractive = new Ractive({
                el: '#c',
                template: t,
                data: {
                    msg: 'An encounter!',
                    buttonState: 1,
                    p: null,
                    enemies: enemies,
                }
            });
            this.ractive.on({
                ok: () => {
                    this.engine.doNext();
                },          
                fight: () => {
                    if (this.engine.enemies.length > 1) {
                        this.actionType = 1;
                        this.ractive.set('msg', 'Choose target');
                    } else {
                        this.actions.push(new BattleAction(this.actionIndex, 1, 0, 0));
                        this.toNextCharacterCommand();
                    }
                },   
                run: () => {
                    this.engine.run();
                },
                selectEnemy: (e: any, index: number) => {
                    if (this.actionType == 0) return;
                    this.actions.push(new BattleAction(this.actionIndex, this.actionType, 0, index));
                    this.actionType = 0;
                    this.toNextCharacterCommand();
                },
            });
        });
    }

    showPartyCommand() {
        this.actionIndex = -1;
        this.actions = [];
        this.toNextCharacterCommand();
    }

    didRun() {
        this.app.party.update(this.engine.party);
        this.app.showScene(new MazeScene(this.app));
    }

    shakeEnemy(index: number) {
        this.shakeElement(document.getElementById('enemy' + index));
    }

    shakeMessage() {
        this.shakeElement(document.getElementById('msg'));
    }

    private shakeElement(e: HTMLElement) {
        e.classList.add('shake');
        let handler = () => {
            e.classList.remove('shake');
            e.removeEventListener('animationend', handler);
        };
        e.addEventListener("animationend", handler);        
    }

    showMessage(msg: string) {
        this.ractive.set({
            'msg': msg,
            'buttonState': 1,
        });
    }

    removeEnemy(index: number) {
        let enemies = this.ractive.get('enemies');
        enemies[index].alive = false;
        this.ractive.set('enemies', enemies);
    }

    endBattle() {
        this.app.party.update(this.engine.party);
        this.app.showScene(new MazeScene(this.app));
    }

    showAllDeadScene() {
        alert('oops');
    }

    private toNextCharacterCommand() {
        this.actionIndex = this.findNextActionCharacter(this.actionIndex);
        if (this.actionIndex == -1) {
            this.ractive.set('p', null);
            this.engine.startAction(this.actions);
            return;
        }        
        let p = this.engine.party.characters[this.actionIndex];
        this.ractive.set({
            'buttonState': 2,
            'msg': p.name + "'s option",
            p: p,
        });        
    }

    private findNextActionCharacter(index: number): number {
        let characters = this.engine.party.characters;
        ++index;
        while (index < characters.length) {
            if (characters[index].canAction()) break;
            ++index;
        }
        return (index >= characters.length) ? -1 : index;
    }
}