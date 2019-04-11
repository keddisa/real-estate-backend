var express = require('express')

var router = express.Router()
var properties = require('./api/properties.route')
var years = require('./api/years.route')
var userRoutes = require('./api/user.route');

router.use('/properties', properties);
// router.use('/property-images', images);
// router.use('/clients', clients);
// router.use('/years', years);
// router.use('/user', userRoutes);

module.exports = router;