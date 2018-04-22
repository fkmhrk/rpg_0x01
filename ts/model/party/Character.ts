class Character {    
    name: string;
    level: number;
    hp: number;
    maxHp: number;
    mp: number;
    maxMp: number;

    attack: number;
    defence: number;

    xp: number;
    nextXp: number;

    items: number[];
    spells: number[];

    image?: string;

    constructor() {
        this.level = 1;
        this.xp = 0;
        this.nextXp = 0;
        this.items = [];
        this.spells = [];
    }

    static from(e: any): Character {
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

    addHp(value: number) {
        this.hp += value;
        if (this.hp < 0) {
            this.hp = 0;
        } else if (this.hp >= this.maxHp) {
            this.hp = this.maxHp;
        }
    }

    dropItem(index: number) {
        this.items.splice(index, 1);
    }

    copy(): Character {
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
        this.items.forEach((i: number) => {
            c.items.push(i);
        })
        return c;
    }

    update(c: Character) {
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

    canAction(): boolean {
        return this.hp > 0;
    }
}