// Esto es parala pagina de iniciar sesion

function validarSesion(){

    // Obtengo los datos de los usuarios 
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))

    // Obtengo los datos que el usuario ingreso
    const correo = document.getElementById("correo").value
    const contraseña = document.getElementById("contraseña").value

    // verifico que haya completado los datos
    const validar = ValidarDatos(correo, contraseña)
    if (validar == false){
        return
    }

    // Busco el usuario que ingreso 
    for (let i = 0;i < usuarios.length; i++){
        if (usuarios[i].correo.toUpperCase() === correo.toUpperCase() && usuarios[i].contraseña.toUpperCase() === contraseña.toUpperCase()){
            // Si lo encuentra le avisa 
            Swal.fire({
                title: "Iniciaste sesión con exito",
                text: `Bienvenido ${usuarios[i].nombre} tu saldo es de: $${usuarios[i].saldo}`,
                icon: "success",
                confirmButtonText: "Cool"
            })
            // Y lo lleva a la pagina para elegir juegos
                .then((result) => {
                if (result.isConfirmed){
                    window.location.href = "/pages/elegirjuegos.html"
                }
            })
            // Guarda el id
            localStorage.setItem("id", i)
            return
        }
    }
    // Avisa que no se encontro el usuario
    Swal.fire({
        title: "Usuario incorrecto",
        icon: "error",
        confirmButtonText: "=("
    })
}


// Valida si completaron los datos
function ValidarDatos(correo, contraseña){
    // si el correo esta vacio le dice que lo complete
    if (correo.length == 0){
        Swal.fire({
            title: "Ingrese un correo",
            icon: "error",
            confirmButtonText: "=("
        })
        return false
    } 
    // si la contraseña esta vacia le dice que lo complete
    if (contraseña.length == 0){
        Swal.fire({
            title: "Ingrese una contraseña",
            icon: "error",
            confirmButtonText: "=("
        })
        return false
    }
}


// Te lleva a la pagina para registrarse
function registrarse(){
    window.location.href = "/pages/registrarse.html"
}

// Obtenemos los botones y le asignamos una funcion
const botonInicio = document.getElementById("iniciarsesion")
botonInicio.addEventListener("click", validarSesion)

const botonRegistro = document.getElementById("registrarse")
botonRegistro.addEventListener("click", registrarse)

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

// Esto es para la pagina de agregar saldo en el juego cara o cruz

function opcion2() {

    // Obtiene el id del usuario
    const id = localStorage.getItem("id")
    // Obtiene la lista de usuarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
    // Obtiene el saldo del usuario
    let saldo = parseInt(usuarios[id].saldo)
    // Obtiene los datos que el usuario ingreso
    const nuevoSaldo = parseInt(document.getElementById("sumar").value)

    // Valida que el numero que agrego sea mayor a 0 y que no ingrese algo vacio
    if (nuevoSaldo <= 0 || isNaN(nuevoSaldo)) {
        Swal.fire({
            title: "Ingrese un numero valido",
            icon: "error",
            confirmButtonText: "=("
        })
        return
    }

    // Se agrega el saldo y se guarda en el localStorage
    saldo += nuevoSaldo
    usuarios[id].saldo = saldo
    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    // Muestra el nuevo saldo
    Toastify({
        text: `Tu nuevo saldo es de : $${saldo}`,
        duration: 3000
    }).showToast()

}

// Se obtiene el boton y se le asigna una funcion
const botonRegistro = document.getElementById("boton")
botonRegistro.addEventListener("click", opcion2)

// Es para la opcion de salir en el juego cara o cruz
function opcion3() {
    // obtenemos el id del usuario
    const id = localStorage.getItem("id")
    // Obtenemos la lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))
    // Obtenemos el nombre y el saldo del usuario
    const nombre = usuarios[id].nombre
    const saldo = usuarios[id].saldo
    // Lo saludamos
    Swal.fire({
        title: `Adios ${nombre}`,
        text: `Tu saldo fue de :${saldo}`,
        icon: "success",
        confirmButtonText: "Cool"
    })
        // Y lo llevamos a la pagina salir
        .then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/pages/opcion3.html"
            }
        })
    localStorage.setItem("top10", 1)
}

// Esto corresponde a la pagina de registrarse

// Crea la clase Usuario
class Usuario {
    constructor(nombre, saldo, correo, contraseña){
        this.nombre = nombre 
        this.saldo = saldo 
        this.correo = correo 
        this.contraseña = contraseña 
    }
}

// Crea el nuevo usuario
function validarRegistro(){
    // Obtiene la lista de usuarios o la crea 
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

    // Obtiene los datos que ingreso el usuario
    const nombre = document.getElementById("nombre").value
    const saldo = parseInt(document.getElementById("saldo").value)
    const correo = document.getElementById("correo").value
    const contraseña = document.getElementById("contraseña").value
    // Se le asigna un id al nuevo usuario
    const id = usuarios.length
    // Se obtiene un div llamado mostrar
    const mostrar = document.getElementById("mostrar")
    
    // Valida que los datos ingresados sean correctos
    const validar = ValidarDatos(nombre, correo, contraseña, saldo, mostrar)
    if (validar === false){
        return
    }

    // Agrega el nuevo usuario 
    usuarios.push(new Usuario(nombre, saldo, correo, contraseña))
    usuarios = localStorage.setItem("usuarios", JSON.stringify(usuarios))
    // Guardamos el id
    localStorage.setItem("id", id)
    // Le avisamos al usuario de que se registro
    Swal.fire({
        title: "Te registraste con exito",
        text: `Bienvenido ${nombre} tu saldo es de: $${saldo}`,
        icon: "success",
        confirmButtonText: "Cool"
    })
        // Lo llevamos a la pagina de ellecion de juegos
        .then((result) => {
        if (result.isConfirmed){
            window.location.href = "/pages/elegirjuegos.html"
        }
    })
}

