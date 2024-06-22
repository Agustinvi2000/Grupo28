import { pool } from "../db/dbconnect.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginController = async (req, res) => {

    try {
        const {mail, pass} = req.body

        //Verifico si existe el correo electrónico
        const [users] = await pool.query('SELECT * FROM users WHERE mail = ?', [mail]);

        if (users.length === 0) {
            //Si no esta registrado el mail          
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Tomo el primer usuario encontrado (debería ser único por restricción única)
        const usuario = users[0];

         // Comparar la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
         const passwordMatch = await bcrypt.compare(pass, usuario.pass);

         if (!passwordMatch) {
             // Si las contraseñas no coinciden
             return res.status(401).json({ error: 'Credenciales incorrectas' });
         }
        
         let clave = "1234"
         //Si todo esta Ok creo token!
         let token = jwt.sign(usuario, clave, { expiresIn: "1h" })// Creo token
         res.cookie("userCookie", token)
        
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(usuario)
        // res.status(200).redirect("/")
        
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json("Error inesperado en el servidor al realizar login")        
    }

}

export {loginController}