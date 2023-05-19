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