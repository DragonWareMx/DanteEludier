import React from 'react';
import Layout from '../layouts/Layout';
import route from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'

import PhoneIcon from '@material-ui/icons/Phone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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

const Register = ({ token, email }) => {
    const classes = useStyles();
    const { errors } = usePage().props;

    const [values, setValues] = React.useState({
        _method: 'post',
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //manda el forumulario
    function handleSubmit(e) {
        e.preventDefault();
        const button = document.getElementById('boton-enviar');
        button.disabled = true;
        Inertia.post(route('password.update'), values,
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

                                        <form className="mt-4" onSubmit={handleSubmit}>
                                            <Grid container spacing={2}>
                                                {/* aqui abajo esta el input de mail */}
                                                <Grid item xs={12} sm={12}>
                                                    <Grid className="mb-4" container spacing={1} alignItems={errors.email ? "center" : "flex-end"} wrap='nowrap'>
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
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                {/* aqui abajo esta el input del telefono */}
                                            </Grid>
                                            <Grid container spacing={2}>
                                                {/* aqui abajo esta el input de contraseña */}
                                                <Grid item xs={12} sm={6}>
                                                    <Grid className="mb-4" container spacing={1} alignItems={errors.password ? "center" : "flex-end"} wrap='nowrap'>
                                                        <Grid item>
                                                            <LockIcon />
                                                        </Grid>
                                                        <Grid item style={{ width: '100%' }}>
                                                            <FormControl fullWidth error={errors.password ? true : false} className={clsx(classes.margin, classes.textField)}>
                                                                <InputLabel htmlFor="password">Contraseña</InputLabel>
                                                                <Input
                                                                    id="password"
                                                                    type={values.showPassword ? 'text' : 'password'}
                                                                    value={values.password}
                                                                    onChange={handleChange('password')}
                                                                    endAdornment={
                                                                        <InputAdornment position="end">
                                                                            <IconButton
                                                                                aria-label="toggle password visibility"
                                                                                onClick={handleClickShowPassword}
                                                                                onMouseDown={handleMouseDownPassword}
                                                                            >
                                                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    }
                                                                />
                                                                {errors.password &&
                                                                    <FormHelperText id="component-error-text">{errors.password}</FormHelperText>
                                                                }
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                {/* aqui abajo esta el input de confirmar contraseña */}
                                                <Grid item xs={12} sm={6}>
                                                    <Grid className="mb-4" container spacing={1} alignItems={errors.password ? "center" : "flex-end"} wrap='nowrap'>
                                                        <Grid item>
                                                            <LockIcon />
                                                        </Grid>
                                                        <Grid item style={{ width: '100%' }}>
                                                            <FormControl fullWidth error={errors.password ? true : false} className={clsx(classes.margin, classes.textField)}>
                                                                <InputLabel htmlFor="password">Confirmar contraseña</InputLabel>
                                                                <Input
                                                                    id="password"
                                                                    type={values.showPassword ? 'text' : 'password'}
                                                                    value={values.password_confirmation}
                                                                    onChange={handleChange('password_confirmation')}
                                                                    endAdornment={
                                                                        <InputAdornment position="end">
                                                                            <IconButton
                                                                                aria-label="toggle password visibility"
                                                                                onClick={handleClickShowPassword}
                                                                                onMouseDown={handleMouseDownPassword}
                                                                            >
                                                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    }
                                                                />
                                                                {errors.password &&
                                                                    <FormHelperText id="component-error-text">{errors.password}</FormHelperText>
                                                                }
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <div className="text-no-tienes mb-5" style={{ textAlign: "left", marginTop: "10px" }}>
                                                ¿Ya tienes una cuenta? <InertiaLink href={route('login')}>Inicia sesión</InertiaLink>
                                            </div>
                                            <div className="mb-1" style={{ display: "flex" }}>
                                                <button id='boton-enviar' className="btn-login" type="submit">Restablecer Contraseña</button>
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

Register.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio" />

export default Register