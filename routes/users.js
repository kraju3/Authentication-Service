var express = require('express');
var router = express.Router();

const {AuthenticationMiddleWare,CheckIfUserExists} =require('../auth/authentication');
const {AuthorizationMiddleWare} =require('../auth/authorization');
const {app} = require('../app');
const UserModel = require('../entities/models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/** Login Functionality  */

router.post('/login',CheckIfUserExists,AuthenticationMiddleWare);

router.post('/register',async (req,res,next)=>{
    const {userId,name,status,password} =req.body

    await new UserModel({
      userId,name,status,password
    }).save((err,product)=>{
        res.json(product)
    })
})


/** Add Authorization and Define all thee routes after Authentication */

router.use(AuthorizationMiddleWare)


router.get('/home',(req,res,next)=>{
  res.send("Home page now")
})



module.exports = router;
