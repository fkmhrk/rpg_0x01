/// <reference path="./Character.ts" />

class Party {
    x: number;
    y: number;
    direction: number;
    encounter: number;

    characters: Character[];
    gold: number;

    init(name: string) {
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
        this.characters = [ c ];
    }

    copy(): Party {
        let p = new Party();
        p.characters = [];
        this.characters.forEach((c: Character) => {
            p.characters.push(c.copy());
        })
        return p;
    }

    update(p: Party) {
        this.characters.forEach((c: Character, index: number) => {
            let src = p.characters[index];
            c.update(src);
        })
    }

    goForward() {
        switch (this.direction) {
            case 0: this.y--; break;
            case 1: this.x--; break;
            case 2: this.x++; break;
            case 3: this.y++; break;
        }        
    }

    turnLeft() {
        switch (this.direction) {
            case 0: this.direction = 1; break;
            case 1: this.direction = 3; break;
            case 2: this.direction = 0; break;
            case 3: this.direction = 2; break;
        }
    }

    turnRight() {
        switch (this.direction) {
            case 0: this.direction = 2; break;
            case 1: this.direction = 0; break;
            case 2: this.direction = 3; break;
            case 3: this.direction = 1; break;
        }
    }    
    turnBack() {
        switch (this.direction) {
            case 0: this.direction = 3; break;
            case 1: this.direction = 2; break;
            case 2: this.direction = 1; break;
            case 3: this.direction = 0; break;
        }
    }    

    addBattleResult(xp: number, gold: number) {
        this.characters.forEach((c: Character) => {
            if (c.hp > 0) {
                c.xp += xp;
            }
        });
        this.gold += gold;
    }

    isAllDead(): boolean {
        return this.characters.map((c: Character) => {
            return <number>(c.hp == 0 ? 1 : 0);
        }).reduce((t: number, current: number) => {
            return t + current;
        }) == this.characters.length;
    }

    getRandomAliveIndex(): number{ 
        while (true) {
            let index = Math.floor(Math.random() * this.characters.length);
            if (this.characters[index].hp > 0) {
                return index;
            }
        }
    }
}