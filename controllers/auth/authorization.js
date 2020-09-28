const UserModel = require('../../entities/models/User')
const jwt = require('jsonwebtoken')


module.exports={
    AuthorizationMiddleWare : (req,res,next)=>{
    //need to implement the route logic behind 

        const token = req.headers.authorization
        
        if (!token){
            res.status(401).json({status:"Credentials expired. Login required"})
        }

        const role = jwt.verify(token,process.env.APP_JWT_SECRET)
        res.locals.role = role
        if(role){
            console.log(role)
            next()
        }else{
            res.status(404).send('Not Authorized')
        }
    },
    checkAdminRole: async (req,res,next)=>{
        let role = res.locals.role
        if(role.status.role!=='admin'){
            res.locals.role=undefined
            res.status(401).send("Invalid User Type for Accessing this Resource")
        }else{
            next()
        }

    }
}