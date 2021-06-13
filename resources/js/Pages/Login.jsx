import React from 'react';
import Layout from '../layouts/Layout';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import "../styles/auth.css";

const Login = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card mt-5 mb-5 card-login">
                        <div className="card-body">
                            <div className="card-title">Registrarse</div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div style={{ display: "flex" }}>
                                        <SchoolIcon color={"#989898"} fontSize={'default'} />
                                        <div class="texto-info">
                                            <h2>Talleres</h2>
                                            Asiste y transforma tu vida y tus finanzas.
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <WorkIcon color={"#989898"} fontSize={'default'} />
                                        <div class="texto-info">
                                            <h2>Mentoría</h2>
                                            Descubre el empresario que de verdad eres.
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <SupervisorAccountIcon color={"#989898"} fontSize={'default'} />
                                        <div class="texto-info">
                                            <h2>Gestión de talento</h2>
                                            Formación de equipos de alto rendimiento
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="text-no-tienes">
                                        ¿No tienes una cuenta? <a href="">Registrate</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-terminos">Este sitio está protegido por reCaPTCHA y aplican las Política de privacidad y los Términos de servicio de Google.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Login.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio" />

export default Login