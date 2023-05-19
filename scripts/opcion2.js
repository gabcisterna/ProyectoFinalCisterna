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