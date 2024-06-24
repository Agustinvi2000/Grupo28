const botonDeshabilitar = document.getElementById('botonDeshabilitar')
const botonEliminar = document.getElementById('botonEliminar')

const idDeshabilitar = document.querySelector('[name="idDeshabilitar"]')
const idEliminar = document.querySelector('[name="idEliminar"]')

botonDeshabilitar.addEventListener("click", () => {
    console.log("Accion para deshabilitar el id: " + idDeshabilitar.value)
})

botonEliminar.addEventListener("click", () => {
    console.log("Accion para eliminar el id: " + idEliminar.value)
})