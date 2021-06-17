import React from 'react';
import Grid from '@material-ui/core/Grid';

//CSS
import '/css/inicio.css';
import '/css/libros.css';

//iconos
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function Libro(){
    return (
        <>
            <Grid container style={{marginBottom:25}}>
                <div className='libros_left'>
                    <Grid className="libro_titulo">Dinero Espiritual</Grid>
                    <Grid className='libro_subtitulo'>Filosofía financiera para una vida plena</Grid>
                    <Grid className='libro_resumen'>
                        Comenzarás un viaje lleno de espiritualidad, éxito y realización duraderos. Este libro puede significar para ti el inicio de una vida con la que otros apenas pueden soñar: la vida que te mereces.<br></br>
                        Este libro tiene como objetivo tocar esos puntos sensibles en tu interior, al leerlo, comenzarás a eliminar lo que está encerrado y te impide creer que puedes tener la vida que siempre has sabido que es posible para ti.
                    </Grid>

                    {/* Hay dos botones de comprar */}
                    <Grid item xs={12} style={{marginTop:20,marginLeft:55}}><a href='https://www.amazon.com.mx/Dinero-Espiritual-Filosofía-financiera-plena-ebook/dp/B08VCFFQSB' target="_blank" className='libro_comprar'><ShoppingCartIcon></ShoppingCartIcon>COMPRAR</a></Grid>
                </div>
                <div className="libros_right">
                    <img src="/img/books/libro2.png" className="libro_img3"></img>
                </div>
                 {/* Hay dos botones de comprar */}
                 <Grid className="libro_comprar2Grid" item xs={12}><a href='https://www.amazon.com.mx/Dinero-Espiritual-Filosofía-financiera-plena-ebook/dp/B08VCFFQSB' target="_blank" className='libro_comprar2'><ShoppingCartIcon style={{marginRight:10}}></ShoppingCartIcon>COMPRAR</a></Grid>
            </Grid>
        </>
    );
}