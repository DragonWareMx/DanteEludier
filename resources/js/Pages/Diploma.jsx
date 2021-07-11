import React from "react";
import Layout from "../layouts/Layout";
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import FormHelperText from '@material-ui/core/FormHelperText'
import axios from 'axios';


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

import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";



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

const Diploma = ({ boleto }) => {
    const { errors, status } = usePage().props;

    const [values, setValues] = React.useState({
        _method: 'post',
        nombre: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    //manda el forumulario
    function handleSubmit(e) {
        // const button = document.getElementById('boton-diploma');
        // button.disabled = true;
        // e.preventDefault()
        // Inertia.post(route('getDiploma'), values,
        //     {
        //         onError: () => {
        //             button.disabled = false;
        //         },
        //         onSuccess: () => {
        //             button.disabled = false;
        //         },
        //         preserveScroll: (page) => Object.keys([page.props.status, page.props.errors]).length,
        //     }
        // )
        const button = document.getElementById('boton-diploma');
        button.disabled = true;
        axios.post('/getPdf',
            { data: values },
            { responseType: 'blob' })
            .then(res => {
                console.log('holas');
                console.log(res);
                button.disabled = false;
                let blob = new Blob([res.data], { type: res.headers['content-type'] });
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = item.slice(item.lastIndexOf('/') + 1);
                console.log(link);
                link.click()
            }).catch(function (error) { console.log(error) })
    }

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
                        Diploma
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
                            <form className="" onSubmit={handleSubmit}>
                                {status &&
                                    <FormHelperText id="component-text" style={{ color: "green", fontSize: 16 }}>{status}</FormHelperText>
                                }
                                <h3
                                    className="text-center text-md-left"
                                    style={{
                                        fontFamily: "Roboto Slab",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Escribe el nombre que aparecerá en tu diploma
                                </h3>
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
                                        <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.nombre}</FormHelperText>
                                    }
                                </div>
                                <div className="d-flex justify-content-center justify-content-md-end pb-4 pb-md-0">
                                    <ColorButton
                                        variant="contained"
                                        color="primary"
                                        className="mt-4"
                                        size="large"
                                        id='boton-diploma'
                                        type='submit'
                                    >
                                        GENERAR DIPLOMA
                                    </ColorButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </Grid>
            </div>

        </>
    );
};

Diploma.layout = (page) => (
    <Layout children={page} title="Tu diploma" pageTitle="Tu diploma" />
);

export default Diploma;
