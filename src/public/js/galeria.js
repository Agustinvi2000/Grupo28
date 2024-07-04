document.querySelector('body').onload = async () => {
    const res = await fetch(`/galeria`);
    const datos = await res.json();
    let carouselPlaceholder = document.querySelector(`#carousel-placeholder`);
    
    let carouselIndicators = '';
    let carouselInner = '';
    let carouselComentar ='';
    let carouselComentarios = '';
    
// console.log(datos)
    datos.forEach((image, index) => {
// console.log(image.comentarios)
        const isActive = index === 0 ? 'active' : '';

        carouselIndicators += `<button type="button" data-bs-target="#carouselExample" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
        carouselInner += `
            <div class="carousel-item ${isActive}">
                <img src="${image.path}${image.archivo}" class="d-block w-100">
            </div>`;
carouselComentar += `                
                <div class="carousel-comentar ${isActive ? '' : 'd-none'}">
                    <div class="button-container">
                        ${decodedToken?.rol == "admin" ? `<a type="button" class="btn btn-warning botones" href="../views/editar.html?publicacionId=${image.id}">Modificar Información</a>` : ''}
                        ${decodedToken?.rol == "admin" ? `<button type="button" class="btn btn-danger botones" data-image-id="${image.id}">Eliminar</button><br>` : ''} 
                    </div>

                    <h5>Autor: ${image.autor}</h5>
                    <p>${image.descripcion}</p>
                    <p>Id Publicación: ${image.id}</p>
                    <p>Usuario: ${image.user}</p>
                    <br>
                    <div class="comentar">
                        <h5>Comente la foto:</h5>
                        <textarea name="comentario-${image.id}" placeholder="Escriba un comentario..."></textarea>
                        <button type="button" class="comentarButton" data-image-id="${image.id}" data-user-id="${image.userId}">Enviar</button>
                    </div>
                </div>`;

                // Renderizar los comentarios
                let comentariosHtml = '<br><h5>Comentarios:</h5>';
                image.comentarios.forEach((comentario, indice) => {
                    comentariosHtml += `<p>${indice + 1}: ${comentario.comentario}</p>`;
                });
                carouselComentarios += `                
                <div class="carousel-comentario ${isActive ? '' : 'd-none'}">
                    ${comentariosHtml}
                </div>`;

    });

    const carouselHtml = `
        <div id="carouselExample" class="carousel slide">
            <div class="carousel-indicators">
                ${carouselIndicators}
            </div>
            <div class="carousel-inner">
                ${carouselInner}
            </div>
            <button class="carousel-control prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        ${carouselComentar}
        ${carouselComentarios}
        `;
    
    carouselPlaceholder.innerHTML = carouselHtml;

    const carousel = document.getElementById('carouselExample');

// Función para manejar el cambio de slide
carousel.addEventListener('slid.bs.carousel', function() {
    const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).findIndex(item => item.classList.contains('active'));
    const carouselComentarItems = document.querySelectorAll('.carousel-comentar');
    const carouselComentariosItems = document.querySelectorAll('.carousel-comentario');

    carouselComentarItems.forEach((item, index) => {
        if (index === activeIndex) {
            item.classList.remove('d-none');
        } else {
            item.classList.add('d-none');
        }
    });

    carouselComentariosItems.forEach((item, index) => {
        if (index === activeIndex) {
            item.classList.remove('d-none');
        } else {
            item.classList.add('d-none');
        }
    });
});

document.querySelectorAll('.comentarButton').forEach(button => {
    button.addEventListener('click', async (e) => {
        const imagenId = e.target.getAttribute('data-image-id');
        const usuarioId = e.target.getAttribute('data-user-id');
        const comentario = document.querySelector(`textarea[name="comentario-${imagenId}"]`).value;

        try {
            const resultado = await fetch(`/comentarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imagenId, usuarioId, comentario })
            });

            const response = await resultado.json();
            document.querySelector(`textarea[name="comentario-${imagenId}"]`).value = '';
            alert(response.message);
            window.location.href = '/views/galeria.html';

        } catch (error) {
            console.error('Error al agregar comentario:', error);
        }
    });
});

// Enviar la solicitud DELETE con el token en el header Authorization
document.querySelectorAll('.eliminarButton').forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const imagenId = e.target.getAttribute('data-image-id');

        try {
            const resultado = await fetch(`/delete/${imagenId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            let response = await resultado.json();
            alert(response.message);
            window.location.reload();

        } catch (error) {
            console.log("Error al querer eliminar publicación");
        }
    });
});


};
