const path = require("path")
const multer = require("multer")
const fs = require('fs')

const photoStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null , path.join(__dirname , '../images'))
    },
    filename: function(req,file,cb){
        if (file) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            cb(null, `${timestamp}-${file.originalname}`);
        } else {
            cb(null, false);
        }
    }
})

const photoUpload = multer({
    storage: photoStorage,
    fileFilter: function(req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        } else {
            cb({message : 'Only .png, .jpg and .jpeg format allowed!'}, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024
    }
})

module.exports = photoUpload