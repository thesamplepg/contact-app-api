const multer = require("multer");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.NODE_CLOUD_NAME,
  api_key: process.env.NODE_CLOUD_API_KEY,
  api_secret: process.env.NODE_CLOUD_SECRET
});

exports.uploadImage = path =>
  new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      path,
      {
        width: 320,
        height: 320,
        gravity: "face",
        crop: "thumb"
      },
      (err, result) => {
        if (err) reject(err);

        resolve(result);
      }
    );
  });

exports.deleteImage = imageId =>
  new Promise((resolve, reject) => {
    cloudinary.api.delete_resources(imageId, err => {
      if (err) reject(err);

      resolve();
    });
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  }
});

exports.multer = multer({ storage });
