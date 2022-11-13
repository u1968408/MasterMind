const CODE_LENGTH = 4;
const MAX_TRIES = 10;

var table;

var puntoBlanco;
var puntoRojo;
var puntoVacio;

var code;
var intentosActuales;
var puntosRonda;


window.onload = function(){

    table = document.getElementById("tablaJuego");

    puntoBlanco = document.createElement('img');
    puntoBlanco.src = "../resources/WhiteDot16.png";

    puntoRojo = document.createElement('img');
    puntoRojo.src = "../resources/RedDot16.png";

    puntoVacio = document.createElement('img');
    puntoVacio.src = "../resources/BlankDot16.png";

    cells = [];
    valores = [];
    code = [];
    intentosActuales = 0;

    // Crear codi aleatori
    var tNumeros = [0,1,2,3,4,5,6,7,8,9];
    for (var i = 0; i < CODE_LENGTH; i++){
        var pos = Math.floor(Math.random() * tNumeros.length);
        code[i] = tNumeros[pos];
        tNumeros = arrayRemove(tNumeros, tNumeros[pos]);
    }

};

/**
 * Inserta el codigo del input "code" en la tabla y comprueba la derrota o la victoria.
 */
function insertar_codigo() {
    puntosRonda = 0;

    let codeD = document.getElementById("code");

    // Guardar valores actuales
    for (var i = 0; i < CODE_LENGTH; i++) {
        if (codeD.value[i] !== undefined){
            valores[i] = codeD.value[i];
        }
        else valores[i] = 'x';
    }

    // Insertar en la tabla
    var row = table.insertRow(-1);
    for (var i = 0; i < CODE_LENGTH; i++) {
        cells[i] = row.insertCell(i);
        cells[i].innerHTML = valores[i];
    }
    for (var i = CODE_LENGTH; i < CODE_LENGTH*2; i++) {
        // Comprovar numero
        puntoActual = codigoCorrecto(i-CODE_LENGTH, valores[i-CODE_LENGTH]);
        // Insertar
        cells[i] = row.insertCell(i);
        cells[i].innerHTML = puntoActual.outerHTML;
    }
    // Añadir el intento
    intentosActuales++;
    // Comprovar victoria
    if(puntosRonda >= CODE_LENGTH) {
        delay(1000).then(() =>exit());
    }
    // Comprovar derrota
    if (intentosActuales >= MAX_TRIES) {
        delay(1000).then(() =>loadPage("https://www.youtube.com/watch?v=2Vvz-jJAEKw"));
    }
}

/**
 * Comprueba si el numero recibido en una posicion especifica es correcto,
 * correcto pero no en la posicion esperada o incorrecto. Además suma puntos a la ronda,
 * si es correcta, para poder comprovar la victoria.
 * @param {number} pos posicion del codigo a comprovar
 * @param {number} numero numero recibido por el jugador
 * @returns Tipo de punto a dibujar
 */
function codigoCorrecto(pos, numero) {
    if (code[pos] == numero) {
        puntosRonda++;
        return puntoRojo;
    }
    for (var i = 0; i < CODE_LENGTH; i++){
        if (code[i] == numero) return puntoBlanco;
    }
    return puntoVacio;
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });
}