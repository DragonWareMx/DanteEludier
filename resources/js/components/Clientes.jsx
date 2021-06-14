import React from 'react';
import Grid from '@material-ui/core/Grid';

//CSS
import '/css/inicio.css';
import '/css/libros.css';

//OWL
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function Clientes(){
    const responsive = {
        0: {
            items: 2,
        },
        400: {
            items: 3,
        },
        600: {
            items: 3,
        },
        700: {
            items: 4,
        },
        1000: {
            items: 6,
        }
    }
    return (
        <>
            <div className='container' style={{marginTop:30,marginBottom:60}}>            
                <OwlCarousel responsive={responsive} className="owl-theme" loop dots={false} margin={20}>
                    <div className="item clientes_item"><img src="/img/clientes/5.png"/></div>
                    <div className="item clientes_item"><img src="/img/clientes/2.png"/></div>
                    <div className="item clientes_item"><img src="/img/clientes/3.png"/></div>
                    <div className="item clientes_item"><img src="/img/clientes/4-1.png"/></div>
                    <div className="item clientes_item"><img src="/img/clientes/1.png"/></div>
                    <div className="item clientes_item"><img src="/img/clientes/6.png"/></div>
                    <div className="item clientes_item"><img src="/img/clientes/7.png"/></div>
                    <div className="item clientes_item"><img src="/img/clientes/8.png"/></div>
                </OwlCarousel>
            </div> 
        </>
    );
}