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

const multer = require('multer');
const { join } = require('path');

// Define the storage settings for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use the /tmp directory for temporary storage (writable in Vercel)
        cb(null, join(process.cwd(), '/tmp/'));
    },
    filename: function (req, file, cb) {
        // Define a custom filename for each uploaded file (e.g., with a timestamp)
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create a multer instance with the defined storage settings
const upload = multer({
    storage: storage
});

// Export the upload middleware to be used in your routes or controllers
module.exports = upload;