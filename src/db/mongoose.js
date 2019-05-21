try{
    const mongoose = require('mongoose')

    mongoose.connect('mongodb+srv://maplenix:admin@cluster0-zhtzh.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    console.log('Database Connected')
}catch(e){
    console.log('Fail to connect database')
}


