import jwt from 'jsonwebtoken';

const authorizationController = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    try {
        const decodedToken = jwt.verify(token, '1234'); // Verificar token JWT

        if (decodedToken.rol !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado. No tienes permisos como administrador' });
        }

        next();
    } catch (error) {
        console.error('Error al verificar token:', error);
        return res.status(500).json({ message: 'Error al verificar token' });
    }
};

export { authorizationController };