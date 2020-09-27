const UserModel = require('../entities/models/User')
const jwt = require('jsonwebtoken')
const {app} = require('../app')


module.exports={
    AuthorizationMiddleWare : (req,res,next)=>{
    //need to implement the route logic behind 

        const token = req.headers.authorization
        console.log(token)

        const role = jwt.verify(token,process.env.APP_JWT_SECRET)

        if(role){
            next()
        }
        res.status(404).send('Not Authorized')
    }
}