import express from "express"
import { registroController } from "./controllers/registroController.js"

const PORT = 8080

const app = express()


app.use(express.json()) //para que nuestro servidor convierta automaticamente json a objetos js y manipularlos directamente del req.body 
app.use(express.urlencoded({extended: true}))//para que el req.body pueda contener cualquier tipo de datos
app.use(express.static("./src/public"))//Para servir contenido estatico de mi carpeta public

//RUTAS
app.post("/registro", registroController)


//RUTAS

const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`))

//Node js 5 01:05:00 configuracion de conexion