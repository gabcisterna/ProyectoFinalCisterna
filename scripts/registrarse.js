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