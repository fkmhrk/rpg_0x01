class Character {
    constructor() {
        this.level = 1;
        this.xp = 0;
        this.nextXp = 0;
    }
    addHp(value) {
        this.hp += value;
        if (this.hp < 0) {
            this.hp = 0;
        }
        else if (this.hp >= this.maxHp) {
            this.hp = this.maxHp;
        }
    }
    copy() {
        let c = new Character();
        c.level = this.level;
        c.name = this.name;
        c.hp = this.hp;
        c.maxHp = this.maxHp;
        c.mp = this.mp;
        c.maxMp = this.maxMp;
        c.attack = this.attack;
        c.defence = this.defence;
        c.xp = this.xp;
        c.nextXp = this.nextXp;
        return c;
    }
    update(c) {
        this.level = c.level;
        this.hp = c.hp;
        this.maxHp = c.maxHp;
        this.mp = c.mp;
        this.maxMp = c.maxMp;
        this.attack = c.attack;
        this.defence = c.defence;
        this.xp = c.xp;
        this.nextXp = c.nextXp;
    }
    levelUp() {
        ++this.level;
        this.nextXp = this.level * this.level * 10;
        this.hp += 1;
        this.maxHp += 1;
        this.mp += 1;
        this.maxMp += 1;
        this.attack += 1;
        this.defence += 1;
    }
    canAction() {
        return this.hp > 0;
    }
}
/// <reference path="./Character.ts" />
class Party {
    init(name) {
        this.x = 0;
        this.y = 0;
        this.direction = 0;
        this.encounter = 1;
        this.gold = 20;
        let c = new Character();
        c.name = name;
        c.hp = 16;
        c.maxHp = 16;
        c.mp = 0;
        c.maxMp = 0;
        c.attack = 6;
        c.defence = 0;
        c.xp = 0;
        c.nextXp = 2;
        this.characters = [c];
    }
    copy() {
        let p = new Party();
        p.characters = [];
        this.characters.forEach((c) => {
            p.characters.push(c.copy());
        });
        return p;
    }
    update(p) {
        this.characters.forEach((c, index) => {
            let src = p.characters[index];
            c.update(src);
        });
    }
    goForward() {
        switch (this.direction) {
            case 0:
                this.y--;
                break;
            case 1:
                this.x--;
                break;
            case 2:
                this.x++;
                break;
            case 3:
                this.y++;
                break;
        }
    }
    turnLeft() {
        switch (this.direction) {
            case 0:
                this.direction = 1;
                break;
            case 1:
                this.direction = 3;
                break;
            case 2:
                this.direction = 0;
                break;
            case 3:
                this.direction = 2;
                break;
        }
    }
    turnRight() {
        switch (this.direction) {
            case 0:
                this.direction = 2;
                break;
            case 1:
                this.direction = 0;
                break;
            case 2:
                this.direction = 3;
                break;
            case 3:
                this.direction = 1;
                break;
        }
    }
    turnBack() {
        switch (this.direction) {
            case 0:
                this.direction = 3;
                break;
            case 1:
                this.direction = 2;
                break;
            case 2:
                this.direction = 1;
                break;
            case 3:
                this.direction = 0;
                break;
        }
    }
    addBattleResult(xp, gold) {
        this.characters.forEach((c) => {
            if (c.hp > 0) {
                c.xp += xp;
            }
        });
        this.gold += gold;
    }
}
class Maze {
    constructor() {
        this.data = [
            [3, 9, 9, 9, 9, 9, 9, 5],
            [6, 3, 1, 1, 1, 1, 5, 6],
            [6, 2, 0, 0, 0, 0, 4, 6],
            [6, 2, 0, 0, 0, 0, 4, 6],
            [6, 2, 0, 0, 0, 0, 4, 6],
            [6, 2, 0, 0, 0, 0, 4, 6],
            [6, 2, 8, 8, 8, 8, 12, 6],
            [10, 8, 9, 9, 9, 9, 9, 12],
        ];
    }
    getWalls(x, y, d) {
        let w = new Walls();
        if (d == 0) {
            // north
            w.front = (this.data[y][x] & 0x1) > 0;
            w.left1 = (this.data[y][x] & 0x2) > 0;
            w.right1 = (this.data[y][x] & 0x4) > 0;
            if (!w.left1) {
                w.frontLeft = (this.data[y][x - 1] & 0x1) > 0;
            }
            if (!w.right1) {
                w.frontRight = (this.data[y][x + 1] & 0x1) > 0;
            }
            if (!w.front) {
                w.front2 = (this.data[y - 1][x] & 0x1) > 0;
                w.left2 = (this.data[y - 1][x] & 0x2) > 0;
                w.right2 = (this.data[y - 1][x] & 0x4) > 0;
            }
        }
        else if (d == 1) {
            // west
            w.front = (this.data[y][x] & 0x2) > 0;
            w.left1 = (this.data[y][x] & 0x8) > 0;
            w.right1 = (this.data[y][x] & 0x1) > 0;
            if (!w.left1) {
                w.frontLeft = (this.data[y + 1][x] & 0x2) > 0;
            }
            if (!w.right1) {
                w.frontRight = (this.data[y - 1][x] & 0x2) > 0;
            }
            if (!w.front) {
                w.front2 = (this.data[y][x - 1] & 0x2) > 0;
                w.left2 = (this.data[y][x - 1] & 0x8) > 0;
                w.right2 = (this.data[y][x - 1] & 0x1) > 0;
            }
        }
        else if (d == 2) {
            // east
            w.front = (this.data[y][x] & 0x4) > 0;
            w.left1 = (this.data[y][x] & 0x1) > 0;
            w.right1 = (this.data[y][x] & 0x8) > 0;
            if (!w.left1) {
                w.frontLeft = (this.data[y - 1][x] & 0x4) > 0;
            }
            if (!w.right1) {
                w.frontRight = (this.data[y + 1][x] & 0x4) > 0;
            }
            if (!w.front) {
                w.front2 = (this.data[y][x + 1] & 0x4) > 0;
                w.left2 = (this.data[y][x + 1] & 0x1) > 0;
                w.right2 = (this.data[y][x + 1] & 0x8) > 0;
            }
        }
        else if (d == 3) {
            // south
            w.front = (this.data[y][x] & 0x8) > 0;
            w.left1 = (this.data[y][x] & 0x4) > 0;
            w.right1 = (this.data[y][x] & 0x2) > 0;
            if (!w.left1) {
                w.frontLeft = (this.data[y][x + 1] & 0x8) > 0;
            }
            if (!w.right1) {
                w.frontRight = (this.data[y][x - 1] & 0x8) > 0;
            }
            if (!w.front) {
                w.front2 = (this.data[y + 1][x] & 0x8) > 0;
                w.left2 = (this.data[y + 1][x] & 0x4) > 0;
                w.right2 = (this.data[y + 1][x] & 0x2) > 0;
            }
        }
        return w;
    }
}
class Walls {
    constructor() {
        this.front = true;
        this.frontLeft = true;
        this.frontRight = true;
        this.front2 = true;
        this.left1 = true;
        this.left2 = true;
        this.right1 = true;
        this.right2 = true;
    }
}
/// <reference path="./scene/Scene.ts"/>
/// <reference path="./ractive.d.ts"/>
/// <reference path="./model/party/Party.ts"/>
/// <reference path="./model/maze/Maze.ts"/>
class Application {
    constructor() {
        this.party = new Party();
        this.maze = new Maze();
    }
    start() {
        this.scene.onCreate();
    }
    load() {
        return false;
    }
    initParty(name) {
        this.party.init(name);
    }
    getTemplate(name) {
        return Promise.resolve(document.getElementById(name).innerHTML);
    }
    showScene(nextScene) {
        this.scene = nextScene;
        this.scene.onCreate();
    }
    getCurrentWalls() {
        return this.maze.getWalls(this.party.x, this.party.y, this.party.direction);
    }
}
const STATE_PARTY_COMMAND = 1;
const STATE_DO_FIRST_CHARACTER = 2;
const STATE_CHECK_DEAD = 3;
const STATE_CHECK_WIN = 4;
const STATE_CHECK_LEVEL_UP = 5;
const STATE_CHECK_DEAD_PARTY = 6;
class BattleEngine {
    constructor(callback, party, enemies) {
        this.callback = callback;
        this.party = party;
        this.enemies = enemies;
        this.state = STATE_PARTY_COMMAND;
        this.gotXP = 0;
        this.gotGold = 0;
    }
    startAction(actions) {
        this.actions = actions;
        this.order = [];
        actions.forEach((a) => {
            this.order.push({
                type: 0,
                index: a.index,
                speed: 1,
                action: a,
            });
        });
        this.enemies.forEach((e, index) => {
            this.order.push({
                type: 1,
                index: index,
                speed: 1,
            });
        });
        this.order.sort((a, b) => {
            return b.speed - a.speed;
        });
        this.state = STATE_DO_FIRST_CHARACTER;
        this.doNext();
    }
    doNext() {
        switch (this.state) {
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
    doAction() {
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
                case 1:// Fight
                    this.state = STATE_CHECK_DEAD;
                    let e = this.enemies[order.action.target];
                    let damage = Math.trunc(c.attack / 2 - e.defence / 4);
                    e.addHp(-damage);
                    this.deadCheckCharacter = e;
                    this.deadCheckIndex = order.action.target;
                    this.callback.showMessage(c.name + ' attacks ' +
                        e.name + ' and took 0x' + damage.toString(16) + ' damage!');
                    break;
            }
        }
        else {
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
            this.callback.showMessage(c.name + ' attacks ' +
                e.name + ' and took 0x' + damage.toString(16) + ' damage!');
        }
    }
    checkDead() {
        if (this.deadCheckCharacter.hp == 0) {
            this.gotXP += this.deadCheckCharacter.xp;
            this.gotGold += this.deadCheckCharacter.nextXp;
            this.state = STATE_CHECK_WIN;
            this.callback.removeEnemy(this.deadCheckIndex);
            this.callback.showMessage(this.deadCheckCharacter.name + ' is killed!');
            return;
        }
        else {
            this.doAction();
        }
    }
    checkWin() {
        let won = true;
        this.enemies.forEach((e) => {
            if (e.hp > 0) {
                won = false;
            }
        });
        if (won) {
            this.state = STATE_CHECK_LEVEL_UP;
            this.party.addBattleResult(this.gotXP, this.gotGold);
            this.callback.showMessage('you got 0x' + this.gotXP.toString(16) + ' XP and\n0x' +
                this.gotGold.toString(16) + ' Gold!');
        }
        else {
            this.doAction();
        }
    }
    checkLevelUp() {
        for (var i = 0; i < this.party.characters.length; ++i) {
            let c = this.party.characters[i];
            if (c.xp >= c.nextXp) {
                // level up!
                c.levelUp();
                this.callback.showMessage(c.name + ' becomes level 0x' + c.level.toString(16) + '!!');
                return;
            }
        }
        ;
        this.callback.endBattle();
    }
    checkDeadParty() {
        if (this.deadCheckCharacter.hp == 0) {
            this.state = STATE_CHECK_WIN;
            this.callback.removeEnemy(this.deadCheckIndex);
            this.callback.showMessage(this.deadCheckCharacter.name + ' is killed!');
            return;
        }
        else {
            this.doAction();
        }
    }
}
class BattleAction {
    constructor(index, type1, type2, target) {
        this.index = index;
        this.type1 = type1;
        this.type2 = type2;
        this.target = target;
    }
}
/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../maze/MazeScene.ts"/>
/// <reference path="./BattleEngine.ts"/>
class BattleScene {
    constructor(app, enemies) {
        this.app = app;
        this.engine = new BattleEngine(this, app.party.copy(), enemies);
    }
    onCreate() {
        this.app.getTemplate('battleTemplate').then((t) => {
            let enemies = [];
            this.engine.enemies.forEach((e) => {
                enemies.push({
                    alive: true,
                });
            });
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
                    }
                    else {
                        this.actions.push(new BattleAction(this.actionIndex, 1, 0, 0));
                        this.toNextCharacterCommand();
                    }
                },
                run: () => {
                    this.engine.run();
                }
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
    showMessage(msg) {
        this.ractive.set({
            'msg': msg,
            'buttonState': 1,
        });
    }
    removeEnemy(index) {
        let enemies = this.ractive.get('enemies');
        enemies[index].alive = false;
        this.ractive.set('enemies', enemies);
    }
    endBattle() {
        this.app.party.update(this.engine.party);
        this.app.showScene(new MazeScene(this.app));
    }
    toNextCharacterCommand() {
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
    findNextActionCharacter(index) {
        let characters = this.engine.party.characters;
        ++index;
        while (index < characters.length) {
            if (characters[index].canAction())
                break;
            ++index;
        }
        return (index >= characters.length) ? -1 : index;
    }
}
/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../battle/BattleScene.ts"/>
class MazeScene {
    constructor(app) {
        this.app = app;
        this.actionText = '';
        this.actionHandle = 0;
    }
    onCreate() {
        this.app.getTemplate('mazeTemplate').then((t) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
                data: {}
            });
            this.ractive.on({
                go: () => {
                    this.go();
                },
                left: () => {
                    this.app.party.turnLeft();
                    this.drawMaze();
                },
                right: () => {
                    this.app.party.turnRight();
                    this.drawMaze();
                },
                back: () => {
                    this.app.party.turnBack();
                    this.drawMaze();
                }
            });
            let canvas = document.getElementById('maze');
            this.context = canvas.getContext('2d');
            this.drawMaze();
        });
    }
    go() {
        let walls = this.app.getCurrentWalls();
        if (walls.front) {
            this.showActionText('OOPS');
            this.drawMaze();
            return;
        }
        this.app.party.goForward();
        this.showActionText('Go');
        this.drawMaze();
        this.app.party.encounter--;
        if (this.app.party.encounter <= 0) {
            this.app.party.encounter = Math.random() * 10 + 3;
            let e1 = new Character();
            e1.name = 'Enemy 0x01';
            e1.hp = 4;
            e1.maxHp = 10;
            e1.attack = 2;
            e1.defence = 0;
            e1.xp = 1;
            e1.nextXp = 2;
            let enemies = [e1];
            this.app.showScene(new BattleScene(this.app, enemies));
        }
    }
    showActionText(text) {
        this.actionText = text;
        if (this.actionHandle != 0) {
            clearTimeout(this.actionHandle);
        }
        this.actionHandle = setTimeout(() => {
            this.actionText = '';
            this.drawMaze();
        }, 300);
    }
    drawMaze() {
        this.context.beginPath();
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, 320, 320);
        let walls = this.app.getCurrentWalls();
        this.context.strokeStyle = '#FFFFFF';
        if (walls.front) {
            this.context.strokeRect(48, 48, 224, 224);
        }
        else {
            if (walls.front2) {
                this.context.strokeRect(96, 96, 128, 128);
            }
            if (walls.left2) {
                this.context.moveTo(48, 48);
                this.context.lineTo(96, 96);
                this.context.lineTo(96, 224);
                this.context.lineTo(48, 272);
                this.context.lineTo(48, 48);
            }
            if (walls.right2) {
                this.context.moveTo(272, 48);
                this.context.lineTo(224, 96);
                this.context.lineTo(224, 224);
                this.context.lineTo(272, 272);
                this.context.lineTo(272, 48);
            }
        }
        if (walls.left1) {
            this.context.moveTo(0, 0);
            this.context.lineTo(48, 48);
            this.context.lineTo(48, 272);
            this.context.lineTo(0, 320);
        }
        else {
            if (walls.frontLeft) {
                this.context.strokeRect(0, 48, 48, 224);
            }
        }
        if (walls.right1) {
            this.context.moveTo(320, 0);
            this.context.lineTo(272, 48);
            this.context.lineTo(272, 272);
            this.context.lineTo(320, 320);
        }
        else {
            if (walls.frontRight) {
                this.context.strokeRect(272, 48, 48, 224);
            }
        }
        if (this.actionText.length > 0) {
            this.context.strokeText(this.actionText, 160, 160, 32);
        }
        this.context.closePath();
        this.context.stroke();
    }
}
/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../maze/MazeScene.ts"/>
class SetupScene {
    constructor(app) {
        this.app = app;
    }
    onCreate() {
        this.app.getTemplate('setupTemplate').then((t) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
                data: {
                    name: "0x01",
                    isEmpty: (v) => {
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
    submit() {
        let name = this.ractive.get('name');
        this.app.initParty(name);
        this.app.showScene(new MazeScene(this.app));
    }
}
/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../setup/SetupScene.ts"/>
/// <reference path="../maze/MazeScene.ts"/>
class TitleScene {
    constructor(app) {
        this.app = app;
    }
    onCreate() {
        this.app.getTemplate('titleTemplate').then((t) => {
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
    resume() {
        if (this.app.load()) {
            this.app.showScene(new MazeScene(this.app));
        }
        else {
            this.app.showScene(new SetupScene(this.app));
        }
    }
}
/// <reference path="./Application.ts"/>
/// <reference path="./scene/title/TitleScene.ts"/>
var a;
(() => {
    a = new Application();
    a.scene = new TitleScene(a);
    a.start();
})();
