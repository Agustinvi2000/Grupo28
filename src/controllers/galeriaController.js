import { pool } from "../db/dbconnect.js";

const galeriaController = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM galeria');
        res.json(result[0]);
    } catch (error) {
        console.error('Error al obtener las imágenes de la galería:', error);
        res.status(500).send('Error al obtener las imágenes de la galería.');
    }
}

export {galeriaController}