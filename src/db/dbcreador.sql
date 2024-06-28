CREATE TABLE users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    mail VARCHAR(100) UNIQUE NOT NULL,
    pass VARCHAR(255) NOT NULL,
    genero ENUM('Masculino', 'Femenino', 'Otro') NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    rol ENUM('admin', 'usuario', 'deshabilitado') NOT NULL
);

CREATE TABLE newsletter (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE galeria (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    path VARCHAR(255) NOT NULL,
    archivo VARCHAR(255) NOT NULL,
    userId INT(11),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE comentarios (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    comentario TEXT NOT NULL,
    publicacionId INT(11),
    FOREIGN KEY (publicacionId) REFERENCES galeria(id)
);