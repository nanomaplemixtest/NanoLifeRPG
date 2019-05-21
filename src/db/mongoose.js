const mongoose = require('mongoose')
try{
    mongoose.connect('mongodb+srv://admin:admin@cluster0-abq5f.gcp.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    console.log('Database Connected')
}catch(e){
    console.log('Fail to connect database')
}


