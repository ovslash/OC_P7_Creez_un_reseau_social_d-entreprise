// ---------------- gestion fichiers entrants ---------- //

const multer = require("multer");

// correspondance extension fichier
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  // destination des fichiers
  destination: (req, file, callback) => {
    callback(null, "images");
  }, // nom des fichiers
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const name = file.originalname
      .split(" ")
      .join("_")
      .split("." + extension)
      .join("_");
    callback(null, name + Date.now() + "." + extension);
  },
});

// verification du type de fichier
const fileFilter = (req, file, callback) => {
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = multer({ storage, fileFilter }).array("image", 4);
