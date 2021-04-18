const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const mensajeSchema = new Schema({

  message: {
    type: String
    },
  user: {
    userEmail:{type: String},
    username:{type: String},
    userApellido:{type: String},
    userAlias:{type: String},
    userAvatar:{type: String}
  },
  username:{type: String},
  date: { type: Date, default: Date.now }
},
 { collection: 'mensajes' })

mensajeSchema.plugin(AutoIncrement, { id: 'id_seq', inc_field: 'id' });
module.exports = mongoose.model('mensajesDb', mensajeSchema);

