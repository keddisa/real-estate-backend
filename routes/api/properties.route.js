var express = require('express');
var router = express.Router();
const checkAuth = require ('../../middleware/check-auth');

var PropertyController = require('../../controllers/property.controller.js');

router.get('/', PropertyController.getProperties);
router.post('/', 
// checkAuth, 
PropertyController.createProperty);
router.put('/', 
// checkAuth, 
PropertyController.updateProperty);
router.delete('/:id', 
// checkAuth, 
PropertyController.removeProperty);
router.get('/:id', PropertyController.getProperty);

module.exports = router;