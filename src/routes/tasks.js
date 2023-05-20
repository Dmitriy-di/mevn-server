const router = require('express-promise-router')();
const { checkJWTSign } = require('../middlewares/jwtCheck.middleware');

const { task } = require('../controllers');

router.route('/:id').get(task.get);
router.route('/').post(task.create);
router.route('/').get(checkJWTSign, task.getAll);
// router.route('/').get(task.getAll);
router.route('/:id').put(task.update);
router.route('/:id').delete(task.delete);

module.exports = router;
