const UserModel = require('../entities/models/User')
const jwt = require('jsonwebtoken')
const app = require('../app')
const bcrypt = require('bcrypt')


module.exports={
    AuthenticationMiddleWare : (req,res,next)=>{
    //need to implement the route logic behind 
        const User = res.locals.User

        const payload = {
            userId:User.userId,name:User.name,status:User.status
        }

        const token = jwt.sign(payload,process.env.APP_JWT_SECRET)
        
        res.send({
            token
        })
    },
    CheckIfUserExists:async (req,res,next)=>{

        const {LoginId,Pw}=req.body

        const User = await UserModel.findOne({userId:LoginId})

        const IsUser = await bcrypt.compareSync(Pw,User.password)
        
        if(IsUser){
            res.locals.User=User
            next()
        }else{
            res.status(404).send('User does not exist')
        }

    },
}