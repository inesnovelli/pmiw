class Pantalla {
  constructor() {
    this.botonAncho = 220; 
    this.botonAlto = 45;
    
    // Variables de créditos movidas aquí para ser más POO
    this.yCreditos = 450;
    this.velocidadCreditos = 1.5;
  }

  resetearCreditos() {
    this.yCreditos = 450; 
  }

  clicEnBoton(mx, my, botonX, botonY) {
    let izq = botonX - this.botonAncho / 2;
    let der = botonX + this.botonAncho / 2;
    let arr = botonY - this.botonAlto / 2;
    let aba = botonY + this.botonAlto / 2;
    
    return (mx > izq && mx < der && my > arr && my < aba); 
  }
  
  dibujarInicio() {
    image(inicio, 0, 0, width, height); 
    
    this.dibujarBoton("JUGAR", width / 2, 330);
  }

  dibujarPerdiste() {
    background(60, 30, 80); 
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("¡El tiempo se acabó!", width / 2, 150);
    textSize(20);
    text("No encontraste al gatito a tiempo...", width / 2, 200);
    
    this.dibujarBoton("VOLVER A INTENTAR", width / 2, 330); 
  }

  dibujarGanaste() {
    background(90, 60, 120); 
    
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("¡Felicidades! 🐱", width / 2, 150);
    textSize(20);
    text("¡Encontraste al gatito escondido!", width / 2, 200);
 
    this.dibujarBoton("SIGUIENTE", width / 2, 320); 
  }

  dibujarCreditos() {
    background(90, 60, 120);
    
    fill(255);
    textAlign(CENTER, CENTER);
    
    for (let i = 0; i < lineasCreditos.length; i++) {
      
      if (i === 0) {
        textSize(36); 
        fill(255, 200, 255); 
      } else if (i === 2 || i === 5) {
        textSize(24); 
        fill(255);
      } else {
        textSize(18); 
        fill(255);
      }
      
      text(lineasCreditos[i], width / 2, this.yCreditos + (i * 35));
    }
    
    this.yCreditos -= this.velocidadCreditos;
    
    let ultimaLineaY = this.yCreditos + ((lineasCreditos.length - 1) * 35);
    if (ultimaLineaY < -50) {
      this.yCreditos = -50 - ((lineasCreditos.length - 1) * 35); 
    }

    this.dibujarBoton("VOLVER AL INICIO", width / 2, 360);
  }

  dibujarBoton(textoBoton, posX, posY) {
    fill(200, 150, 255); 
    stroke(100, 50, 150);
    strokeWeight(3);
    
    rectMode(CENTER);
    rect(posX, posY, this.botonAncho, this.botonAlto, 10);
    
    noStroke();
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(textoBoton, posX, posY);
    
    rectMode(CORNER);
    strokeWeight(1);
  }
}
