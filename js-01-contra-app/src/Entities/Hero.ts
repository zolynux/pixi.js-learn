import { Container, Graphics } from "pixi.js";

export default class Hero extends Container {
  #GRAVITY_FORCE: number = 1;

  constructor() {
    super();
    const view = new Graphics();
    view.lineStyle(1, 0xff0000);
    view.drawRect(0, 0, 20, 60);

    this.addChild(view);
  }

  // el método update() se llama en cada fotograma
  update(): void {
    this.x += this.#GRAVITY_FORCE;
    this.y += this.#GRAVITY_FORCE;
  }
}
