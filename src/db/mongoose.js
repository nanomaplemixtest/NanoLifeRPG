const mongoose = require('mongoose')
try{

    url = process.env.MONGOLAB_URI || 'mongodb+srv://maplenix:admin@cluster0-zhtzh.mongodb.net/test?retryWrites=true'
    console.log(process.env.MONGOLAB_URI)
    mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    console.log('Database Connected')
}catch(e){
    console.log('Fail to connect database')
}


