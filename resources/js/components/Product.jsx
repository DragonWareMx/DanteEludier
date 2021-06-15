import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

//CSS


//iconos

const ColorButton = withStyles((theme) => ({
    root: {
        color: "#FFFFFF",
        backgroundColor: "#323232",
        "&:hover": {
            backgroundColor: "transparent",
            color: "#717171",
        },
        borderRadius: 20,
        width: "244px",
        margin: "auto",
        marginBottom: "16px"
    },
}))(Button);

export default function Libro(){
    return (
        <>
            <Grid container direction="column" item>
                <Grid item>
                    <img className="producto_imagen" src="img/events/avatarFinanciero.jpg"></img>
                </Grid>
                <Grid item>
                    Taller Vivencial Avatar Financiero
                </Grid>
                <Grid item>
                    Desde $7, 800.00 MXN
                </Grid>
                <Grid item>
                <ColorButton
                    variant="contained"
                    color="primary"
                    className="mt-4"
                >
                    MÁS INFORMACIÓN
                </ColorButton>
                            
                </Grid>
            </Grid>
        </>
    );
}