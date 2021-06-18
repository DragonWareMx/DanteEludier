import React from "react";
import Layout from "../layouts/Layout";
import { InertiaLink } from '@inertiajs/inertia-react'
import { withStyles } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import "/css/contacto.css";
import '/css/inicio.css';
import '/css/dante.css';
import '/css/libros.css';
import '/css/stripe.css';


const Stripe = () => {
    return (
        <>
            <div style={{ backgroundColor: "#000000" }}>
                <div className="portadaContacto">
                    <img
                        src="/img/portadas/cuentas.jpg"
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
                    <h1 className="display-3 font-weight-bold">Pago con Stripe</h1>
                </div>
            </div>

            {/* WHITE CARD */}
            <Grid container justify="center" style={{backgroundColor:'#E5E5E5'}}>
                <div className="inicio_rounded">
                    {/* Aplicando padding */}
                    <div className="p-1">
                        <Grid container className="mb-5">
                            <Grid item xs={12} sm={6} className="div-form-container p-4"> 
                                <Grid item xs={12} className="txt-title-tarjeta">Información de la tarjeta</Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Nombre de la tarjeta" variant="outlined" size="small" className="inputs-pago mt-4" />
                                    <TextField id="outlined-basic" label="Dirección" variant="outlined" size="small" className="inputs-pago mt-4" />
                                    <TextField id="outlined-basic" label="Ciudad" variant="outlined" size="small" className="inputs-pago mt-4" />
                                    <TextField id="outlined-basic" label="Estado" variant="outlined" size="small" className="inputs-pago mt-4" />
                                    <TextField id="outlined-basic" label="Código Postal" variant="outlined" size="small" className="inputs-pago mt-4" />
                                </Grid>
                                <Grid item xs={12} className="mt-2 txt-sub-pago">
                                    <img src="/img/icons/stripe-pago.png" />
                                    Tarjeta de crédito  débito
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Número de tarjeta" variant="outlined" size="small" className="inputs-pago" />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6} justify="center" className="p-4"> 
                                <Grid item xs={12} sm={12} md={10} className="div-detalles p-3 mt-3">
                                    <Grid item xs={12} className="txt-title-tarjeta" style={{"textAlign":"center"}}>Detalles de la compra</Grid>
                                    <Grid item xs={12} className="nombre-evento mt-4">Nombre completo del eventeo lorem ipsum dolor sit amet</Grid>
                                    <Grid item xs={12} className="lugar-evento">Lugar, hora, Xalapa Veracruz, Teatro Centro, 16:00 hrs</Grid>
                                    <Grid item xs={12} className="entradas-evento mt-1">2 LUGARES</Grid>
                                    <Grid container className="mt-4">
                                        <Grid item xs={4} className="entradas-evento font-bigger" style={{"color":"#999999"}}>SUBTOTAL</Grid>
                                        <Grid item xs={8} className="entradas-evento font-bigger" style={{"textAlign":"right"}}>$200.00 MXN</Grid>
                                    </Grid>
                                    <Grid container className="mt-2">
                                        <Grid item xs={4} className="entradas-evento font-bigger" style={{"color":"#999999"}}>DESCUENTO</Grid>
                                        <Grid item xs={8} className="entradas-evento font-bigger" style={{"textAlign":"right"}}>-$20.00 MXN</Grid>
                                    </Grid>
                                    <Grid container className="mt-2">
                                        <Grid item xs={4} className="entradas-evento font-bigger" style={{"color":"#999999"}}>TOTAL</Grid>
                                        <Grid item xs={8} className="entradas-evento font-bigger" style={{"textAlign":"right", "fontSize":"15px"}}><b>$180.00 MXN</b></Grid>
                                    </Grid>
                                    <Grid item xs={12}><InertiaLink href="#!" className='pagar-btn mt-5'>PAGAR</InertiaLink></Grid>
                                </Grid>
                            </Grid>
                        </Grid>


                        {/* <h1 className="title-white-card-middle mr-2 ml-2">Yo soy Dante Eludier</h1>

                        <Grid container alignItems="flex-start" justify="center" className="mb-5">
                            <Grid container item xs={12} sm={6} md={4} spacing={0} justify="center" className="p-5 grid-im-dante">
                                <img src="/img/amazon.png" />
                                <Grid container justify="center" className="title-im-dante p-3">ESCRITOR BEST SELLER</Grid>
                                <Grid className="txt-im-dante">El <b>Curso de la Solvencia</b> y <b>Dinero Espiritual</b>, podrás adquirirlos en Amazon o en librerías de prestigio.</Grid>
                            </Grid>
                            <Grid container item xs={12} sm={6} md={4} spacing={0} justify="center" className="p-5 grid-im-dante">
                                <img src="/img/dante.jpg" style={{borderRadius:"150px"}} />
                                <Grid container justify="center" className="title-im-dante p-3">EMPRESARIO</Grid>
                                <Grid className="txt-im-dante"><b>Fundador y CEO</b> de Axen Capital y Give Fundation. </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={6} md={4} spacing={0} justify="center" className="p-5 grid-im-dante">
                                <img src="/img/coach.png" />
                                <Grid container justify="center" className="title-im-dante p-3">MASTER COACH</Grid>
                                <Grid className="txt-im-dante"><b>Finanzas, Desarrollo Humano, Emprendimiento y espiritualidad.</b></Grid>
                            </Grid>
                            
                        </Grid> */}

                    </div>
                </div>
            </Grid>
        </>
    );
};

Stripe.layout = (page) => (
    <Layout children={page} title="Pago con Stripe" pageTitle="Pago con Stripe" />
);

export default Stripe;