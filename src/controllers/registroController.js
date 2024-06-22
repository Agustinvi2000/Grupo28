import { pool } from "../db/dbconnect.js"
import bcrypt from "bcrypt"

const registroController = async (req, res) => {

    let rol = "usuario"

    try {
        const {user, nombre, apellido, mail, pass, genero, fecha_nacimiento} = req.body

        //Hash de password
        const hashedPassword = await bcrypt.hash(pass, 10)

        //Crear nuevo usuario
        const [result] = await pool.query(
            'INSERT INTO users (user, nombre, apellido, mail, pass, genero, fecha_nacimiento, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [user, nombre, apellido, mail, hashedPassword, genero, fecha_nacimiento, rol]
        );        

        res.setHeader("Content-Type", "application/json")
        res.status(201).json({ id: result.insertId, user, nombre, apellido, mail, hashedPassword, genero, fecha_nacimiento, rol });
        // res.status(201).redirect("/")
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json("Error inesperado en el servidor al registrar usuario")
    }
}

export { registroController }
