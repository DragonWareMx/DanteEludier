import React from "react";
import Layout from "../layouts/Layout";
import { InertiaLink } from '@inertiajs/inertia-react'

import Grid from '@material-ui/core/Grid';

import '/css/inicio.css';
import "/css/contacto.css";

//componentes
import Club from '../components/Club';
import Libro from '../components/Libro';
import Libro2 from '../components/Libro2';


const Libros = () => { 
    return (
        <>
            <div style={{ backgroundColor: "#000000" }}>
                <div className="portadaContacto">
                    <img
                        src="/img/portadas/book.jpg"
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
                    <h1 className="display-3 font-weight-bold">Libros</h1>
                    <p className="font-weight-light lead">
                        Liberando el potencial humano para el bien común
                    </p>
                </div>
            </div>

            {/* WHITE CARD */}
            <Grid container justify="center" style={{backgroundColor:'#E5E5E5'}}>
                <div className="inicio_rounded" style={{zIndex:9}}>
                    {/* Aplicando padding */}
                    <div className="row p-1">
                        <Libro />
                        <Libro2 />
                    </div>
                    <Club />
                </div>
            </Grid>

        </>
    );
};

Libros.layout = (page) => (
    <Layout children={page} title="Libros" pageTitle="Libros" />
);

export default Libros;
