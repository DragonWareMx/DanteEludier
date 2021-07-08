import React from "react";
import Layout from "../layouts/Layout";
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import FormHelperText from '@material-ui/core/FormHelperText'

//componentes
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";



//estilos
import "/css/contacto.css";
import "/css/inicio.css";
//import "/css/documents.css";

import {
    FormControl,
    makeStyles,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { maxHeight } from "@material-ui/system";
import route from "ziggy-js";
import Grid from "@material-ui/core/Grid";


const RoundedButton = withStyles((theme) => ({
    root: {
        color: "#717171",
        "&:hover": {
            color: "#FFFFFF",
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

const Boleto = ({boleto, rol}) => {
    const { errors, status } = usePage().props;
    
    return (
        <>
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
                        Boleto
                    </h1>
            </div>
                {/* CARD DE PRODUCTOS */}
                <Grid
                    container
                    justify="center"
                    style={{ backgroundColor: "#E5E5E5" }}
                >
                    <div className="inicio_rounded" style={{ zIndex: "2" }} >
                        <div className="row p-5">
                            <div className="col-md-5" >
                                {status &&
                                <FormHelperText id="component-text" style={{ color: "green" ,fontSize:16}}>{status}</FormHelperText>
                                }            
                                
                                <h2
                                        className="text-center text-md-left"
                                        style={{
                                            fontFamily: "Roboto Slab",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Evento: <InertiaLink href={route('evento',boleto.event.product.id)}>{boleto.event.product.titulo}</InertiaLink>
                                </h2>
                                <h3
                                        className="text-center text-md-left"
                                        style={{
                                            fontFamily: "Roboto Slab",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Lugar: {boleto.event.ciudad}
                                </h3>
                                <h3
                                        className="text-center text-md-left"
                                        style={{
                                            fontFamily: "Roboto Slab",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Sede: {boleto.event.sede}
                                </h3>
                                <h3
                                        className="text-center text-md-left"
                                        style={{
                                            fontFamily: "Roboto Slab",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Usuario: {boleto.purchase.user.name}
                                </h3>
                                
                                
                                
                                { rol == 'CheckTicket' ?
                                
                                <Link rel="stylesheet" href={route('check', boleto.uuid)} style={{textDecoration: 'none'}}>
                                    <RoundedButton
                                        variant="outlined"
                                        size="large"
                                        style={{margin : '20px'}}
                                    >
                                        MARCAR ASISTENCIA
                                        
                                    </RoundedButton>
                                </Link>
                                :
                                <Link rel="stylesheet" href={route('diploma', boleto.uuid)} style={{textDecoration: 'none'}}>
                                    <RoundedButton
                                        variant="outlined"
                                        size="large"
                                        style={{margin : '20px'}}
                                    >
                                        Solicitar constancia
                                        
                                    </RoundedButton>
                                </Link>
                                }
                            </div>
                            <div className="col-md-2"></div>
                            <div className="col-md-5">
                                <img src={"/img/events/" +
                                        boleto.event.product.images["0"].foto} 
                                        width='90%'
                                />
                            </div>  
                        </div>
                    </div>
                </Grid>
        </div>
            
        </>
    );
};

Boleto.layout = (page) => (
    <Layout children={page} title="Boleto" pageTitle="Tu boleto" />
);

export default Boleto;
