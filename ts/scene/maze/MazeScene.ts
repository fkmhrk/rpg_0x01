/// <reference path="../Scene.ts"/>
/// <reference path="../../Application.ts"/>

class MazeScene implements Scene {
    app: Application;
    ractive: Ractive.Ractive;
    context: CanvasRenderingContext2D

    constructor(app: Application) {
        this.app = app;
    }  

    onCreate() {
        this.app.getTemplate('mazeTemplate').then((t : string) => {
            this.ractive = new Ractive({
                el: '#c',
                template: t,
                data: {
                }
            });
            let canvas = document.getElementById('maze') as HTMLCanvasElement;
            this.context = canvas.getContext('2d');

            this.drawMaze();
        });
    }

    private drawMaze() {
        this.context.beginPath();
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, 320, 320);

        this.context.strokeStyle = '#FFFFFF';
        // this.context.strokeRect(48, 48, 224, 224);
        this.context.strokeRect(96, 96, 128, 128);
        this.context.moveTo(0, 0);
        this.context.lineTo(96, 96);
        this.context.moveTo(96, 224);
        this.context.lineTo(0, 320);
        this.context.moveTo(48, 48);
        this.context.lineTo(48, 272);
        this.context.moveTo(320, 0);
        this.context.lineTo(272, 48);
        this.context.lineTo(272, 272);
        this.context.lineTo(320, 320);        
        this.context.closePath();
        this.context.stroke();
    }
}