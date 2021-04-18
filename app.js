const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const productoRouter = require('./routes/productos');
const testproductoRouter = require('./routes/test'); 
const mensajeRouter = require('./routes/mensajes');
const dbConection=require('./db/dbConection')
const serverConections=require('./server/serverConections')
const updateProductosFromDb=require('./db/updateProductosFromDb')
const updateMessageFromDb= require('./db/updateMessageFromDb')

//Variables globales
global.administrador = true;
global.arrayProductos = [];
global.arrayMensajes = [];
updateMessageFromDb()
//Montaje servidor
serverConections(app)
//Coneccion a base de datos
dbConection()
//Cargar arrayProductos desde base de datos
updateProductosFromDb();
//Middlewares
app.use(bodyParser.json());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'));
app.use("/mensajes", mensajeRouter);
app.use("/productos", productoRouter);
app.use("/vista-test", testproductoRouter);
app.use('/', router);