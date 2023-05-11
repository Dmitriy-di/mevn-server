const express = require('express');
const router = express.Router();

// Обработчик маршрута загрузки файла
router.post('/', (req, res) => {
  // Здесь вы можете добавить код для сохранения файла в MongoDB с использованием Mongoose GridFS
  console.log(req.file); // Информация о загруженном файле
  res.status(200).send('File uploaded successfully!!!!!!!');
});

// Обработчик маршрута получения всех файлов

module.exports = router;
