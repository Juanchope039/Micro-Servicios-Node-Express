const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const {route, router} = require("express/lib/application");
const {Router} = require("express");


// Crear carpeta uploads si no existe
const UPLOAD_DIR = path.resolve("./uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de multer (almacenamiento en disco, nombre único)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        // Sanitizar nombre original y mantener extensión
        const safeName = file.originalname.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\.-]/g, "");
        cb(null, `${timestamp}-${safeName}`);
    }
});

// Filtro de archivos: ejemplo aceptar solo imágenes y pdf
function fileFilter(req, file, cb) {
    const allowed = /jpeg|jpg|png|gif|pdf/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (allowed.test(ext) || allowed.test(mime)) {
        cb(null, true);
    } else {
        cb(new Error("Tipo de archivo no permitido. Solo imágenes y PDF."), false);
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter
});

// Endpoint para un solo archivo (campo 'file')
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ ok: false, message: "No se recibió archivo." });
    }

    // Aquí puedes guardar metadata en DB, procesarlo, etc.
    return res.json({
        ok: true,
        message: "Archivo recibido correctamente",
        file: {
            originalname: req.file.originalname,
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path
        }
    });
});

// Ejemplo: endpoint para múltiples archivos (campo 'files')
app.post("/upload-multiple", upload.array("files", 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ ok: false, message: "No se recibieron archivos." });
    }
    return res.json({ ok: true, files: req.files.map(f => ({ originalname: f.originalname, filename: f.filename, size: f.size })) });
});

// Manejo global de errores de multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // errores propios de multer (p.ej. límite de tamaño)
        return res.status(400).json({ ok: false, error: err.code, message: err.message });
    } else if (err) {
        return res.status(400).json({ ok: false, message: err.message });
    }
    next();
});

const { Router } = require('express');

const router = Router();

router

module.exports = router;