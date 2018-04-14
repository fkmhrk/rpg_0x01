/// <reference path="./scene/Scene.ts"/>
/// <reference path="./ractive.d.ts"/>
/// <reference path="./model/party/Party.ts"/>
/// <reference path="./model/maze/Maze.ts"/>

class Application {
    scene: Scene;
    party: Party;
    maze: Maze;

    constructor() {
        this.party = new Party();
        this.maze = new Maze();
    }

    start() {
        this.scene.onCreate();
    }

    load(): boolean {
        return false;
    }
    
    initParty(name: string) {
        this.party.init(name);
    }

    getTemplate(name: string) : Promise<String> {
        return Promise.resolve(document.getElementById(name).innerHTML);
    }

    showScene(nextScene: Scene) {
        this.scene = nextScene;
        this.scene.onCreate();
    }
    
    getCurrentWalls(): Walls {
        return this.maze.getWalls(this.party.x, this.party.y, this.party.direction);
    }
}