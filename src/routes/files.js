const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const mongoHost = '127.0.0.1';
const mongoPort = '27017';

// Создаем хранилище GridFS
const storage = new GridFsStorage({
  url: `mongodb://${mongoHost}:${mongoPort}`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: 'uploads',
        metadata: {
          category: ObjectId(req.body.category), // Пример: передаем категорию файла
        },
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

// Обработчик маршрута загрузки файла
router.post('/', upload.single('file'), (req, res) => {
  console.log(1111, req.file); // Информация о загруженном файле
  res.status(200).send('File uploaded successfully!');
});

// Обработчик маршрута получения всех файлов
router.get('/', (req, res) => {
  const gfs = storage.gfs;
  gfs.files.find().toArray((err, files) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(files);
  });
});

module.exports = router;
