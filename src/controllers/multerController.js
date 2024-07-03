// MULTER
// import path from "path";
import multer from "multer"


const multerController = (req, res, next) => {
    try {
        // const __dirname = path.resolve();
        const storage = multer.diskStorage({
            // destination: (req, file, cb) => {
            //     cb(null, path.join(__dirname, '/public/uploads/'));
            // },
            destination: './src/public/uploads/',
            filename: (req, file, cb) => {
                cb(null, Date.now() + "_" + file.originalname)
            }
        })
        const uploadFile = multer({ storage }).single('archivo'); // Añadir .single('archivo') para manejar un solo archivo
        uploadFile(req, res, err => {
            if (err) {
                console.error('Error al subir el archivo:', err);
                return res.status(500).json({ message: 'Error al subir el archivo' });
            }
            next(); // Llamar a next() solo si la carga del archivo fue exitosa
        });
    } catch (error) {
        console.error('Error al configurar Multer:', error);
        return res.status(500).json({ message: 'Error al configurar Multer' });
    }
};

export { multerController };