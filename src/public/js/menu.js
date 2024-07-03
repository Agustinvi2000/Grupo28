function onOff(){
    const nav = document.querySelector(".header_nav");
    nav.classList.toggle("ocultar")
}

const menu = document.querySelector(".menu");
menu.addEventListener("click", onOff);