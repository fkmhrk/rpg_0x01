/// <reference path="./Application.ts"/>
/// <reference path="./scene/title/TitleScene.ts"/>
(() => {
    var a = new Application();
    a.scene = new TitleScene(a);
    a.start();
})();