const mongoose = require('mongoose')

const options = { 
    server: { 
      socketOptions: { 
        keepAlive: 300000, connectTimeoutMS: 30000 
      } 
    }, 
    replset: { 
      socketOptions: { 
        keepAlive: 300000, 
        connectTimeoutMS : 30000 
      } 
    } 
  };

mongoose.connect('mongodb+srv://maplenix:admin@cluster0-zhtzh.mongodb.net/test?retryWrites=true', options)