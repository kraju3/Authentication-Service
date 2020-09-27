const mongoose = require('mongoose');


const DB_ENDPOINT = process.env.DB_ENDPOINT;

mongoose.connect(DB_ENDPOINT,
                {useNewUrlParser:true,useUnifiedTopology:true},
                (err)=>{
                    if (err) throw err
                    
                    console.log('DB Connected')

                })

