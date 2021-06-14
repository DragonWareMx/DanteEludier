import React from "react";
import Layout from "../layouts/Layout";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import MessageIcon from "@material-ui/icons/Message";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

import "/css/contacto.css";

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

const Contacto = () => {
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
                    <h1 className="display-3 font-weight-bold">Contacto</h1>
                    <p className="font-weight-light lead">
                        Tu felicidad financiera a un clic
                    </p>
                </div>
            </div>
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
                                <h5>UBICACIÓN</h5>
                                <p>
                                    Cananea 850, Colonia, 60160 Uruapan, Mich.
                                </p>
                            </div>
                            <div className="pt-5">
                                <h5>TELÉFONO</h5>
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
            </div>
        </>
    );
};

Contacto.layout = (page) => (
    <Layout children={page} title="Contacto" pageTitle="Contacto" />
);

export default Contacto;
