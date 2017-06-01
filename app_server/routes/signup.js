var express = require('express');
var router = express.Router();
var ctrlSignup = require('../controllers/signup');
var bodyParser = require('body-parser');
//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: false }));
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'LawyerHub' });
});*/
router.get('/signup/:userType',ctrlSignup.signup);
router.get('/signup/confirmation/:userType/:emailid/:key1/:key2',ctrlSignup.verifySignupLink);
router.get('/createAccount',ctrlSignup.action);

module.exports = router;
