const router = require('express-promise-router')();

const { subject } = require('../controllers');
//В Node.js это означает, что мы определяем маршрут для GET-запроса по пути “/:id” и связываем его с функцией обратного вызова product.get1. Аналогично, мы определяем маршруты для POST-, PUT- и DELETE-запросов по пути “/” и связываем их с соответствующими функциями обратного вызова2.
//Маршруты в Node.js - это механизм, который позволяет определить, как приложение должно реагировать на клиентские запросы к конкретным URL-адресам1. В Express.js маршруты определяются с помощью методов маршрутизатора, которые предоставляются объектом express.Router1. Маршруты могут быть связаны с определенными обработчиками2.
router.route('/:id').get(subject.get);
router.route('/').post(subject.create);
router.route('/').get(subject.getAll);
router.route('/:id').put(subject.update);
router.route('/:id').delete(subject.delete);

module.exports = router;
