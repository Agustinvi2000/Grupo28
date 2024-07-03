// Mostrar el nombre de usuario en el elemento <h2>
let h2 = document.getElementById('mensajeBienvenida')
h2.textContent = `Bienvenido, ${decodedToken.user}!`;

//Mostrar el link para editar si el usuario es admin
if (decodedToken.rol == "admin") {
    let a = document.getElementById("linkDeEdicion")
    a.textContent = "editar y eliminar en DB"
}