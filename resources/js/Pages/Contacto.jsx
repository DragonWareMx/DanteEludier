import React from "react";
import Layout from "../layouts/Layout";
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';
import FormHelperText from '@material-ui/core/FormHelperText';
import { InertiaHead } from '@inertiajs/inertia-react';

import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import {
    FormControl,
    makeStyles,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import MessageIcon from "@material-ui/icons/Message";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";

import "/css/contacto.css";
import "/css/inicio.css";

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

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
}));

const Contacto = () => {
    const classes = useStyles();

    const { errors, status } = usePage().props;

    const [values, setValues] = React.useState({
        _method: 'post',
        nombre: '',
        email: '',
        mensaje: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    //manda el forumulario
    function handleSubmit(e) {
        const button = document.getElementById('boton-contacto');
        button.disabled = true;
        e.preventDefault()
        Inertia.post(route('contactoSend'), values,
            {
                onError: () => {
                    button.disabled = false;
                },
                onSuccess: () => {
                    button.disabled = false;
                },
                preserveScroll: (page) => Object.keys([page.props.status, page.props.errors]).length,
            }
        )
    }

    return (
        <>
            <InertiaHead>
                <meta property="og:title" content="Dante Eludier Master coach"/>
                <meta property="og:description" content="Liberando el potencial humano para el bien común"/>
                <meta property="og:image" content="/img/portadas/cuentas.jpg"/>
                <meta property="og:url" content="https://danteeludier.com/contacto"/>
                <meta property="og:type" content="website"/>
            </InertiaHead>
            
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
                    <h1
                        className="display-3 font-weight-bold"
                        style={{
                            fontFamily: "Roboto Slab",
                        }}
                    >
                        Contacto
                    </h1>
                    <p
                        className="font-weight-light lead"
                        style={{ color: "#E2E2E2", fontWeight: "300" }}
                    >
                        Tu felicidad financiera a un clic
                    </p>
                </div>
            </div>

            {/* CARD DE PRODUCTOS */}
            <Grid
                container
                justify="center"
                style={{ backgroundColor: "#E5E5E5" }}
            >
                <div className="inicio_rounded" style={{ zIndex: "2" }}>
                    <div className="row p-5">
                        <form className="col-md-5" onSubmit={handleSubmit}>
                            <h1
                                className="text-center text-md-left"
                                style={{
                                    fontFamily: "Roboto Slab",
                                    fontWeight: "bold",
                                }}
                            >
                                Escríbeme y cuéntame cómo puedo ayudar...
                            </h1>
                            <div className="d-flex pt-4">
                                <AccountCircle
                                    className="align-self-end"
                                    style={{ color: "#BFBFBF" }}
                                />
                                <TextField
                                    error={errors.nombre ? true : false}
                                    className="ml-2"
                                    id="nombre"
                                    label="Nombre"
                                    fullWidth
                                    required
                                    value={values.nombre}
                                    onChange={handleChange('nombre')}
                                />
                                {errors.nombre &&
                                    <FormHelperText id="component-error-text" style={{color:'red'}}>{errors.nombre}</FormHelperText>
                                }
                            </div>
                            <div className="d-flex pt-4">
                                <MailIcon
                                    className="align-self-end"
                                    style={{ color: "#BFBFBF" }}
                                />
                                <TextField
                                    error={errors.email ? true : false}
                                    className="ml-2"
                                    id="email"
                                    label="Correo electrónico"
                                    fullWidth
                                    required
                                    type={'email'} 
                                    value={values.email}
                                    onChange={handleChange('email')}
                                />
                                {errors.email &&
                                    <FormHelperText id="component-error-text" style={{color:'red'}}>{errors.email}</FormHelperText>
                                }
                            </div>
                            <div className="d-flex pt-4">
                                <MessageIcon
                                    className="align-self-end"
                                    style={{ color: "#BFBFBF" }}
                                />
                                <TextField
                                    error={errors.mensaje ? true : false}
                                    className="ml-2"
                                    id="mensaje"
                                    label="Mensaje"
                                    fullWidth
                                    required
                                    value={values.mensaje}
                                    onChange={handleChange('mensaje')}
                                />
                                {errors.mensaje &&
                                    <FormHelperText id="component-error-text" style={{color:'red'}}>{errors.mensaje}</FormHelperText>
                                }
                            </div>
                            <div className="d-flex justify-content-center justify-content-md-end pb-4 pb-md-0">
                                <ColorButton
                                    variant="contained"
                                    color="primary"
                                    className="mt-4"
                                    size="large"
                                    id='boton-contacto'
                                    type='submit'
                                >
                                    ENVIAR
                                </ColorButton>
                            </div>
                            {status &&
                                <FormHelperText id="component-text" style={{ color: "green" ,fontSize:16}}>{status}</FormHelperText>
                            }
                        </form>
                        <div className="col-md-2"></div>
                        <div className="col-md-5">
                            <h5
                                className="text-center text-md-left"
                                style={{ color: "#999999", fontWeight: "500" }}
                            >
                                DANTE ELUDIER
                            </h5>
                            <div className="pt-5">
                                <div className="d-flex justify-content-center justify-content-md-start">
                                    <RoomIcon />
                                    <h5>UBICACIÓN</h5>
                                </div>
                                <p className="text-center text-md-left">
                                    Cananea 850, Colonia, 60160 Uruapan, Mich.
                                </p>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9860.817331318385!2d-102.04956979303141!3d19.397971554628796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842de2f5abcb663f%3A0xbd3b205d27ac781b!2sCananea%20850%2C%20Colonia%2C%2060160%20Uruapan%2C%20Mich.!5e0!3m2!1ses!2smx!4v1624033053982!5m2!1ses!2smx" width="300" height="225" style={{border: '0'}} allowfullscreen="" loading="lazy"></iframe>
                            </div>
                            <div className="pt-5">
                                <div className="d-flex justify-content-center justify-content-md-start">
                                    <PhoneIcon />
                                    <h5>TELÉFONO</h5>
                                </div>
                                <p className="text-center text-md-left">
                                    +52 452 182-0018
                                </p>
                            </div>
                            <div className="text-center text-md-left">
                                <ColorButton
                                    variant="contained"
                                    color="primary"
                                    className="mt-4"
                                    startIcon={<WhatsAppIcon />}
                                    size="large"
                                    href="https://api.whatsapp.com/send/?phone=524521820018&text&app_absent=0"
                                    target="_blank"
                                    style={{color: 'white'}}
                                >
                                    ENVÍANOS UN MENSAJE
                                </ColorButton>
                            </div>
                        </div>
                    </div>
                    <div
                        className="text-center mb-4 mr-4 ml-4"
                        style={{ color: "#5C5C5C" }}
                    >
                        <small>
                            Este sitio está protegido por reCaPTCHA y aplican
                            las Política de privacidad y los Términos de
                            servicio de Google.
                        </small>
                    </div>
                </div>
            </Grid>
            {/* 
            <div style={{ backgroundColor: "#E5E5E5", height: "80vh" }}>
                <div className="contacto_rounded">
                    <div className="row p-5">
                        <div className="col-md-5">
                            <h1>Escríbeme y cuéntame cómo puedo ayudar...</h1>
                            <div className="d-flex pt-4">
                                <AccountCircle className="align-self-end" />
                                <TextField
                                    className="ml-2"
                                    id="nombre"
                                    label="Nombre"
                                    fullWidth
                                />
                            </div>
                            <div className="d-flex pt-4">
                                <MailIcon className="align-self-end" />
                                <TextField
                                    className="ml-2"
                                    id="correo"
                                    label="Correo electrónico"
                                    fullWidth
                                />
                            </div>
                            <div className="d-flex pt-4">
                                <MessageIcon className="align-self-end" />
                                <TextField
                                    className="ml-2"
                                    id="mensaje"
                                    label="Mensaje"
                                    fullWidth
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <ColorButton
                                    variant="contained"
                                    color="primary"
                                    className="mt-4"
                                >
                                    ENVIAR
                                </ColorButton>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <h4>DANTE ELUDIER</h4>
                            <div className="pt-5">
                                <div className="d-flex">
                                    <RoomIcon />
                                    <h5>UBICACIÓN</h5>
                                </div>
                                <p>
                                    Cananea 850, Colonia, 60160 Uruapan, Mich.
                                </p>
                            </div>
                            <div className="pt-5">
                                <div className="d-flex">
                                    <PhoneIcon />
                                    <h5>TELÉFONO</h5>
                                </div>
                                <p>
                                    +52 452 130-0576
                                    <br />
                                    +52 443 155-1753
                                </p>
                            </div>
                            <ColorButton
                                variant="contained"
                                color="primary"
                                className="mt-4"
                                startIcon={<WhatsAppIcon />}
                            >
                                ENVÍANOS UN MENSAJE
                            </ColorButton>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

Contacto.layout = (page) => (
    <Layout children={page} title="Contacto" pageTitle="Contacto" />
);

export default Contacto;
