const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.resolve(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => {
        const safeName = file.originalname
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_\.-]/g, '');
        cb(null, `${Date.now()}-${safeName}`);
    }
});

function fileFilter(req, file, cb) {
    const allowed = /jpeg|jpg|png|gif|pdf/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (allowed.test(ext) || allowed.test(mime)) cb(null, true);
    else cb(new Error('Tipo de archivo no permitido. Solo imágenes y PDF.'), false);
}

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter
});

module.exports = upload;
