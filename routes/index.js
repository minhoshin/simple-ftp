var express = require('express');
var router = express.Router();

var fs = require('fs');
var uploadFolder = 'public/upload';

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

router.get('/', function(req, res, next) {
  var files = [];
  fs.readdirSync(uploadFolder).forEach(function(file) {
    files.push(file);
  });
  res.render('index', { 
    title: 'Simple FTP',
    files: files
  });
});

router.post('/upload', multer({ storage: storage }).single('uploadfile'), function(req, res){
  res.redirect('/');
});

module.exports = router;
