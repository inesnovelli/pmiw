/* Ines Novelli y Tatiana Abril Acevedo Escobar
 Comision 3
 tpfinalparte1
 Octubre 2026
 
 
 video explicativo de Ines Novelli: https://youtu.be/EBJezQJ-6Ko?si=xVh0AJALNOabkYZz */

// Estados
const ESTADO_INICIO      = 0;
const ESTADO_HISTORIA    = 1;
const ESTADO_FINAL       = 2;
const ESTADO_FINAL_FINAL = 3;

let estadoActual = ESTADO_INICIO;
let nodoActual   = 0;
let finalActual  = 0;

let sonidoAmbiente; 

// Arreglos
let nodos;
let finales;
let imagenes;
let caminoRecorrido = [];

// Botones
let btnA, btnB, btnInicio, btnReinicio;

// Creditos
let yCreditos = 450;
let velocidadCreditos = 0.7;
let lineasCreditos = [
  "CREDITOS",
  "",
  "Historia Interactiva:",
  "Kati y Cristofer el Gato Perdido",
  "",
  "Alumnas:",
  "Ines Novelli",
  "Tatiana Abril Acevedo Escobar",
  "",
  "Comision: 3",
  "Año: 2026",
  "",
  "Imagenes generadas con IA",
  "",
  "Gracias por jugar!"
];

// Animacion de la pantalla de inicio
let estrellaX = new Array(60);
let estrellaY = new Array(60);
let estrellaVel = new Array(60);
let estrellaTam = new Array(60);


function preload() {
  cargarImagenes();
  
  sonidoAmbiente = loadSound("data/sonidoAmbiente.mp3"); 
  
}

// SetUp
function setup() {
  createCanvas(800, 450);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < estrellaX.length; i++) {
    estrellaX[i] = random(width);
    estrellaY[i] = random(height);
    estrellaVel[i] = random(0.2, 0.8);
    estrellaTam[i] = random(1.5, 3.5);
  }

  cargarNodos();
  cargarFinales();
  crearBotones();
}

// Draw
function draw() {
  background(20, 10, 30);

  if      (estadoActual === ESTADO_INICIO)      dibujarInicio();
  else if (estadoActual === ESTADO_HISTORIA)    dibujarNodo();
  else if (estadoActual === ESTADO_FINAL)       dibujarFinal();
  else if (estadoActual === ESTADO_FINAL_FINAL) dibujarFinalFinal();
}

// Cargar imagenes
function cargarImagenes() {
  imagenes = new Array(19);

  // Nodos
  imagenes[0]  = loadImage("data/nodo0.jpeg");
  imagenes[1]  = loadImage("data/nodo1.jpeg");
  imagenes[2]  = loadImage("data/nodo2.jpeg");
  imagenes[3]  = loadImage("data/nodo3.jpeg");
  imagenes[4]  = loadImage("data/nodo4.jpeg");
  imagenes[5]  = loadImage("data/nodo5.jpeg");
  imagenes[6]  = loadImage("data/nodo6.jpeg");
  imagenes[7]  = loadImage("data/nodo7.jpeg");
  imagenes[8]  = loadImage("data/nodo8.jpeg");
  imagenes[9]  = loadImage("data/nodo9.jpeg");
  imagenes[16] = loadImage("data/nodo16.jpeg");

  // Finales
  imagenes[10] = loadImage("data/final10.jpeg");
  imagenes[11] = loadImage("data/final11.jpeg");
  imagenes[12] = loadImage("data/final12.jpeg");
  imagenes[13] = loadImage("data/final13.jpeg");
  imagenes[14] = loadImage("data/final14.jpeg");
  imagenes[15] = loadImage("data/final15.jpeg");
  imagenes[17] = loadImage("data/final17.jpeg");
  imagenes[18] = loadImage("data/final18.jpeg");
}

