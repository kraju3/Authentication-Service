const mongoose = require('mongoose');

const UserSchema =  new mongoose.Schema({
    userId:{type:String},
    name:{type:String},
    password:{type:String},
    status:{type:Object},

})


const UserModel = mongoose.model('users',UserSchema)

module.exports=UserModel