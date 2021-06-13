import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'

//componentes material ui
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//CSS
import '/css/inicio.css';
import '/css/club.css';

//iconos
import EmailIcon from '@material-ui/icons/Email';

export default function Libro(){
    return (
        <>
            <Grid container justify='center' alignItems='center' direction='column' className='club_dinero'>
                <Grid className='club_title'>Únete al Club del DINERO</Grid>
                <Grid className='club_subtitle'>¡Obtén un descuento de 10 % en tu primera compra al inscribirte para recibir nuestro boletín informativo!</Grid>
                <div className='club_form'>
                    <form>
                    <Grid container spacing={1} justify="center" alignItems="flex-end">
                        <Grid item>
                            <EmailIcon />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="Correo electrónico" />
                        </Grid>
                        <InertiaLink href="" className='club_registrarse'>REGISTRARSE</InertiaLink>
                    </Grid>
                    </form>
                </div>
            </Grid>
        </>
    );
}