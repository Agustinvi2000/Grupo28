document.querySelector('body').onload = async () => {
    const res = await fetch(`/galeria`);
    const datos = await res.json();
    let carouselPlaceholder = document.querySelector(`#carousel-placeholder`);
    
    let carouselIndicators = '';
    let carouselInner = '';
    let carouselComentarios = '';

    datos.forEach((image, index) => {
        const isActive = index === 0 ? 'active' : '';

        carouselIndicators += `<button type="button" data-bs-target="#carouselExample" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
        carouselInner += `
            <div class="carousel-item ${isActive}">
                <img src="${image.path}${image.archivo}" class="d-block w-100">
            </div>`;
carouselComentarios += `                
                <div class="carousel-comentario ${isActive ? '' : 'd-none'}">
                    <h5>Autor: ${image.autor}</h5>
                    <p>${image.descripcion}</p>
                    <p>Id Usuario: ${image.userId}</p>
                    <br>
                    <p>Comente la foto</p>
                    <textarea name="comentario-${image.id}"></textarea>
                    <button type="button" class="comentarButton" data-image-id="${image.id}" data-user-id="${image.userId}">Enviar</button>
                    
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
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        ${carouselComentarios}
        `;
    
    carouselPlaceholder.innerHTML = carouselHtml;

    const carousel = document.getElementById('carouselExample');

// Función para manejar el cambio de slide
carousel.addEventListener('slid.bs.carousel', function() {
    const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).findIndex(item => item.classList.contains('active'));
    const carouselComentariosItems = document.querySelectorAll('.carousel-comentario');

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
            alert(response.message);
        } catch (error) {
            console.error('Error al agregar comentario:', error);
        }
    });
});


};
