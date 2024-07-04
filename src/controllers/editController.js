import { pool } from "../db/dbconnect.js"


const editController = async (req, res) => {
    let publicacionId = parseInt(req.params.id)
    const { userIdPublicar, autor, descripcion } = req.body;

    let fieldsToUpdate = [];
    let values = [];

    if (userIdPublicar) {
        fieldsToUpdate.push("userId = ?");
        values.push(userIdPublicar);
    }
    if (autor) {
        fieldsToUpdate.push("autor = ?");
        values.push(autor);
    }
    if (descripcion) {
        fieldsToUpdate.push("descripcion = ?");
        values.push(descripcion);
    }

    if (fieldsToUpdate.length === 0) {
        return res.status(400).json({ message: "No hay campos para actualizar" });
    }

    values.push(publicacionId);

    try {
        const resultado = await pool.query(
            `UPDATE galeria SET ${fieldsToUpdate.join(", ")} WHERE id = ?`,
            values
        );

        if (resultado[0].affectedRows === 0) {
            res.setHeader("Content-Type", "application/json");
            return res.status(400).json({ message: "El id de la publicación requerida no existe" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "Publicación modificada exitosamente" });
    } catch (error) {
        console.error('Error al modificar publicación:', error);
        res.status(500).json({ message: "Error al modificar publicación" });
    }

}

export {editController}