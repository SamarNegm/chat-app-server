const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./public/storage");
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + '-' + file.originalname );
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
