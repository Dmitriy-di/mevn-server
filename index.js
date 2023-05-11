require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { routes } = require('./src/routes');
const { join } = require('path');

// настроим подключение к бд
// const mongoHost = process.env.MONGO_HOST;
// const mongoPort = process.env.MONGO_PORT;
// const mongoDbname = process.env.DB_NAME;
const mongoHost = '127.0.0.1';
const mongoPort = '27017';
const mongoDbname = 'some-mongo';

mongoose.connect(`mongodb://${mongoHost}:${mongoPort}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// инициализируем приложение
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', (_, res) => res.sendFile(join(__dirname + '/index.html')));

routes.forEach((item) => {
  app.use(`/api/v1/${item}`, require(`./src/routes/${item}`));
});

//=========file
// Роут для загрузки файла
const uploadRoute = require('./src/routes/files');
app.use('/api/v1/files', uploadRoute);

// app.post('/api/v1/upload', upload.single('file'), (req, res) => {
//  res.redirect('/');
// });

// app.get('/api/v1/file', (req, res) => {
//   console.log();
//   gfs.files.find().toArray((err, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to get files' });
//     }
//     return res.json(files);
//   });
// });
//=========file/

const PORT = 3000;

http.createServer({}, app).listen(PORT);

console.log(`Server running at ${PORT}`);
