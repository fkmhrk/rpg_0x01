class Party {
    init(name) {
        this.x = 0;
        this.y = 0;
        this.direction = 0;
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
/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
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
                    name: "",
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
