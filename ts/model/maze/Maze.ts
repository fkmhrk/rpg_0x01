/// <reference path="../party/Character.ts" />

class Maze {
    data: number[][];
    enemies: Character[];
    teams: number[][];

    constructor() {
        this.data = [
            [ 3, 9, 9, 9, 9, 9, 9, 5],
            [ 6, 3, 1, 1, 1, 1, 5, 6],
            [ 6, 2, 0, 0, 0, 0, 4, 6],
            [ 6, 2, 0, 0, 0, 0, 4, 6],
            [ 6, 2, 0, 0, 0, 0, 4, 6],
            [ 6, 2, 0, 0, 0, 0, 4, 6],
            [ 6, 2, 8, 8, 8, 8,12, 6],
            [10, 8, 9, 9, 9, 9, 9,12],
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

    getWalls(x: number, y: number, d: number): Walls {
        let w = new Walls();
        if (d == 0) {
            // north
            w.front = (this.data[y][x] & 0x1) > 0;
            w.left1 = (this.data[y][x] & 0x2) > 0;
            w.right1 = (this.data[y][x] & 0x4) > 0;
            if (!w.left1) {
                w.frontLeft = (this.data[y][x-1] & 0x1) > 0;
            }
            if (!w.right1) {
                w.frontRight = (this.data[y][x+1] & 0x1) > 0;
            }
            if (!w.front) {
                w.front2 = (this.data[y-1][x] & 0x1) > 0;
                w.left2 = (this.data[y-1][x] & 0x2) > 0;
                w.right2 = (this.data[y-1][x] & 0x4) > 0;
            }
        } else if (d == 1) {
            // west
            w.front = (this.data[y][x] & 0x2) > 0;
            w.left1 = (this.data[y][x] & 0x8) > 0;
            w.right1 = (this.data[y][x] & 0x1) > 0;
            if (!w.left1) {
                w.frontLeft = (this.data[y+1][x] & 0x2) > 0;
            }
            if (!w.right1) {
                w.frontRight = (this.data[y-1][x] & 0x2) > 0;
            }
            if (!w.front) {
                w.front2 = (this.data[y][x-1] & 0x2) > 0;
                w.left2  = (this.data[y][x-1] & 0x8) > 0;
                w.right2 = (this.data[y][x-1] & 0x1) > 0;
            }
        } else if (d == 2) {
            // east
            w.front = (this.data[y][x] & 0x4) > 0;
            w.left1 = (this.data[y][x] & 0x1) > 0;
            w.right1 = (this.data[y][x] & 0x8) > 0;
            if (!w.left1) {
                w.frontLeft = (this.data[y-1][x] & 0x4) > 0;
            }
            if (!w.right1) {
                w.frontRight = (this.data[y+1][x] & 0x4) > 0;
            }
            if (!w.front) {
                w.front2 = (this.data[y][x+1] & 0x4) > 0;
                w.left2  = (this.data[y][x+1] & 0x1) > 0;
                w.right2 = (this.data[y][x+1] & 0x8) > 0;
            }
        } else if (d == 3) {
            // south
            w.front  = (this.data[y][x] & 0x8) > 0;
            w.left1  = (this.data[y][x] & 0x4) > 0;
            w.right1 = (this.data[y][x] & 0x2) > 0;
            if (!w.left1) {
                w.frontLeft = (this.data[y][x+1] & 0x8) > 0;
            }
            if (!w.right1) {
                w.frontRight = (this.data[y][x-1] & 0x8) > 0;
            }
            if (!w.front) {
                w.front2 = (this.data[y+1][x] & 0x8) > 0;
                w.left2  = (this.data[y+1][x] & 0x4) > 0;
                w.right2 = (this.data[y+1][x] & 0x2) > 0;
            }
        }
        return w;
    }

    determineEnemyTeam(): Character[] {
        let teamIndex = Math.floor(Math.random() * this.teams.length);
        let team = this.teams[teamIndex];
        return team.map((charIndex: number) => {
            return this.enemies[charIndex].copy();
        });
    }
}

class Walls {
    front: boolean;
    frontLeft: boolean;
    frontRight: boolean;
    front2: boolean;
    left1: boolean;
    left2: boolean;
    right1: boolean;
    right2: boolean;
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