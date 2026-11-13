class Personaje {
  constructor(arrArriba, arrAbajo, arrDerecha, arrIzquierda) {
    this.x = width / 2;
    this.y = height / 2;
    
    this.tam = 65; 
    this.vel = 4;

    this.caminarArriba = arrArriba;
    this.caminarAbajo = arrAbajo;
    this.caminarDerecha = arrDerecha;
    this.caminarIzquierda = arrIzquierda;

    this.mirando = "abajo";
  }

  mover() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.vel; 
      this.mirando = "izq"; 
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.tam) {
      this.x += this.vel; 
      this.mirando = "der";
    }
    if (keyIsDown(UP_ARROW) && this.y > 0) {
      this.y -= this.vel; 
      this.mirando = "arriba";
    }
    if (keyIsDown(DOWN_ARROW) && this.y < height - this.tam) {
      this.y += this.vel; 
      this.mirando = "abajo";
    }
  }

  dibujar() {
    let seMueve = keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW);
    let frameAnimado = floor(frameCount / 8);

    if (!seMueve) {
      if (this.mirando === "arriba") {
        image(this.caminarArriba[0], this.x, this.y, this.tam, this.tam);
      } else if (this.mirando === "abajo") {
        image(this.caminarAbajo[0], this.x, this.y, this.tam, this.tam);
      } else if (this.mirando === "der") {
        image(this.caminarDerecha[0], this.x, this.y, this.tam, this.tam);
      } else if (this.mirando === "izq") {
        image(this.caminarIzquierda[0], this.x, this.y, this.tam, this.tam);
      }
    } else {
      if (this.mirando === "arriba") {
        let i = frameAnimado % this.caminarArriba.length;
        image(this.caminarArriba[i], this.x, this.y, this.tam, this.tam);
      } else if (this.mirando === "abajo") {
        let i = frameAnimado % this.caminarAbajo.length;
        image(this.caminarAbajo[i], this.x, this.y, this.tam, this.tam);
      } else if (this.mirando === "der") {
        let i = frameAnimado % this.caminarDerecha.length;
        image(this.caminarDerecha[i], this.x, this.y, this.tam, this.tam);
      } else if (this.mirando === "izq") {
        let i = frameAnimado % this.caminarIzquierda.length;
        image(this.caminarIzquierda[i], this.x, this.y, this.tam, this.tam);
      }
    }
  }
}
