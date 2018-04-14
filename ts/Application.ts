/// <reference path="./scene/Scene.ts"/>
/// <reference path="./ractive.d.ts"/>
/// <reference path="./model/party/Party.ts"/>

class Application {
    scene: Scene;
    party: Party;

    constructor() {
        this.party = new Party();
    }

    start() {
        this.scene.onCreate();
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
}