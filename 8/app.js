const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

// Serve HTML page
app.use(express.static('public'));

// Storage configuration
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, 'uploads/');

    },

    filename: function (req, file, cb) {

        cb(null,
            Date.now() +
            path.extname(file.originalname));

    }

});

const upload = multer({
    storage: storage
});

// Upload route
app.post('/upload',
    upload.single('file'),
    (req, res) => {

        if (!req.file) {

            return res.status(400).json({
                message: 'No file uploaded'
            });

        }

        res.json({
            message: 'File uploaded successfully',
            filename: req.file.filename
        });

    }
);

app.listen(3000, () => {

    console.log(
        'Server running on http://localhost:3000'
    );

});