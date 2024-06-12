const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

exports.uploadImage = (req) => {
  return new Promise((resolve, reject) => {
    upload.single('image')(req, null, (err) => {
      if (err) reject(err);
      resolve(req.file ? req.file.path : null);
    });
  });
};
