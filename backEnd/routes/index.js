var express = require('express');
var router = express.Router();
const routeFunc = require('../controls/user_routerfunction')
const middleWare = require('../controls/middlewares')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//register user
router.post('/',routeFunc.registerRoute);

//login with google
router.post('/googleLogin',routeFunc.google)

//User Login //
router.post('/login',routeFunc.loginRoute);

//prevent back
router.post('/preventBack',routeFunc.checkToken);

//user post
router.post('/userPost',routeFunc.userPostR)

//get user posts
router.get('/getPost',routeFunc.getPost)

// get users profile pics
router.get('/userProfile',routeFunc.getProPics)

//save user comments
router.post('/comments',routeFunc.saveComments)

//get the comments
router.get('/getComments',routeFunc.getComments)

//edit user profile
router.patch('/editProfile',routeFunc.editProfile)

//create like collection
router.post('/createLike',routeFunc.createLike)

//create contest
router.post('/createContest',middleWare.decodeToken,routeFunc.createContest)

//get contest
router.get('/getContest',routeFunc.getContest)

//get the contest details
router.get('/singleContest',routeFunc.getSingleContest)



module.exports = router;
