import { pool } from "../db/dbconnect.js"

const comentariosController = async (req, res) => {
    const { comentario, imagenId } = req.body;

    try {
        const resultado = await pool.query(
            'INSERT INTO comentarios (comentario, publicacionId) VALUES (?, ?)',
            [comentario, imagenId]
        );
        res.status(201).json({ message: 'Comentario agregado exitosamente' });
    } catch (error) {
        console.error('Error al agregar comentario:', error);
        res.status(500).json({ message: 'Error al agregar comentario' });
    }
};

export { comentariosController }