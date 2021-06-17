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

const Contacto = ({productos}) => {

    const classes = useStyles();
    const [orden, setOrden] = React.useState('');

    const handleChange = (event) => {
        setOrden(event.target.value);
    };

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
                        
                        <Grid style={{paddingTop: "26px"}} className="ordenar_por" container  justify="flex-end" alignItems="center" item>
                            <Grid item>
                                Ordenar por
                            </Grid>

                            <Grid item>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <Select
                                    id="demo-simple-select-outlined"
                                    value={orden}
                                    onChange={handleChange}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    >
                                    <MenuItem value="">
                                        <em>Más popular</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Más popular</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                </Container>

                    {/* PRODUCTOS */}
                    <Container fixed maxWidth="lg">
                        <Grid container direction="row" spacing={5}>
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                        </Grid>
                    </Container>
                </div>
            </Grid>  
        </>
    );
};

Contacto.layout = (page) => (
    <Layout children={page} title="Productos" pageTitle="Productos" />
);

export default Contacto;