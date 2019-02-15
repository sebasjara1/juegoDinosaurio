// Detectar cuando se preciona la barra espaciadora
document.addEventListener("keydown", (event) => {
    if (event.keyCode == 32) {
        console.log("salta");
        if (nivel.muerto == false){
            saltar();
        }else{
            revivir();
        }
    }
});


var imgRex;

function cargarImagenes() {
    imgRex = new Image();

    imgRex.src = 'img/rex.png';
}

var ancho = 602;
var alto = 300;

var canvas, ctx;

function inicializa() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    cargarImagenes(); 
}

// Al redefinir las dimenciones del canvas se borra su contenido
function borrarCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}

var suelo = 200;
var trex = {
    y: suelo,
    vy: 0,
    gravedad: 2,
    salto: 20,
    vymax: 9,
    saltando: false
};
var cactus = {
    x: ancho + 40,
    y: suelo,

};
var nube = {
    x: ancho + 50,
    y: 100,
    velocidad: 1
};
var nivel = {
    velocidad: 9,
    puntuacion: 0,
    muerto: false
};
var suelog = {
    x: 0,
    y: suelo + 35,
}

// ------------- Lógica ---------------------

function gravedad() {
    if (trex.saltando == true) {
        if(trex.y - trex.vy - trex.gravedad > suelo){
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        }else{
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;
        }
    } 
}

function saltar(){
    trex.saltando = true;
    trex.vy = trex.salto;
}

function movimientoCactus(){
    if (cactus.x < -40) {
        cactus.x = ancho + 40;
        nivel.puntuacion ++;
    } else {
        cactus.x -= nivel.velocidad;
    }
}

function movimeintoNube(){
    if (nube.x < -50) {
        nube.x = ancho + 50;
    } else {
        nube.x -= nube.velocidad;
    }
}

function movimientoSuelo(){
    if(suelog.x > ancho){
        suelog.x = 0;
    }else{
        suelog.x += nivel.velocidad;
    }
}

function colision() {
    if (cactus.x >= 100 && cactus.x <= 140) {
        if(trex.y >= suelo){
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        } 
    }
}

function revivir(){
    nivel.velocidad = 9;
    nube.velocidad = 1;
    nivel.muerto = false;
    cactus.x = ancho + 40;
    nube.x = ancho + 50;
    nivel.puntuacion = 0;
}

function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = "#555555";
    ctx.fillText(nivel.puntuacion, 560, 50);

    if(nivel.muerto == true){
        ctx.font = "40px impact";
        ctx.fillText('GAME OVER', 200, 100);
    }
}

// ---------Dibujo-----------------------

function dibujarRex(){
    //ctx.drawImage(imgRex,0,0,1204,68,100,100,50,50);
    ctx.drawImage(imgRex,678,0,40,47,100,trex.y,40,47);
}

function dibujarCactus(){
    ctx.drawImage(imgRex,382,0,25,50,cactus.x,cactus.y,25,50);
}

function dibujarNube(){
    ctx.drawImage(imgRex,84,0,50,55,nube.x,nube.y,50,55);
}

function dibujarSuelo(){
    ctx.drawImage(imgRex,suelog.x,55,ancho,55,0,suelog.y,ancho, 55);
}

// ----------- Bucle principal ------------

var FPS = 30;

setInterval(()=>{
    principal();
}, 1000 / FPS);


function principal(){
    borrarCanvas();
    gravedad();   
    colision();
    movimientoCactus();
    movimeintoNube();
    movimientoSuelo();
    dibujarSuelo();
    dibujarRex();
    dibujarCactus();
    dibujarNube();
    puntuacion();
}