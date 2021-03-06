var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profile');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'LawyerHub' });
});*/
//router.get('/dashboard/profile',ctrlDashboard.profile);
router.get('/profile/:userEmailId',profileController.handle);
router.get('/profile/get/view',profileController.get);
router.post('/profile/update',profileController.update);
module.exports = router;
