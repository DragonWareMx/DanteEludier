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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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
import '/css/modal.css';

//Cosas del modal de eliminar
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    }
});

const Evento = ({evento}) => {
    const { errors } = usePage().props

    const [values, setValues] = React.useState({
        ciudad: evento.ciudad || '',
        sede: evento.sede || '',
        direccion: evento.direccion || '',
        precio: evento.precio || 0,
        limite: evento.limite || 0,
        descuento: evento.descuento || 0,
        error: false,
        _method: 'patch', 
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        // console.log(event)
    };

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/dashboard/patchevento/'+evento.id, values,
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

    function transformaFecha(fecha) {
        const dob = new Date(fecha);
        const monthNames = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
        ];

        // // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
        const day = dob.getDate().toString().length < 2 
        ? `0${dob.getDate()}`
        : dob.getDate();
        
        const monthIndex = dob.getMonth();
        const year = dob.getFullYear();
        return `${year}-${monthNames[monthIndex]}-${day}`;
    }

    function makeTwoDigits (time) {
        const timeString = `${time}`;
        if (timeString.length === 2) return time
        return `0${time}`
      }

    function transformaHora(hora) {
        const dob = new Date(hora);
        const horas = dob.getHours();
        
        const minutos = dob.getMinutes();
        const segundos = dob.getSeconds();
        return `${makeTwoDigits(horas)}:${makeTwoDigits(minutos)}:${makeTwoDigits(segundos)}`;
    }

    //Cosas del modal eliminar
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const modalClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <>
        <Grid container style={{marginTop:21, marginBottom:40}} >
            <Grid item xs={12}>
                <Paper style={{backgroundColor:'#282828',padding:25,color:'#FFFFFF',fontFamily:'Oxygen',display:'flex',flexWrap:'wrap'}}>
                    {/* <Grid item xs={12}>
                        <div style={{margin: "auto"}}>
                            <Alertas />
                        </div>
                    </Grid> */}
                    
                    <Grid item xs={12} sm={4}>
                        <img src={evento.foto && "/img/productos/"+evento.foto} className="img-producto-edit" style={{width:'100%',height:'100%',maxHeight:446, objectFit:'cover', borderTopLeftRadius:4, borderBottomLeftRadius:4}}></img>
                    </Grid>

                    <Grid item xs={12} sm={8} className="producto_info evento-edit-info">
                        
                        <Grid container alignItems='center' style={{flexWrap:'wrap-reverse'}}>
                            <Grid item xs={11}><InertiaLink  href={route('dashboard.producto',evento.uuid)} style={{color:'#FFFFFF',fontFamily:'Oxygen',fontSize:16,fontWeight:'bold',textDecoration:'none'}}>{evento.titulo}</InertiaLink></Grid>
                            <Grid item xs={1} style={{display:'flex',justifyContent:'flex-end'}}>
                                <Button aria-controls={"menu-"+evento.id} aria-haspopup="true" onClick={handleClick}>
                                    <MoreVertIcon style={{color:'#FFFFFF'}}></MoreVertIcon>
                                </Button>
                                <Menu
                                    id={"menu-"+evento.id}
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    anchorOrigin={{vertical:'center',horizontal:'left'}}
                                    transformOrigin={{vertical:'top',horizontal:'right'}}
                                    elevation={0}
                                    classes={{ paper: classes.menuPaper }}
                                >
                                    <MenuItem onClick={handleClickOpen} style={{justifyContent:'space-between'}}><div style={{marginRight:15}}>Eliminar</div><DeleteIcon></DeleteIcon></MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>

                        <form className='crearProducto_form' noValidate autoComplete="off" onSubmit={handleSubmit} style={{display:'flex', flexWrap:'wrap'}}>
                            <MuiThemeProvider theme={theme}>
                            <Grid item xs={12} style={{display:'flex', flexWrap:'wrap'}}>
                                <Grid item xs={12} sm={6}><TextField  
                                                                color="primary" 
                                                                required 
                                                                id="ciudad" 
                                                                onChange={handleChange('ciudad')}
                                                                label={"Ciudad"} 
                                                                defaultValue={evento.ciudad} 
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
                                                                defaultValue={evento.sede} 
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
                                    defaultValue={evento.direccion} 
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
                                                                defaultValue={evento.precio} 
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
                                                                defaultValue={evento.limite} 
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
                                defaultValue={evento.descuento * 100} 
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

                            {evento.dates.map((date,index) =>
                                <Grid item xs={12} key={index}>
                                    <Grid className="icon-remove" style={{display:'flex', justifyContent:'flex-end'}}>
                                        <Tooltip title="Eliminar" placement="top">
                                        <IconButton aria-label="remove" style={{padding:5}}>
                                            <RemoveCircleIcon style={{color:'white', fontSize:20}} />
                                        </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <hr className="hr-div" align="left" />
                                    <Grid item xs={12} style={{display:'flex', flexWrap:'wrap', marginBottom:15}}>
                                        <Grid item xs={12} sm={4}><TextField required id="fecha" defaultValue={transformaFecha(date.fecha)} type="date" min="0" label="Fecha" InputLabelProps={{shrink: true,}} className="input-edit-event"  /></Grid>
                                        <Grid item xs={12} sm={4}><TextField required id="inicio" defaultValue={transformaHora(date.fecha)} type="time" min="0" label="Hora inicio" InputLabelProps={{shrink: true,}} className="input-edit-event"  /></Grid>
                                        <Grid item xs={12} sm={4}><TextField required id="cierre" defaultValue={transformaHora('2021-01-01 '+date.horaCierre)} type="time" min="0" label="Hora cierre" InputLabelProps={{shrink: true,}} className="input-edit-event"  /></Grid>
                                    </Grid>
                                </Grid>
                            )}

                            <Grid style={{display:'flex',justifyContent:'flex-end', alignItems:'center',marginTop:10}} className="grid-btns-event-edit">
                                <InertiaLink href={route('dashboard.events')} className="btn-cancelar">Cancelar</InertiaLink>
                                <Button variant="contained" type="submit" className="btn-action">Guardar evento</Button>
                            </Grid>
                            </MuiThemeProvider>
                        </form>

                    </Grid>
                </Paper>
                
            </Grid>
        </Grid>

        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={modalClose}
            aria-labelledby={"modal-titulo"+evento.id}
            aria-describedby={"modal-descripcion"+evento.id}
        >
            <DialogTitle id={"modal-titulo"+evento.id} className="modal-title-txt">{"¿Seguro que deseas eliminar el evento "+evento.ciudad+", "+evento.sede+"?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id={"modal-descripcion"+evento.id} className="modal-content-txt">
                    Se eliminarán todos los datos relacionados con este evento incluyendo la información de los boletos vendidos.
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{marginBottom:10, marginRight:10}}>
                <Button onClick={modalClose} className="btn-cancel-modal">
                    Cancelar
                </Button>
                <InertiaLink onClick={modalClose} href={route('eliminarEvento', evento.id)} as="button"  method="delete" className="btn-delete-modal">
                    ELIMINAR
                </InertiaLink>
            </DialogActions>
        </Dialog>

        </>
        
    )
}

Evento.layout = (page) => (<LayoutAdmin children={page} title="Eventos" pageTitle="Eventos" />);

export default Evento;