const mongoose = require('mongoose');
const dbConection=()=>{
var uri = 'mongodb+srv://Eggel:coderhouse@cluster0.iazms.mongodb.net/ecommerce?retryWrites=true&w=majority';
// var uri = 'mongodb://127.0.0.1/ecommerce';

mongoose.connect(uri, {
    
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
     
},err=>{
    if(err) throw new Error('Error de conexion con la base de datos ${err} ]')
    console.log('Base de datos conectada!!!')
})
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
module.exports =dbConection

