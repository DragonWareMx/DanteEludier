import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import { Inertia } from '@inertiajs/inertia';

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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

//iconos
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

//estilos
import "/css/contacto.css";
import "/css/products.css";
import "/css/inicio.css";
import "/css/evento.css";

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

const Evento = ({ eventos }) => {
    const classes = useStyles();
    const [orden, setOrden] = React.useState("");
    const [siguiente, setSiguiente] = React.useState(false);
    const [evento, setEvent] = React.useState({ evento: "" });

    const [values, setValues] = React.useState({
        precio: 0,
        total: 0,
        tipo_de_pago: "",
        cantidad: 0,
    });

    function changePay(event) {
        setValues({ ...values, tipo_de_pago: event.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("event.purchase", evento.evento), values, {
            onError: () => {
                // Inertia.reload({ only: ['cursos'], data: { regime: values.regimen } })
            },
        });
    }

    const eventChange = (event) => {
        setValues({ ...values, precio: event.target.value });
    };

    const eventoChange = (event) => {
        setEvent({ evento: event.target.id });
    };

    const totalChange = (event) => {
        setValues({
            ...values,
            total: event.target.value * values.precio,
            cantidad: event.target.value,
        });
    };

    const handleChange = (event) => {
        setOrden(event.target.value);
    };

    function transformaFecha(fecha) {
        const dob = new Date(fecha);
        const monthNames = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ];
        const day = dob.getDate();
        const monthIndex = dob.getMonth();
        const year = dob.getFullYear();
        return `${day} ${monthNames[monthIndex]} `;
    }

    const [open, setOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSiguiente = () => {
        setSiguiente(true);
    };

    const handleRegresar = () => {
        setSiguiente(false);
    };

    const handleAlert = () => {
        alert("Selecciona primero el evento y cuántos lugares quieres comprar");
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
                                    {eventos["0"].product.titulo}
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
                                    src={
                                        "/img/events/" +
                                        eventos["0"].product.images["0"].foto
                                    }
                                    style={{
                                        width: "100%",
                                        maxHeight: "auto",
                                    }}
                                />
                                <div className="text-center mt-2">
                                    <RoundedButton
                                        variant="outlined"
                                        size="large"
                                    >
                                        SABER MÁS...
                                        {/* FALTA QUE AL DARLE CLICK BAJE EL PDF */}
                                    </RoundedButton>
                                </div>
                            </div>
                            <div className="col-md-8">
                                {eventos.map((evento) => (
                                    <>
                                        <div className="font-weight-normal">
                                            {evento.ciudad}, {evento.sede}
                                        </div>
                                        <div className="font-weight-normal">
                                            {evento.dates.map((date) =>
                                                transformaFecha(date.fecha)
                                            )}
                                        </div>
                                        <div className="text-muted">
                                            ${evento.precio} MXN
                                        </div>
                                        <div className="pb-3">
                                            <small>ENTRADAS DISPONIBLES</small>
                                            {/* FALTAAAAAA */}
                                        </div>
                                        <Divider style={{ width: "30%" }} />
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>

            <Dialog
                fullWidth="true"
                maxWidth="md"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent className="p-0">
                    <div className="d-flex">
                        <div className="col-4 p-0 d-none d-md-block">
                            <img
                                src={
                                    "/img/events/" +
                                    eventos["0"].product.images["0"].foto
                                }
                                style={{
                                    width: "100%",
                                    height: "500px",
                                }}
                            />
                        </div>
                        <div className="p-3">
                            <h3>{eventos["0"].product.titulo}</h3>
                            <img
                                src={
                                    "/img/events/" +
                                    eventos["0"].product.images["0"].foto
                                }
                                style={{
                                    width: "100%",
                                    height: "auto",
                                }}
                                className="d-block d-md-none"
                            />
                            <div className={siguiente ? "d-none" : ""}>
                                <div>
                                    <div>Evento</div>
                                    <FormControl
                                        variant="outlined"
                                        className="col-md-8"
                                    >
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined1"
                                            value={values.precio}
                                            onChange={eventChange}
                                            name={evento}
                                        >
                                            <MenuItem value="">
                                                Selecciona el evento
                                            </MenuItem>

                                            {eventos.map((evento) => (
                                                <MenuItem
                                                    key={evento.id}
                                                    value={evento.precio}
                                                    id={evento.id}
                                                    onClick={eventoChange}
                                                >
                                                    {evento.ciudad},{" "}
                                                    {evento.sede}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="pt-2">
                                    <div>Lugares</div>
                                    <FormControl
                                        variant="outlined"
                                        className="col-md-4"
                                    >
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={values.total}
                                            onChange={totalChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={1}>
                                                1 lugar
                                            </MenuItem>
                                            <MenuItem value={2}>
                                                2 lugares
                                            </MenuItem>
                                            <MenuItem value={3}>
                                                3 lugares
                                            </MenuItem>
                                            {/* HAY QUE CAMBIARLO MEJOR POR UN INPUT */}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="pt-3">
                                    Precio por lugar
                                    <div className="font-weight-bold">
                                        ${values.precio} MXN
                                    </div>
                                </div>
                                <div className="pt-3">
                                    Total
                                    <div className="font-weight-bold">
                                        ${values.total} MXN
                                    </div>
                                </div>
                                <div className="bttm-pos p-3">
                                    <div className="d-flex justify-content-end">
                                        {values.total > 0 ? (
                                            <ColorButton
                                                variant="contained"
                                                color="primary"
                                                className="mt-4"
                                                startIcon={<ShoppingCartIcon />}
                                                size="large"
                                                onClick={handleSiguiente}
                                            >
                                                SIGUIENTE
                                            </ColorButton>
                                        ) : (
                                            <ColorButton
                                                variant="contained"
                                                color="primary"
                                                className="mt-4"
                                                startIcon={<ShoppingCartIcon />}
                                                size="large"
                                                onClick={handleAlert}
                                            >
                                                SIGUIENTE
                                            </ColorButton>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <small>
                                            <Link href="#" color="inherit">
                                                ¿Te interesa este producto para
                                                tu equipo de trabajo?
                                            </Link>
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className={siguiente ? "" : "d-none"}>
                                <div>
                                    Total
                                    <div className="font-weight-bold">
                                        ${values.total} MXN
                                    </div>
                                </div>
                                <div className="pt-3">
                                    Subtotal con descuento *
                                    {/* FALTA PONER EL DESCUENTO BIEN DESDE LA BD */}
                                    <div className="font-weight-bold">
                                        ${values.total * 0.9} MXN
                                    </div>
                                </div>
                                <div className="pt-3">Método de pago</div>
                                <RadioGroup
                                    aria-label="tipoDePago"
                                    name="pay"
                                    value={values.tipo_de_pago}
                                    onChange={changePay}
                                >
                                    <div className="row">
                                        <div className="col-md-4 d-flex align-items-center">
                                            <FormControlLabel
                                                value="Paypal"
                                                control={<Radio />}
                                                label="Paypal"
                                            />
                                            <img
                                                src="/img/icons/paypallogo.png"
                                                alt=""
                                                style={{ maxHeight: "25px" }}
                                            />
                                        </div>

                                        <div className="col-md-4 d-flex align-items-center">
                                            <FormControlLabel
                                                value="Stripe"
                                                control={<Radio />}
                                                label="Stripe"
                                            />
                                            <img
                                                src="/img/icons/stripelogo.png"
                                                alt=""
                                                style={{ maxHeight: "25px" }}
                                            />
                                        </div>
                                        <div className="col-lg-2">
                                            <FormControlLabel
                                                value="Transferencia"
                                                control={<Radio />}
                                                label="Transferencia"
                                            />
                                        </div>
                                    </div>
                                </RadioGroup>
                                <div>
                                    <small>
                                        * Debes estar registrado para obtener un
                                        descuento del 10% en tu compra
                                    </small>
                                </div>
                                <div>
                                    <Link
                                        href=""
                                        color="inherit"
                                        className="font-weight-bold"
                                    >
                                        Registrate
                                    </Link>{" "}
                                    o{" "}
                                    <Link
                                        href="#"
                                        color="inherit"
                                        className="font-weight-bold"
                                    >
                                        Inicia Sesión
                                    </Link>
                                </div>
                                <div className="bttm-pos p-3">
                                    <div className="d-flex justify-content-end align-items-center">
                                        <Button
                                            className="mr-3"
                                            onClick={handleRegresar}
                                        >
                                            Regresar
                                        </Button>
                                        <ColorButton
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ShoppingCartIcon />}
                                            size="large"
                                            onClick={handleSubmit}
                                        >
                                            COMPRAR
                                        </ColorButton>
                                    </div>
                                    <div className="text-right">
                                        <small>
                                            <Link href="#" color="inherit">
                                                ¿Te interesa este producto para
                                                tu equipo de trabajo?
                                            </Link>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

Evento.layout = (page) => (
    <Layout children={page} title="Evento" pageTitle="Evento" />
);

export default Evento;
