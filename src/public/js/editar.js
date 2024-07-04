const botonModificar = document.getElementById('botonModificar')

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const publicacionIdaModificar = urlParams.get('publicacionId');

        const response = await fetch('/get-users-and-galeria');
        const data = await response.json();
        const usersSelect = document.getElementById('userId');
        const usersSelectHabilitar = document.getElementById('userIdHabilitar');
        const usersSelectPublicar = document.getElementById('userIdPublicar');
        const galeriaSelect = document.getElementById('publicacionId');
        const galeriaSelectModificar = document.getElementById('publicacionIdModificar');
        const usersSelectPublicarModificar = document.getElementById('userIdPublicarModificar');

        data.usersHabilitado.sort((a, b) => a.id - b.id);
        data.usersHabilitado.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.user;
            usersSelect.appendChild(option);

            const optionPublicar = document.createElement('option');
            optionPublicar.value = user.id;
            optionPublicar.textContent = user.user;
            usersSelectPublicar.appendChild(optionPublicar);

            const optionPublicarModificar = document.createElement('option');
            optionPublicarModificar.value = user.id;
            optionPublicarModificar.textContent = user.user;
            usersSelectPublicarModificar.appendChild(optionPublicarModificar);
        });

        data.usersDeshabilitado.sort((a, b) => a.id - b.id);
        data.usersDeshabilitado.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.user;
            usersSelectHabilitar.appendChild(option);
        });

        data.galeria.sort((a, b) => a.id - b.id);
        data.galeria.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.id;
            galeriaSelect.appendChild(option);

            const optionModificar = document.createElement('option');
            optionModificar.value = item.id;
            optionModificar.textContent = item.id;
            galeriaSelectModificar.appendChild(optionModificar);
        });

        if (publicacionIdaModificar) {
            galeriaSelectModificar.value = publicacionIdaModificar;
            const formularioModificar = document.getElementById('formularioModificar');
            formularioModificar.classList.add('highlight');

            botonModificar.scrollIntoView({ behavior: 'smooth', block: 'center' });

            setTimeout(() => {
                formularioModificar.classList.remove('highlight');
                formularioModificar.classList.add('remove-highlight');
            }, 3000);
                    
            setTimeout(() => {
                formularioModificar.classList.remove('remove-highlight');
            }, 4000);
            }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
});



const botonDeshabilitar = document.getElementById('botonDeshabilitar')

botonDeshabilitar.addEventListener("click", async (e) => {
    e.preventDefault()
    let userId = document.getElementById("userId").value

    try {
        // const resultado = await fetch(`/edit/${userId}`, {method: "PUT"})
        
        const resultado = await fetch(`/modificar-rol-usuario/${userId}`, {
            method: "PUT",
            body: JSON.stringify({newRol: 'deshabilitado'}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        let response = await resultado.json()
        alert(response.message)
        window.location.reload();

    } catch (error) {
        console.log("Error al querer deshabilitar usuario")        
    }
})


const botonHabilitar = document.getElementById('botonHabilitar')

botonHabilitar.addEventListener("click", async (e) => {
    e.preventDefault()
    let userIdHabilitar = document.getElementById("userIdHabilitar").value

    // console.log(userId)
    try {
        // const resultado = await fetch(`/edit/${userId}`, {method: "PUT"})
        
        const resultado = await fetch(`/modificar-rol-usuario/${userIdHabilitar}`, {
            method: "PUT",
            body: JSON.stringify({newRol: 'usuario'}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        let response = await resultado.json()
        alert(response.message)
        window.location.reload();

    } catch (error) {
        console.log("Error al querer habilitar usuario")        
    }
})




botonModificar.addEventListener("click", async (e) => {
    e.preventDefault()
    let publicacionIdModificar = document.getElementById("publicacionIdModificar").value
    let userIdPublicarModificar = document.getElementById("userIdPublicarModificar").value
    let autorModificar = document.getElementById("autorModificar").value
    let descripcionModificar = document.getElementById("descripcionModificar").value

    // console.log(userId)
    try {
        // const resultado = await fetch(`/edit/${userId}`, {method: "PUT"})
        
        const resultado = await fetch(`/edit/${publicacionIdModificar}`, {
            method: "PUT",
            body: JSON.stringify({
                userIdPublicar: userIdPublicarModificar,
                autor: autorModificar,
                descripcion: descripcionModificar
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        let response = await resultado.json()
        alert(response.message)
        window.location.reload();

    } catch (error) {
        console.log("Error al querer modificar publicación")   
        if(publicacionIdModificar === '') {alert("Debe seleccionar un id de una publicación")}     
    }
})



const botonEliminar = document.getElementById('botonEliminar')

const idEliminar = document.querySelector('[name="idEliminar"]')

botonEliminar.addEventListener("click", async (e) => {
    e.preventDefault()
    let publicacionId = document.getElementById("publicacionId").value
    // console.log(publicacionId)
    try {
       
        const resultado = await fetch(`/delete/${publicacionId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        let response = await resultado.json()
        alert(response.message)
        window.location.reload();

    } catch (error) {
        console.log("Error al querer eliminar publicación")
        if(publicacionId === '') {alert("Debe seleccionar un id de una publicación")}     
    }
})



document.getElementById('publicarForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = document.getElementById('publicarForm');
    const formData = new FormData(form);

    try {
        const response = await fetch('/publicar', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        alert(data.message);
        window.location.reload();

    } catch (error) {
        console.error('Error al enviar formulario:', error);
    }
});
