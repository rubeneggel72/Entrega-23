const { normalize,denormalize, schema }=require ('normalizr');
const messagesNormalize=(data)=>{
    const mensajes={'mensajes':(data)}
    console.log(data)
    console.log('aaaa')

const mensajeSchema = new schema.Entity('mensajes');
const userSchema = new schema.Entity('users');
const mensajeList = new schema.Array(mensajeSchema);
mensajeSchema.define({
  user: userSchema,
});
const normalized = normalize(mensajes, {
  mensajes: mensajeList,
})

console.log(JSON.stringify(normalized))

return(normalized)
}

module.exports=messagesNormalize;