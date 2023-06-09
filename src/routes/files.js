const { connection } = require('../../index');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const mongoHost = '127.0.0.1';
const mongoPort = '27017';
const urlDB = `mongodb://${mongoHost}:${mongoPort}`;
const { File, Subject, Task } = require('../model');

// Создаем хранилище GridFS
const storage = new GridFsStorage({
  url: urlDB,

  options: { useNewUrlParser: true, useUnifiedTopology: true },

  file: (req, file) => {
    console.log(211123, file);
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: 'uploads',
      };

      resolve(fileInfo);
    });
  },
});

connection.once('open', () => {
  const gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: 'uploads',
  });

  // Обработчик маршрута получения всех файлов
  router.get('/', (req, res) => {
    gfs.find().toArray((err, files) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).json(files);
    });
  });

  router.get('/:id', (req, res) => {
    const fileId = new ObjectId(req.params.id);

    gfs.find({ _id: fileId }).toArray((err, files) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (files.length === 0) {
        return res.status(404).send('File not found');
      }

      const readStream = gfs.openDownloadStream(fileId);
      readStream.pipe(res);
    });
  });

  router.get('/:id/preview', (req, res) => {
    const fileId = new ObjectId(req.params.id);
    gfs.find({ _id: fileId }).toArray((err, files) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (files.length === 0) {
        return res.status(404).send('File not found');
      }

      if (files[0].contentType.startsWith('image/')) {
        const readStream = gfs.openDownloadStream(fileId);
        readStream.on('error', (err) => {
          console.log(err);
          res.status(500).send('Internal server error');
        });
        const chunks = [];
        readStream.on('data', (chunk) => {
          chunks.push(chunk);
        });

        readStream.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const base64Image = buffer.toString('base64');
          const dataUri = `data:${files[0].contentType};base64,${base64Image}`;
          res.send(dataUri);
        });
      } else {
        res.status(400).send('Unsupported file type');
      }
    });
  });

  router.delete('/:id', (req, res) => {
    const fileId = new ObjectId(req.params.id);

    gfs.delete(fileId, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).send('File deleted successfully!');
    });
  });
});

const upload = multer({ storage });

// Обработчик маршрута загрузки файла
router.post('/', upload.single('file'), async (req, res) => {
  const item = new File({
    name: req.file.filename,
    mimeType: req.file.mimetype,
    idFile: req.file.id,
    uploadDate: req.file.uploadDate,
    md5: req.file.md5,
    size: req.file.size,
    encoding: req.file.encoding,
    bucketName: req.file.bucketName,
    contentType: req.file.contentType,
    task: req.headers.taskid,
  });
  const newItem = await item.save();

  const task = await Task.findById(req.headers.taskid);
  task.files.push(newItem);
  await task.save();
  // console.log(1111, req.file); // Информация о загруженном файле
  // console.log(2222, newItem);
  res.status(200).send('File uploaded successfully!');
});

module.exports = router;
