import { pool } from "../db/dbconnect.js";

const galeriaController = async (req, res) => {
    try {

        const [imagenes] = await pool.query('SELECT * FROM galeria');
        const [comentarios] = await pool.query('SELECT * FROM comentarios');

        const data = imagenes.map(imagen => {
            imagen.comentarios = comentarios.filter(comentario => comentario.publicacionId === imagen.id);
            return imagen;
        });

        res.json(data);


    } catch (error) {
        console.error('Error al obtener las imágenes de la galería:', error);
        res.status(500).send('Error al obtener las imágenes de la galería.');
    }
}

export {galeriaController}