// Cargar nodos
function cargarNodos() {
  nodos = new Array(11);

  nodos[0] = new Nodo(0,
    "La amiga de Kati le encarga cuidar a su gato justo cuando ella hacia una pocion.",
    "A) Kati acepta encantada mientras revuelve su pocion",
    "B) Kati acepta poniendo toda \n su concentracion en su pocion",
    1, false, 2, false, false);

  nodos[1] = new Nodo(1,
    "Kati acepta encantada mientras revuelve su pocion.",
    "A) Se le quema la pocion",
    "B) Le sale mal un hechizo de levitacion",
    3, false, 4, false, false);

  nodos[2] = new Nodo(2,
    "Kati se pone a leer la receta y se da cuenta de que le falta un ingrediente!",
    "", "", 5, false, -1, false, true);

  nodos[3] = new Nodo(3,
    "La pocion se quema llenando la casa de humo.",
    "", "", 6, false, -1, false, true);

  nodos[4] = new Nodo(4,
    "El hechizo de levitacion que estaba preparando le sale mal y la caldera explota!",
    "", "", 7, false, -1, false, true);

  nodos[5] = new Nodo(5,
    "Kati se pone a leer la receta y se da cuenta de que le falta un ingrediente!",
    "A) Salir a comprar el ingrediente a la tienda de pociones",
    "B) Pedir un delivery magico",
    8, false, 9, false, false);

  nodos[6] = new Nodo(6,
    "La pocion se quema y la casa se llena de humo. Kati decide abrir la ventana. Cristofer ve la oportunidad y salta hacia afuera.",
    "A) Salir a buscarlo",
    "B) Hacer un hechizo para pedir ayuda",
    10, true, 11, true, false);

  nodos[7] = new Nodo(7,
    "La caldera explota y rompe la ventana. En un descuido de Kati el gatito Cristofer salta por la ventana.",
    "A) Salir a buscar a Cristofer de inmediato",
    "B) Limpiar el desorden que provoco y \n luego salir a buscar a Cristofer",
    12, true, 13, true, false);

  nodos[8] = new Nodo(8,
    "Kati sale a comprar el ingrediente que le falta y sin darse cuenta Cristofer se le escabulle entre los pies hacia afuera.",
    "A) Buscarlo por la tienda de pociones",
    "B) Llamarlo con un juguete para atraerlo",
    14, true, 15, true, false);

  nodos[9] = new Nodo(9,
    "Kati llama por telefono al delivery magico.",
    "", "", 16, false, -1, false, true);

  nodos[10] = new Nodo(16,
    "Kati le abre la puerta al delivery magico y sin darse cuenta Cristofer se le escabulle entre los pies hacia afuera.",
    "A) Salir a correr al delivery",
    "B) Buscarlo por el jardin de la casa",
    17, true, 18, true, false);
}

// Cargar Finales
function cargarFinales() {
  finales = new Array(8);

  finales[0] = new Nodo(10,
    "FINAL: Magia Brillante - El vecino encerro al gatito en una jaula, pero cuando vio que este cambiaba de color lo libera despues de acariciarlo.",
    "", "", -1, false, -1, false, false);

  finales[1] = new Nodo(11,
    "FINAL: Hechizo de ayuda -Kati lanza un hechizo de ayuda que falla. El hechizo atrajo a todos los gatos del vecindario, y ahi en el medio de todos ellos estaba Cristofer comiendo un pescado.",
    "", "", -1, false, -1, false, false);

  finales[2] = new Nodo(12,
    "FINAL: Ups - Kati se demora limpiando y cuando abre la puerta esta su amiga con el gatito en brazos. ",
    "", "", -1, false, -1, false, false);

  finales[3] = new Nodo(13,
    "FINAL: Jardin Magico - Kati se tropieza con una calabaza y Cristofer se le posa en su cabeza.",
    "", "", -1, false, -1, false, false);

  finales[4] = new Nodo(14,
    "FINAL: Gatito Jugueton - Kati lo busca por la tienda de pociones, hasta que lo encuentra dentro de un frasco jugando con un corcho.",
    "", "", -1, false, -1, false, false);

  finales[5] = new Nodo(15,
    "FINAL: Gatito Travieso - Kati sale a buscarlo y lo encuentra sentadito en el buzon.",
    "", "", -1, false, -1, false, false);

  finales[6] = new Nodo(17,
    "FINAL: Aventura en Moto - Kati y su amiga salen a buscar al gato en moto.",
    "", "", -1, false, -1, false, false);

  finales[7] = new Nodo(18,
    "FINAL: Noche Estrellada - Kati busca al gatito entre las flores de su jardin y Cristofer aparece dormido bajo las estrellas.",
    "", "", -1, false, -1, false, false);
}

