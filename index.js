import express from "express"
import router from './routes/index.js'
import db from './config/db.js'
import dotenv from 'dotenv';
dotenv.config( {path: 'variables.env'});

const app = express();


//Conectar base de datos
db.authenticate()
    .then(()=>{
        console.log('Base de datos conectada')
    })
    .catch(error=>{
        console.log(error);
    })
    

//Definir puerto Y HOST
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '4000';

//Habilitar pug
app.set('view engine', 'pug');

//Agregar body parser para leer datos del formulario
app.use(express.urlencoded({extended: true}));

//Agregar la carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/', router);

app.listen(port, host, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})