import express from "express"
import cookieParser from "cookie-parser"
import { pool } from "./db/dbconnect.js"
import { registroController } from "./controllers/registroController.js"
import { loginController } from "./controllers/loginController.js"
import { editController } from "./controllers/editController.js"
import { deleteController } from "./controllers/deleteController.js"
import { suscribirseController } from "./controllers/suscribirseController.js"
import { galeriaController } from "./controllers/galeriaController.js"
import { comentariosController } from './controllers/comentariosController.js';
import { getUsersAndGaleriaController } from './controllers/getUsersAndGaleriaController.js';
import { authorizationController } from './controllers/authorizationController.js';
import { multerController } from "./controllers/multerController.js"
import { publicarController } from "./controllers/publicarController.js"

const PORT = 8080

const app = express()

//Conexion a database
const connectDB = async () => {
    try {
        await pool.query('SELECT 1');
        console.log('Conexión a DB exitosa!!!');
    } catch (error) {
        console.error('No hay conexión a DB:', error);
    }
};
connectDB();

app.use(express.json()) //para que nuestro servidor convierta automaticamente json a objetos js y manipularlos directamente del req.body 
app.use(express.urlencoded({extended: true}))//para que el req.body pueda contener cualquier tipo de datos

app.use(express.static("./src/public"))//Para servir contenido estatico de mi carpeta public
// app.use(express.static("../src/public")) //me ejecuta bien solo si pongo ..

app.use(cookieParser("codoAcodo"))//Para el manejo sencillo de cookies al usar jwt

//RUTAS
app.post("/registro", registroController)
app.post("/login", loginController)
app.put("/edit/:id", authorizationController, editController)
app.delete("/delete/:id", authorizationController, deleteController)
app.post("/suscribirse", suscribirseController)

app.post("/publicar", authorizationController, multerController , publicarController)
app.get("/galeria", galeriaController);
app.post('/comentarios', comentariosController);
app.get('/get-users-and-galeria', getUsersAndGaleriaController);

//RUTAS

const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`))

//Node js 5 01:05:00 configuracion de conexion