// Creo que no hace falta explicar que hace :)
function ValidarDatos(nombre, correo, contraseña, saldo){
    if (nombre.length == 0){
        Swal.fire({
            title: "Ingrese un nombre",
            icon: "error",
            confirmButtonText: "=("
        })
        return false
    }
    if (correo.length == 0){
        Swal.fire({
            title: "Ingrese un correo",
            icon: "error",
            confirmButtonText: "=("
        })
        return false
    } 
    if (contraseña.length == 0){
        Swal.fire({
            title: "Ingrese una contraseña",
            icon: "error",
            confirmButtonText: "=("
        })
        return false
    }
    if (saldo <= 0 || isNaN(saldo) || saldo.length == 0){
        Swal.fire({
            title: "Ingrese un saldo",
            icon: "error",
            confirmButtonText: "=("
        })
        return false
    }
}

// Obtenemos el boon y le asignamos una funcion
const botonRegistro = document.getElementById("registro")
botonRegistro.addEventListener("click", validarRegistro)

// Esto funciona para algunas funciones sueltas

// Es para mostrar el top10 de usuarios con mas saldo 
function top10() {
    const noMuestramas = localStorage.getItem("top10")
    // Obtenemos el ul llamado listado
    const listado = document.getElementById("listado")
    // Obtenemos el div llamado mostrar
    const mostrar = document.getElementById("mostrar")
    if (noMuestramas == 1) {
        return
    }
    // Obtenemos la lista de usuarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
    // Obtenemos solamente el nombre y el saldo de los usuarios
    let top10 = usuarios.map((el) => {
        return {
            saldo: el.saldo,
            nombre: el.nombre
        }
    })

    // Los ordenamos de mayor a menor
    top10.sort((a, b) => b.saldo - a.saldo)
    // Obtenemos simplemente los primeros 10 usuarios
    top10Actualizado = top10.slice(0, 10)


    // Creamos la variable cont para poder hacer el top
    let cont = 1
    top10Actualizado.forEach(element => {
        // Creamos un li 
        mostrar.classList.add("mostrar")
        const li = document.createElement(`li`)
        li.innerHTML = `<p>Top ${cont} ${element.nombre}: $${element.saldo}</p>`
        // Agregamos el li al ul
        listado.append(li)

        cont++
    });
    localStorage.setItem("top10", 1)
}

// Avisar que no tiene saldo
function sinSaldo() {
    const mostrar = document.getElementById("mostrar")
    mostrar.innerHTML = `Debes ingresar otra opcion porque no tienes saldo :(`
}

// Borrar id y redireccionar
function cerrarsesion() {
    const i = NaN
    localStorage.setItem("id", i)
    window.location.href = "/index.html"
}

// Mostrar el saldo en la pagina
// obtenemos el id del usuario
setInterval(() => {
    const id = localStorage.getItem("id")
    // Obtenemos la lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))
    // Obtenemos el nombre y el saldo del usuario
    const saldo = usuarios[id].saldo
    const mostrarSaldo = document.getElementById("saldo")
    mostrarSaldo.innerHTML = `<p>Tu saldo es: ${saldo}</p>`
}, 10)

// Utilizamos una API para generar chistes aleatorios
function pedirChiste() {
    fetch(`https://v2.jokeapi.dev/joke/Programming`)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.type == "twopart") {
                Toastify({
                    text: `${data.setup}
                        ${data.delivery}`,
                    gravity: "bottom",
                    position: "center",
                    duration: 5000
                }).showToast()
            } else {
                Toastify({
                    text: `${data.joke}`,
                    gravity: "bottom",
                    position: "center",
                    duration: 7000
                }).showToast()
            }
        })
        .catch(() => {
            Toastify({
                text: `Ocurrio un error mejor no apuestes por las dudas`,
                gravity: "bottom",
                position: "center",
                duration: 2000
            }).showToast()
        })
        .finally(() => {
            Toastify({
                text: `Perdón si esta en inles :(`,
                gravity: "bottom",
                position: "center",
                duration: 2000,
                style: {
                    background: `#1f2029`
                }
                
            }).showToast()
        })
}

// Funciones para redireccionar
function opcion1() {
    window.location.href = "/pages/opcion1.html"
    localStorage.setItem("top10", 0)
}

function opcion2() {
    window.location.href = "/pages/opcion2.html"
    localStorage.setItem("top10", 0)
}

function volver() {
    window.location.href = "elegirjuegos.html"
}

function volverCaraCruz() {
    window.location.href = "consaldo.html"
}

function iniciarsesion() {
    window.location.href = "iniciarsesion.html"
}

function index() {
    window.location.href = "elegirjuegos.html"
}

function caraocruz() {
    window.location.href = "consaldo.html"
}

function blackjack() {
    window.location.href = "blackjack.html"
}



