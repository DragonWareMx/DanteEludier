import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import FormHelperText from '@material-ui/core/FormHelperText'
import LayoutAdmin from "../../../layouts/LayoutAdmin";

import { makeStyles } from '@material-ui/core/styles';
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
    }
}));


const Evento = ({evento}) => {
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
        const day = dob.getDate();
        const monthIndex = dob.getMonth();
        const year = dob.getFullYear();
        return `${day}/${monthNames[monthIndex]}/${year}`;
    }

    const classes = useStyles();

    return (
        <Grid container style={{marginTop:21, marginBottom:40}} >
            <Grid item xs={12}>
                <Paper style={{backgroundColor:'#282828',padding:25,color:'#FFFFFF',fontFamily:'Oxygen',display:'flex',flexWrap:'wrap'}}>
                    <Grid item xs={12} sm={4}>
                        <img src={evento.foto && "/img/productos/"+evento.foto} className="img-producto-edit" style={{width:'100%',height:'100%',maxHeight:446, objectFit:'cover', borderTopLeftRadius:4, borderBottomLeftRadius:4}}></img>
                    </Grid>

                    <Grid item xs={12} sm={8} className="producto_info evento-edit-info">
                        
                        <Grid container alignItems='center' style={{flexWrap:'wrap-reverse'}}>
                            <Grid item xs={11}><InertiaLink  href={route('dashboard.producto',evento.id)} style={{color:'#FFFFFF',fontFamily:'Oxygen',fontSize:16,fontWeight:'bold',textDecoration:'none'}}>{evento.titulo}</InertiaLink></Grid>
                            <Grid item xs={1} style={{display:'flex',justifyContent:'flex-end'}}>
                                <Button aria-controls={"menu-"+1} aria-haspopup="true" onClick={handleClick}>
                                    <MoreVertIcon style={{color:'#FFFFFF'}}></MoreVertIcon>
                                </Button>
                                <Menu
                                    id={"menu-"+1}
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    anchorOrigin={{vertical:'center',horizontal:'left'}}
                                    transformOrigin={{vertical:'top',horizontal:'right'}}
                                    elevation={0}
                                    classes={{ paper: classes.menuPaper }}
                                >
                                    <MenuItem style={{justifyContent:'space-between'}}><div style={{marginRight:15}}>Eliminar</div><DeleteIcon></DeleteIcon></MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>

                        <form className='crearProducto_form' noValidate autoComplete="off" style={{display:'flex', flexWrap:'wrap'}}>
                            <Grid item xs={12} style={{display:'flex', flexWrap:'wrap'}}>
                                <Grid item xs={12} sm={6}><TextField color="primary" required id="ciudad" label={"Ciudad"} value={evento.ciudad} className="input-edit-event"  /></Grid>
                                <Grid item xs={12} sm={6}><TextField required id="sede" label="Sede" value={evento.sede} className="input-edit-event"  /></Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField required id="direccion" label="Dirección" value={evento.direccion} className="input-edit-event" style={{width:'95%'}} />
                            </Grid>

                            <Grid item xs={12} style={{display:'flex', flexWrap:'wrap'}}>
                                <Grid item xs={12} sm={6}><TextField required id="precio" value={evento.precio} type="number" label="Precio por boleto" className="input-edit-event"  /></Grid>
                                <Grid item xs={12} sm={6}><TextField required id="limite" value={evento.limite} type="number" label="Limite de boletos" className="input-edit-event"  /></Grid>
                            </Grid>

                            <Grid item xs={12} style={{display:'flex', flexWrap:'wrap'}}>
                                <TextField required id="descuento" type="number" value={evento.descuento} min="0" label="Descuento por boleto" className="input-edit-event" style={{width:'95%'}} />
                            </Grid>

                            <Grid style={{fontSize:12,fontFamily:'Oxygen',marginTop:9, marginTop:30, marginBottom:0}}>FECHAS DE EVENTO
                            <Tooltip title="Agregar" placement="top">
                                <IconButton aria-label="add" style={{padding:5}}>
                                    <AddCircleIcon style={{color:'white', fontSize:20}} />
                                </IconButton>
                                </Tooltip>
                            </Grid>

                            {evento.dates.map((date) =>
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
                                        <Grid item xs={12} sm={4}><TextField required id="fecha" type="date" min="0" label="Fecha" InputLabelProps={{shrink: true,}} className="input-edit-event"  /></Grid>
                                        <Grid item xs={12} sm={4}><TextField required id="inicio" type="date" min="0" label="Hora inicio" InputLabelProps={{shrink: true,}} className="input-edit-event"  /></Grid>
                                        <Grid item xs={12} sm={4}><TextField required id="cierre" type="date" min="0" label="Hora cierre" InputLabelProps={{shrink: true,}} className="input-edit-event"  /></Grid>
                                    </Grid>
                                </Grid>
                            )}

                            <Grid style={{display:'flex',justifyContent:'flex-end', alignItems:'center',marginTop:10}} className="grid-btns-event-edit">
                                <InertiaLink href={route('dashboard.events')} className="btn-cancelar">Cancelar</InertiaLink>
                                <Button variant="contained" type="submit" className="btn-action">Guardar evento</Button>
                            </Grid>
                        
                        </form>

                    </Grid>
                </Paper>
                
            </Grid>
        </Grid>
        
    )
}

Evento.layout = (page) => (<LayoutAdmin children={page} title="Eventos" pageTitle="Eventos" />);

export default Evento;