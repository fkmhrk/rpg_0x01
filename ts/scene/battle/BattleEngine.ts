/// <reference path="../../model/party/Party.ts" />
const STATE_PARTY_COMMAND = 1;
const STATE_DO_FIRST_CHARACTER = 2;
const STATE_CHECK_DEAD = 3;
const STATE_CHECK_WIN = 4;
const STATE_CHECK_LEVEL_UP = 5;
const STATE_CHECK_DEAD_PARTY = 6;


class BattleEngine {
    state: number;
    party: Party;
    enemies: Character[];

    // action
    actions: BattleAction[];
    order: ActionOrder[];
    deadCheckCharacter: Character;
    deadCheckIndex: number;

    // result
    gotXP: number;
    gotGold: number;

    callback: BattleCallback;

    constructor(callback: BattleCallback, party: Party, enemies: Character[]) {
        this.callback = callback;
        this.party = party;
        this.enemies = enemies;
        this.state = STATE_PARTY_COMMAND;

        this.gotXP = 0;
        this.gotGold = 0;
    }

    startAction(actions: BattleAction[]) {
        this.actions = actions;
        this.order = [];
        actions.forEach((a: BattleAction) => {
            this.order.push({
                type: 0,
                index: a.index,
                speed: 1, // TODO get by character state
                action: a,
            })
        });
        this.enemies.forEach((e: Character, index: number) => {
            this.order.push({
                type: 1,
                index: index,
                speed: 1, // TODO get by character state
            })            
        })
        this.order.sort((a: ActionOrder, b: ActionOrder) => {
            return b.speed - a.speed;
        });
        this.state = STATE_DO_FIRST_CHARACTER;
        this.doNext();
    }

    doNext() {
        switch(this.state) {
        case STATE_PARTY_COMMAND:
            this.callback.showPartyCommand();
            break;
        case STATE_DO_FIRST_CHARACTER:
            this.doAction();
            break;
        case STATE_CHECK_DEAD:
            this.checkDead();
            break;
        case STATE_CHECK_WIN:
            this.checkWin();
            break;
        case STATE_CHECK_LEVEL_UP:
            this.checkLevelUp();
            break;
        case STATE_CHECK_DEAD_PARTY:
            this.checkDeadParty();
            break;
        }
    }

    run() {
        // TODO: to roll dice
        this.callback.didRun();
    }

    private doAction() {
        if (this.order.length == 0) {
            this.callback.showPartyCommand();
            return;
        }
        let order = this.order.shift();
        if (order.type == 0) {
            // player
            let c = this.party.characters[order.index];
            if (!c.canAction()) {
                // next character
                this.doAction();
                return;
            }
            switch (order.action.type1) {
            case 1: // Fight
                this.state = STATE_CHECK_DEAD;
                let e = this.enemies[order.action.target];
                let damage = Math.trunc(c.attack / 2 - e.defence / 4);
                e.addHp(-damage);

                this.deadCheckCharacter = e;
                this.deadCheckIndex = order.action.target;
                this.callback.shakeEnemy(order.action.target);
                this.callback.showMessage(c.name + ' attacks ' + 
                    e.name + ' and took 0x' + damage.toString(16) + ' damage!');
                break;
            }
        } else {
            // enemy
            let c = this.enemies[order.index];
            if (!c.canAction()) {
                // next character
                this.doAction();
                return;
            }
            // TODO: determine action
            this.state = STATE_CHECK_DEAD_PARTY;
            let e = this.party.characters[0];
            let damage = Math.trunc(c.attack / 2 - e.defence / 4);
            e.addHp(-damage);

            this.deadCheckCharacter = e;
            this.deadCheckIndex = 0;
            this.callback.shakeMessage();
            this.callback.showMessage(c.name + ' attacks ' + 
                e.name + ' and took 0x' + damage.toString(16) + ' damage!');            
        }
    }

    private checkDead() {
        if (this.deadCheckCharacter.hp == 0) {
            this.gotXP += this.deadCheckCharacter.xp;
            this.gotGold += this.deadCheckCharacter.nextXp;
            this.state = STATE_CHECK_WIN;                        
            this.callback.removeEnemy(this.deadCheckIndex);
            this.callback.showMessage(this.deadCheckCharacter.name + ' is killed!');
            return;
        } else {
            this.doAction();
        }
    }

    private checkWin() {
        let won = true;
        this.enemies.forEach((e: Character) => {
            if (e.hp > 0) {
                won = false;
            }
        });
        if (won) {
            this.state = STATE_CHECK_LEVEL_UP;
            this.party.addBattleResult(this.gotXP, this.gotGold);
            this.callback.showMessage('you got 0x' + this.gotXP.toString(16) + ' XP and\n0x' +
                this.gotGold.toString(16) + ' Gold!');
        } else {
            this.doAction();
        }
    }

    private checkLevelUp() {
        for (var i = 0 ; i < this.party.characters.length ; ++i) {
            let c = this.party.characters[i];
            if (c.xp >= c.nextXp) {
                // level up!
                c.levelUp();
                this.callback.showMessage(c.name + ' becomes level 0x' + c.level.toString(16) + '!!');
                return;                
            }
        };
        this.callback.endBattle();
    }

    private checkDeadParty() {
        if (this.deadCheckCharacter.hp == 0) {
            this.state = STATE_CHECK_WIN;                        
            this.callback.removeEnemy(this.deadCheckIndex);
            this.callback.showMessage(this.deadCheckCharacter.name + ' is killed!');
            return;
        } else {
            this.doAction();
        }        
    }
}

interface BattleCallback {
    showPartyCommand();
    didRun();
    shakeEnemy(index: number);
    shakeMessage();
    showMessage(msg: string);
    removeEnemy(index: number);
    endBattle();
}

class BattleAction {
    index: number;
    type1: number;
    type2: number;
    target: number;
    constructor(index: number, type1: number, type2: number, target: number) {
        this.index = index;
        this.type1 = type1;
        this.type2 = type2;
        this.target = target;
    }
}

interface ActionOrder {
    type: number;
    index: number;
    speed: number;
    action?: BattleAction;
}