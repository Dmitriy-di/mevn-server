const router = require('express-promise-router')();

const { group } = require('../controllers');

router.route('/:id').get(group.get);
router.route('/').post(group.create);
router.route('/').get(group.getAll);
router.route('/:id').put(group.update);
router.route('/:id').delete(group.delete);

module.exports = router;
