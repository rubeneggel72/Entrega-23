const Producto = require('../models/productos');

const updateProductosFromDb=()=>{
    Producto.find(function (error, items) {

        if (error) {
            console.log('Error '+error);
            return;
        }
        arrayProductos = items;
    })
}
module.exports = updateProductosFromDb;