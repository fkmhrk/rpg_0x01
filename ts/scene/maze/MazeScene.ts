/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>
/// <reference path="../battle/BattleScene.ts"/>
/// <reference path="../end/EndScene.ts"/>

class MazeScene implements Scene {
    app: Application;
    ractive: Ractive.Ractive;
    context: CanvasRenderingContext2D
    actionText: string;
    actionHandle: number;

    eventData: any[];
    eventIndex: number;
    yesIndex: number;
    noIndex: number;

    constructor(app: Application) {
        this.app = app;
        this.actionText = '';
        this.actionHandle = 0;
    }  

    onCreate() {
        this.app.getTemplate('mazeTemplate').then((t : string) => {
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
                    })
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
            })
            let canvas = document.getElementById('maze') as HTMLCanvasElement;
            this.context = canvas.getContext('2d');

            this.drawMaze();
        });
    }

    private go() {
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
            if (enemies.length == 0) return;
            this.app.showScene(new BattleScene(this.app, enemies));
        }        
    }

    private showActionText(text: string) {
        this.actionText = text;
        if (this.actionHandle != 0) {
            clearTimeout(this.actionHandle);
        }
        this.actionHandle = setTimeout(() => {
            this.actionText = '';
            this.drawMaze();
        }, 300);
    }

    private drawMaze() {
        this.context.beginPath();
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, 320, 320);

        let walls = this.app.getCurrentWalls();

        this.context.strokeStyle = '#FFFFFF';
        if (walls.front) {
            this.context.strokeRect(48, 48, 224, 224);
        } else {
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
        } else {
            if (walls.frontLeft) {
                this.context.strokeRect(0, 48, 48, 224);
            }
        }
               
        if (walls.right1) {
            this.context.moveTo(320, 0);
            this.context.lineTo(272, 48);
            this.context.lineTo(272, 272);
            this.context.lineTo(320, 320);
        } else {
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

    private execEvent() {
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
        })
    }

    private showMessage(msg: string, state: number) {
        this.ractive.set({
            'buttonState': state,
            'msg': msg,
        });
    }
}