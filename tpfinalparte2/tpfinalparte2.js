/* INES NOVELLI VIDEO EXPLICATIVO:  https://youtu.be/V2nyD4mFS7w?feature=shared   */


let miJuego;

let inicio, creditos;
let fondo;

let frasco, frascoGatoEscondido, calabaza, calabazaGatoEscondido, sombrero, sombreroGatoEscondido;

let caminarArriba = [], caminarAbajo = [], caminarDerecha = [], caminarIzquierda = [];

let lineasCreditos = [
  "CREDITOS",
  "",
  "Video Juego Web:",
  "Kati y Cristofer el Gato Perdido",
  "",
  "Alumnas:",
  "Ines Novelli",
  "Tatiana Abril Acevedo Escobar",
  "",
  "Comision: 3",
  "Año: 2026",
  "",
  "Dibujos ilustrados por Tatiana Acevedo",
  "",
  "Imagenes del fondo generadas con IA",
  "",
  "Gracias por jugar!"
];

let musicaFondo; 

function preload() {
  inicio = loadImage("data/fondo-inicio.jpg");
  fondo = loadImage("data/fondo-juego.jpg");
  
  frasco = loadImage ("data/frasco.png");
  frascoGatoEscondido = loadImage ("data/frasco-con-gatito.png");
  calabaza = loadImage ("data/calabaza.png");
  calabazaGatoEscondido = loadImage ("data/calabaza-con-gatito.png");
  sombrero = loadImage ("data/sombrero.png");
  sombreroGatoEscondido = loadImage ("data/sombrero-con-gatito.png");
  
  for (let i = 0; i < 5; i++) {
    caminarArriba.push(loadImage("data/camina-arriba-" + i + ".png"));
    caminarAbajo.push(loadImage("data/camina-abajo-" + i + ".png"));
  }
  for (let i = 0; i < 4; i++) {
    caminarDerecha.push(loadImage("data/camina-derecha-" + i + ".png"));
    caminarIzquierda.push(loadImage("data/camina-izquierda-" + i + ".png"));
  }
  
  musicaFondo = loadSound("data/sonido.mp3");
}

function setup() {
  createCanvas(800, 400);
  miJuego = new Juego(caminarArriba, caminarAbajo, caminarDerecha, caminarIzquierda);
  
  if (musicaFondo) {
    musicaFondo.setLoop(true);
    musicaFondo.setVolume(1.0); 
  }
}

function draw() {
  miJuego.actualizar();
}

function mousePressed() {
  if (musicaFondo && !musicaFondo.isPlaying()) {
    musicaFondo.play();
  }
  
  miJuego.evaluarClic(mouseX, mouseY);
}
