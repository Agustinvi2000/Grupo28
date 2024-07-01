import { pool } from "../db/dbconnect.js"

const publicarController = async (req, res) => {

    try {

        const {userIdPublicar, autor, descripcion} = req.body
        const archivo = req.file.filename
        const path = "../uploads/"
        
        //Crear nuevo usuario
        const [result] = await pool.query(
            'INSERT INTO galeria (path, archivo, autor, descripcion, userId) VALUES (?, ?, ?, ?, ?)',
            [path, archivo, autor, descripcion, userIdPublicar]
        );        

        res.setHeader("Content-Type", "application/json")
        res.status(201).redirect("/")
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json("Error inesperado en el servidor al publicar")
    }
}

export { publicarController }