const mazeData = [
    {
        walls: [
            [ 7, 7, 7, 7, 3, 1, 1, 9, 9,13],
            [ 6, 2, 8, 4, 2, 0, 4, 3, 1, 5],
            [ 6, 6, 7, 6, 2, 0, 4, 6,14, 6],
            [ 6,10, 0,12, 0, 0, 4,10, 1,12],
            [ 2, 9, 0, 9, 0, 0, 0, 9, 0,13],
            [ 6, 3, 0, 5, 2, 0, 4, 3, 8, 5],
            [ 6, 6,14, 6, 2, 0, 4, 6, 7, 6],
            [14,10, 9,12,10, 8,12,10, 8,12],
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
            [ 3, 9, 5, 6, 3, 9, 9, 5, 6, 6],
            [ 6, 7, 6, 6, 6,11, 9,12, 6, 6],
            [10, 0,12,14, 2, 9, 1, 9, 4, 6],
            [ 3, 8, 9, 9, 4, 3, 0, 5, 6, 6],
            [10, 9, 1, 5, 6,10, 8,12, 6, 6],
            [ 3, 5,10, 4, 2, 9, 1, 5, 6, 6],
            [10, 8, 9,12,10,13,10, 8,12,14],
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
            [0],
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
            [ 3, 1, 5, 6, 2, 4, 2,12, 2, 4],
            [ 6, 2, 4, 6, 6, 6, 6, 3, 4, 6],
            [ 6, 2,12,14,14, 6, 6,10,12, 6],
            [ 6, 2, 1, 1, 9, 0, 0, 9, 9,12],
            [ 6,10, 0,12, 7, 6, 2, 5, 7, 7],
            [14, 3, 0, 5, 2, 4, 2, 4, 6, 6],
            [11, 8, 8,12,10,12,10, 8,12,14],
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
            [ 7, 3, 9, 9, 9, 9, 9, 9, 9, 5],
            [ 6, 2, 5, 3, 1, 5, 3, 1, 5, 6],
            [ 6, 2, 4, 6,14, 6, 6,14, 6, 6],
            [ 6,10, 4,10, 1,12,10, 1,12, 6],
            [ 6, 3, 0, 1, 0, 1, 1, 4, 3,12],
            [ 6, 2, 0, 0, 0, 0, 0, 4, 6, 7],
            [14,10, 8, 8, 0, 8, 8,12, 6, 6],
            [11, 9, 9, 9, 8, 9, 9,13,14,14],
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
            [ 3, 9,13, 3, 9, 9, 1, 9,13, 7],
            [ 6,11, 9, 0, 1, 5, 2,13, 3,12],
            [ 2, 9,13, 6, 6, 6,10, 5, 6, 7],
            [ 6, 3, 9,12, 6, 2, 1,12, 6, 6],
            [ 6, 6, 3, 9, 8,12, 2, 9, 0,12],
            [ 6, 2, 4, 3, 9, 1, 4, 7, 6, 7],
            [ 6, 6,10,12, 3,12,10,12, 6, 6],
            [10, 8, 9, 9, 8, 9, 9, 9,12,14],
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
            [ 3, 9, 9, 9, 1, 5, 3, 1, 5, 7],
            [ 6, 3, 1, 5, 2, 4, 2, 4, 6, 6],
            [ 6, 2, 4, 6, 2, 4, 2, 4, 6, 6],
            [10, 8,12, 6, 2, 0, 0, 4, 6, 6],
            [ 3, 1, 5, 6, 2, 4, 2, 4, 2,12],
            [ 6, 2, 4, 6, 2, 4, 2, 4, 6, 7],
            [ 6,10, 8,12, 2, 4, 2, 4, 6, 6],
            [10, 9, 9, 9, 8,12,10, 8,12,14],
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
            [ 3, 9, 9, 1, 9, 1, 1, 9, 9, 5],
            [ 2, 1, 5, 6, 3, 4, 6, 3, 1, 4],
            [ 6,10,12, 6,10,12, 6,10,12, 6],
            [ 2, 9, 9, 0, 9, 9, 0, 9, 9, 4],
            [ 6, 3, 5, 6, 3, 5, 6, 3, 5, 6],
            [ 2, 8,12, 6,10, 4, 6, 2,12, 6],
            [10, 9, 9, 8, 9, 8, 8, 8, 9,12],
            [11, 9, 9, 9, 9, 9, 9, 9, 9,13],
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
            [ 3, 1, 9, 9, 9, 1, 9, 1, 9, 5],
            [ 6, 6, 3, 1, 5,14, 7,14, 7,14],
            [ 6, 6,10, 8, 8, 5, 2, 9, 4, 7],
            [ 6, 2, 9, 9, 5,10,12, 7,10, 4],
            [ 6, 6, 3, 5, 6, 3, 9, 0, 9, 4],
            [ 6, 6, 6, 6, 6, 6, 7,14, 3, 4],
            [ 6, 6, 6, 2,12,10, 8, 9,12, 6],
            [14,10,12,10, 9, 9, 9, 9, 9,12],
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
            [ 3, 9, 1, 9, 1, 9, 1, 9, 9, 5],
            [ 6,15,14,15, 6,15, 6,15,15, 6],
            [ 2, 9, 9,13, 6,15, 2, 9, 9, 4],
            [ 6,15,11, 1, 8, 9, 8,13,15, 6],
            [ 2, 9, 9, 0, 9, 1, 9, 1, 9, 4],
            [ 6,15,15, 6,15, 6,15, 6,15, 6],
            [ 6,15,15, 6,15, 6,15, 6,15, 6],
            [10, 9, 9, 8, 9, 8, 9, 8, 9,12],
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
            [ 3, 9, 1, 1, 1, 1, 1, 1, 9, 5],
            [ 6,15,10, 8, 8, 8, 8,12,15, 6],
            [ 2, 5, 3, 5, 3, 1, 1, 5, 3, 4],
            [ 2, 4, 2, 8, 8,12,10,12, 2, 4],
            [ 2, 4, 2, 1, 1, 5, 3, 5, 2, 4],
            [ 2,12,10,12,10, 8,12,14,10, 4],
            [ 6,15, 3, 1, 1, 1, 1, 5,15, 6],
            [10, 9, 8, 8, 8, 8, 8, 8, 9,12],
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