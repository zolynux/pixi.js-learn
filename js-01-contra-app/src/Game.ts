import Hero from "./Entities/Hero";
import Platform from "./Entities/Platform";

export default class Game {
  // Creamos propiedades con #
  // para que sean propiedades privadas
  #pixiApp: any;
  #hero: any;
  #platforms: any = [];

  constructor(pixiApp: any) {
    this.#pixiApp = pixiApp;

    // Creamos un héroe
    this.#hero = new Hero();
    this.#hero.x = 100;
    this.#hero.y = 100;
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
      // Verifica si el héroe colisiona con la plataforma actual usando AABB (Axis-Aligned Bounding Box)
      if (!this.isCheckAABB(this.#hero, this.#platforms[i])) {
        // Si no hay colisión, continúa con la siguiente plataforma
        continue;
      }

      // Guarda la posición actual en Y del héroe
      const curry = this.#hero.y;
      // Restaura la posición anterior en Y del héroe
      this.#hero.y = prevPoint.y;
      // Verifica nuevamente si hay colisión con la plataforma actual
      if (!this.isCheckAABB(this.#hero, this.#platforms[i])) {
        this.#hero.stay();
        // Si no hay colisión, continúa con la siguiente plataforma
        continue;
      }

      // Restaura la posición en Y del héroe a su valor original
      this.#hero.y = curry;
      // Restaura la posición en X del héroe a su valor anterior
      this.#hero.x = prevPoint.x;
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
