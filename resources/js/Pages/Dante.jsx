import React from "react";
import Layout from "../layouts/Layout";
import { InertiaLink } from '@inertiajs/inertia-react'
import { withStyles } from "@material-ui/core/styles";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import Grid from '@material-ui/core/Grid';

import "/css/contacto.css";
import '/css/inicio.css';
import '/css/dante.css';
import '/css/libros.css';

//componentes
import Club from '../components/Club';


const Dante = () => { 
    return (
        <>
            <div style={{ backgroundColor: "#000000" }}>
                <div className="portadaContacto">
                    <img
                        src="/img/portadas/team21.png"
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

            {/* WHITE CARD */}
            <Grid container justify="center" style={{backgroundColor:'#E5E5E5'}}>
                <div className="inicio_rounded">
                    {/* Aplicando padding */}
                    <div className="row p-1">
                        <h1 className="title-white-card-middle mr-2 ml-2">Yo soy Dante Eludier</h1>

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
                            
                        </Grid>

                    </div>
                </div>
            </Grid>

            {/* MISION, VISION, VALORES */}
            <Grid container alignItems="stretch" justify="center" className="box-mision-vision p-4">
                <Grid container item xs={12} sm={6} md={4} spacing={0} justify="center" className="p-5 divider">
                    <Grid className="p-4 title-box-m-v">Misión</Grid>
                    <Grid className="text-center txt-box-m-v">Liberar el potencial humano para el bien común.</Grid>
                </Grid>
                <Grid container item xs={12} sm={6} md={4} spacing={0} justify="center" className="p-5 divider">
                    <Grid className="p-4 title-box-m-v">Visión</Grid>
                    <Grid className="text-center txt-box-m-v">Uno de los Coach / Influencer más reconocidos y aceptados del mercado de habla hispana.</Grid>
                </Grid>
                <Grid container item xs={12} sm={6} md={4} spacing={0} justify="center" className="p-5">
                    <Grid className="p-4 title-box-m-v">Mis valores</Grid>
                    <Grid className="text-center txt-box-m-v">SERVICIO, INTEGRIDAD, AMOR Y GRATITUD</Grid>
                </Grid>
            </Grid>

            <Grid container alignItems="stretch" className="mb-5">
                <Grid container item xs={12} sm={5} className="dante-who">
                    <img src="/img/dante-who.jpg" />
                </Grid>
                <Grid container item xs={12} sm={7} className="p-5" style={{backgroundColor:"white"}}>
                    <div className="div-txt-dante-who">¿Quién es Dante Eludier?</div>
                    <div className="txt-dante-info">Especialista en gestión de la evolución humana, estratega financiero, Coach internacional avalado por Tony Robbins y la Jonh Maxwell Fundation, Autor Best Seller y empresario consumado con gran pasión por el estudio y las investigaciones Neuro-cientificas, dueño y fundador de Axen Capital y Give Fundation.</div>
                    
                    <Grid item xs={12}><InertiaLink href={route('contacto')} className='libro_comprar contact-btn'>CONTÁCTAME</InertiaLink></Grid>
                </Grid>
            </Grid>

            {/* Comunicate conmigo */}
            <Grid container justify="center" style={{backgroundColor:'#E5E5E5'}}>
                <div className="inicio_rounded m-0">
                    <div className="row p-1">
                        <h1 className="title-white-card-middle mr-2 ml-2" style={{fontWeight:"900"}}>Comunícate conmigo</h1>
                        <Grid container alignItems="flex-start" justify="center" className="mb-5">
                            <div className="sub-dante mb-4">DANTE ELUDIER</div>
                            <div className="title-comunication mb-2">UBICACIÓN</div>
                            <div className="text-comunication mb-4">Cananea 850, Colonia, 60160 Uruapan, Mich.</div>
                            <div className="title-comunication mb-2">TELÉFONO</div>
                            <div className="text-comunication mb-4">+52 452 182-0018</div>
                            <Grid container item xs={12} justify="center" className="mt-3"><a href="https://api.whatsapp.com/send/?phone=524521820018&text&app_absent=0" target="_blank" className='libro_comprar contact-btn' style={{width:"235px"}}><WhatsAppIcon style={{marginRight:0}}></WhatsAppIcon>ENVÍANOS UN MENSAJE</a></Grid>
                        </Grid>
                    </div>
                    <Club />
                </div>
            </Grid>
            

        </>
    );
};

Dante.layout = (page) => (
    <Layout children={page} title="+ de Dante" pageTitle="Dante" />
);

export default Dante;