// Botones
function crearBotones() {
  btnA        = new Boton( 40, 375, 340, 50);
  btnB        = new Boton(420, 375, 340, 50);
  btnInicio   = new Boton(300, 300, 200, 55);
  btnReinicio = new Boton(300, 380, 200, 50);
}

// Pantalla inicio
function dibujarInicio() {
  for (let i = 0; i < height; i++) {
    stroke(lerpColor(color(70, 25, 90), color(15, 8, 35), i / height));
    line(0, i, width, i);
  }
  noStroke();

  for (let i = 0; i < estrellaX.length; i++) {
    estrellaY[i] += estrellaVel[i];
    if (estrellaY[i] > height) {
      estrellaY[i] = 0;
      estrellaX[i] = random(width);
    }
    let brillo = 150 + 105 * sin(millis() * 0.003 + i);
    fill(255, 240, 200, brillo);
    ellipse(estrellaX[i], estrellaY[i], estrellaTam[i], estrellaTam[i]);
  }

  for (let r = 90; r > 55; r -= 5) {
    fill(255, 240, 200, 8);
    ellipse(680, 90, r, r);
  }
  fill(255, 245, 210);
  ellipse(680, 90, 60, 60);
  fill(55, 20, 70);
  ellipse(695, 82, 55, 55);

  // Silueta gato
  fill(15, 8, 25);
  ellipse(140, 400, 90, 45);
  ellipse(180, 380, 45, 45);
  triangle(165, 365, 172, 345, 182, 362);
  triangle(185, 362, 195, 345, 202, 365);
  noFill();
  stroke(15, 8, 25);
  strokeWeight(6);
  bezier(95, 395, 70, 380, 70, 350, 90, 345);
  noStroke();

  // Titulo
  let glow = 200 + 55 * sin(millis() * 0.004);
  fill(0, 0, 0, 150);
  textSize(60);
  text("KATI Y EL GATO PERDIDO", width/2 + 2, 112);

  fill(255, 105, 180, glow);
  text("KATI Y EL GATO PERDIDO", width/2, 110);

  fill(220, 190, 255);
  textSize(30);
  text("Una aventura magica llena de decisiones", width/2, 155);

  fill(180, 160, 210);
  textSize(16);
  text("ELEGI CON CUIDADO: CADA DECISION CAMBIA EL FINAL", width/2, 250);

  dibujarBoton(btnInicio, "INICIAR HISTORIA", color(180, 80, 220));
}

// Dibujar Nodos
function dibujarNodo() {
  let n = buscarNodoPorId(nodoActual);
  if (n === null) return;

  if (imagenes[n.id] !== null && imagenes[n.id].width > 0) {
    image(imagenes[n.id], 0, 0, width, 350);
  } else {
    fill(60, 30, 80);
    rect(0, 0, width, 350);
    fill(255);
    textSize(14);
    text("(falta imagen nodo" + n.id + ".jpeg)", width/2, 175);
  }

  fill(0, 0, 0, 220);
  noStroke();
  rect(20, 348, 760, 24, 5);

  fill(255);
  textSize(12);
  text(n.texto, 30, 354, width - 60, 20);

  if (n.tocarParaAvanzar) {
    let pulso = 200 + 55 * sin(millis() * 0.006);
    fill(255, 105, 180, pulso);
    textSize(14);
    text(">> Toca la pantalla para continuar <<", width/2, 400);
  } else {
    dibujarBoton(btnA, n.opcionA, color(200, 100, 200));
    dibujarBoton(btnB, n.opcionB, color(200, 100, 200));
  }
}

// Dibujar Final
function dibujarFinal() {
  let n = buscarFinalPorId(finalActual);
  if (n === null) return;

  if (imagenes[n.id] !== null && imagenes[n.id].width > 0) {
    image(imagenes[n.id], 0, 0, width, height);
  } else {
    fill(60, 30, 80);
    rect(0, 0, width, height);
    fill(255);
    textSize(14);
    text("(falta imagen final" + n.id + ".jpeg)", width/2, height/2);
  }

  fill(0, 0, 0, 170);
  noStroke();
  rect(40, height - 105, width - 80, 70, 10);

  fill(255, 230, 255);
  textSize(15);
  text(n.texto, 60, height - 100, width - 120, 55);

  let pulso = 200 + 55 * sin(millis() * 0.006);
  fill(255, 105, 180, pulso);
  textSize(12);
  text(">> Toca la pantalla para continuar <<", width/2, height - 15);
}

