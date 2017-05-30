var express = require('express');
var router = express.Router();
var ctrlLogin = require('../controllers/login');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'LawyerHub' });
});*/
router.get('/login/:userType',ctrlLogin.login);
router.get('/loginAttempt',ctrlLogin.loginVerifier);

module.exports = router;
