import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';

//componentes material ui
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

//CSS
import '/css/inicio.css';
import '/css/club.css';

//iconos
import EmailIcon from '@material-ui/icons/Email';

export default function Libro(){

    const { errors } = usePage().props;

    const [values, setValues] = React.useState({
        _method: 'post',
        email: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    //manda el forumulario
    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('join'), values,
            {
                onError: () => {
                    // Inertia.reload({ only: ['cursos'], data: { regime: values.regimen } })
                }
            }
        )
    }


    return (
        <>
            <Grid container justify='center' alignItems='center' direction='column' className='club_dinero'>
                <Grid className='club_title'>Únete al Club del DINERO</Grid>
                <Grid className='club_subtitle'>¡Obtén un descuento de 10 % en tu primera compra al inscribirte para recibir nuestro boletín informativo!</Grid>
                <div className='club_form'>
                    <form onSubmit={handleSubmit}>
                    <Grid container spacing={1} justify="center" alignItems="flex-end">
                        <Grid item>
                            <EmailIcon />
                        </Grid>
                        <Grid item>
                            <TextField  
                                id="email"
                                type={'email'} 
                                label="Correo electrónico" 
                                value={values.email}
                                onChange={handleChange('email')}
                                required/>
                                {errors.email &&
                                    <FormHelperText id="component-error-text">{errors.email}</FormHelperText>
                                }
                        </Grid>
                        <button type='submit' className='club_registrarse'>REGISTRARSE</button>
                    </Grid>
                    </form>
                </div>
            </Grid>
        </>
    );
}