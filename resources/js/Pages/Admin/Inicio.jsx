import React from 'react';
import LayoutAdmin from "../../layouts/LayoutAdmin";

const Inicio = () => {
    return (
        <p>Hola soi el miki</p>
    )
}

Inicio.layout = (page) => (
    <LayoutAdmin children={page} title="Inicio" pageTitle="inicio" />
);

export default Test;