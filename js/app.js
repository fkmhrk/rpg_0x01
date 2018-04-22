class Character {
    constructor() {
        this.level = 1;
        this.xp = 0;
        this.nextXp = 0;
    }
    static from(e) {
        let c = new Character();
        c.name = e['name'];
        c.hp = c.maxHp = e['hp'];
        c.mp = c.maxMp = e['mp'];
        c.attack = e['atc'];
        c.defence = e['def'];
        c.xp = e['xp'];
        c.nextXp = e['gold'];
        c.image = e['img'];
        return c;
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
        c.image = this.image;
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
        this.y = 7;
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
    isAllDead() {
        return this.characters.map((c) => {
            return (c.hp == 0 ? 1 : 0);
        }).reduce((t, current) => {
            return t + current;
        }) == this.characters.length;
    }
    getRandomAliveIndex() {
        while (true) {
            let index = Math.floor(Math.random() * this.characters.length);
            if (this.characters[index].hp > 0) {
                return index;
            }
        }
    }
}
const mazeData = [
    {
        walls: [
            [7, 7, 7, 7, 3, 1, 1, 9, 9, 13],
            [6, 2, 8, 4, 2, 0, 4, 3, 1, 5],
            [6, 6, 7, 6, 2, 0, 4, 6, 14, 6],
            [6, 10, 0, 12, 0, 0, 4, 10, 1, 12],
            [2, 9, 0, 9, 0, 0, 0, 9, 0, 13],
            [6, 3, 0, 5, 2, 0, 4, 3, 8, 5],
            [6, 6, 14, 6, 2, 0, 4, 6, 7, 6],
            [14, 10, 9, 12, 10, 8, 12, 10, 8, 12],
        ],
        enemies: [{
                name: 'Enemy 0x01',
                hp: 4,
                mp: 0,
                atc: 2,
                def: 0,
                xp: 1,
                gold: 2,
                img: 'e1.png',
            }],
        teams: [
            [],
        ],
        events: {
            "0,6": 0,
            "0,0": 1,
        },
        eventData: [
            [
                [1, "Welcome!"],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 1, 0, 0],
            ],
        ],
    },
    // floor 1
    {
        walls: [
            [11, 9, 9, 1, 9, 9, 9, 9, 1, 5],
            [3, 9, 5, 6, 3, 9, 9, 5, 6, 6],
            [6, 7, 6, 6, 6, 11, 9, 12, 6, 6],
            [10, 0, 12, 14, 2, 9, 1, 9, 4, 6],
            [3, 8, 9, 9, 4, 3, 0, 5, 6, 6],
            [10, 9, 1, 5, 6, 10, 8, 12, 6, 6],
            [3, 5, 10, 4, 2, 9, 1, 5, 6, 6],
            [10, 8, 9, 12, 10, 13, 10, 8, 12, 14],
        ],
        enemies: [{
                name: 'Enemy 0x01',
                hp: 4,
                mp: 0,
                atc: 2,
                def: 0,
                xp: 1,
                gold: 2,
                img: 'e1.png',
            }],
        teams: [
            [],
        ],
        events: {
            "0,0": 0,
            "0,6": 1,
            "3,3": 2,
            "9,7": 3,
        },
        eventData: [
            [
                [2, "Stairs up\n Take them?"],
                [3, 0, 0, 0],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 2, 0, 6],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 2, 3, 3],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 2, 9, 7],
            ],
        ],
    },
    // floor 2
    {
        walls: [
            [11, 9, 9, 5, 3, 5, 3, 5, 3, 5],
            [3, 1, 5, 6, 2, 4, 2, 12, 2, 4],
            [6, 2, 4, 6, 6, 6, 6, 3, 4, 6],
            [6, 2, 12, 14, 14, 6, 6, 10, 12, 6],
            [6, 2, 1, 1, 9, 0, 0, 9, 9, 12],
            [6, 10, 0, 12, 7, 6, 2, 5, 7, 7],
            [14, 3, 0, 5, 2, 4, 2, 4, 6, 6],
            [11, 8, 8, 12, 10, 12, 10, 8, 12, 14],
        ],
        enemies: [{
                name: 'Enemy 0x01',
                hp: 4,
                mp: 0,
                atc: 2,
                def: 0,
                xp: 1,
                gold: 2,
                img: 'e1.png',
            }],
        teams: [
            [],
        ],
        events: {
            "0,6": 0,
            "0,7": 1,
            "3,3": 2,
            "0,0": 3,
            "9,7": 4,
            "9,5": 5,
        },
        eventData: [
            [
                [2, "Stairs up\n Take them?"],
                [3, 1, 0, 6],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 3, 0, 7],
            ],
            [
                [2, "Stairs up\n Take them?"],
                [3, 1, 3, 3],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 3, 0, 0],
            ],
            [
                [2, "Stairs up\n Take them?"],
                [3, 1, 9, 7],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 3, 9, 5],
            ],
        ],
    },
    // floor 3
    {
        walls: [
            [7, 3, 9, 9, 9, 9, 9, 9, 9, 5],
            [6, 2, 5, 3, 1, 5, 3, 1, 5, 6],
            [6, 2, 4, 6, 14, 6, 6, 14, 6, 6],
            [6, 10, 4, 10, 1, 12, 10, 1, 12, 6],
            [6, 3, 0, 1, 0, 1, 1, 4, 3, 12],
            [6, 2, 0, 0, 0, 0, 0, 4, 6, 7],
            [14, 10, 8, 8, 0, 8, 8, 12, 6, 6],
            [11, 9, 9, 9, 8, 9, 9, 13, 14, 14],
        ],
        enemies: [{
                name: 'Enemy 0x01',
                hp: 4,
                mp: 0,
                atc: 2,
                def: 0,
                xp: 1,
                gold: 2,
                img: 'e1.png',
            }],
        teams: [
            [],
        ],
        events: {
            "0,7": 0,
            "0,6": 1,
            "0,0": 2,
            "9,5": 3,
            "9,7": 4,
        },
        eventData: [
            [
                [2, "Stairs up\n Take them?"],
                [3, 2, 0, 7],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 4, 0, 6],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 4, 0, 0],
            ],
            [
                [2, "Stairs up\n Take them?"],
                [3, 2, 9, 5],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 4, 9, 7],
            ],
        ],
    },
    // floor 4
    {
        walls: [
            [3, 9, 13, 3, 9, 9, 1, 9, 13, 7],
            [6, 11, 9, 0, 1, 5, 2, 13, 3, 12],
            [2, 9, 13, 6, 6, 6, 10, 5, 6, 7],
            [6, 3, 9, 12, 6, 2, 1, 12, 6, 6],
            [6, 6, 3, 9, 8, 12, 2, 9, 0, 12],
            [6, 2, 4, 3, 9, 1, 4, 7, 6, 7],
            [6, 6, 10, 12, 3, 12, 10, 12, 6, 6],
            [10, 8, 9, 9, 8, 9, 9, 9, 12, 14],
        ],
        enemies: [{
                name: 'Enemy 0x01',
                hp: 4,
                mp: 0,
                atc: 2,
                def: 0,
                xp: 1,
                gold: 2,
                img: 'e1.png',
            }],
        teams: [
            [],
        ],
        events: {
            "0,6": 0,
            "9,0": 1,
            "9,7": 2,
            "9,5": 3,
        },
        eventData: [
            [
                [2, "Stairs up\n Take them?"],
                [3, 3, 0, 6],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 5, 9, 0],
            ],
            [
                [2, "Stairs up\n Take them?"],
                [3, 3, 9, 7],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 5, 9, 5],
            ],
        ],
    },
    // floor 5
    {
        walls: [
            [3, 9, 9, 9, 1, 5, 3, 1, 5, 7],
            [6, 3, 1, 5, 2, 4, 2, 4, 6, 6],
            [6, 2, 4, 6, 2, 4, 2, 4, 6, 6],
            [10, 8, 12, 6, 2, 0, 0, 4, 6, 6],
            [3, 1, 5, 6, 2, 4, 2, 4, 2, 12],
            [6, 2, 4, 6, 2, 4, 2, 4, 6, 7],
            [6, 10, 8, 12, 2, 4, 2, 4, 6, 6],
            [10, 9, 9, 9, 8, 12, 10, 8, 12, 14],
        ],
        enemies: [{
                name: 'Enemy 0x01',
                hp: 4,
                mp: 0,
                atc: 2,
                def: 0,
                xp: 1,
                gold: 2,
                img: 'e1.png',
            }],
        teams: [
            [],
        ],
        events: {
            "9,0": 0,
            "3,3": 1,
            "9,5": 2,
            "9,7": 3,
        },
        eventData: [
            [
                [2, "Stairs up\n Take them?"],
                [3, 4, 9, 0],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 6, 3, 3],
            ],
            [
                [2, "Stairs up\n Take them?"],
                [3, 4, 9, 5],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 6, 9, 7],
            ],
        ],
    },
    // floor 6
    {
        walls: [
            [3, 9, 9, 1, 9, 1, 1, 9, 9, 5],
            [2, 1, 5, 6, 3, 4, 6, 3, 1, 4],
            [6, 10, 12, 6, 10, 12, 6, 10, 12, 6],
            [2, 9, 9, 0, 9, 9, 0, 9, 9, 4],
            [6, 3, 5, 6, 3, 5, 6, 3, 5, 6],
            [2, 8, 12, 6, 10, 4, 6, 2, 12, 6],
            [10, 9, 9, 8, 9, 8, 8, 8, 9, 12],
            [11, 9, 9, 9, 9, 9, 9, 9, 9, 13],
        ],
        enemies: [{
                name: 'Enemy 0x01',
                hp: 4,
                mp: 0,
                atc: 2,
                def: 0,
                xp: 1,
                gold: 2,
                img: 'e1.png',
            }],
        teams: [
            [],
        ],
        events: {
            "3,3": 0,
            "9,7": 1,
            "0,7": 2,
        },
        eventData: [
            [
                [2, "Stairs up\n Take them?"],
                [3, 5, 3, 3],
            ],
            [
                [2, "Stairs up\n Take them?"],
                [3, 5, 9, 7],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 7, 0, 7],
            ],
        ],
    },
    // floor 7
    {
        walls: [
            [3, 1, 9, 9, 9, 1, 9, 1, 9, 5],
            [6, 6, 3, 1, 5, 14, 7, 14, 7, 14],
            [6, 6, 10, 8, 8, 5, 2, 9, 4, 7],
            [6, 2, 9, 9, 5, 10, 12, 7, 10, 4],
            [6, 6, 3, 5, 6, 3, 9, 0, 9, 4],
            [6, 6, 6, 6, 6, 6, 7, 14, 3, 4],
            [6, 6, 6, 2, 12, 10, 8, 9, 12, 6],
            [14, 10, 12, 10, 9, 9, 9, 9, 9, 12],
        ],
        enemies: [{
                name: 'Enemy 0x01',
                hp: 4,
                mp: 0,
                atc: 2,
                def: 0,
                xp: 1,
                gold: 2,
                img: 'e1.png',
            }],
        teams: [
            [],
        ],
        events: {
            "0,7": 0,
            "2,1": 1,
        },
        eventData: [
            [
                [2, "Stairs up\n Take them?"],
                [3, 6, 0, 7],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 8, 2, 1],
            ],
        ],
    },
    // floor 8
    {
        walls: [
            [3, 9, 1, 9, 1, 9, 1, 9, 9, 5],
            [6, 15, 14, 15, 6, 15, 6, 15, 15, 6],
            [2, 9, 9, 13, 6, 15, 2, 9, 9, 4],
            [6, 15, 11, 1, 8, 9, 8, 13, 15, 6],
            [2, 9, 9, 0, 9, 1, 9, 1, 9, 4],
            [6, 15, 15, 6, 15, 6, 15, 6, 15, 6],
            [6, 15, 15, 6, 15, 6, 15, 6, 15, 6],
            [10, 9, 9, 8, 9, 8, 9, 8, 9, 12],
        ],
        enemies: [{
                name: 'Enemy 0x01',
                hp: 4,
                mp: 0,
                atc: 2,
                def: 0,
                xp: 1,
                gold: 2,
                img: 'e1.png',
            }],
        teams: [
            [],
        ],
        events: {
            "2,1": 0,
            "7,3": 1,
            "9,7": 2,
        },
        eventData: [
            [
                [2, "Stairs up\n Take them?"],
                [3, 7, 2, 1],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 9, 7, 3],
            ],
            [
                [2, "Stairs down\n Take them?"],
                [3, 9, 7, 7],
            ],
        ],
    },
    // floor 9
    {
        walls: [
            [3, 9, 1, 1, 1, 1, 1, 1, 9, 5],
            [6, 15, 10, 8, 8, 8, 8, 12, 15, 6],
            [2, 5, 3, 5, 3, 1, 1, 5, 3, 4],
            [2, 4, 2, 8, 8, 12, 10, 12, 2, 4],
            [2, 4, 2, 1, 1, 5, 3, 5, 2, 4],
            [2, 12, 10, 12, 10, 8, 12, 14, 10, 4],
            [6, 15, 3, 1, 1, 1, 1, 5, 15, 6],
            [10, 9, 8, 8, 8, 8, 8, 8, 9, 12],
        ],
        enemies: [{
                name: 'Enemy 0x01',
                hp: 4,
                mp: 0,
                atc: 2,
                def: 0,
                xp: 1,
                gold: 2,
                img: 'e1.png',
            }],
        teams: [
            [],
        ],
        events: {
            "7,3": 0,
            "9,7": 1,
            "7,5": 2,
        },
        eventData: [
            [
                [2, "Stairs up\n Take them?"],
                [3, 8, 7, 3],
            ],
            [
                [2, "Stairs up\n Take them?"],
                [3, 8, 9, 7],
            ],
            [
                [1, "You found the treasure 0x01!"],
                [4],
            ],
        ],
    },
];
/// <reference path="../party/Character.ts" />
/// <reference path="./data.ts" />
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
        this.enemies = [];
        let e1 = new Character();
        e1.name = 'Enemy 0x01';
        e1.hp = 4;
        e1.maxHp = 10;
        e1.attack = 2;
        e1.defence = 0;
        e1.xp = 1;
        e1.nextXp = 2;
        this.enemies.push(e1);
        this.teams = [];
        this.teams.push([0, 0]);
        this.teams.push([0]);
        this.teams.push([0, 0]);
        this.teams.push([0]);
    }
    loadFloor(floor) {
        this.data = mazeData[floor].walls;
        this.enemies = mazeData[floor].enemies.map((e) => {
            return Character.from(e);
        });
        this.teams = mazeData[floor].teams;
        this.events = mazeData[floor].events;
        this.eventData = mazeData[floor].eventData;
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
    determineEnemyTeam() {
        let teamIndex = Math.floor(Math.random() * this.teams.length);
        let team = this.teams[teamIndex];
        return team.map((charIndex) => {
            return this.enemies[charIndex].copy();
        });
    }
    getEventIndex(x, y) {
        let n = this.events[x + "," + y];
        return (n == null) ? -1 : n;
    }
    getEventData(index) {
        return this.eventData[index];
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
/// <reference path="../../model/party/Party.ts" />
const STATE_PARTY_COMMAND = 1;
const STATE_DO_FIRST_CHARACTER = 2;
const STATE_CHECK_DEAD = 3;
const STATE_CHECK_WIN = 4;
const STATE_CHECK_LEVEL_UP = 5;
const STATE_CHECK_DEAD_PARTY = 6;
const STATE_CHECK_LOSE = 7;
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
            case STATE_CHECK_LOSE:
                this.checkLose();
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
                    if (e.hp == 0) {
                        // this one is already dead! next character
                        this.doAction();
                        return;
                    }
                    let damage = Math.trunc(c.attack / 2 - e.defence / 4);
                    e.addHp(-damage);
                    this.deadCheckCharacter = e;
                    this.deadCheckIndex = order.action.target;
                    this.callback.shakeEnemy(order.action.target);
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
            let targetIndex = this.party.getRandomAliveIndex();
            let e = this.party.characters[targetIndex];
            let damage = Math.trunc(c.attack / 2 - e.defence / 4);
            e.addHp(-damage);
            this.deadCheckCharacter = e;
            this.deadCheckIndex = targetIndex;
            this.callback.shakeMessage();
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
            this.state = STATE_CHECK_LOSE;
            this.callback.showMessage(this.deadCheckCharacter.name + ' is killed!');
            return;
        }
        else {
            this.doAction();
        }
    }
    checkLose() {
        if (this.party.isAllDead()) {
            this.callback.showAllDeadScene();
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
class GameOverScene {
    constructor(app) {
        this.app = app;
    }
    onCreate() {
        this.app.getTemplate('gameOverTemplate').then((t) => {
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
/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../maze/MazeScene.ts"/>
/// <reference path="./BattleEngine.ts"/>
/// <reference path="../gameover/GameOverScene.ts" />
class BattleScene {
    constructor(app, enemies) {
        this.app = app;
        this.engine = new BattleEngine(this, app.party.copy(), enemies);
        this.actionType = 0;
    }
    onCreate() {
        this.app.getTemplate('battleTemplate').then((t) => {
            let enemies = this.engine.enemies.map((e) => {
                return {
                    alive: true,
                    img: e.image,
                };
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
                },
                selectEnemy: (e, index) => {
                    if (this.actionType == 0)
                        return;
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
    shakeEnemy(index) {
        this.shakeElement(document.getElementById('enemy' + index));
    }
    shakeMessage() {
        this.shakeElement(document.getElementById('msg'));
    }
    shakeElement(e) {
        e.classList.add('shake');
        let handler = () => {
            e.classList.remove('shake');
            e.removeEventListener('animationend', handler);
        };
        e.addEventListener("animationend", handler);
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
    showAllDeadScene() {
        this.app.showScene(new GameOverScene(this.app));
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
class EndScene {
    constructor(app) {
        this.app = app;
    }
    onCreate() {
        this.app.getTemplate('endTemplate').then((t) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
            });
            this.ractive.on({
                start: () => {
                    this.app.showScene(new SetupScene(this.app));
                },
            });
        });
    }
}
/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../battle/BattleScene.ts"/>
/// <reference path="../end/EndScene.ts"/>
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
                data: {
                    buttonState: 0,
                }
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
                },
                ok: () => {
                    this.ractive.set({
                        'msg': '',
                    });
                    this.execEvent();
                },
                yes: () => {
                    this.ractive.set({
                        'msg': '',
                    });
                    this.eventIndex = this.yesIndex;
                    this.execEvent();
                },
                no: () => {
                    this.ractive.set({
                        'msg': '',
                    });
                    this.eventIndex = this.noIndex;
                    this.execEvent();
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
        let eventIndex = this.app.maze.getEventIndex(this.app.party.x, this.app.party.y);
        if (eventIndex >= 0) {
            // start event
            this.eventData = this.app.maze.getEventData(eventIndex);
            this.eventIndex = 0;
            this.execEvent();
            return;
        }
        this.app.party.encounter--;
        if (this.app.party.encounter <= 0) {
            this.app.party.encounter = Math.random() * 10 + 3;
            let enemies = this.app.maze.determineEnemyTeam();
            if (enemies.length == 0)
                return;
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
    execEvent() {
        while (this.eventIndex < this.eventData.length) {
            let line = this.eventData[this.eventIndex];
            switch (line[0]) {
                case 1:
                    this.showMessage(line[1], 1);
                    ++this.eventIndex;
                    return;
                case 2:
                    this.showMessage(line[1], 2);
                    this.yesIndex = this.eventIndex + 1;
                    this.noIndex = 99;
                    return;
                case 3:
                    this.app.maze.loadFloor(line[1]);
                    this.app.party.x = line[2];
                    this.app.party.y = line[3];
                    this.drawMaze();
                    break;
                case 4:
                    this.app.showScene(new EndScene(this.app));
                    return;
            }
            ++this.eventIndex;
        }
        this.ractive.set({
            'buttonState': 0,
        });
    }
    showMessage(msg, state) {
        this.ractive.set({
            'buttonState': state,
            'msg': msg,
        });
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
        this.app.maze.loadFloor(0);
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
