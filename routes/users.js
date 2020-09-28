var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')

const {AuthenticationMiddleWare,CheckIfUserExists} =require('../controllers/auth/authentication');
const {AuthorizationMiddleWare,checkAdminRole} =require('../controllers/auth/authorization');

const {GiveAllUsers,GetUserById} = require('../controllers/users/usercontroller')
const UserModel = require('../entities/models/User');
const app = require('../app');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/** Login Functionality  */

router.post('/login',CheckIfUserExists,AuthenticationMiddleWare);

router.post('/register',async (req,res,next)=>{
    const {userId,name,status,password} =req.body
    const hashed = await bcrypt.hash(password,10)

    await new UserModel({
      userId,name,status,password:hashed
    }).save((err,User)=>{

        if(err) throw err;

        res.json(User)
    })
})

/** Add Authorization and Define all thee routes after Authentication */

router.use(AuthorizationMiddleWare)

router.get('/users',checkAdminRole,GiveAllUsers); 
router.get('/user/:id',checkAdminRole,GetUserById)



module.exports = router;
