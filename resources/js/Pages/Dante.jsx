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

const Dante = () => {
    return (
        <>
            <div style={{ backgroundColor: "#000000" }}>
                <div className="portadaContacto">
                    <img
                        src="/img/portadas/team2.jpg"
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
                    <h1 className="display-3 font-weight-bold">+ de Dante</h1>
                    <p className="font-weight-light lead">
                        Coach, Empresario, Escritor Best Seller
                    </p>
                </div>
            </div>
            {/* WHITE CARD */}
            <div style={{ backgroundColor: "#E5E5E5", height: "80vh" }}>
                <div className="contacto_rounded">
                    <div className="row p-5">
                        <div className="col-md-12">
                            <h1>Yo soy Dante Eludier</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Dante.layout = (page) => (
    <Layout children={page} title="+ de Dante" pageTitle="Dante" />
);

export default Dante;
