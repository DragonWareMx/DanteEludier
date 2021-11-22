import React from 'react';
import Layout from '../layouts/Layout';
import '/css/adjuntos.css';
import '/css/dante.css';

import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import FolderOpenIcon from '@material-ui/icons/FolderOpen';
//Cosas del tab
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { makeStyles, useTheme } from '@material-ui/core/styles';
//import route from 'color-convert/route';
import route from "ziggy-js";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';



    const responsive = {
        0: {
            items: 1,
        },
        900: {
            items: 2,
        },
        1400: {
            items: 3,
        }
    }


function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box p={3}>
                <Typography>{children}</Typography>
            </Box>
            )}
        </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };

    function a11yProps(index) {
        return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const useStyles = makeStyles({
        root: {
          flexGrow: 1,
        },
    });


    const ColorButton = withStyles((theme) => ({
        root: {
            color: "#FFFFFF",
            backgroundColor: "#323232",
            "&:hover": {
                backgroundColor: "#1F1F1F",
            },
            borderRadius: 20,
        },
    }))(Button);



const Adjuntos = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    return (
        <>
            <div style={{ backgroundColor: "#000000" }}>
                <div className="portadaAdjuntos">
                    <img
                        src="/img/portadas/team2.jpg"
                        className="img-fluid"
                    ></img>
                </div>
                <div
                    className="text-center div-titulo-adjuntos"
                    style={{
                        color: "#FFFFFF",
                        position: "absolute",
                        top: "40%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <h1
                        className="display-4 font-weight-bold text_header_adjuntos"
                        style={{
                            fontFamily: "Roboto Slab",
                        }}
                    >
                        ¡Bienvenido a la tribu!
                    </h1>
                    <p
                        className="font-weight-light lead text_descrip_adjuntos"
                        style={{ color: "#E2E2E2", fontWeight: "300" }}
                    >
                        Felicidades, ya diste el paso
                    </p>
                    <div>
                    <Button
                        id="btn_download"
                        variant="contained"
                        color="primary"
                        className="btn-action"
                        startIcon={< FolderOpenIcon/>}
                        size="large"
                        href="#archivos"
                    >
                        ARCHIVOS
                    </Button>
                    </div>
                </div>


                <Grid
                    id="archivos"
                    container
                    justify="center"
                    alignItems='center'
                    style={{ backgroundColor: "#E5E5E5" }}
                >
                    <div className="inicio_rounded" style={{ zIndex: "2" }} >

                        <div className="p-5">

                            <h3
                                className="text-center"
                                style={{
                                    fontFamily: "Roboto Slab",
                                    fontWeight: "bold",
                                    alignContent: 'center'
                                }}
                            >
                                Archivos disponibles de Avatar financiero
                            </h3>
                            <p
                                className="text-center"
                                style={{
                                    fontFamily: 'Roboto',
                                    alignContent:'center',
                                    color:'#999999'
                                }}
                            >
                                Como egresado del Avatar te queremos compartir las herramientas para que sigas trabajando en tu libertad financiera
                            </p>

                                <AppBar position="static" color="transparent" square={true} variant={'outlined'} >
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        // aria-label="simple tabs example"
                                        TabIndicatorProps={{style: {background:'#999999'}}}
                                        indicatorColor='secondary'
                                        textColor="inherit"
                                        centered

                                    >
                                        <Tab label="PRESUPUESTO MENSUAL" {...a11yProps(0)} />
                                        <Tab label="CERTIFICADO DEL CURSO" {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                                <TabPanel value={value} index={0}>
                                    <Grid container spacing={1} justifyContent="center" alignItems="center">
                                        <Grid item lg={6} md={12}>
                                            <img src="/img/adjunto1.png" className="img-fluid"/>
                                        </Grid>
                                        <Grid item lg={6} md={12}
                                            style={{
                                                fontFamily: 'Roboto',
                                                color:'#999999'
                                            }}
                                        >
                                            Aquí puedes descargar el archivo de excel para llevar tu presupuesto mensual, tal cual se mencionó en el curso.
                                            <div>
                                                <ColorButton
                                                    variant="contained"
                                                    color="primary"
                                                    className="mt-4"
                                                    size="large"
                                                    href="/documentos/PresupuestoMensual.xlsx"
                                                    target="_blank"
                                                    style={{color: 'white'}}
                                                >
                                                    DESCARGAR
                                                </ColorButton>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Grid container spacing={1} justifyContent="center" alignItems="center">
                                        <Grid item lg={3} md={12}>
                                            <img src="/img/adjunto2.png"  className="img-fluid"/>
                                        </Grid>
                                        <Grid item lg={9} md={12}
                                            style={{
                                                fontFamily: 'Roboto',
                                                color:'#999999'
                                            }}
                                        >
                                            Para obtener tu certificado sólo necesitas:
                                            <br />
                                            1. Si ya estás registrado en el sitio de <a href={route('inicio')} target="_blank" style={{textDecoration:'none'}}>danteeludier.com</a>, accede al siguiente enlace e inicia sesión: <a href={route('diploma.general')} target="_blank" style={{textDecoration:'none'}}>https://danteeludier.com/diploma-avatar</a>
                                            <br />
                                            2.- Escribe tu nombre en el campo *Nombre
                                            <br />
                                            3.- Da clic en Generar diploma y espera unos segundos, el sistema generará tu diploma y se descargará en tu computadora o celular.
                                            <br />
                                            <br />
                                            Si no estás registrado en el sitio es necesario registrarte como usuario, puedes hacerlo en el siguiente enlace: <a href='https://danteeludier.com/register' target="_blank" style={{textDecoration:'none'}}> https://danteeludier.com/register </a>
                                            <br />
                                            <br />
                                            En caso de que hayas comprado tu boleto en la página también puedes
                                            <br />
                                            1.- Leer el código QR que recibiste en tu correo, éste te enviará a un enlace del sitio.
                                            <br />
                                            2.- Desde ahí inicia sesión con la cuenta con la que adquiriste tu boleto y da clic en Solicitar Constancia.
                                            <br />
                                            3.- Escribe el nombre en el campo *Nombre
                                            <br />
                                            4.- Da clic en Generar diploma y espera unos segundos para que tu documento se descargue.
                                        </Grid>

                                    </Grid>
                                </TabPanel>
                        </div>
                    </div>
                </Grid>

            </div>

        <div style={{backgroundColor:"black", padding:'30px'}} >
            <div style={{marginBottom: '50px'}}>
                <h3
                        className="text-center"
                        style={{
                            fontFamily: "Roboto Slab",
                            fontWeight: "bold",
                            alignContent: 'center',
                            color:'white'
                        }}
                >
                        Dante quiere compartirte estos videos para tu crecimiento:
                </h3>
            </div>
            <div style={{marginBottom: '50px'}}>


            <OwlCarousel responsive={responsive}
                rewind
                dots={false}
                autoplay
                autoplayTimeout={5000}
                autoplayHoverPause
                margin={10} >
                    <div>
                    <iframe width="400" height="214" src="https://www.youtube.com/embed/iZ-hkoVY6Ec" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div>
                    <iframe  width="400" height="214" src="https://www.youtube.com/embed/8fAJHxQRXHQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div>
                    <iframe width='400' height="214" src="https://www.youtube.com/embed/D7k_bS6K5QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div>
                    <iframe width="400" height="214" src="https://www.youtube.com/embed/AKHvM4V46Ow" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
            </OwlCarousel>
            </div>
        </div>

        <Grid container spacing={3} style={{backgroundColor:'white', padding:'30px'}} justify="center" alignItems='center'>
            <Grid lg={6} md={6} sl={12}>
            <iframe width="95%" height="300" src="https://www.youtube.com/embed/FKSZ6PX-hGw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </Grid>
            <Grid lg={6} md={6} sd={12} >
                <h3
                    className="text-center"
                    style={{
                        fontFamily: "Roboto Slab",
                        fontWeight: "bold",
                        alignContent: 'center'
                    }}
                >
                    ¿Estás listo para el siguiente nivel?
                </h3>
                <p
                    style={{
                        fontFamily: 'Roboto',
                        alignContent:'center',
                        color:'#999999'
                    }}
                >
                    Ya diste el paso, pero ahora es momento de dar un salto y atravesar todo lo que te impide alcanzar tus sueños.
                    Te presentamos el AVATRADING.
                </p>

            </Grid>
        </Grid>
        </>
    )
}

Adjuntos.layout = page => <Layout children={page} title="Bienvenido a la tribu" pageTitle="Avatar" />

export default Adjuntos
