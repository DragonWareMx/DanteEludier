import React from 'react';
import Layout from '../layouts/Layout';
import route from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'

import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import "../styles/auth.css";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: '0px',
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '100%',
    },
}));

const EmailPassword = () => {
    const classes = useStyles();
    const { errors, status } = usePage().props;

    const [values, setValues] = React.useState({
        _method: 'post',
        email: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    //manda el forumulario
    function handleSubmit(e) {
        const button = document.getElementById('boton-enviar');
        button.disabled = true;
        e.preventDefault()
        Inertia.post(route('password.email'), values,
            {
                onError: () => {
                    button.disabled = false;
                },
                onSuccess: () => {
                    button.disabled = false;
                },
            }
        )
    }

    return (
        <div className="mi-contenedor">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card mt-5 mb-5 card-login">
                            <div className="card-body">
                                <div className="card-title">Restablecer Contraseña</div>
                                <div className="row">
                                    <div className="col-lg-5 pr-5 mb-lg-5 col-izq" style={{ marginBottom: "10px" }}>
                                        <div style={{ display: "flex", marginBottom: "10px" }}>
                                            <SchoolIcon fontSize={'default'} />
                                            <div class="texto-info">
                                                <h2>Talleres</h2>
                                                Asiste y transforma tu vida y tus finanzas.
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", marginBottom: "10px" }}>
                                            <WorkIcon fontSize={'default'} />
                                            <div class="texto-info">
                                                <h2>Mentoría</h2>
                                                Descubre el empresario que de verdad eres.
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", marginBottom: "10px" }}>
                                            <SupervisorAccountIcon fontSize={'default'} />
                                            <div class="texto-info">
                                                <h2>Gestión de talento</h2>
                                                Formación de equipos de alto rendimiento
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 mb-lg-5">
                                        <div className="text-no-tienes">
                                            ¿No tienes una cuenta? <InertiaLink href={route('register')}>Registrate</InertiaLink>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="text-no-tienes" style={{ textAlign: "left", marginTop: "15px", marginBottom: "10px" }}>
                                                Ingresa tu correo electrónico, y se te enviará un correo con las instrucciones para restablecer tu contraseña.
                                            </div>
                                            <Grid className="mb-4" container spacing={1} alignItems={errors.email ? "center" : status ? "center" : "flex-end"} wrap='nowrap'>
                                                <Grid item>
                                                    <MailIcon />
                                                </Grid>
                                                <Grid item style={{ width: '100%' }}>
                                                    <FormControl fullWidth error={errors.email ? true : false} className={clsx(classes.margin, classes.textField)}>
                                                        <InputLabel htmlFor="email">Correo electrónico</InputLabel>
                                                        <Input
                                                            id="email"
                                                            type={'email'}
                                                            value={values.email}
                                                            onChange={handleChange('email')}
                                                        />
                                                        {errors.email &&
                                                            <FormHelperText id="component-error-text">{errors.email}</FormHelperText>
                                                        }
                                                        {status &&
                                                            <FormHelperText id="component-text" style={{ color: "green" }}>{status}</FormHelperText>
                                                        }
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <div className="text-no-tienes mb-5" style={{ textAlign: "left" }}>
                                                Regresar a <a href={route('login')}>Iniciar sesión</a>
                                            </div>
                                            <div className="mb-1" style={{ display: "flex" }}>
                                                <button id="boton-enviar" className="btn-login" type="submit">ENVIAR</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card-terminos">Este sitio está protegido por reCaPTCHA y aplican las Política de privacidad y los Términos de servicio de Google.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

EmailPassword.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio" />

export default EmailPassword