// Pantalla final
function dibujarFinalFinal() {
  for (let i = 0; i < height; i++) {
    stroke(lerpColor(color(50, 20, 70), color(10, 5, 25), i / height));
    line(0, i, width, i);
  }
  noStroke();

  for (let i = 0; i < estrellaX.length; i++) {
    let brillo = 130 + 125 * sin(millis() * 0.003 + i);
    fill(255, 240, 200, brillo);
    ellipse(estrellaX[i], estrellaY[i], estrellaTam[i], estrellaTam[i]);
  }

  for (let r = 100; r > 60; r -= 5) {
    fill(255, 240, 200, 6);
    ellipse(120, 90, r, r);
  }
  fill(255, 245, 210);
  ellipse(120, 90, 65, 65);
  fill(40, 15, 55);
  ellipse(135, 82, 60, 60);

  // Creditos animados
  yCreditos -= velocidadCreditos;

  textSize(20);
  for (let i = 0; i < lineasCreditos.length; i++) {
    let yLinea = yCreditos + i * 28;
    let alpha = constrain(map(yLinea, -50, 200, 0, 255), 0, 255);
    fill(255, alpha);
    text(lineasCreditos[i], width/2, yLinea);
  }

  if (yCreditos < -lineasCreditos.length * 28) {
    yCreditos = height;
  }

  dibujarGatoAnimado();

  fill(0, 0, 0, 170);
  noStroke();
  rect(290, 395, 220, 45, 10);

  dibujarBoton(btnReinicio, "VOLVER AL INICIO", color(180, 80, 220));
}

// Gatito animado
function dibujarGatoAnimado() {
  let t = millis() * 0.001;

  let x = width/2 + 250 * sin(t * 0.5);
  let y = 55 + 6 * sin(t * 4);

  let patas = 5 * sin(t * 8);

  noStroke();
  fill(0, 0, 0, 80);
  ellipse(x, y + 35, 70, 10);

  noFill();
  stroke(35, 20, 50);
  strokeWeight(7);
  bezier(
    x - 28, y + 4,
    x - 50, y - 8 + 5 * sin(t * 3),
    x - 65, y - 25 + 8 * sin(t * 3),
    x - 50, y - 35 + 8 * sin(t * 3)
  );
  noStroke();

  fill(35, 20, 50);
  ellipse(x, y, 55, 36);

  ellipse(x - 16, y + 16 + patas, 11, 7);
  ellipse(x - 4,  y + 18 - patas, 11, 7);
  ellipse(x + 8,  y + 16 + patas, 11, 7);
  ellipse(x + 18, y + 18 - patas, 11, 7);

  ellipse(x + 32, y - 6, 34, 34);

  triangle(x + 18, y - 22, x + 24, y - 40, x + 33, y - 24);
  triangle(x + 37, y - 24, x + 46, y - 40, x + 50, y - 20);

  let parpadeo = sin(millis() * 0.005) > 0.9 ? 1 : 4;
  fill(255, 240, 100);
  ellipse(x + 27, y - 8, parpadeo, parpadeo);
  ellipse(x + 38, y - 8, parpadeo, parpadeo);

  stroke(200, 200, 200);
  strokeWeight(1);
  line(x + 42, y - 2, x + 54, y - 5);
  line(x + 42, y,     x + 54, y + 1);
  line(x + 42, y + 2, x + 54, y + 5);
  noStroke();
}

