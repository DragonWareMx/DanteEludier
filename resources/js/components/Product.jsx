import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import route from 'ziggy-js';

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

export default function Product({img, name, price, id}){
    function limitString(string, length){
        return string.length > length ? 
                    string.substring(0, length - 3) + "..." : 
                    string; 
    }

    function showPrice(precio){
        return parseFloat(precio).toLocaleString('en-US')
    }

    return (
        <>
            <Grid item  xs={12} sm={6} md={4} lg={3}>
                <div style={{width: "fit-content", margin: "auto"}}>
                    {/* IMAGEN */}
                    <Grid item>
                        <div className="producto_imagen" style={{
                                backgroundImage: img ? 'url("storage/productos/'+ img +'")' : 'url("storage/productos/default.jpg")',
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center",
                                backgroundSize: "100%"
                            }}
                        >
                        </div>
                    </Grid>

                    {/* NOMBRE */}
                    <Grid item className="producto_nombre">
                        {limitString(name, 60)}
                    </Grid>

                    {/* PRECIO */}
                    <Grid item className="producto_precio">
                        {price ?
                        "Desde $"+ showPrice(price) +" MXN"
                        :
                        "Próximamente"
                        }
                    </Grid>

                    {/* BOTON */}
                    <Grid item>
                        <InertiaLink href={route('evento', id)} style={{textDecoration: "none"}}>
                            <ColorButton
                                variant="outlined"
                                className="mt-4"
                                disableElevation
                            >
                                MÁS INFORMACIÓN
                            </ColorButton>
                        </InertiaLink>
                    </Grid>
                </div>
            </Grid>
        </>
    );
}