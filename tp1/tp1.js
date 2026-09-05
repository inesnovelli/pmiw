// Ines Novelli. Comision 3. TP1

let imgCafetera, imgTaza;
let framesCafetera = [];
let framesTaza = [];
let estadoActual = "esperando";
let tiempoInicioEstado = 0;

let posXcafetera = 120;
let posYcafetera = 260;
let posXtaza = 550;
let posYtaza = 350;

const TAMAÑO_CAFETERA = 200;
const TAMAÑO_TAZA = 140;

let anchoFrameCafetera = 0;
let altoFrameCafetera = 0;
let proporcionCafetera = 0;

let anchoFrameTaza = 0;
let altoFrameTaza = 0;
let proporcionTaza = 0;

let direccionCaminando = 1;
let posicionInicialX = 120;

let botonX = 50;
let botonY = 130;
let botonAncho = 180;
let botonAlto = 50;

// momentos de la cafetera
const MOMENTOS = {
    QUIETA: 0,
    PATA_INICIO: 1,
    PATA_FIN: 4,
    CAMINANDO: 5,
    INCLINADA: 6,
    GOTA: 7,
    CHORRITO: 8,
    CHORRO: 9
};

// estados de ánimo de la taza
const ANIMO_TAZA = {
    TRISTE: 0,
    FELIZ: 1,
    MUY_FELIZ: 2
};

function preload() {
    imgCafetera = loadImage("data/spritesheetcafetera.png");
    imgTaza = loadImage("data/spritesheettaza.png");
}

function setup() {
    createCanvas(800, 600);
    imageMode(CORNER);
    
    anchoFrameCafetera = imgCafetera.width / 11;
    altoFrameCafetera = imgCafetera.height;
    proporcionCafetera = anchoFrameCafetera / altoFrameCafetera;
    
    console.log("CAFETERA:");
    console.log("  Frame real:", anchoFrameCafetera, "x", altoFrameCafetera);
    console.log("  Proporción:", proporcionCafetera);
    
    for (let i = 0; i < 11; i++) {
        framesCafetera[i] = imgCafetera.get(
            i * anchoFrameCafetera,
            0,
            anchoFrameCafetera,
            altoFrameCafetera
        );
    }
    
    anchoFrameTaza = imgTaza.width / 3;
    altoFrameTaza = imgTaza.height;
    proporcionTaza = anchoFrameTaza / altoFrameTaza;
    
    console.log("TAZA:");
    console.log("  Frame real:", anchoFrameTaza, "x", altoFrameTaza);
    console.log("  Proporción:", proporcionTaza);
    
    for (let i = 0; i < 3; i++) {
        framesTaza[i] = imgTaza.get(
            i * anchoFrameTaza,
            0,
            anchoFrameTaza,
            altoFrameTaza
        );
    }
    
    tiempoInicioEstado = millis();
}

// función que retorna un valor

function calcularCentro(pos1, pos2) {
    return (pos1 + pos2) / 2;
}


function mostrarCafetera(frame, x, y, tamaño) {
    let alto = tamaño / proporcionCafetera;
    image(frame, x, y, tamaño, alto);
}

function mostrarTaza(frame, x, y, tamaño) {
    let alto = tamaño / proporcionTaza;
    image(frame, x, y, tamaño, alto);
}

function mostrarCafe(frame, x, y, tamaño) {
    let alto = tamaño / proporcionCafetera;
    image(frame, x, y, tamaño, alto);
}


