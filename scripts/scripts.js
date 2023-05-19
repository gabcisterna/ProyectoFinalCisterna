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



