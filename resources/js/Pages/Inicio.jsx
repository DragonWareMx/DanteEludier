import React from 'react';
import Layout from '../layouts/Layout';
import '/css/inicio.css';
import '/css/dante.css';
import Grid from '@material-ui/core/Grid';
import { InertiaHead } from '@inertiajs/inertia-react'

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
import WorkIcon from '@material-ui/icons/Work';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

const Inicio = ({clientes, libro}) => {
    return (
        <>
            <InertiaHead>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="@DANTEELUDIER"/>
            <meta name="twitter:creator" content="@DANTEELUDIER"/>
            <meta property="og:title" content="Dante Eludier Master coach"/>
            <meta property="og:description" content="Liberando el potencial humano para el bien común"/>
            <meta property="og:image" content="/img/portadas/portada1.jpg"/>
            <meta property="og:url" content="https://danteeludier.com"/>
            <meta property="og:type" content="website"/>
            </InertiaHead>
            
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
                    <Libro libro={libro}/>
                    <Club />
                    <Clientes clientes={clientes}/>
                </div>
            </Grid>

            {/* MISION, VISION, VALORES */}
            <Grid container alignItems="stretch" justify="center" className="box-mision-vision p-4">
                <Grid item xs={12} className="ayudar_title">¿Cómo te puedo ayudar?</Grid>
                <Grid container item xs={12} sm={6} md={4} spacing={0} justify="center" className="p-5 divider">
                    <SchoolIcon className="ayuda_icons"></SchoolIcon>
                    <Grid className="p-4 title-box-m-v">Talleres</Grid>
                    <Grid className="text-center txt-box-m-v">Asiste y transforma tu vida y tus finanzas.</Grid>
                </Grid>
                <Grid container item xs={12} sm={6} md={4} spacing={0} justify="center" className="p-5 divider">
                    <WorkIcon className="ayuda_icons"></WorkIcon>
                    <Grid className="p-4 title-box-m-v">Mentoría</Grid>
                    <Grid className="text-center txt-box-m-v">Descubre el empresario que de verdad eres.</Grid>
                </Grid>
                <Grid container item xs={12} sm={6} md={4} spacing={0} justify="center" className="p-5">
                    <WbIncandescentIcon className="ayuda_icons"></WbIncandescentIcon>
                    <Grid className="p-4 title-box-m-v">Gestión de talento</Grid>
                    <Grid className="text-center txt-box-m-v">Formación de equipos de alto rendimiento.</Grid>
                </Grid>
            </Grid>

            {/* LA ViDA DA CUaNDO MERECES */}
            <div className="inicio_vida">
                <img src="/img/portadas/vida.jpg"></img>
            </div>
        </>
    )
}

Inicio.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio" />

export default Inicio