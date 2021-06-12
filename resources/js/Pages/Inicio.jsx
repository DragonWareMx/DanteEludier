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
                <div className="portadaInicio">
                    <img src="/img/portadas/portadaInicio3.png"></img>
                </div>
                <Grid container direction="row" justify="center" alignItems="center" style={{marginTop:48,paddingBottom:150}}>
                    <a href="" target="_blank" style={{marginLeft:12,marginRight:12}}><FacebookIcon    style={{color:'#FFFFFF'}}></FacebookIcon></a>
                    <a href="" target="_blank" style={{marginLeft:12,marginRight:12}}><TwitterIcon     style={{color:'#FFFFFF'}}></TwitterIcon></a>
                    <a href="" target="_blank" style={{marginLeft:12,marginRight:12}}><InstagramIcon   style={{color:'#FFFFFF'}}></InstagramIcon></a>
                    <a href="" target="_blank" style={{marginLeft:12,marginRight:12}}><YouTubeIcon     style={{color:'#FFFFFF'}}></YouTubeIcon></a>
                </Grid>
            </div>
            <Grid container justify="center" style={{backgroundColor:'#E5E5E5'}}>
                <div className="inicio_rounded">
                    <div style={{height:380}}>olña</div>
                </div>
                <Grid item xs={12}>olas</Grid>
            </Grid>  
        </>
    )
}

Inicio.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio" />

export default Inicio