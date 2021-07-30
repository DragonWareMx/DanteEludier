import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import FormHelperText from '@material-ui/core/FormHelperText'
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import { Inertia } from '@inertiajs/inertia';
// import Alertas from '../../../components/common/Alertas';

import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid, Paper, FormControl, Select, MenuItem} from '@material-ui/core'

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EventIcon from '@material-ui/icons/Event';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DateRangeIcon from '@material-ui/icons/DateRange';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import route from 'ziggy-js';

import "/css/eventos.css";
import "/css/boletos.css";
import '/css/producto.css';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: 25,
      backgroundColor:'#282828',
      color:'#FFFFFF',
    },
    menuPaper: {
        backgroundColor: "#323232;",
        borderRadius: '4px',
        color: 'white',
    },
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
    }
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


const AgregarEvento = ({producto}) => {
    const { errors } = usePage().props

    const [values, setValues] = React.useState({
        ciudad: '',
        sede: '',
        direccion: '',
        precio: 0,
        limite: 0,
        descuento: 0,
        error: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        // console.log(event)
    };

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/dashboard/agregarEvento/'+producto.id, values,
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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();

    return (
        <Grid container style={{marginTop:21, marginBottom:40}} >
            <Grid item xs={12}>
                <Paper style={{backgroundColor:'#282828',padding:25,color:'#FFFFFF',fontFamily:'Oxygen',display:'flex',flexWrap:'wrap'}}>
                    {/* <Grid item xs={12}>
                        <div style={{margin: "auto"}}>
                            <Alertas />
                        </div>
                    </Grid> */}
                    
                    <Grid item xs={12} sm={4}>
                        <img src={producto.foto && "/img/productos/"+producto.foto} className="img-producto-edit" style={{width:'100%',height:'100%',maxHeight:446, objectFit:'cover', borderTopLeftRadius:4, borderBottomLeftRadius:4}}></img>
                    </Grid>

                    <Grid item xs={12} sm={8} className="producto_info evento-edit-info">
                        
                        <Grid container alignItems='center' style={{flexWrap:'wrap-reverse'}}>
                            <Grid item xs={11}><InertiaLink  href={route('dashboard.producto',producto.id)} style={{color:'#FFFFFF',fontFamily:'Oxygen',fontSize:16,fontWeight:'bold',textDecoration:'none'}}>{producto.titulo}</InertiaLink></Grid>
                        </Grid>

                        <form className='crearProducto_form' noValidate autoComplete="off" onSubmit={handleSubmit} style={{display:'flex', flexWrap:'wrap'}}>
                            <MuiThemeProvider theme={theme}>
                            <Grid item xs={12} style={{display:'flex', flexWrap:'wrap'}}>
                                <Grid item xs={12} sm={6}>
                                                        
                                                            <TextField  
                                                                color="primary" 
                                                                required 
                                                                id="ciudad" 
                                                                onChange={handleChange('ciudad')}
                                                                label={"Ciudad"}  
                                                                className="input-edit-event"
                                                                InputProps={{className: classes.input,}}
                                                                InputLabelProps={{
                                                                    classes: {
                                                                        root: classes.formTextLabel
                                                                    }
                                                                }}
                                                                error={errors.ciudad && values.error == true && true}
                                                                helperText={values.error == true && errors.ciudad}  
                                                            />
                                                        
                                </Grid>
                                <Grid item xs={12} sm={6}><TextField 
                                                                required 
                                                                id="sede" 
                                                                onChange={handleChange('sede')}
                                                                label="Sede" 
                                                                className="input-edit-event"
                                                                InputProps={{className: classes.input,}}
                                                                InputLabelProps={{
                                                                    classes: {
                                                                        root: classes.formTextLabel
                                                                    }
                                                                }}
                                                                error={errors.sede && values.error == true && true}
                                                                helperText={values.error == true && errors.sede}  
                                                            />
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField 
                                    required 
                                    id="direccion" 
                                    onChange={handleChange('direccion')}
                                    label="Dirección" 
                                    className="input-edit-event" 
                                    InputProps={{className: classes.input,}}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.formTextLabel
                                        }
                                    }}
                                    style={{width:'95%'}} 
                                    error={errors.direccion && values.error == true && true}
                                    helperText={values.error == true && errors.direccion}  
                                />
                            </Grid>

                            <Grid item xs={12} style={{display:'flex', flexWrap:'wrap'}}>
                                <Grid item xs={12} sm={6}><TextField 
                                                                required 
                                                                id="precio" 
                                                                onChange={handleChange('precio')}
                                                                type="number" 
                                                                label="Precio por boleto" 
                                                                className="input-edit-event"  
                                                                InputProps={{className: classes.input,}}
                                                                InputLabelProps={{
                                                                    classes: {
                                                                        root: classes.formTextLabel
                                                                    }
                                                                }}
                                                                error={errors.precio && values.error == true && true}
                                                                helperText={values.error == true && errors.precio} 
                                                            />
                                </Grid>
                                <Grid item xs={12} sm={6}><TextField 
                                                                required 
                                                                id="limite" 
                                                                onChange={handleChange('limite')}
                                                                type="number" 
                                                                label="Limite de boletos" 
                                                                className="input-edit-event" 
                                                                InputProps={{className: classes.input,}}
                                                                InputLabelProps={{
                                                                    classes: {
                                                                        root: classes.formTextLabel
                                                                    }
                                                                }} 
                                                                error={errors.limite && values.error == true && true}
                                                                helperText={values.error == true && errors.limite} 
                                                            />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} style={{display:'flex', flexWrap:'wrap'}}>
                                <TextField 
                                required 
                                id="descuento" 
                                onChange={handleChange('descuento')}
                                type="number" 
                                min="0" 
                                max="100"
                                label="Descuento por boleto (%)" 
                                className="input-edit-event" 
                                InputProps={{className: classes.input,}}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.formTextLabel
                                    }
                                }}
                                style={{width:'95%'}} 
                                error={errors.descuento && values.error == true && true}
                                helperText={values.error == true && errors.descuento} 
                                />
                            </Grid>

                            <Grid style={{fontSize:12,fontFamily:'Oxygen',marginTop:9, marginTop:30, marginBottom:0}}>FECHAS DE EVENTO
                            <Tooltip title="Agregar" placement="top">
                                <IconButton aria-label="add" style={{padding:5}}>
                                    <AddCircleIcon style={{color:'white', fontSize:20}} />
                                </IconButton>
                                </Tooltip>
                            </Grid>

                            {/* {evento.dates.map((date,index) => */}
                                <Grid item xs={12}>
                                    <Grid className="icon-remove" style={{display:'flex', justifyContent:'flex-end'}}>
                                        <Tooltip title="Eliminar" placement="top">
                                        <IconButton aria-label="remove" style={{padding:5}}>
                                            <RemoveCircleIcon style={{color:'white', fontSize:20}} />
                                        </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <hr className="hr-div" align="left" />
                                    <Grid item xs={12} style={{display:'flex', flexWrap:'wrap', marginBottom:15}}>
                                        <Grid item xs={12} sm={4}>
                                                <TextField 
                                                    required 
                                                    id="fecha"  
                                                    type="date" 
                                                    min="0" 
                                                    label="Fecha" 
                                                    InputLabelProps={{shrink: true,}} 
                                                    className="input-edit-event"  
                                                    // InputProps={{className: classes.input,}}
                                                    // InputLabelProps={{
                                                    //     classes: {
                                                    //         root: classes.formTextLabel
                                                    //     }
                                                    // }}
                                                />
                                            </Grid>
                                        <Grid item xs={12} sm={4}>
                                                <TextField 
                                                    required 
                                                    id="inicio"  
                                                    type="time" 
                                                    min="0" 
                                                    label="Hora inicio" 
                                                    InputLabelProps={{shrink: true,}} 
                                                    className="input-edit-event"  
                                                    // InputProps={{className: classes.input,}}
                                                    // InputLabelProps={{
                                                    //     classes: {
                                                    //         root: classes.formTextLabel
                                                    //     }
                                                    // }}
                                                />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                                <TextField 
                                                    required 
                                                    id="cierre"  
                                                    type="time" 
                                                    min="0" 
                                                    label="Hora cierre" 
                                                    InputLabelProps={{shrink: true,}} 
                                                    className="input-edit-event"  
                                                    // InputProps={{className: classes.input,}}
                                                    // InputLabelProps={{
                                                    //     classes: {
                                                    //         root: classes.formTextLabel
                                                    //     }
                                                    // }}
                                                />
                                        </Grid>
                                    
                                    </Grid>
                                </Grid>
                            {/* )} */}

                            <Grid style={{display:'flex',justifyContent:'flex-end', alignItems:'center',marginTop:10}} className="grid-btns-event-edit">
                                <InertiaLink href={route('dashboard.producto',producto.id)} className="btn-cancelar">Cancelar</InertiaLink>
                                <Button variant="contained" type="submit" className="btn-action">Guardar evento</Button>
                            </Grid>
                            </MuiThemeProvider>
                        </form>

                    </Grid>
                </Paper>
                
            </Grid>
        </Grid>
        
    )
}

AgregarEvento.layout = (page) => (<LayoutAdmin children={page} title="Eventos" pageTitle="Eventos" />);

export default AgregarEvento;