class Party {
    x: number;
    y: number;
    direction: number;

    init(name: string) {
        this.x = 0;
        this.y = 0;
        this.direction = 0;
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
}