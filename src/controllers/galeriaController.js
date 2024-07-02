import { pool } from "../db/dbconnect.js";

const galeriaController = async (req, res) => {
    try {
        // const result = await pool.query('SELECT * FROM galeria');
        // res.json(result[0]);
        const [imagenes] = await pool.query('SELECT * FROM galeria');
        const [comentarios] = await pool.query('SELECT * FROM comentarios');

        // Combinar las imágenes con sus comentarios correspondientes
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

// const getComentariosController = async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM comentarios');
//         res.json(result[0]);
//     } catch (error) {
//         console.error('Error al obtener los comentarios de las publicaciones:', error);
//         res.status(500).send('Error al obtener los comentarios de las publicaciones.');
//     }
// }

export {galeriaController}