import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

//CSS


//iconos

const ColorButton = withStyles((theme) => ({
    root: {
        backgroundColor: "transparent",
        color: "#717171",
        "&:hover": {
            color: "#FFFFFF",
            backgroundColor: "#323232",
        },
        borderRadius: 20,
        width: "244px",
        margin: "auto",
        marginBottom: "16px"
    },
}))(Button);

export default function Product(img, name, price){
    return (
        <>
            {/* <Grid container direction="column" item style={{width: "fit-content", margin: "auto"}}>
                <Grid item style={{width: "244px"}}>
                    <img className="producto_imagen" src="img/events/avatarFinanciero.jpg"></img>
                </Grid>
                <Grid item className="producto_nombre">
                    Taller Vivencial Avatar Financiero
                </Grid>
                <Grid item className="producto_precio">
                    Desde $7, 800.00 MXN
                </Grid>
                <Grid item style={{width: "244px"}}>
                    <ColorButton
                        variant="outlined"
                        className="mt-4"
                        disableElevation
                    >
                        MÁS INFORMACIÓN
                    </ColorButton>    
                </Grid>
            </Grid> */}
            <Grid item  xs={12} sm={6} md={4} lg={3}>
                <div style={{width: "fit-content", margin: "auto"}}>
                <Grid item>
                    <img className="producto_imagen" src="img/events/avatarFinanciero.jpg"></img>
                </Grid>
                <Grid item className="producto_nombre">
                    Taller Vivencial Avatar Financiero
                </Grid>
                <Grid item className="producto_precio">
                    Desde $7, 800.00 MXN
                </Grid>
                <Grid item>
                    <ColorButton
                        variant="outlined"
                        className="mt-4"
                        disableElevation
                    >
                        MÁS INFORMACIÓN
                    </ColorButton>    
                </Grid>
                </div>
            </Grid>
        </>
    );
}