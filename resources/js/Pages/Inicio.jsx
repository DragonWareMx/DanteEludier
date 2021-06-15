import React from 'react';
import Layout from '../layouts/Layout';
import '/css/inicio.css';
import Grid from '@material-ui/core/Grid';

//componentes
import Libro from '../components/Libro';
import Club from '../components/Club';
import Clientes from '../components/Clientes';

//Iconos
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SchoolIcon from '@material-ui/icons/School';

const Inicio = ({clientes}) => {
    return (
        <>
            <div style={{ height: 60, backgroundColor: "#000000" }}></div>
            <div style={{width:'100%',backgroundColor:'#000000'}}>
                <div className="portadaInicio">
                    <img src="/img/portadas/portada1.jpg"></img>
                </div>
                <Grid container direction="row" justify="center" alignItems="center" style={{marginTop:48,paddingBottom:150}}>
                    <a href="https://www.facebook.com/YoSoyDanteEludier" target="_blank" style={{marginLeft:12,marginRight:12}}><FacebookIcon    style={{color:'#FFFFFF'}}></FacebookIcon></a>
                    <a href="https://twitter.com/DANTEELUDIER" target="_blank" style={{marginLeft:12,marginRight:12}}><TwitterIcon     style={{color:'#FFFFFF'}}></TwitterIcon></a>
                    <a href="https://www.instagram.com/danteeludier/" target="_blank" style={{marginLeft:12,marginRight:12}}><InstagramIcon   style={{color:'#FFFFFF'}}></InstagramIcon></a>
                    <a href="https://www.youtube.com/channel/UC7XJQ4Vrl5dvv4TPW9KpHwQ" target="_blank" style={{marginLeft:12,marginRight:12}}><YouTubeIcon     style={{color:'#FFFFFF'}}></YouTubeIcon></a>
                </Grid>
            </div>
            <Grid container justify="center" style={{backgroundColor:'#E5E5E5'}}>
                <div className="inicio_rounded">
                    <Libro />
                    <Club />
                    <Clientes clientes={clientes}/>
                </div>
            </Grid>
            <Grid container justify="center" className="inicio_ayudar" >
                <Grid item xs={12} className="ayudar_title">¿Cómo te puedo ayudar?</Grid>
                <div style={{marginTop:30,width:'100%'}} className="moradito">
                    <Grid item xs={12} sm={4} justify="center" className="rojito">
                        <SchoolIcon className="ayuda_icons"></SchoolIcon>
                    </Grid>
                </div>
            </Grid>
        </>
    )
}

Inicio.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio" />

export default Inicio