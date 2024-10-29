import multer from 'multer';

// Définir le stockage des fichiers avec multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Dossier où les fichiers seront stockés
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, `${Date.now()}-${file.originalname}`); // Renommer le fichier pour éviter les collisions
    }
});

// Initialiser multer
const upload = multer({ storage: storage });

export default upload;
