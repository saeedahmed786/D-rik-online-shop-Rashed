// const multer = require('multer');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/') 
//     },

//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });

// const upload =  multer({
//     storage : storage
// });

// module.exports = upload;

// const multer = require('multer');
// const { join } = require('path');

// // Define the storage settings for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Use the /tmp directory for temporary storage (writable in Vercel)
//         cb(null, join(process.cwd(), '/mnt/data/'));
//     },
//     filename: function (req, file, cb) {
//         // Define a custom filename for each uploaded file (e.g., with a timestamp)
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// // Create a multer instance with the defined storage settings
// const upload = multer({
//     storage: storage
// });

const formidable = require('formidable');
const fs = require('fs');
const { join } = require('path'); // Import extname for file extension

const uploadFile = async (req, res, next) => {
    const form = new formidable.IncomingForm();

    // Set the upload directory to the /tmp directory (writable in Vercel)
    form.uploadDir = join(process.cwd(), '/uploads');

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'File upload error.' });
        }

        const file = files.file; // Access the uploaded file
        if (!file) {
            return res.status(400).json({ error: 'No file provided.' });
        }

        // Generate a unique filename for the file (e.g., using a timestamp)
        const fileExtension = file[0].originalFilename; // Get the file extension
        const uniqueFileName = Date.now() + '-' + file.name;

        console.log(file.path);

        // Convert fields to single values
        const fieldsSingleValues = {};
        for (const key in fields) {
            if (fields.hasOwnProperty(key)) {
                fieldsSingleValues[key] = fields[key][0];
            }
        }

        // Construct destination path using join
        const destinationPath = join(form.uploadDir, uniqueFileName + fileExtension);

        // Move the file to the destination path
        fs.rename(file[0].filepath, destinationPath, (renameErr) => {
            if (renameErr) {
                console.error('Error moving file:', renameErr);
                return res.status(500).json({ error: 'File move error.' });
            } else {
                // Set the file path in the request object
                req.file = destinationPath;
                req.body = fieldsSingleValues;
                next();
            }
        });
    });
};

module.exports = uploadFile;
