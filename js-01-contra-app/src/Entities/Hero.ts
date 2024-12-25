import { Container, Graphics } from "pixi.js";

export default class Hero extends Container {
  #GRAVITY_FORCE: number = 0.1;
  #velocityX: number = 0;
  #velocityY: number = 0;

  constructor() {
    super();

    const view = new Graphics();
    view.lineStyle(1, 0xff0000);
    view.drawRect(0, 0, 20, 60);

    this.addChild(view);
  }

  // el método update() se llama en cada fotograma
  update(): void {
    this.#velocityY += this.#GRAVITY_FORCE;
    this.y += this.#velocityY;
  }

  // el método stay() se llama cuando el héroe colisiona con una plataforma
  // y se queda en ella
  stay(): void {
    this.#velocityY = 0;
  }
}
