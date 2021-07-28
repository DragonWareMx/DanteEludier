import React from "react";
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import FormHelperText from '@material-ui/core/FormHelperText'
import Layout from '../../layouts/LayoutAdmin';

//Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


//iconos
import PublishIcon from '@material-ui/icons/Publish';


//CSS
import '/css/producto.css';

//componentes
const Crear = () => {

    const [values, setValues] = React.useState({
        titulo: '',
        descripcion: '',
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(event)
    };

    // const imageChange=(prop) =>(event) =>{
    //     this.setState({
    //         file: URL.createObjectURL(event.target.files[0])
    //     })
    // };

    return (
        <>
            <Grid container style={{marginTop:21,marginBottom:21}}>
                <Grid item xs={12}>
                    <Paper style={{backgroundColor:'#282828',padding:25,color:'#FFFFFF',fontFamily:'Oxygen'}}>
                        <form className='crearProducto_form' noValidate autoComplete="off">
                            <Grid container>
                                <Grid item xs={12} sm={12} md={3} className='crearProducto_img' id='imgContainer'>
                                    <Button
                                        className='crearProducto_upload'
                                        variant="contained"
                                        component="label"
                                        style={{background: '#323232',borderRadius: '4px',color: '#FFFFFF',fontSize:12,textTransform: 'capitalize',fontWeight:'normal',fontFamily:'Oxygen'}}
                                    >
                                        <PublishIcon style={{marginRight:9,fontSize:17,marginTop:'-2px'}}></PublishIcon>
                                        Subir imagen
                                        <input
                                            id='productoImagen'
                                            type="file"
                                            hidden
                                            accept="image/*"
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={9} className='verproducto_info'>
                                    <TextField id="producto-titulo" label="Título del producto" style={{width:'100%'}} onChange={handleChange('titulo')} value={values.titulo}/>
                                    <TextField id="producto-descripcion" label="Descripción del producto" style={{width:'100%',marginTop:25}} onChange={handleChange('descripcion')} value={values.descripcion}/>
                                    {/* <input type='file' style={{marginTop:35}}></input> */}
                                    {/* <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="raised-button-file"
                                        multiple
                                        type="file"
                                    />
                                    <label htmlFor="raised-button-file">
                                        <Button variant="raised" component="span">
                                            Upload
                                        </Button>
                                    </label> */}
                                    <div style={{marginTop:42,color:'#9C9C9C',fontSize:16, fontFamily:'Oxygen',marginBottom:5}}>PDF de información</div>
                                    {/* /////////////INPUT DEL PDF/////////////////// */}
                                    <Button
                                        variant="contained"
                                        component="label"
                                        style={{background: '#323232',borderRadius: '4px',color: '#FFFFFF',fontSize:12,textTransform: 'capitalize',fontWeight:'normal',fontFamily:'Oxygen'}}
                                    >
                                        Subir archivo
                                        <input
                                            type="file"
                                            hidden
                                            accept="application/pdf"
                                        />
                                    </Button>
                                    <Grid container alignItems='center' className='crearProducto_buttons'>
                                        <InertiaLink href={route('dashboard.productos')} style={{fontFamily:'Oxygen',fontSize:12,fontWeight:'Bold',marginRight:25,color:'#FFFFFF',textDecoration:'none'}}>
                                            CANCELAR
                                        </InertiaLink>
                                        <Button className='crearProducto_guardar'>
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