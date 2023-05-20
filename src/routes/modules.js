const router = require('express-promise-router')();
const { checkJWTSign } = require('../middlewares/jwtCheck.middleware');

const { modulee } = require('../controllers');
router.route('/:id').get(modulee.get);
router.route('/').post(modulee.create);
router.route('/').get(checkJWTSign, modulee.getAll);
router.route('/:id').put(modulee.update);
router.route('/:id').delete(modulee.delete);

module.exports = router;
