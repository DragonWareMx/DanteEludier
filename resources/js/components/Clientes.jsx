import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';


//CSS
import '/css/inicio.css';

//OWL
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


export default function Clientes({clientes}){
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
            <div className="clientes_title">Nuestros Clientes</div>
            <div className='container' style={{marginTop:30,marginBottom:60}}>            
                <OwlCarousel responsive={responsive} className="owl-theme" loop dots={false} margin={20} autoplay autoplayTimeout={2000} autoplayHoverPause>
                    {clientes && clientes.map((cliente, index)=>(
                        <Tooltip key={index} title={cliente.nombre} placement="top-start">
                            <a href={cliente.link}  target="_blank" className="item clientes_item"><img src={"/img/clientes/"+cliente.logo}/></a>
                        </Tooltip>   
                        ))
                    }
                </OwlCarousel>
            </div> 
        </>
    );
}