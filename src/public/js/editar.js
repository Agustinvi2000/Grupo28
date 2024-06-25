const botonDeshabilitar = document.getElementById('botonDeshabilitar')

botonDeshabilitar.addEventListener("click", async (e) => {
    e.preventDefault()
    let userId = document.getElementById("userId").value
    console.log(userId)
    try {
        const resultado = await fetch(`http://localhost:8080/edit/${userId}`, {method: "PUT"})
        
        let response = await resultado.json()
        alert(response.message)

    } catch (error) {
        console.log("Error al querer dehabilitar usuario")        
    }
})



const botonEliminar = document.getElementById('botonEliminar')

const idEliminar = document.querySelector('[name="idEliminar"]')

botonEliminar.addEventListener("click", () => {
    console.log("Accion para eliminar el id: " + idEliminar.value)
})