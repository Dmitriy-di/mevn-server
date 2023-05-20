const router = require('express-promise-router')();
const { checkJWTSign } = require('../middlewares/jwtCheck.middleware');

const { group } = require('../controllers');

router.route('/:id').get(checkJWTSign, group.get);
router.route('/').post(group.create);
router.route('/').get(checkJWTSign, group.getAll);
router.route('/:id').put(group.update);
router.route('/:id').delete(group.delete);

module.exports = router;
