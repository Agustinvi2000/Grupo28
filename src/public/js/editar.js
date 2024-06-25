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

botonEliminar.addEventListener("click", async (e) => {
    e.preventDefault()
    let publicacionId = document.getElementById("publicacionId").value
    console.log(publicacionId)
    try {
        const resultado = await fetch(`http://localhost:8080/delete/${publicacionId}`, {method: "DELETE"})
        
        let response = await resultado.json()
        alert(response.message)

    } catch (error) {
        console.log("Error al querer eliminar publicación")        
    }
})