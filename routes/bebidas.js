const express = require('express');
const router = express.Router();
const BebidasControllers = require('../controllers/BebidasControllers');

router.post('/', BebidasControllers.create);
router.get('/', BebidasControllers.getAll);
router.get('/:id', BebidasControllers.get);
router.put('/:id', BebidasControllers.update);
router.delete('/:id', BebidasControllers.delete);

module.exports = router;