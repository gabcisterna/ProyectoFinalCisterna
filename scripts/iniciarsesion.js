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


