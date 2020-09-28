require('dotenv').config()

process.env.NODE_ENV='test';

let mongoose = require('mongoose');

let UserModel = require('../entities/models/User');

let chai = require('chai');
let axios = require('axios').default
let app = require('../app');
const { assert } = require('chai');

let server = {}


let should = chai.should();

const client = axios.create({
    baseURL: 'http://localhost:4000',
    validateStatus:()=>true,
    withCredentials:true
})


const [admin,user] =[
    {
        userId:"admin",
        password:"test",
        name:"test admin",
        status:{
            role:"admin"
        }
    },
    {
        userId:"user",
        password:"test",
        name:"test user",
        status:{
            role:"user"
        }
    }
]



before(async()=>{

    server = app.listen(4000,()=>{
        console.log("Server listening on port 4000")
    })


    const uri = `mongodb://localhost:27017/AuthServiceTest`

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology:true
    };

    await mongoose.connect(uri, mongooseOpts,(err)=>{
        
        
        if(err) throw err

        console.log("Connected to DB")
    
    
    
    })

})

after(async ()=>{

    setTimeout(async ()=>{
        await mongoose.connection.db.dropCollection('users');
        await mongoose.connection.close()
        await mongoose.disconnect();
        await server.close();
    },1000)
});



describe('Access Right', ()=>{
    
    

    it("should return the User object back on registering",async ()=>{

        const registerUser =  {
            userId:`chaiTest`,
            password:"test",
            name:"test user",
            status:{
                role:"user"
            }
        }
        const response = await client.post('/users/register',registerUser)


        assert.equal(response.status,200)
        assert.equal(response.data.name,'test user','Their names should be the same')

    

    });

    it("should return a token upon login",async ()=>{

        const registerAdmin = await client.post('/users/register',admin)

        assert.equal(registerAdmin.status,200)
        const loginCreds = {
            LoginId:"admin",
            Pw:"test"
        }
    
        const response = await client.post('/users/login',loginCreds)


        assert.equal(response.status,200)
        assert.exists(response.data.token)

    

    });

    it("should only give admin rights to specific routes",async ()=>{

        let token = null;

        const loginCreds = {
            LoginId:"admin",
            Pw:"test"
        }
    

        const response = await client.post('/users/login',loginCreds)

        assert.equal(response.status,200)
        assert.exists(response.data)
        token= response.data.token
        

        const response_ = await client.get('/users/users',{
            headers:{
                "Authorization":token
            }
        })


        assert.equal(response_.status,200)

        
    })
});
