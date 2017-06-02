var express = require('express');
var router = express.Router();
var ctrlDashboard = require('../controllers/profile');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'LawyerHub' });
});*/
//router.get('/dashboard/profile',ctrlDashboard.profile);
router.get('/profile/:userEmailId',profile.handle);
module.exports = router;
