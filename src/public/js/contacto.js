const menu = document.querySelector(".menu");
const form = document.querySelector(".formulario");
const boton = document.querySelector("button");

function onOff(){
    const nav = document.querySelector(".header_nav");
    nav.classList.toggle("ocultar")
}

function validacion(){
    const nombre = document.querySelector(".main1 input");
    const apellido = document.querySelector(".main2 input");
    const nacimiento = document.querySelector(".main7 input");
    const email = document.querySelector(".main8 input");
    const comentarios = document.querySelector(".main9 textarea");

    const varon = document.querySelector(".main4 input");
    const mujer = document.querySelector(".main5 input");
    const otro = document.querySelector(".main6 input"); 

    const radios = (varon.checked || mujer.checked || otro.checked)

    if(nombre.value =='' || apellido.value =='' || nacimiento.value =='' || email.value =='' || comentarios.value =='' || radios == false){
        alert("Todos los campos son obligatorios");
        return false;
    } 
    return true;
}

menu.addEventListener("click", onOff);
form.addEventListener("submit",(e) => {

    e.preventDefault();

    if(!validacion()){ 
        return;
    }

        const nombre = document.querySelector('input[name="nombre"]').value;
        const apellido = document.querySelector('input[name="apellido"]').value;
        const genero = document.querySelector('input[name="genero"]:checked') ? document.querySelector('input[name="genero"]:checked').value : '';
        const fechaNacimiento = document.querySelector('input[name="date"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const comentarios = document.querySelector('textarea[name="textarea"]').value;

        let emailBody = `Contacto:\n\nNombre: ${nombre}\nApellido: ${apellido}\nGénero: ${genero}\nFecha de nacimiento: ${fechaNacimiento}\nCorreo electrónico: ${email}\nComentarios: ${comentarios}\n\nMensaje enviado desde el formulario de PublicObras`;

        emailBody = encodeURIComponent(emailBody);

        const mailtoLink = `mailto:contacto@publicobras.com?subject=Contacto%20desde%20el%20sitio%20web&body=${emailBody}`;

        window.location.href = mailtoLink;
});