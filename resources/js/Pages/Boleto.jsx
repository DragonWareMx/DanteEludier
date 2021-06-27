import React from "react";
import Layout from "../layouts/Layout";
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'

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
import "/css/documents.css";

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
            <div
                    style={{
                        color: "#FFFFFF",
                        marginLeft: '20%',
                        marginRight: '20%'   
                    }}
            >
                {status ? <div>{status}</div> : <div></div>}                
                <p className='parrafo'>Evento: {boleto.event.product.titulo}</p> 
                {/* Hay que ponerle link al nombre del evento para que lo mande a la info del producto */}
                <p className='parrafo'>Lugar: {boleto.event.ciudad}</p>
                <p className='parrafo'>Sede: {boleto.event.sede}</p>
                <p className='parrafo'>Usuario: {boleto.purchase.user.name}</p>
                
                
                { rol == 'CheckTicket' ?
                
                <Link rel="stylesheet" href={route('check', boleto.uuid)} style={{textDecoration: 'none'}}>
                    <RoundedButton
                        variant="outlined"
                        size="large"
                    >
                        MARCAR ASISTENCIA
                        
                    </RoundedButton>
                </Link>
                :
                <Link rel="stylesheet" href={'#'} style={{textDecoration: 'none'}}>
                    <RoundedButton
                        variant="outlined"
                        size="large"
                    >
                        Solicitar constancia
                        
                    </RoundedButton>
                </Link>
                }
            </div>
        </div>
            
        </>
    );
};

Boleto.layout = (page) => (
    <Layout children={page} title="Boleto" pageTitle="Tu boleto" />
);

export default Boleto;
