import React from 'react';
import Layout from '../layouts/Layout';
import '/css/inicio.css';
import Grid from '@material-ui/core/Grid';

//Iconos
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

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