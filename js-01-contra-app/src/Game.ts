import Hero from "./Entities/Hero";
import Platform from "./Entities/Platform";

export default class Game {
  #pixiApp: any;
  #hero: any;
  #platforms: any = [];

  constructor(pixiApp: any) {
    this.#pixiApp = pixiApp;

    // Creamos un héroe
    this.#hero = new Hero();
    this.#hero.x = 100;
    this.#hero.y = 200;
    // Añadimos el héroe al escenario
    this.#pixiApp.stage.addChild(this.#hero);

    // Creamos una plataforma y
    // la añadimos al escenario
    const platform1 = new Platform();
    platform1.x = 50;
    platform1.y = 400;
    // Añadimos la plataforma al escenario
    this.#pixiApp.stage.addChild(platform1);

    // Creamos una plataforma y
    // la añadimos al escenario
    const platform2 = new Platform();
    platform2.x = 200;
    platform2.y = 450;
    // Añadimos la plataforma al escenario
    this.#pixiApp.stage.addChild(platform2);

    // Creamos una plataforma y
    // la añadimos al escenario
    const platform3 = new Platform();
    platform3.x = 400;
    platform3.y = 400;
    // Añadimos la plataforma al escenario
    this.#pixiApp.stage.addChild(platform3);

    // Guardamos las plataformas en un array
    // para poder comprobar la colisión con el héroe
    // en el método update()
    this.#platforms.push(platform1);
    this.#platforms.push(platform2);
    this.#platforms.push(platform3);
  }

  update(): void {
    // Guardamos la posición anterior del héroe
    // para poder restaurarla si colisiona con la plataforma
    const prevPoint = {
      x: this.#hero.x,
      y: this.#hero.y,
    };

    // Update game logic here
    // por ejemplo, actualizamos la posición del héroe
    this.#hero.update();

    for (let i = 0; i < this.#platforms.length; i++) {
      // Comprobamos si el héroe colisiona con la plataforma
      if (this.isCheckAABB(this.#hero, this.#platforms[i])) {
        // Si colisiona, establecemos la posición del héroe
        // en la parte superior de la plataforma
        this.#hero.y = prevPoint.y;
      }
    }
  }

  // Métodos adicionales
  /*
  El método isCheckAABB() parece estar verificando si dos
  entidadees (en este caso, problamente objetos gráficos
  o sprites)
  
  //* Funcionamiento:

  - entity.x < area.x + area.width: Compara si el lado derecho 
  de la entidad está a la izquierda del lado derecho del área.
  
  - entity.x + entity.width > area.x: Compara si el lado izquierdo 
  de la entidad está a la derecha del lado izquierdo del área.
  
  - entity.y < area.y + area.height: Compara si el borde inferior 
  de la entidad está por encima del borde inferior del área.
  
  - entity.y + entity.height > area.y: Compara si el borde superior 
  de la entidad está por debajo del borde superior del área.
  */
  isCheckAABB(entity: any, area: any): boolean {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    );
  }
}
