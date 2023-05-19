// Esto es para la pagina de jugar y apostar en el juego de cara o cruz

function opcion1() {

    // obtenemos el id del usuario
    const id = localStorage.getItem("id")
    // obtenemos la lista de usuarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
    // obtenemos el saldo del usuario que quiere jugar
    let saldo = parseInt(usuarios[id].saldo)

    // Se valida la apuesta 
    const apuesta = validarApuesta(saldo)
    if (apuesta === true) {
        return
    }
    // Se valida la eleccion
    const eleccion = validarEleccion()
    if (eleccion === true) {
        return
    }

    // "Tira la moneda" y guarda el resultado en la variable aleatorio 
    // utiliza math para decidir entre 1 o 0 y despues lo convierte a cara o cruz 
    const aleatorio = convertirPalabras(Math.round(Math.random()))

    // verifica si la eleccion del usuario coincide con la moneda
    const resultado = verificarResultado(eleccion, aleatorio)

    // agrega o resta saldo dependiendo del resultado y lo guarda en el localStorage
    saldo = resultadoSaldo(apuesta, resultado, saldo)
    usuarios[id].saldo = saldo
    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    // Muestra al usuario todos los resultados
    mostrarResultado(resultado, eleccion, aleatorio, apuesta, saldo)

    // si el usuario se quedo sin saldo lo lleva a una página especial para que agregue saldo o no juegue mas
    if (saldo === 0) {
        window.location.href = "/pages/sinsaldo.html"
    }
}


// Verifica que la apuesta no sea menor que 0 y que no apueste mas de lo que pueda y que no esriba alguna palabra
function validarApuesta(saldo) {
    let apuesta = parseInt(document.getElementById("apuesta").value)
    if (apuesta <= 0 || apuesta > saldo || isNaN(apuesta)) {
        Swal.fire({
            title: "Realice una apuesta valida",
            icon: "error",
            confirmButtonText: "=("
        })
        return true
    } else {
        return apuesta
    }
}


function validarEleccion() {
    // obtiene la eleccion del usuario
    let eleccion = document.querySelector('input[name="opcion"]:checked')
    if (eleccion) {
        return eleccion.value
    } else {
        // le avisa que elija una opcion
        Swal.fire({
            title: "Seleccione una opcion",
            icon: "error",
            confirmButtonText: "=("
        })
        return true
    }
}

// Da true si gano y da false si perdio
function verificarResultado(eleccion, aleatorio) {
    if (aleatorio == eleccion) {
        return true
    } else {
        return false
    }
}

// Muestra los resultados
function mostrarResultado(resultado, eleccion, aleatorio, apuesta, saldo) {
    resultado ? 
    Swal.fire({
        title: "GANASTE!!!",
        text: `Salio ${aleatorio} y elegiste ${eleccion} Felicidades Ganaste!! Tu apuesta fue de: $${apuesta} tu nuevo saldo es: ${saldo}`,
        icon: "success",
        confirmButtonText: "Cool"
    })
        :
        Swal.fire({
            title: "Perdiste =(",
            text: `Salio ${aleatorio} y elegiste ${eleccion} Mala suerte perdiste :( Tu apuesta fue de: $${apuesta} tu nuevo saldo es: ${saldo}`,
            icon: "error",
            confirmButtonText: "=("
        })
        

}

// Convierte el 1 en cara y el 2 en cruz
function convertirPalabras(numero) {
    if (numero == 1) {
        return "CARA"
    } else {
        return "CRUZ"
    }
}

// Suma o resta el saldo dependiendo del resultado
function resultadoSaldo(apuesta, resultado, saldo) {
    if (resultado) {
        saldo += apuesta
    } else {
        saldo -= apuesta
    }
    return saldo
}

// obtiene el boton y le asigna una funcion
let botonRegistro = document.getElementById("boton")
botonRegistro.addEventListener("click", opcion1)