/*
//Buscar todas las cookies
function getAllCookies() {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => console.log(cookie.trim()));
}

// Imprimir todas las cookies disponibles
getAllCookies();

*/

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}

// Verificar si existe la cookie 'userCookie'
const token = getCookie('userCookie');
// console.log(token)

let decodedToken
if (token) {
    // Decodificar el token JWT para obtener el nombre de usuario
    decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar la parte del payload
    const user = decodedToken.user;
}