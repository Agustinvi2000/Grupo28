import { pool } from "../db/dbconnect.js";

const getUsersAndGaleriaController = async (req, res) => {
    try {
        const [usersHabilitado] = await pool.query('SELECT id, user FROM users WHERE rol != "deshabilitado" AND rol !="admin"');
        const [usersDeshabilitado] = await pool.query('SELECT id, user FROM users WHERE rol != "usuario" AND rol !="admin"');

        const [galeria] = await pool.query('SELECT id FROM galeria');

        res.json({ usersHabilitado, usersDeshabilitado, galeria });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).send('Error al obtener los datos.');
    }
}

export { getUsersAndGaleriaController };