function draw() {
    background(195, 215, 195);
    dibujarFondo();
    
    noStroke();
    // sombra de la cafetera
    fill(0, 0, 0, 20);
    ellipse(posXcafetera + TAMAÑO_CAFETERA/2, posYcafetera + TAMAÑO_CAFETERA - 5, TAMAÑO_CAFETERA * 0.5, 12);
    // sombra de la taza
    fill(0, 0, 0, 18);
    ellipse(posXtaza + TAMAÑO_TAZA/2, posYtaza + TAMAÑO_TAZA - 5, TAMAÑO_TAZA * 0.4, 10);
    
    let tiempoPasado = millis() - tiempoInicioEstado;
    
    // máquina de estados
    switch(estadoActual) {
        
        // esperando
        case "esperando":
            mostrarCafetera(framesCafetera[MOMENTOS.QUIETA], posXcafetera, posYcafetera, TAMAÑO_CAFETERA);
            mostrarTaza(framesTaza[ANIMO_TAZA.TRISTE], posXtaza, posYtaza, TAMAÑO_TAZA);
            
            if (tiempoPasado > 2000) {
                estadoActual = "salenPatas";
                tiempoInicioEstado = millis();
                direccionCaminando = 1;
            }
            break;
        
        // le salen las patitas
        case "salenPatas":
            let progresoPatas = tiempoPasado / 1000;
            let framePata = MOMENTOS.PATA_INICIO + floor(progresoPatas * 4);
            framePata = min(framePata, MOMENTOS.PATA_FIN);
            
            mostrarCafetera(framesCafetera[framePata], posXcafetera, posYcafetera, TAMAÑO_CAFETERA);
            mostrarTaza(framesTaza[ANIMO_TAZA.TRISTE], posXtaza, posYtaza, TAMAÑO_TAZA);
            
            if (tiempoPasado > 1000) {
                estadoActual = "caminandoAdelante";
                tiempoInicioEstado = millis();
            }
            break;
        
        // camina
        case "caminandoAdelante":
            posXcafetera += 1.8;
            
            let paso = floor((millis() - tiempoInicioEstado) / 150) % 2;
            let frameCaminando = paso === 0 ? MOMENTOS.CAMINANDO : MOMENTOS.QUIETA;
            
            mostrarCafetera(framesCafetera[frameCaminando], posXcafetera, posYcafetera, TAMAÑO_CAFETERA);
            mostrarTaza(framesTaza[ANIMO_TAZA.TRISTE], posXtaza, posYtaza, TAMAÑO_TAZA);
            
            if (posXcafetera >= 450) {
                estadoActual = "inclinada";
                tiempoInicioEstado = millis();
            }
            break;
        
        // se inclina
        case "inclinada":
            mostrarCafetera(framesCafetera[MOMENTOS.INCLINADA], posXcafetera, posYcafetera, TAMAÑO_CAFETERA);
            mostrarTaza(framesTaza[ANIMO_TAZA.FELIZ], posXtaza, posYtaza, TAMAÑO_TAZA);
            
            if (tiempoPasado > 1000) {
                estadoActual = "sirviendo";
                tiempoInicioEstado = millis();
            }
            break;
        
        // sirviendo el cafe
        case "sirviendo":
            mostrarCafetera(framesCafetera[MOMENTOS.INCLINADA], posXcafetera, posYcafetera, TAMAÑO_CAFETERA);
            
            let progresoCafe = tiempoPasado / 1200;
            let frameCafe;
            if (progresoCafe < 0.33) {
                frameCafe = MOMENTOS.GOTA;
            } else if (progresoCafe < 0.66) {
                frameCafe = MOMENTOS.CHORRITO;
            } else {
                frameCafe = MOMENTOS.CHORRO;
            }
            
            let cafeX = posXcafetera;
            let cafeY = posYcafetera;
            
            mostrarCafe(framesCafetera[frameCafe], cafeX, cafeY, TAMAÑO_CAFETERA);
            mostrarTaza(framesTaza[ANIMO_TAZA.FELIZ], posXtaza, posYtaza, TAMAÑO_TAZA);
            
            if (tiempoPasado > 1200) {
                estadoActual = "enderezando";
                tiempoInicioEstado = millis();
            }
            break;
        
        // la cafetera vuelve a su posición normal
        case "enderezando":
            mostrarCafetera(framesCafetera[MOMENTOS.QUIETA], posXcafetera, posYcafetera, TAMAÑO_CAFETERA);
            mostrarTaza(framesTaza[ANIMO_TAZA.MUY_FELIZ], posXtaza, posYtaza, TAMAÑO_TAZA);
            
            if (tiempoPasado > 1000) {
                estadoActual = "caminandoAtras";
                tiempoInicioEstado = millis();
            }
            break;
        
        // la cafetera camina hacia atras y vuelve a su posición inicial
        case "caminandoAtras":
            posXcafetera -= 1.8;
            
            let pasoAtras = floor((millis() - tiempoInicioEstado) / 150) % 2;
            let frameAtras = pasoAtras === 0 ? MOMENTOS.CAMINANDO : MOMENTOS.QUIETA;
            
            mostrarCafetera(framesCafetera[frameAtras], posXcafetera, posYcafetera, TAMAÑO_CAFETERA);
            mostrarTaza(framesTaza[ANIMO_TAZA.MUY_FELIZ], posXtaza, posYtaza, TAMAÑO_TAZA);
            
            if (posXcafetera <= posicionInicialX) {
                posXcafetera = posicionInicialX;
                estadoActual = "metiendoPatas";
                tiempoInicioEstado = millis();
            }
            break;
        
        // las patas desaparecen
        case "metiendoPatas":
            let progresoMetiendo = tiempoPasado / 1000;
            let frameMetiendo = MOMENTOS.PATA_FIN - floor(progresoMetiendo * 4);
            frameMetiendo = max(frameMetiendo, MOMENTOS.PATA_INICIO - 1);
            
            let frameFinal = frameMetiendo >= MOMENTOS.PATA_INICIO ? frameMetiendo : MOMENTOS.QUIETA;
            
            mostrarCafetera(framesCafetera[frameFinal], posXcafetera, posYcafetera, TAMAÑO_CAFETERA);
            mostrarTaza(framesTaza[ANIMO_TAZA.MUY_FELIZ], posXtaza, posYtaza, TAMAÑO_TAZA);
            
            if (tiempoPasado > 1000) {
                estadoActual = "terminado";
                tiempoInicioEstado = millis();
            }
            break;
        
        // terminado
        case "terminado":
            mostrarCafetera(framesCafetera[MOMENTOS.QUIETA], posXcafetera, posYcafetera, TAMAÑO_CAFETERA);
            mostrarTaza(framesTaza[ANIMO_TAZA.MUY_FELIZ], posXtaza, posYtaza, TAMAÑO_TAZA);
            
            // uso de la función que devuelve un valor
            let centroX = calcularCentro(posXcafetera, posXtaza);
            
            // texto cafe servido
            push();
            textFont("Georgia");
            textStyle(BOLD);
            textSize(48);
            fill(80, 60, 40);
            textAlign(LEFT);
            text("CAFÉ SERVIDO", 50, 100);
            pop();
            
            // botón de reiniciar
            
            botonX = 50;
            botonY = 130;
            
            // Sombra del botón
            noStroke();
            fill(0, 0, 0, 15);
            rect(botonX + 3, botonY + 3, botonAncho, botonAlto, 8);
            
            // Fondo del botón
            fill(220, 200, 175);
            stroke(180, 160, 130);
            strokeWeight(2);
            rect(botonX, botonY, botonAncho, botonAlto, 8);
            
           
            noStroke();
            fill(240, 225, 205, 80);
            rect(botonX + 5, botonY + 3, botonAncho - 10, botonAlto/2 - 5, 5);
            
            // Texto del botón
            push();
            textFont("Georgia");
            textStyle(BOLD);
            textSize(22);
            fill(80, 60, 40);
            textAlign(CENTER, CENTER);
            text("REINICIAR", botonX + botonAncho/2, botonY + botonAlto/2);
            pop();
            
            break;
    }
    
}

