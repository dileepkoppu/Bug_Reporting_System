const multer = require('multer');
const appRoot =require("app-root-path")

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, appRoot+'/uploads');
  },
  filename: function(req, file, cb) {
    cb(null,Date.now()+file.originalname);
  }
});
const mimeToExt = {
  'application/pdf': 'pdf',
  'application/kswps': 'pdf',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/jpg': 'jpg',
  'application/vnd.adobe.flash.movie': 'swf',
  'application/x-shockwave-flash': 'swf',
  "audio/wav": 'wav',
  "audio/mp3": 'mp3',
  "audio/mpeg": 'mp3',
  "video/mp4": 'mp4',
  "text/csv": 'csv',
  "text/plain": 'txt',
  "application/msword": "doc",
  "application/wps-office.docx": 'docx',
  "application/wps-office.doc": 'doc',
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx"
}

const fileFilter = (req, file, cb) => {
  // reject a file
  if (mimeToExt[file.mimetype]) {
    cb(null, true);
  } else {
    console.log("nice");
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

module.exports.upload =upload


