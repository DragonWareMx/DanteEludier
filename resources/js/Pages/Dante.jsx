import React from "react";
import Layout from "../layouts/Layout";

import { withStyles } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";

import "/css/contacto.css";
import '/css/inicio.css';
import '/css/dante.css';


const Dante = () => {
    return (
        <>
            <div style={{ backgroundColor: "#000000" }}>
                <div className="portadaContacto">
                    <img
                        src="/img/portadas/team2.jpg"
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
                    <h1 className="display-3 font-weight-bold">+ de Dante</h1>
                    <p className="font-weight-light lead">
                        Coach, Empresario, Escritor Best Seller
                    </p>
                </div>
            </div>
            
            {/* <Grid container justify="center" style={{ backgroundColor: "red", height:"80vh"}}> */}
                {/* WHITE CARD */}
                <div className="contacto_rounded">
                    {/* Aplicando padding */}
                    <div className="row p-5">
                        <h1 className="title-white-card-middle">Yo soy Dante Eludier</h1>

                        <Grid container xs={12} alignItems="flex-start" justify="center">
                            <Grid container item xs={12} sm={6} md={4} spacing={0} justify="center" className="p-5 grid-im-dante">
                                <img src="/img/amazon.png" />
                                <Grid container xs={12} justify="center" className="title-im-dante p-3">ESCRITOR BEST SELLER</Grid>
                                <Grid className="txt-im-dante">El <b>Curso de la Solvencia</b> y <b>Dinero Espiritual</b>, podrás adquirirlos en Amazon o en librerías de prestigio.</Grid>
                            </Grid>
                            <Grid container item xs={12} sm={6} md={4} spacing={0} justify="center" className="p-5 grid-im-dante">
                                <img src="/img/dante.jpg" style={{borderRadius:"150px"}} />
                                <Grid container xs={12} justify="center" className="title-im-dante p-3">ESCRITOR BEST SELLER</Grid>
                                <Grid className="txt-im-dante"><b>Fundador y CEO</b> de Axen Capital y Give Fundation. </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={6} md={4} spacing={0} justify="center" className="p-5 grid-im-dante">
                                <img src="/img/coach.png" />
                                <Grid container xs={12} justify="center" className="title-im-dante p-3">MASTER COACH</Grid>
                                <Grid className="txt-im-dante"><b>Finanzas, Desarrollo Humano, Emprendimiento y espiritualidad.</b></Grid>
                            </Grid>
                            
                        </Grid>
                    </div>
                </div>
            {/* </Grid> */}
        </>
    );
};

Dante.layout = (page) => (
    <Layout children={page} title="+ de Dante" pageTitle="Dante" />
);

export default Dante;
