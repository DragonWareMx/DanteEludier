import React, { useEffect } from "react";
import "../../../public/css/diploma.css";
import Grid from '@material-ui/core/Grid';

const Diploma = ({title}) => {
    useEffect(() => {
        document.title = "Diploma";
    }, [title]);

    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid xs={8} className="container-PDF">
                <Grid xs={2} className="grid-blue">BLUE</Grid>
                <Grid xs={10} className="grid-contenido">
                    <img src="/img/diploma/happy-money.png" className="img-logo1"></img>
                    <p className="txt-otorga">OTORGA EL SIGUIENTE:</p>
                    <p className="txt-diploma">Diploma</p>
                    <p className="txt-name"><p style={{color:"#d2d3d5"}}>A:&nbsp;</p> Zaira Bethzabel Torres Muñoz</p>
                    <p className="txt-descripcion">Por haber concluido satisfactoriamente el taller vivencial "AVATAR FINANCIERO" de transformación personal y financiera realizado en la ciudad de Boca del río, Veracruz del 2,3 y 4 de julio de 2021.</p>
                    <img src="/img/diploma/TallerAVATARFINANCIERO.png" className="img-logo-footer"></img>
                </Grid>
            </Grid>
        </Grid>
    )
}

// Diploma.layout = page => <Layout children={page} title="Diploma" pageTitle="Diploma" />

export default Diploma