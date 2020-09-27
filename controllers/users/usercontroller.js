const UserModel = require('../../entities/models/User')

module.exports={
    GiveAllUsers:async(req,res,next)=>{
        const Users = await UserModel.find()
        console.log(Users)
        res.send(JSON.stringify(Users))
        next()
    }
}