const utils = require('./resources/utils'); // npm i body-parse ejs express morgan mysql2
const express = require('express')
const app = express()
const morgan=require('morgan')
app.use(morgan('dev'))
const router = require('./routes/main');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', 'views');
app.set('view engine', 'html');
app.use(express.json());
//server listen
app.listen(3000,() =>{
    console.log('Escuchando en el puerto 3000')
})