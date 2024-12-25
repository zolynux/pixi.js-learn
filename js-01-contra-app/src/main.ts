import * as PIXI from "pixi.js";
import Game from "./Game";

const _pixiApp: any = new PIXI.Application({
  width: 1024,
  height: 768,
});

const game: any = new Game(_pixiApp);

_pixiApp.ticker.add(game.update, game);
document.body.appendChild(_pixiApp.view);
