import { Viaje } from "../models/Viaje.js"
import {Testimonial} from '../models/Testimoniales.js'


const paginaInicio = async(req, res)=>{ 
    //req - lo que enviamos y res - lo que express nos responde

    //Consultar 3 viajes del modelo Viaje
    //Utilizamos promise para que haya una cola de consultas a la db
    // y asi se cargue la pagina cuando se termine de hacer todas las querys
    const promisDB = [];
    promisDB.push(Viaje.findAll({limit: 3}));
    promisDB.push(Testimonial.findAll({limit: 3}));
    try {
        const resultado = await Promise.all(promisDB);

        res.render('inicio',{
            pagina : 'Inicio',
            //la clase home es para el estilo css del header 
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        })
    } catch (error) {
        console.log(error);
    }

}

const paginaNosotros = (req, res)=>{ 
    res.render('nosotros',{
        pagina : 'Nosotros'
    })
}

const paginaViajes = async (req, res)=>{ 
    //Consultar viajes a la db
    const viajes = await Viaje.findAll();
    
    res.render('viajes',{
        pagina : 'Próximos Viajes',
        viajes
    })
}

const paginaTestimoniales =  async(req, res)=>{ 
    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales',{
            pagina : 'Testimoniales',
            testimoniales   
        })
    } catch (error) {
        console.log(error);
    }
}

//Muestra un viaje por su slug
const paginaDetalleViaje =  async (req, res)=>{

    const { slug } = req.params;
    try{
        const viaje = await Viaje.findOne({ where : { slug}});
        res.render('viaje',{
            pagina: 'InformacionViaje',
            viaje,
            slug
        })
    } catch (error){
        console.log(error);
    }
}

const pagarviaje = async (req, res) => {
    
    const {slug} = req.params;

    res.render('pagarviaje',{
        pagina: "PAGAR VIAJE",
    })
}


export {paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje, pagarviaje}