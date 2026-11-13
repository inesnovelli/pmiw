class Juego {
  constructor(arrArriba, arrAbajo, arrIzq, arrDer) {
    this.pantalla = new Pantalla();
    this.estado = "inicio";

    this.arrUp = arrArriba; 
    this.arrDown = arrAbajo; 
    this.arrL = arrIzq; 
    this.arrR = arrDer; 

    this.kati = null;
    this.escondites = [];
    
    this.tiempoLimite = 20; 
    
    this.tiempoEspera = 1; 
  }

  iniciarPartida() {
    this.kati = new Personaje(this.arrUp, this.arrDown, this.arrL, this.arrR);

    this.escondites = [];
    this.tiempoLimite = 30; 
    this.tiempoEspera = 0; // Reiniciamos el temporizador
    this.estado = "jugando";

    for (let i = 0; i < 6; i++) {
      let posX = random(50, width - 80);
      let posY = random(80, height - 80);
      this.escondites.push(new Escondite(posX, posY));
    }

    let indiceGanador = floor(random(this.escondites.length));
    this.escondites[indiceGanador].tieneGato = true;
  }

  actualizar() {
    if (this.estado === "inicio") {
      this.pantalla.dibujarInicio();
      
    } else if (this.estado === "perdio") {
      this.pantalla.dibujarPerdiste();
      
    } else if (this.estado === "gano") {
      this.pantalla.dibujarGanaste();
      
    } else if (this.estado === "creditos") {
      this.pantalla.dibujarCreditos();
      
    } else if (this.estado === "jugando" || this.estado === "transicionGano" || this.estado === "transicionPerdio") {
      
      // Siempre dibujamos el fondo y los objetos, sin importar si estamos en transición
      image(fondo, 0, 0, width, height);

      // Lógica del temporizador (solo si está jugando)
      if (this.estado === "jugando") {
        if (frameCount % 60 === 0 && this.tiempoLimite > 0) this.tiempoLimite--;
        
        if (this.tiempoLimite <= 0) {
          this.estado = "transicionPerdio";
          this.tiempoEspera = 90; // 1.5 segundos de espera (90 frames)
          
          // Hacemos que el gato salga aunque el jugador no lo haya encontrado
          for (let i = 0; i < this.escondites.length; i++) {
            if (this.escondites[i].tieneGato) {
              this.escondites[i].revisado = true;
              this.escondites[i].saliendo = true;
            }
          }
        }
      }

      this.kati.mover();

      // Dibujamos los escondites
      for (let i = 0; i < this.escondites.length; i++) {
        let objeto = this.escondites[i];
        objeto.dibujar();

        if (this.estado === "jugando") {
          let distanciaChoque = dist(this.kati.x + 25, this.kati.y + 25, objeto.x + 18, objeto.y + 18);

          if (!objeto.revisado && distanciaChoque < 55) {
            objeto.revisado = true; 
            
            if (objeto.tieneGato === true) {
              objeto.saliendo = true; // Activamos la animación de salida
              this.estado = "transicionGano";
              this.tiempoEspera = 90; // 1.5 segundos de espera para ver al gato salir
            }
          }
        }
      }

      this.kati.dibujar();

      if (this.estado === "transicionGano" || this.estado === "transicionPerdio") {
        this.tiempoEspera--;
        if (this.tiempoEspera <= 0) {
          this.estado = (this.estado === "transicionGano") ? "gano" : "perdio";
        }
      } else {
        // TEMPORIZADOR EN PANTALLA (solo se muestra si está jugando)
        fill(255);
        textSize(24);
        textAlign(LEFT, TOP);
        if (this.tiempoLimite <= 5) fill(255, 50, 50);
        text("Tiempo: " + this.tiempoLimite, 20, 20);
      }
    }
  }

  evaluarClic(mx, my) { 
    if (this.estado === "inicio") {
      if (this.pantalla.clicEnBoton(mx, my, width/2, 330)) this.iniciarPartida();
    } else if (this.estado === "perdio") {
      if (this.pantalla.clicEnBoton(mx, my, width/2, 330)) this.estado = "inicio";
    } else if (this.estado === "gano") {
      if (this.pantalla.clicEnBoton(mx, my, width/2, 320)) {
        this.estado = "creditos";
        this.pantalla.resetearCreditos(); 
      }
    } else if (this.estado === "creditos") {
      if (this.pantalla.clicEnBoton(mx, my, width/2, 360)) this.estado = "inicio";
    }
  }
}
