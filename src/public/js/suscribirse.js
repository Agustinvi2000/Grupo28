async function suscribirse() {
    const emailInput = document.getElementById("newsletter")
    const email = document.getElementById("newsletter").value
    
    if (!emailInput.checkValidity()) {
        alert("El formato del correo electrónico indicado no es valido")
        return
    }

    try {
        let resultado = await fetch("/suscribirse", {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email: email})})
        let response = await resultado.json()
        alert(response.message)
        
    } catch (error) {
        alert("Error al realizar fetch al endpoint de /suscribirse")              
    }
}