// Dibujar boton
function dibujarBoton(b, etiqueta, colBase) {
  let hover = b.contiene(mouseX, mouseY);

  fill(0, 0, 0, 100);
  noStroke();
  rect(b.x + 3, b.y + 3, b.w, b.h, 10);

  fill(hover ? color(255, 150, 220) : colBase);
  stroke(255);
  strokeWeight(2);
  rect(b.x, b.y, b.w, b.h, 10);
  noStroke();

  fill(255);
  textSize(13);
  textAlign(CENTER, TOP);

  if (etiqueta.indexOf("\n") !== -1) {
    let partes = etiqueta.split("\n");
    let lineHeight = 15;
    let totalAlto = partes.length * lineHeight;
    let yInicio = b.y + (b.h - totalAlto) / 2;  

    for (let i = 0; i < partes.length; i++) {
      text(partes[i], b.x + b.w/2, yInicio + i * lineHeight);
    }
  } else {
    textAlign(CENTER, CENTER);
    text(etiqueta, b.x + b.w/2, b.y + b.h/2);
  }

  textAlign(CENTER, CENTER);
}

// Busqueda 
function buscarNodoPorId(id) {
  for (let i = 0; i < nodos.length; i++) {
    if (nodos[i] !== null && nodos[i].id === id) return nodos[i];
  }
  return null;
}

function buscarFinalPorId(id) {
  for (let i = 0; i < finales.length; i++) {
    if (finales[i] !== null && finales[i].id === id) return finales[i];
  }
  return null;
}

// Logica
function elegirOpcion(cual) {
  let n = buscarNodoPorId(nodoActual);
  if (n === null) return;

  let siguiente;
  let vaAFinal;

  if (cual === 0) {
    siguiente = n.siguienteA;
    vaAFinal  = n.aEsFinal;
  } else {
    siguiente = n.siguienteB;
    vaAFinal  = n.bEsFinal;
  }

  caminoRecorrido.push("Nodo " + nodoActual + " -> " + (cual === 0 ? "A" : "B"));

  if (vaAFinal) {
    finalActual = siguiente;
    estadoActual = ESTADO_FINAL;
  } else {
    nodoActual = siguiente;
  }
}

function avanzarNodo() {
  let n = buscarNodoPorId(nodoActual);
  if (n === null) return;

  if (!n.tocarParaAvanzar) return;

  caminoRecorrido.push("Nodo " + nodoActual + " -> continuar");

  let siguiente = n.siguienteA;

  if (n.aEsFinal) {
    finalActual = siguiente;
    estadoActual = ESTADO_FINAL;
  } else {
    nodoActual = siguiente;
  }
}

function irAInicio() {
  nodoActual = 0;
  finalActual = 0;
  caminoRecorrido = [];
  yCreditos = height;
  estadoActual = ESTADO_INICIO;
}

// mousePressed
function mousePressed() {
  if (
    sonidoAmbiente &&
    sonidoAmbiente.isLoaded() &&
    !sonidoAmbiente.isPlaying()
  ) {
    userStartAudio(); 
    sonidoAmbiente.loop();
    sonidoAmbiente.setVolume(0.1);
  }

  if (estadoActual === ESTADO_INICIO) {
    if (btnInicio.contiene(mouseX, mouseY)) {
      nodoActual = 0;
      estadoActual = ESTADO_HISTORIA;
    }
  } else if (estadoActual === ESTADO_HISTORIA) {
    let n = buscarNodoPorId(nodoActual);

    if (n !== null) {
      if (n.tocarParaAvanzar) {
        avanzarNodo();
      } else {
        if (btnA.contiene(mouseX, mouseY)) {
          elegirOpcion(0);
        } else if (btnB.contiene(mouseX, mouseY)) {
          elegirOpcion(1);
        }
      }
    }
  } else if (estadoActual === ESTADO_FINAL) {
    yCreditos = height;
    estadoActual = ESTADO_FINAL_FINAL;
  } else if (estadoActual === ESTADO_FINAL_FINAL) {
    if (btnReinicio.contiene(mouseX, mouseY)) {
      irAInicio();
    }
  }
}

// Clases
class Nodo {
  constructor(id, texto, oA, oB, sA, aF, sB, bF, tocar) {
    this.id = id;
    this.texto = texto;
    this.opcionA = oA;
    this.opcionB = oB;
    this.siguienteA = sA;
    this.aEsFinal = aF;
    this.siguienteB = sB;
    this.bEsFinal = bF;
    this.tocarParaAvanzar = tocar;
  }
}

class Boton {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  contiene(mx, my) {
    return mx >= this.x && mx <= this.x + this.w && my >= this.y && my <= this.y + this.h;
  }
}
