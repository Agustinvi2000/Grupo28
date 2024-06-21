
const registroController = async (req, res) => {

    try {
        res.setHeader("Content-Type", "application/json")
        res.json("datos del registro")
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        return res.status(500).json("Error inesperado en el servidor")
    }
}

export { registroController }
