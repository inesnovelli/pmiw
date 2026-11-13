class Escondite {
  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;
    
    this.tam = 50; 

    this.tieneGato = false;
    this.revisado = false;
    
    this.saliendo = false;
    this.offsetY = 0; 

    this.tipo = random(["frasco", "calabaza", "sombrero"]);
  }

  dibujar() {
    let objetoSolo, objetoConGatoEscondido;

    if (this.tipo === "frasco") {
      objetoSolo = frasco;
      objetoConGatoEscondido = frascoGatoEscondido;
    } else if (this.tipo === "calabaza") {
      objetoSolo = calabaza;
      objetoConGatoEscondido = calabazaGatoEscondido;
    } else if (this.tipo === "sombrero") {
      objetoSolo = sombrero;
      objetoConGatoEscondido = sombreroGatoEscondido;
    }

    if (this.saliendo && this.offsetY > -20) {
      this.offsetY -= 0.5; 
    }

    if (this.revisado && this.tieneGato) {
      image(objetoConGatoEscondido, this.x, this.y + this.offsetY, this.tam, this.tam);
    } else {
      if (this.revisado) {
        tint(255, 150); 
        image(objetoSolo, this.x, this.y, this.tam, this.tam);
        noTint(); 
      } else {
        image(objetoSolo, this.x, this.y, this.tam, this.tam);
      }
    }
  }
}
