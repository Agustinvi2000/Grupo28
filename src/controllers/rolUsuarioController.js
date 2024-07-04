import { pool } from "../db/dbconnect.js"

const rolUsuarioController = async (req, res) => {
    let userId = parseInt(req.params.id)
    const {newRol} = req.body;

    try {
        let resultado = await pool.query('UPDATE users SET rol = ? WHERE id = ?', [newRol, userId])

        if (resultado[0].affectedRows == 0) {
            res.setHeader("Content-Type", "application/json")
            return res.status(400).json({message: "El id del usuario requerido no existe"})
        }

        res.setHeader("Content-Type", "application/json")
        res.status(201).json({data: resultado, message: "Modificacion de rol exitosa!"});        
        
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json("Error inesperado en el servidor al querer modificar el rol")        
    }
}

export {rolUsuarioController}