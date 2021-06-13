import React from 'react';
import Layout from '../layouts/Layout';

const Login = () => {
    return (
        <div>
            <h1>Welcome</h1>
            <p>Hello Viledruid, gracias por hackearnos y welcome to your first Inertia app!</p>
        </div >
    )
}

Login.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio" />

export default Login