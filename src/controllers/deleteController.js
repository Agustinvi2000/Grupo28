import { pool } from "../db/dbconnect.js"

const deleteController = async (req, res) => {
    let publicacionId = parseInt(req.params.id)
    

    try {
        let resultado = await pool.query('DELETE FROM `galeria` WHERE `galeria`.`id` = ?', [publicacionId])

        if (resultado[0].affectedRows == 0) {
            res.setHeader("Content-Type", "application/json")
            return res.status(400).json({message: "El id de la publicación requerida no existe"})
        }

        res.setHeader("Content-Type", "application/json")
        res.status(201).json({data: resultado, message: "Elimiación de publicación exitosa!"});        
        
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json("Error inesperado en el servidor al querer eliminar publicación")        
    }
}

export {deleteController}