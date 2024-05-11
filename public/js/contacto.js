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
    if(!validacion()){
        e.preventDefault();
    }
});