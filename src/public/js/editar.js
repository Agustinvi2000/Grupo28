document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/get-users-and-galeria');
        const data = await response.json();
        const usersSelect = document.getElementById('userId');
        const usersSelectPublicar = document.getElementById('userIdPublicar');
        const galeriaSelect = document.getElementById('publicacionId');

        // Llenar el select de usuarios

        data.users.sort((a, b) => a.id - b.id);

        data.users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.user;
            usersSelect.appendChild(option);

            const optionPublicar = document.createElement('option');
            optionPublicar.value = user.id;
            optionPublicar.textContent = user.user;
            usersSelectPublicar.appendChild(optionPublicar);
        });

        data.galeria.sort((a, b) => a.id - b.id);
        // Llenar el select de IDs de galería
        data.galeria.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.id;
            galeriaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
});



const botonDeshabilitar = document.getElementById('botonDeshabilitar')

botonDeshabilitar.addEventListener("click", async (e) => {
    e.preventDefault()
    let userId = document.getElementById("userId").value
    // console.log(userId)
    try {
        // const resultado = await fetch(`/edit/${userId}`, {method: "PUT"})
        
        const resultado = await fetch(`/edit/${userId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        let response = await resultado.json()
        alert(response.message)
        window.location.reload();

    } catch (error) {
        console.log("Error al querer dehabilitar usuario")        
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
    }
})



document.getElementById('publicarForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = document.getElementById('publicarForm');
    const formData = new FormData(form);

    // console.log(token)
    try {
        const response = await fetch('/publicar', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al enviar formulario');
        }

        const data = await response.json();
        alert(data.message); // Mostrar mensaje de éxito o error
        window.location.reload();

    } catch (error) {
        console.error('Error al enviar formulario:', error);
        // Manejar el error, mostrar mensaje al usuario, etc.
    }
});
