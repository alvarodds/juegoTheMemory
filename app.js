var intentos = 0;
var jugada1 = "";
var jugada2 = "";
var identificadorJ1 = "";
var identificadorJ2 = "";
var juegoOk = true;
var src = [];
var columnas;
var filas;
var totalCartas;
var aux = [];
var girarCartaOk = true;
var cont;
var iniciarContador = false;

//Modelo
var cartas = new Array({ src: "img/1.png", seleccion: false }, { src: "img/2.png", seleccion: false }, { src: "img/3.png", seleccion: false }, { src: "img/4.png", seleccion: false }, { src: "img/5.png", seleccion: false }, { src: "img/6.png", seleccion: false }, { src: "img/7.png", seleccion: false }, { src: "img/8.png", seleccion: false }, { src: "img/1.png", seleccion: false }, { src: "img/2.png", seleccion: false }, { src: "img/3.png", seleccion: false }, { src: "img/4.png", seleccion: false }, { src: "img/5.png", seleccion: false }, { src: "img/6.png", seleccion: false }, { src: "img/7.png", seleccion: false }, { src: "img/8.png", seleccion: false });

//Vista
window.setInterval(function contador() {
    if (iniciarContador) {
        var contador = document.getElementById("contador");
        contador.innerHTML = cont;
        cont++;
    }
}, 1000);

const showMenu = () => {
    // Crea un elemento <table> y un elemento <tbody>
    var div = document.getElementById("juego");
    var tabla = document.createElement("table");
    index = 0;

    // Crea las celdas
    for (var i = 0; i < filas; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");

        for (var j = 0; j < columnas; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var celda = document.createElement("td");
            celda.innerHTML = "<td class = tamanio-fila >";
            var img = document.createElement("img");
            img.setAttribute("src", 'img/reverso.png');
            img.setAttribute("id", index);
            img.setAttribute("class", "girarCarta");
            img.setAttribute("data-valor", aux[index]);

            //img.innerHTML = "<img src='//localhost/juegoCartas/img/reverso.png' id=" + i + " class=letra onclick=girarCarta() data-valor=" + src[i] + ">;"

            celda.appendChild(img);
            hilera.appendChild(celda);
            index++;
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tabla.appendChild(hilera);
    }
    // posiciona el <tbody> debajo del elemento <table>
    div.appendChild(tabla);
};

const showFinJuego = () => {
    return "GANASTE";
}

//Controlador
const indexControl = () => {
    columnasFilas();
    iniciarJuego();
    showMenu();
};

const iniciarJuego = () => {
    cont = 0;
    iniciarContador = true;
    // Obtener la referencia del elemento body
    borrarTablero();

    for (let i = 0; i < totalCartas / 2; i++) {
        aux.push(cartas[i].src);
    }

    for (let j = 8; j < 8 + (totalCartas / 2); j++) {
        aux.push(cartas[j].src);
    }

    aux.sort(function() { return Math.random() - 0.5 });

}

const columnasFilas = () => {
    columnas = document.getElementById("columnas").value;
    filas = document.getElementById("filas").value;
    totalCartas = columnas * filas;

    //hago desaparecer las columnas y filas
    var parrafos = document.getElementsByTagName('p');

    for (let i = 0; i < parrafos.length; i++) {
        parrafos[i].style.display = "none";
    }

    document.getElementById('iniciar').disabled = true;
}

const girarCarta = (ev) => {
    if (girarCartaOk && cartas[parseInt(ev.target.id)].seleccion != true) {
        jugada2 = ev.target.dataset.valor;
        identificadorJ2 = ev.target.id;


        if (jugada1 !== "") {
            girarCartaOk = false;
            console.log(identificadorJ1);
            console.log(identificadorJ2);
            //Compruebo si estan las cartas cogidas y son iguales
            if (jugada1 === jugada2 && identificadorJ1 !== identificadorJ2 && cartas[parseInt(identificadorJ2)].seleccion != true && cartas[parseInt(identificadorJ1)].seleccion != true) {

                cartas[parseInt(identificadorJ1)].seleccion = true;
                cartas[parseInt(identificadorJ2)].seleccion = true;

                darVuelta(identificadorJ1, jugada1, "green");
                darVuelta(identificadorJ2, jugada2, "green");
                vaciar();
                comprobar();
                girarCartaOk = true;
            } else if (identificadorJ1 !== identificadorJ2) {
                setTimeout(function() {
                    darVuelta(identificadorJ1, "img/reverso.png", "white")
                    darVuelta(identificadorJ2, "img/reverso.png", "white")
                    vaciar()
                }, 600);
                setTimeout(function() {
                    girarCartaOk = true;
                }, 600);


                darVuelta(identificadorJ2, jugada2);
            }

        } else if (jugada2 !== "valor") {
            //Aqui tengo una carta cogida
            if (!cartas[parseInt(identificadorJ2)].seleccion) {
                darVuelta(identificadorJ2, jugada2, "white");
                jugada1 = jugada2;
                identificadorJ1 = identificadorJ2;
            }
        }
    }
};

const borrarTablero = () => {
    document.getElementById("juego").innerHTML = "";
}

const resetearJuego = () => {
    cont = 0;
    src = [];

    for (let i = 0; i < totalCartas; i++) {
        var dato = document.getElementById(i.toString());
        src.push(dato.dataset.valor);
    }
    src.sort(function() { return Math.random() - 0.5 });

    for (var i = 0; i < totalCartas; i++) {
        cartas[i].seleccion = false;
        var carta = src[i];
        var dato = document.getElementById(i.toString());
        dato.dataset.valor = carta;
        darVuelta(i, "img/reverso.png", 'white');
    }

    girarCartaOk = true;
}

const vaciar = () => {
    jugada1 = "";
    jugada2 = "";

    identificadorJ1 = "";
    identificadorJ2 = "";
}

const darVuelta = (posicion, contenido, color) => {
    document.getElementById(posicion.toString()).style.backgroundColor = color;
    var dato = document.getElementById(posicion.toString());
    dato.src = contenido;
}

const comprobar = () => {
    var aciertos = 0;
    for (var i = 0; i < totalCartas; i++) {
        if (cartas[i].seleccion == true) {
            aciertos++;
        }

    }

    if (aciertos == totalCartas) {
        document.getElementById("juego").innerHTML = showFinJuego();
        devolverSeleccion();
    }
}

const devolverSeleccion = () => {
    document.getElementById('iniciar').disabled = false;
    iniciarContador = false;
    aux = [];
    var parrafos = document.getElementsByTagName('p');

    for (let i = 0; i < cartas.length; i++) {
        cartas[i].seleccion = false;
    }

    for (let i = 0; i < parrafos.length; i++) {
        parrafos[i].style.display = "initial";
    }
}

//Router de eventos
document.addEventListener("click", (ev) => {
    if (ev.target.matches("#iniciar")) indexControl();
    else if (ev.target.matches("#resetear")) resetearJuego();
    else if (ev.target.matches(".girarCarta")) girarCarta(ev);
});