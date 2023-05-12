require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { routes } = require('./src/routes');
const { join } = require('path');

// настроим подключение к бд
const mongoHost = '127.0.0.1';
const mongoPort = '27017';
// const mongoDbname = 'some-mongo';

mongoose.connect(`mongodb://${mongoHost}:${mongoPort}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

////
const connection = mongoose.createConnection(
  `mongodb://${mongoHost}:${mongoPort}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

module.exports = {
  connection,
};
////

// инициализируем приложение
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

routes.forEach((item) => {
  app.use(`/api/v1/${item}`, require(`./src/routes/${item}`));
});

//=========file
// Роут для загрузки файла
const uploadRoute = require('./src/routes/files');
app.use('/api/v1/files', uploadRoute);
//=========file/

const PORT = 3000;

http.createServer({}, app).listen(PORT);

console.log(`Server running at ${PORT}`);
