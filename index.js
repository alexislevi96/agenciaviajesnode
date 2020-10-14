// const express = require('express');
import express from "express"

const app = express();

//Definir puerto
const port = process.env.PORT || 4000


app.get('/', (req, res)=>{ //req - lo que enviamos y res - lo que express nos responde
    res.send('Inicio');
})

app.get('/nosotros', (req, res)=>{ 
    res.send('Nosotros');
})

app.get('/contacto', (req, res)=>{ 
    res.send('Contacto');
})


app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})