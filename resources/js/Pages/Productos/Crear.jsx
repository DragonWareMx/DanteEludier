import React from "react";
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import FormHelperText from '@material-ui/core/FormHelperText'
import Layout from '../../layouts/LayoutAdmin';
import route from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';

import styled from 'styled-components';

//Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


//iconos
import PublishIcon from '@material-ui/icons/Publish';


//CSS
import '/css/producto.css';

//componentes
const DivBoton = styled.div`
    background-color: transparent;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s cubic-bezier( 0.4, 0, 1, 1) !important;
    label {
        visibility: hidden;
        transition: visibility 0.2s cubic-bezier( 0.4, 0, 1, 1) !important;
    }
    &:hover{
        background-color:rgba(0, 0, 0, 0.7);
        cursor:pointer;
        label{
            visibility:visible;
            transition: visibility 0.2s cubic-bezier( 0.4, 0, 1, 1) !important;
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    input: {
        fontFamily: "Oxygen",
        fontStyle: 'normal',
        fontSize: '15px',
        color: '#ffffff',
        borderColor: "#9C9C9C",
        "&:not(.Mui-disabled)::before": {
            borderColor: "#9C9C9C"
        },
        "&:not(.Mui-disabled):hover::before": {
            borderColor: "#9C9C9C"
        }
    },
    formTextLabel: {
        fontFamily: 'Oxygen',
        fontSize: '14px',
        color: '#ffffff'
    },
}));

const theme = createMuiTheme({
    palette: {
        secondary: {
            // light: will be calculated from palette.primary.main,
            main: '#ff4400',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        primary: {
            light: '#0066ff',
            main: '#9c9c9c',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
    status: {
        danger: 'orange',
    },
});

const Crear = () => {

    const classes = useStyles();

    const { errors } = usePage().props

    
    const [values, setValues] = React.useState({
        titulo: '',
        descripcion: '',
        productoImagen: null,
        productoPdf: null,
        error:false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(event)
    };

    function readURL() {
        var input=document.getElementById('productoImagen');
        if (input.files && input.files[0]) {
            setValues(values => ({
                ...values,
                productoImagen: input.files[0],
            }))
            var reader = new FileReader();
            var preview = document.getElementById('imgContainer');
            reader.onload = function (e) {
                preview.style.backgroundImage = "url("+e.target.result+")";
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function mostrarNombre() {
        var input=document.getElementById('productoPdf');
        if (input.files && input.files[0]) {
            setValues(values => ({
                ...values,
                productoPdf: input.files[0],
            }))
            var div=document.getElementById('pdfName');
            div.innerHTML = '&nbsp;'+input.files[0].name;
        }
    }

    function clickImagen(){
        var input=document.getElementById('productoImagen');
        input.click();
    }

    //manda el forumulario
    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/dashboard/storeproducto', values,
            {
                onSuccess: () => {
                    //algo
                },
                onError: () => {
                    setValues(values => ({
                        ...values,
                        error: true
                    }));
                }
            }
        )
    }

    

    return (
        <>
            <Grid container style={{marginTop:21,marginBottom:21}}>
                <Grid item xs={12}>
                    <Paper style={{backgroundColor:'#282828',padding:25,color:'#FFFFFF',fontFamily:'Oxygen'}}>
                        {errors.productoImagen && <div style={{color:'red',fontSize:14,fontFamily:'Oxygen', marginBottom:15, marginLeft:15}}>{errors.productoImagen}</div>}
                        <form className='crearProducto_form' noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={3} className='crearProducto_img' id='imgContainer'>
                                    <DivBoton onClick={clickImagen}>
                                        <Button
                                            className='crearProducto_upload'
                                            variant="contained"
                                            component="label"
                                            style={{borderRadius: '4px',color: '#FFFFFF',fontSize:12,textTransform: 'capitalize',fontWeight:'normal',fontFamily:'Oxygen'}}
                                        >
                                            <PublishIcon style={{marginRight:9,fontSize:17,marginTop:'-2px'}}></PublishIcon>
                                            {values.productoImagen === null ? 'Subir imagen' : 'Cambiar imagen'} 
                                        </Button>
                                        <input
                                            id='productoImagen'
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={readURL}
                                        />
                                    </DivBoton>
                                </Grid>
                                <Grid item xs={12} sm={12} md={9} className='verproducto_info'>
                                    <MuiThemeProvider theme={theme}>
                                        <TextField 
                                            id="producto-titulo" 
                                            label="Título del producto" 
                                            style={{width:'100%'}} 
                                            onChange={handleChange('titulo')} 
                                            value={values.titulo}
                                            error={errors.titulo && values.error == true && true}
                                            helperText={values.error == true && errors.titulo}
                                            InputProps={{className: classes.input,}}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                            required
                                        />
                                        <TextField 
                                            id="producto-descripcion" 
                                            label="Descripción del producto" 
                                            style={{width:'100%',marginTop:25}} 
                                            onChange={handleChange('descripcion')} 
                                            value={values.descripcion}
                                            error={errors.descripcion && values.error == true && true}
                                            helperText={values.error == true && errors.descripcion}
                                            InputProps={{className: classes.input,}}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                            required    
                                        />
                                    </MuiThemeProvider>
                                    <div style={{marginTop:42,color:'#9C9C9C',fontSize:16, fontFamily:'Oxygen',marginBottom:5}}>PDF de información</div>
                                    {/* /////////////INPUT DEL PDF/////////////////// */}
                                    <Button
                                        variant="contained"
                                        component="label"
                                        style={{background: '#323232',borderRadius: '4px',color: '#FFFFFF',fontSize:12,textTransform: 'capitalize',fontWeight:'normal',fontFamily:'Oxygen'}}
                                    >
                                        {values.productoPdf === null ? 'Subir archivo' : 'Cambiar archivo - '}
                                        <input
                                            id='productoPdf'
                                            type="file"
                                            hidden
                                            accept="application/pdf"
                                            onChange={mostrarNombre}
                                        />
                                        
                                        <Grid id='pdfName'></Grid>
                                    </Button>
                                    {errors.productoPdf && <div style={{color:'red',fontSize:14,fontFamily:'Oxygen', marginBottom:15}}>{errors.productoPdf}</div>}
                                    <Grid container alignItems='center' className='crearProducto_buttons'>
                                        <InertiaLink href={route('dashboard.productos')} style={{fontFamily:'Oxygen',fontSize:12,fontWeight:'Bold',marginRight:25,color:'#FFFFFF',textDecoration:'none'}}>
                                            CANCELAR
                                        </InertiaLink>
                                        <Button className='crearProducto_guardar' type='submit'>
                                            GUARDAR
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

Crear.layout = (page) => (
    <Layout children={page} title="Dashboard - Productos" pageTitle="Productos" />
);

export default Crear;