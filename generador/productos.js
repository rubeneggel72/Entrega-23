const faker= require('faker')
const get=()=>(item={nombre:faker.commerce.product(),precio:faker.finance.amount(),foto:faker.image.technics()})
module.exports={get}