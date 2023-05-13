const router = require('express-promise-router')();

const { file } = require('../controllers');
router.route('/:id').get(file.get);
router.route('/').post(file.create);
router.route('/').get(file.getAll);
router.route('/:id').put(file.update);
router.route('/:id').delete(file.delete);

module.exports = router;
