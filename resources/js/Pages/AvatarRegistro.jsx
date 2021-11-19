import React from "react";
import Layout from "../layouts/Layout";
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import FormHelperText from '@material-ui/core/FormHelperText'


//componentes
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";



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
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AssignmentIcon from '@material-ui/icons/Assignment';



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

const AvatarRegistro =  () => {
    const { errors, status } = usePage().props;

    const [values, setValues] = React.useState({
        _method: 'post',
        nombre: '',
        apellidos:'',
        mail:'',
        telefono:'',
        procedencia:'',
        alergias_o_enfermedades:'',
        medicamentos:'',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    //manda el forumulario
    function handleSubmit(e) {
        e.preventDefault();
        const button = document.getElementById('boton-diploma');
        button.disabled = true;
        Inertia.post(route('avatar.create'), values,
            {
                onError: () => {
                    button.disabled = false;

                },
                onSuccess: () => {
                    button.disabled = false;
                    setValues({ ...values,
                        nombre: '',
                        apellidos:'',
                        mail:'',
                        telefono:'',
                        procedencia:'',
                        alergias_o_enfermedades:'',
                        medicamentos:'',
                        });
                },
                preserveScroll: (page) => Object.keys([page.props.status, page.props.errors]).length,
            }
        )

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
                        Avatar - Registro
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
                                        ¡Bienvenido!
                                    </h3>
                                    <strong style={{color:'#75bbe0', fontFamily: 'Roboto Slab', fontSize: '10px'}}>Al dar clic en Registrarme aceptas los Términos y condiciones
                                    {/* <Link rel="stylesheet" href={'/documentos/renuncia_responsabilidad.pdf'} target='_blank' style={{textDecoration: 'none'}}> */}

                                    {/* </Link> del curso */}
                                    </strong>
                                    <div className="d-flex pt-1">
                                        <AccountCircle
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.nombre ? true : false}
                                            className="ml-2"
                                            id="nombre"
                                            label="Nombre(s)"
                                            fullWidth
                                            required
                                            value={values.nombre}
                                            onChange={handleChange('nombre')}
                                        />
                                        {errors.nombre &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.nombre}</FormHelperText>
                                        }
                                    </div>
                                    <div className="d-flex pt-1">
                                        <AccountCircle
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.apellidos ? true : false}
                                            className="ml-2"
                                            id="apellidos"
                                            label="Apellidos"
                                            fullWidth
                                            required
                                            value={values.apellidos}
                                            onChange={handleChange('apellidos')}
                                        />
                                        {errors.nombre &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.apellidos}</FormHelperText>
                                        }
                                    </div>
                                    <div className="d-flex pt-1">
                                        <MailIcon
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.mail ? true : false}
                                            className="ml-2"
                                            id="mail"
                                            label="Correo electrónico"
                                            fullWidth
                                            required
                                            value={values.mail}
                                            onChange={handleChange('mail')}
                                        />
                                        {errors.mail &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.mail}</FormHelperText>
                                        }
                                    </div>
                                    <div className="d-flex pt-1">
                                        <PhoneIcon
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.telefono ? true : false}
                                            className="ml-2"
                                            id="telefono"
                                            label="Teléfono"
                                            fullWidth
                                            required
                                            value={values.telefono}
                                            onChange={handleChange('telefono')}
                                        />
                                        {errors.telefono &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.telefono}</FormHelperText>
                                        }
                                    </div>
                                    <div className="d-flex pt-1">
                                        <AddLocationIcon
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.procedencia ? true : false}
                                            className="ml-2"
                                            id="procedencia"
                                            label="Procedencia (ciudad de origen)"
                                            fullWidth
                                            required
                                            value={values.procedencia}
                                            onChange={handleChange('procedencia')}
                                        />
                                        {errors.procedencia &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.procedencia}</FormHelperText>
                                        }
                                    </div>

                                    {/* Alergias y enfermedades */}
                                    <div className="d-flex pt-1">
                                        <LocalHospitalIcon
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.alergias_o_enfermedades ? true : false}
                                            className="ml-2"
                                            id="alergias_o_enfermedades"
                                            label="¿Padeces alguna alergia o enfermedad crónica?"
                                            fullWidth
                                            value={values.alergias_o_enfermedades}
                                            onChange={handleChange('alergias_o_enfermedades')}
                                        />
                                        {errors.alergias_o_enfermedades &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.alergias_o_enfermedades}</FormHelperText>
                                        }
                                    </div>
                                    <div className="d-flex pt-1">
                                        <AssignmentIcon
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.medicamentos ? true : false}
                                            className="ml-2"
                                            id="medicamentos"
                                            label="¿Tomas medicamento?, ¿es controlado?"
                                            fullWidth
                                            value={values.medicamentos}
                                            onChange={handleChange('medicamentos')}
                                        />
                                        {errors.medicamentos &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.medicamentos}</FormHelperText>
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
                                            Registrarme
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

AvatarRegistro.layout = (page) => (
    <Layout children={page} title="Avatar - Registro" pageTitle="Bienvenido al Avatar" />
);

export default AvatarRegistro;
