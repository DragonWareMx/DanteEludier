import React from 'react';
import Layout from '../layouts/Layout';
import '/css/inicio.css';
import Grid from '@material-ui/core/Grid';

const Inicio = () => {
    return (
        <>
            <div style={{width:'100%',backgroundColor:'#000000'}}>
                <img src=""></img>
                <Grid >

                </Grid>
            </div>  
        </>
    )
}

Inicio.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio" />

export default Inicio