// Dibujo del fondo

function dibujarFondo() {
    fill(195, 215, 195);
    rect(0, 0, width, height);
    
    fill(210, 185, 155);
    rect(0, 480, width, 120);
    
    stroke(190, 165, 135);
    strokeWeight(1);
    for (let i = 0; i < width; i += 60) {
        line(i, 480, i, height);
    }
    stroke(190, 165, 135);
    strokeWeight(2);
    line(0, 485, width, 485);
    strokeWeight(1);
    
    fill(160, 130, 100);
    rect(0, 470, width, 15);
    fill(180, 150, 120);
    rect(0, 468, width, 5);
    
    fill(200, 175, 145);
    rect(0, 395, width, 50);
    
    fill(220, 195, 165);
    rect(0, 390, width, 10);
    
    fill(175, 150, 120);
    rect(0, 445, width, 5);
    
    stroke(185, 160, 130);
    strokeWeight(1);
    line(50, 400, 200, 400);
    line(300, 410, 500, 410);
    line(550, 398, 750, 398);
    line(100, 420, 350, 420);
    line(450, 425, 700, 425);
    strokeWeight(1);
    
    fill(180, 155, 125);
    rect(0, 450, width, 25);
    
    fill(160, 135, 105);
    rect(150, 450, 3, 25);
    rect(300, 450, 3, 25);
    rect(450, 450, 3, 25);
    rect(600, 450, 3, 25);
    rect(750, 450, 3, 25);
    
    fill(200, 180, 155);
    rect(70, 458, 30, 8, 3);
    rect(220, 458, 30, 8, 3);
    rect(370, 458, 30, 8, 3);
    rect(520, 458, 30, 8, 3);
    rect(670, 458, 30, 8, 3);
    
    
    fill(120, 190, 235);
    rect(380, 40, 310, 220);
    
    // Ventana
    // Pasto
    fill(155, 200, 145);
    rect(380, 200, 310, 60);
    
    // Colinas
    fill(175, 210, 160);
    noStroke();
    ellipse(400, 210, 120, 50);
    ellipse(550, 215, 180, 60);
    ellipse(680, 210, 100, 45);
    strokeWeight(1);
    
    // Caminito
    fill(210, 195, 165);
    rect(480, 210, 100, 50);
    fill(200, 185, 155);
    rect(500, 220, 60, 40);
    
    // Árbol
    fill(130, 170, 110);
    rect(410, 140, 18, 70);
    fill(100, 150, 80);
    ellipse(420, 130, 70, 60);
    ellipse(400, 135, 50, 45);
    ellipse(440, 135, 50, 45);
    
    // Arbusto
    fill(140, 190, 130);
    ellipse(670, 210, 50, 30);
    ellipse(690, 215, 40, 25);
    
    // Nubes
    fill(255, 255, 255, 190);
    noStroke();
    ellipse(440, 70, 55, 28);
    ellipse(470, 65, 45, 22);
    ellipse(500, 70, 50, 25);
    ellipse(580, 85, 40, 20);
    ellipse(610, 80, 45, 22);
    ellipse(640, 85, 35, 18);
    ellipse(510, 100, 30, 15);
    ellipse(530, 98, 25, 12);
    strokeWeight(1);
    
    // Sol
    fill(255, 240, 180, 200);
    ellipse(660, 70, 40, 40);
    noFill();
    stroke(255, 240, 180, 80);
    strokeWeight(2);
    for (let i = 0; i < 12; i++) {
        let angulo = i * PI / 6;
        let x1 = 660 + cos(angulo) * 25;
        let y1 = 70 + sin(angulo) * 25;
        let x2 = 660 + cos(angulo) * 40;
        let y2 = 70 + sin(angulo) * 40;
        line(x1, y1, x2, y2);
    }
    strokeWeight(1);
    
    noStroke();
    fill(248, 242, 235);
    rect(375, 35, 320, 10);           
    rect(375, 35, 10, 230);            
    rect(375, 255, 320, 10);           
    rect(685, 35, 10, 230);            
    
    // Sombra del marco
    fill(230, 220, 210);
    rect(375, 35, 320, 3);
    rect(375, 35, 3, 230);
    
    // Cruz de la ventana
    fill(248, 242, 235);
    rect(530, 35, 10, 230);          
    rect(380, 145, 310, 10);           
    
    // Detalles decorativos de la cruz
    fill(240, 234, 225);
    rect(528, 35, 14, 6);
    rect(528, 253, 14, 6);
    rect(380, 143, 310, 6);
    
   // Alacena
    fill(200, 175, 145);
    rect(30, 150, 250, 15);
    fill(180, 155, 125);
    rect(30, 165, 250, 5);
    
    fill(180, 155, 125);
    rect(30, 150, 8, 100);
    rect(272, 150, 8, 100);
    
    fill(180, 200, 220, 150);
    rect(55, 110, 30, 40);
    fill(200, 220, 240, 150);
    rect(58, 105, 24, 10);
    fill(160, 180, 200, 80);
    rect(60, 130, 20, 15);
    
    fill(180, 210, 180, 150);
    rect(100, 115, 25, 35);
    fill(200, 230, 200, 150);
    rect(103, 110, 19, 10);
    
    fill(210, 180, 130, 150);
    rect(140, 108, 28, 42);
    fill(230, 200, 150, 150);
    rect(143, 103, 22, 10);
    
    fill(210, 170, 170, 150);
    rect(183, 112, 22, 38);
    fill(230, 190, 190, 150);
    rect(186, 107, 16, 10);
    
    fill(200, 180, 200, 80);
    rect(220, 115, 25, 35);
    fill(180, 150, 200, 100);
    rect(223, 130, 19, 17);
    fill(210, 190, 210, 80);
    rect(223, 110, 19, 10);
    
    fill(240, 230, 210, 150);
    rect(58, 125, 24, 8);
    rect(103, 128, 19, 6);
    rect(145, 125, 22, 7);
    rect(187, 128, 16, 6);
    
    // Cuadrito
    fill(200, 180, 150);
    rect(720, 80, 60, 80);
    fill(220, 200, 170);
    rect(725, 85, 50, 70);
    fill(180, 200, 210);
    rect(725, 85, 50, 40);
    fill(160, 190, 150);
    rect(725, 125, 50, 30);
    fill(200, 180, 150);
    ellipse(750, 115, 15, 10);
    fill(80, 60, 40);
    rect(747, 120, 6, 15);
    fill(100, 80, 60);
    rect(743, 133, 14, 8);
    
    noFill();
    stroke(180, 160, 130);
    strokeWeight(2);
    rect(720, 80, 60, 80);
    strokeWeight(1);
    
   
}

// ============================================================
// REINICIAR CON CLIC EN EL BOTÓN
// ============================================================

function mousePressed() {
    // Si el estado es "terminado" y el mouse está dentro del botón
    if (estadoActual === "terminado") {
        if (mouseX >= botonX && mouseX <= botonX + botonAncho &&
            mouseY >= botonY && mouseY <= botonY + botonAlto) {
            // Reiniciar todo
            estadoActual = "esperando";
            posXcafetera = posicionInicialX;
            posYcafetera = 260;
            tiempoInicioEstado = millis();
        }
    }
}


function keyPressed() {
    if (key === 'r' || key === 'R') {
        estadoActual = "esperando";
        posXcafetera = posicionInicialX;
        posYcafetera = 260;
        tiempoInicioEstado = millis();
    }
}
