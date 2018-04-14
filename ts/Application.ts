/// <reference path="./scene/Scene.ts"/>
/// <reference path="./ractive.d.ts"/>
class Application {
    scene: Scene;

    start() {
        this.scene.onCreate();
    }

    getTemplate(name: string) : Promise<String> {
        return Promise.resolve(document.getElementById(name).innerHTML);
    }
}