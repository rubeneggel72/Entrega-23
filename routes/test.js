const express = require('express');
const generador=require('../generador/productos')

const mensajeRouter = express.Router();


mensajeRouter
    .route('/')
    .get(function (req, res) {
        let cant= req.query.cant || 10
        items=[];
        for(let i=0;i<cant;i++){
            let item=generador.get();
            item.id=i+1;
            items.push(item);
        }
        if (cant==0)  res.json('No hay productos')
        else
            res.json(items);
        });
    
module.exports = mensajeRouter;