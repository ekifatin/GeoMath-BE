const categoryController = require('../controllers/category');
const router = require('express').Router();

router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.findOne);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);
// router.get('/category/:id', categoryController.getByCategoryId);
// router.get('/level/:id', categoryController.getByLevelId);

module.exports = router;