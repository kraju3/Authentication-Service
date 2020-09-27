const UserModel = require('../../entities/models/User')
const jwt = require('jsonwebtoken')
const app = require('../../app')
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

        await UserModel.findOne({userId:LoginId},async (err,user)=>{
            if(err) throw err

            if(!user){
                res.status(401).json({"Authorization":"Failed!User does not exist"})
            }

            const IsUser = await bcrypt.compareSync(Pw,user.password)

            if(IsUser){
                res.locals.User=user
                next()
            }else{
                res.status(404).send('Credentiials are wrong')
            }
    


        })
        
    },
}