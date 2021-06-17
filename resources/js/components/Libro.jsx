import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'
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
                    <Grid className="libro_titulo">Recomenzar</Grid>
                    <Grid className='libro_subtitulo'>Una nueva filosofía para la vida y las finanzas</Grid>
                    <Grid className='libro_resumen'>
                        "El primer paso para ser Feliz Financieramente es darte cuenta de lo que te encadena". -Dante Eludier- <br></br>
                        ¿Qué tal si el camino comenzara a tener brújula? ¿Qué tal si el buscar se convirtiera en encontrar?....
                    </Grid>

                    {/* Hay dos botones de comprar */}
                    <Grid item xs={12} style={{marginTop:20,marginLeft:55}}><a href='https://www.amazon.com.mx/dp/B08LQCYK49/ref=cm_sw_r_tw_dp_CFYAK57DV05TQNMH6BX6' target="_blank" className='libro_comprar'><ShoppingCartIcon></ShoppingCartIcon>COMPRAR</a></Grid>
                </div>
                <div className="libros_right">
                    <img src="/img/books/bookSolvencia.jpg" className="libro_img1"></img>
                    <img src="/img/books/img_dante.png" className="libro_img2"></img>
                </div>
                 {/* Hay dos botones de comprar */}
                 <Grid className="libro_comprar2Grid" item xs={12}><a href='https://www.amazon.com.mx/dp/B08LQCYK49/ref=cm_sw_r_tw_dp_CFYAK57DV05TQNMH6BX6' target="_blank" className='libro_comprar2'><ShoppingCartIcon style={{marginRight:10}}></ShoppingCartIcon>COMPRAR</a></Grid>
            </Grid>
        </>
    );
}