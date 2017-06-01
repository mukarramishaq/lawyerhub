var express = require('express');
var router = express.Router();
var ctrlDashboard = require('../controllers/dashboard');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'LawyerHub' });
});*/
//router.get('/dashboard/profile',ctrlDashboard.profile);
router.get('/dashboard/:userType',ctrlDashboard.dashboard);
router.post('/dashboard/createPost',ctrlDashboard.createPost);
router.post('/dashboard/recentPosts',ctrlDashboard.recentPosts);
module.exports = router;
