import React from 'react';
import LayoutAdmin from "../layouts/LayoutAdmin";

const Test = () => {
    return (
        <p>Hola soi el miki</p>
    )
}

Test.layout = (page) => (
    <LayoutAdmin children={page} title="Términos y condiciones" pageTitle="Título que quería el oscar" />
);

export default Test;