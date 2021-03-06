const UserModel = require('../../entities/models/User')

module.exports={
    GiveAllUsers:async(req,res,next)=>{
        const Users = await UserModel.find()
        res.json(Users)
///next()
    },
    GetUserById:async(req,res,next)=>{
        const {id} = req.params
    
        const User = await UserModel.findOne({userId:id})

        res.json(User)

    }
}