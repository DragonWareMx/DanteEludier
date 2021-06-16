import React from "react";
import Layout from "../layouts/Layout";

import Grid from "@material-ui/core/Grid";

//componentes
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//iconos
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

//estilos
import "/css/contacto.css";
import "/css/products.css";
import "/css/inicio.css";

import {
    FormControl,
    makeStyles,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { maxHeight } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
}));

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

const Evento = () => {
    const classes = useStyles();
    const [orden, setOrden] = React.useState("");

    const handleChange = (event) => {
        setOrden(event.target.value);
    };

    const [open, setOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* HEADER */}
            <div style={{ backgroundColor: "#000000" }}>
                <div className="portadaContacto">
                    <img
                        src="/img/portadas/team.jpg"
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
                    <h1 className="display-3 font-weight-bold">Productos</h1>
                    <p className="font-weight-light lead">
                        Vive una reprogramación PERSONAL - FINANCIERA
                    </p>
                </div>
            </div>

            {/* CARD DE PRODUCTOS */}
            <Grid
                container
                justify="center"
                style={{ backgroundColor: "#E5E5E5" }}
            >
                <div
                    className="inicio_rounded"
                    style={{ zIndex: "2", paddingTop: "0" }}
                >
                    <div className="p-5">
                        <Link href="#" color="inherit">
                            <ArrowLeftIcon /> Regresar
                        </Link>
                        <div className="row">
                            <div className="col-md">
                                <h3 className="text-center text-md-left">
                                    Taller Vicencial Avatar Financiero
                                </h3>
                            </div>
                            <div className="col-md-3 d-flex justify-content-center justify-content-md-end">
                                <ColorButton
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className="btn-block"
                                    onClick={handleDialogOpen}
                                >
                                    Asistir
                                </ColorButton>
                            </div>
                        </div>
                        <div className="row pt-5">
                            <div className="col-md-4">
                                <img
                                    src="/img/events/avatarFinanciero.jpg"
                                    style={{
                                        width: "100%",
                                        maxHeight: "auto",
                                    }}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="font-weight-bold">
                                    Xalapa Veracruz, Teatro Centro, 16:00 hrs
                                </div>
                                <div className="text-muted">7,800.00 MXN</div>
                                <div className="pb-3">
                                    <small>ENTRADAS DISPONIBLES</small>
                                </div>
                                <Divider />

                                <div className="font-weight-bold pt-3">
                                    Xalapa Veracruz, Teatro Centro, 16:00 hrs
                                </div>
                                <div className="text-muted">7,800.00 MXN</div>
                                <div className="pb-3 text-danger">
                                    <small>ENTRADAS AGOTADAS</small>
                                </div>
                                <Divider />

                                <div className="font-weight-bold pt-3">
                                    Xalapa Veracruz, Teatro Centro, 16:00 hrs
                                </div>
                                <div className="text-muted">7,800.00 MXN</div>
                                <div className="pb-3 text-danger">
                                    <small>ENTRADAS AGOTADAS</small>
                                </div>
                                <Divider />

                                <div className="font-weight-bold pt-3">
                                    Xalapa Veracruz, Teatro Centro, 16:00 hrs
                                </div>
                                <div className="text-muted">7,800.00 MXN</div>
                                <div className="pb-3 text-danger">
                                    <small>ENTRADAS AGOTADAS</small>
                                </div>
                                <Divider />
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent className="p-0">
                    <div className="row">
                        <div className="col-md-3">
                            <img
                                src="/img/events/avatarFinanciero.jpg"
                                style={{
                                    width: "100%",
                                    maxHeight: "auto",
                                }}
                            />
                        </div>
                        <div className="col-md-auto">
                            <h3>
                                Taller Vivencial Avatar Financiero por Dante
                                Eludier Coach
                            </h3>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

Evento.layout = (page) => (
    <Layout children={page} title="Evento" pageTitle="Evento" />
);

export default Evento;
