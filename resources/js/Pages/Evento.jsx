import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { InertiaHead } from '@inertiajs/inertia-react'
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
import route from "ziggy-js";

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
    const { errors, status } = usePage().props;
    const { auth } = usePage().props;
    const [siguiente, setSiguiente] = React.useState(false);
    const [evento, setEvento] = React.useState({ evento: "" });

    const [values, setValues] = React.useState({
        precio: 0,
        total: 0,
        descuento: 0,
        tipo_de_pago: "",
        cantidad: ''
    });

    function changePay(event) {
        setValues({ ...values, tipo_de_pago: event.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("event.purchase", evento.evento), { values, evento }, {
            onError: () => {
                // Inertia.reload({ only: ['cursos'], data: { regime: values.regimen } })
            },
        });
    }

    const eventoChange = (e) => {
        const value = e.target.value;
        const indice = e.target.name;
        console.log(eventos[indice]);
        console.log(eventos[indice].descuento)
        
        setEvento(evento => ({
            ...evento,
            evento: value,
        })),
        setValues(values =>({
            ...values,
            descuento: eventos[indice].descuento,
        }))

        setPrecio()
    };

    function lugaresChange(e) {
        const value = e.target.value

        setValues(values => ({
            ...values,
            cantidad: value,
        }))
        
        setPrecio()
      }

    function setPrecio(){
        if(evento.evento){
            var eventoSeleccionado
            eventos.forEach(eventoI => {
                if(evento.evento == eventoI.id)
                    eventoSeleccionado = eventoI
            });

            if(eventoSeleccionado){
                if(values.cantidad){
                    setValues(values => ({
                        ...values,
                        precio: eventoSeleccionado.precio,
                        total: eventoSeleccionado.precio * values.cantidad
                    }))
                }
                else{
                    setValues(values => ({
                        ...values,
                        precio: eventoSeleccionado.precio,
                    }))
                }
            }
        }
        else{
            setValues(values => ({
                ...values,
                precio: '',
            }))
        }
        
        if(values.cantidad){
            if(values.precio)
            setValues(values => ({
                ...values,
                total: values.precio * values.cantidad,
            }))
        }
    }

    function showPrice(precio){
        return parseFloat(precio).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }

    useEffect(() => {
        setPrecio()
    }, [evento, values.cantidad]);

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
            <InertiaHead>
                <meta property="og:title" content="Dante Eludier Master coach"/>
                <meta property="og:description" content="Liberando el potencial humano para el bien común"/>
                <meta property="og:image" content={"/img/productos/" +
                                        eventos["0"].product.images["0"].foto}/>
                <meta property="og:url" content={"https://danteeludier.com/productos/evento/"+eventos['0'].product.id}/>
                <meta property="og:type" content="website"/>
            </InertiaHead>
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
                        <Link href={route('products.index')} color="inherit" style={{textDecoration: 'none'}}>
                            <ArrowLeftIcon /> Regresar
                        </Link>
                        {status && !open &&
                            <div className="alert alert-warning" role="alert">
                                {status}
                            </div>
                        }
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
                                        "/img/productos/" +
                                        eventos["0"].product.images["0"].foto
                                    }
                                    style={{
                                        width: "100%",
                                        maxHeight: "auto",
                                    }}
                                />
                                <div className="text-center mt-2">
                                    <Link rel="stylesheet" href={'/documentos/'+eventos['0'].product.hojaDescriptiva} target='_blank' style={{textDecoration: 'none'}}>
                                    <RoundedButton
                                        variant="outlined"
                                        size="large"
                                    >
                                        SABER MÁS...
                                     
                                    </RoundedButton>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-8">
                                {eventos.map((evento) => (
                                    <div key={evento.id}>
                                        <div className="font-weight-normal">
                                            {evento.ciudad}, {evento.sede}
                                        </div>
                                        <div className="font-weight-normal">
                                            {evento.dates.map((date) =>
                                                transformaFecha(date.fecha)
                                            )}
                                        </div>
                                        <div className="text-muted">
                                            ${showPrice(evento.precio)} MXN
                                        </div>
                                        <div className="pb-3">
                                            <small>
                                                {evento.total < evento.limite ?
                                                    "ENTRADAS DISPONIBLES"
                                                :
                                                    "AGOTADO"
                                                }
                                            </small>
                                        </div>
                                        <Divider style={{ width: "30%" }} />
                                    </div>
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
                                    "/img/productos/" +
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
                                    "/img/productos/" +
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
                                        id='form1'
                                        variant="outlined"
                                        className="col-md-8"
                                    >
                                        
                                        <Select
                                            labelId="demo-simple-select-outlined-label1"
                                            id="evento"
                                            value={evento.evento}
                                            onChange={eventoChange}
                                            name={values.descuento}
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                <em>Selecciona un evento</em>
                                            </MenuItem>
                                            {eventos.map((evento, index) => (
                                                [
                                                evento.total < evento.limite &&
                                                <MenuItem
                                                    key={evento.id}
                                                    value={evento.id}
                                                    name={index}
                                                >
                                                    {evento.ciudad},{" "}
                                                    {evento.sede}
                                                </MenuItem>
                                                ]
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
                                            id="cantidad"
                                            value={values.cantidad}
                                            onChange={lugaresChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                <em>Selecciona los lugares</em>
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
                                            <MenuItem value={4}>
                                                4 lugares
                                            </MenuItem>
                                            <MenuItem value={5}>
                                                5 lugares
                                            </MenuItem>
                                            <MenuItem value={6}>
                                                6 lugares
                                            </MenuItem>
                                            <MenuItem value={7}>
                                                7 lugares
                                            </MenuItem>
                                            <MenuItem value={8}>
                                                8 lugares
                                            </MenuItem>
                                            <MenuItem value={9}>
                                                9 lugares
                                            </MenuItem>
                                            <MenuItem value={10}>
                                                10 lugares
                                            </MenuItem>
                                            <MenuItem value={11}>
                                                11 lugares
                                            </MenuItem>
                                            <MenuItem value={12}>
                                                12 lugares
                                            </MenuItem>
                                            <MenuItem value={13}>
                                                13 lugares
                                            </MenuItem>
                                            <MenuItem value={14}>
                                                14 lugares
                                            </MenuItem>
                                            <MenuItem value={15}>
                                                15 lugares
                                            </MenuItem>
                                            <MenuItem value={16}>
                                                16 lugares
                                            </MenuItem>
                                            <MenuItem value={17}>
                                                17 lugares
                                            </MenuItem>
                                            <MenuItem value={18}>
                                                18 lugares
                                            </MenuItem>
                                            <MenuItem value={19}>
                                                19 lugares
                                            </MenuItem>
                                            <MenuItem value={20}>
                                                20 lugares
                                            </MenuItem>
                                            {/* HAY QUE CAMBIARLO MEJOR POR UN INPUT */}
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="pt-3">
                                    Precio por lugar
                                    <div className="font-weight-bold">
                                        {values.precio ? "$" + showPrice(values.precio) + " MXN" : "Selecciona un evento"}
                                    </div>
                                </div>
                                <div className="pt-3">
                                    Total
                                    <div className="font-weight-bold">
                                        {values.total ? "$" + showPrice(values.total) + " MXN" : "Selecciona un evento y la cantidad de lugares"}
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
                                            <Link href={route('contacto')} color="inherit">
                                                ¿Te interesa este producto para
                                                tu equipo de trabajo?
                                            </Link>
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className={siguiente ? "" : "d-none"}>
                                {status && open &&
                                    <div className="alert alert-warning" role="alert">
                                        {status}
                                    </div>
                                }
                                <div>
                                    Subtotal
                                    <div className="font-weight-bold">
                                        ${showPrice(values.total)} MXN
                                    </div>
                                </div>
                                <div className="pt-3">
                                    Total con descuento *
                                    {/* FALTA PONER EL DESCUENTO BIEN DESDE LA BD */}
                                    {values.descuento ?
                                    <div className="font-weight-bold">
                                        ${showPrice(values.total * (1-values.descuento))} MXN
                                    </div>
                                    :
                                    <div className="font-weight-bold">
                                        ${showPrice(values.total)} MXN
                                    </div>
                                    }
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
                                                label="Débito/Crédito"
                                            />
                                            <img
                                                src="/img/icons/stripelogo.png"
                                                alt=""
                                                style={{ maxHeight: "22px" }}
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
                                        descuento (en los eventos que apliquen) en tu compra.
                                    </small>
                                </div>
                                
                                {!auth.user &&
                                <div>
                                    <InertiaLink href="/register">
                                        <Link
                                            color="inherit"
                                            className="font-weight-bold"
                                            target="_blank"
                                        >
                                            Registrate
                                        </Link>
                                    </InertiaLink>
                                    {" "}
                                    o{" "}
                                    <InertiaLink href="/login">
                                        <Link
                                            color="inherit"
                                            className="font-weight-bold"
                                            target="_blank"
                                        >
                                            Inicia Sesión
                                        </Link>
                                    </InertiaLink>
                                </div>
                                }
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
                                            <Link href={route('contacto')} color="inherit">
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
