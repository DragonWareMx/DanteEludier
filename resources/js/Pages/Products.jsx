import React from "react";
import Layout from "../layouts/Layout";

import Grid from '@material-ui/core/Grid';

//componentes
import Product from '../components/Product';

//iconos

//estilos
import "/css/contacto.css";
import "/css/products.css";
import '/css/inicio.css';

import { FormControl, makeStyles, InputLabel, Select, MenuItem  } from "@material-ui/core";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
  }));

const Products = ({products}) => {
    const classes = useStyles();
    const [orden, setOrden] = React.useState('');

    const handleChange = (event) => {
        setOrden(event.target.value);
    };

    function calcularPrecioMasBajo(eventos){
        let precio = null;

        eventos.forEach(evento => {
            if(!precio){
                precio = evento.precio
                return
            }
            if(precio > evento.precio)
                precio = evento.precio
        });
        return precio
    }

    return (
        <>
            {/* HEADER */}
            <div style={{ backgroundColor: "#000000" }}>
                <div className="portadaContacto">
                    <img
                        src="/img/portadas/team.jpg"
                        className="img-fluid"
                    ></img>
                </div>
                <div
                    className="text-center"
                    style={{
                        color: "#FFFFFF",
                        position: "absolute",
                        top: "30%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <h1 className="display-3 font-weight-bold">Productos</h1>
                    <p className="font-weight-light lead">
                        Vive una reprogramación PERSONAL - FINANCIERA
                    </p>
                </div>
            </div>


            {/* CARD DE PRODUCTOS */}
            <Grid container justify="center" style={{backgroundColor:'#E5E5E5'}}>
                <div className="inicio_rounded" style={{zIndex: "2"}}>
                <Container fixed maxWidth="lg">
                    <Grid container justify="space-between" alignItems="center" className="producto_container producto_titulo">
                        <Grid style={{paddingTop: "26px", fontSize: "36px", width: "fit-content"}}>Encuentra lo que necesitas</Grid>
                        
                    </Grid>
                </Container>

                    {/* PRODUCTOS */}
                    <Container fixed maxWidth="lg">
                        <Grid container direction="row" spacing={5}>
                            {products && products.data && products.data.length > 0 && products.data.map(product => 
                                <Product key={product.id} 
                                img={(product.images && product.images.length > 0) ? product.images[0].foto : null} 
                                name={product.titulo}
                                price={(product.events && product.events.length > 0) ? calcularPrecioMasBajo(product.events) : null} />
                            )}
                        </Grid>
                    </Container>
                </div>
            </Grid>  
        </>
    );
};

Products.layout = (page) => (
    <Layout children={page} title="Productos" pageTitle="Productos" />
);

export default Products;