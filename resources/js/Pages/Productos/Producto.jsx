import React from "react";
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import FormHelperText from '@material-ui/core/FormHelperText'
import Layout from '../../layouts/LayoutAdmin';

//Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import route from 'ziggy-js';

//iconos
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import AddCircleIcon from '@material-ui/icons/AddCircle';

//CSS
import '/css/producto.css';

//componentes
import { toInteger } from "lodash";
import Evento from '../../components/Eventos/Evento';

//Cosas del modal de eliminar
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Producto = ({producto, events}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const useStyles = makeStyles((theme) => ({
        menuPaper: {
            backgroundColor: "#323232;",
            borderRadius: '4px',
            color: 'white',
        }
    }));

    //Cosas del modal eliminar
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const modalClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    //REVISA LA DISPONIBILIDAD
    function disponibilidad(eventos) {
        const fecha = new Date();
        let disp = false;
        eventos.forEach(evento => {
            let fec = evento.dates[0].fecha;
            var splitDate = fec.split(" ");
            var splitDate2 = splitDate[0].split("-");

            if (splitDate2[0] > fecha.getFullYear())
                disp = true;
            else if(splitDate2[0] == fecha.getFullYear()){
                if(toInteger(splitDate2[1]) > (fecha.getMonth()+1)) {
                    disp = true;
                }
                else if(toInteger(splitDate2[1]) == (fecha.getMonth()+1)){
                    if(toInteger(splitDate2[2])> fecha.getDate())
                    disp = true;
                }
            }
        });
        return disp;
    }

    //si no hay precios entonces es null
    function calcularPrecioMasBajo(eventos) {
        let precio = null;

        eventos.forEach(evento => {
            if (!precio) {
                precio = evento.precio
                return
            }
            if (precio > evento.precio)
                precio = evento.precio
        });
        return precio
    }

    //contar boletos
    function contarBoletos(eventos) {
        let total = 0;

        eventos.forEach(evento => {
            total+= evento.purchases.length;
        });
        return total
    }

    return (
        <>
            <Grid container style={{marginTop:21,marginBottom:21}}>
                <Grid item xs={12}>
                    <Paper style={{backgroundColor:'#282828',padding:25,color:'#FFFFFF',fontFamily:'Oxygen'}}>
                        <Grid container>
                            <Grid item  xs={12} sm={3}>
                                <img className="verproducto_img" src={producto.images[0] && "/img/productos/"+producto.images[0].foto}></img>
                            </Grid>
                            <Grid item xs={12} sm={9} className="verproducto_info"> 
                                <Grid container alignItems='center' style={{justifyContent:'space-between'}}>
                                    <Grid style={{color:'#FFFFFF',fontFamily:'Oxygen',fontSize:16,fontWeight:'bold',textDecoration:'none'}}>{producto.titulo}</Grid>
                                    <Grid>
                                        <Button aria-controls={"menu-"+producto.id} aria-haspopup="true" onClick={handleClick}>
                                            <MoreVertIcon style={{color:'#FFFFFF'}}></MoreVertIcon>
                                        </Button>
                                        <Menu
                                            id={"menu-"+producto.id}
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            anchorOrigin={{vertical:'center',horizontal:'left'}}
                                            transformOrigin={{vertical:'top',horizontal:'right'}}
                                            elevation={0}
                                            classes={{ paper: classes.menuPaper }}
                                        >
                                            <MenuItem onClick={handleClose} style={{justifyContent:'space-between'}}><InertiaLink href={route('editar.producto',producto.uuid)} style={{display:'flex',textDecoration:'none', color:'white'}}><div style={{marginRight:15}}>Editar</div><EditIcon></EditIcon></InertiaLink></MenuItem>
                                            <MenuItem onClick={handleClickOpen} style={{justifyContent:'space-between'}}><div style={{marginRight:15}}>Eliminar</div><DeleteIcon></DeleteIcon></MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                                { (producto.events && producto.events.length > 0) && disponibilidad(producto.events) ?
                                <Grid container alignItems='center' style={{fontSize:12,fontFamily:'Oxygen',marginTop:9}}>
                                    DISPONIBLE <EventAvailableIcon></EventAvailableIcon> 
                                </Grid>
                                :
                                <Grid container alignItems='center' style={{fontSize:12,fontFamily:'Oxygen',marginTop:9}}>
                                NO DISPONIBLE <DateRangeIcon></DateRangeIcon>
                                </Grid>
                                }
                                <Grid style={{fontFamily:'Oxygen',fontSize:14,color:'#D1D1D1',marginTop:9}}>Desde $ {(producto.events && producto.events.length > 0) && calcularPrecioMasBajo(producto.events) } MXN</Grid>
                                <Grid container direction='row' style={{marginTop:32}}>
                                    <Grid style={{marginRight:34}}>
                                        <div style={{color:'#9c9c9c',fontSize:12, fontFamily:'Oxygen'}}>TOTAL DE EVENTOS</div>
                                        <div style={{color:'#FFFFFF', fontSize:14,fontFamily:'Oxygen',marginTop:4}}>{producto && producto.events && producto.events.length} Evento(s)</div>
                                    </Grid>
                                    <Grid style={{marginRight:34}}>
                                        <div style={{color:'#9c9c9c',fontSize:12, fontFamily:'Oxygen'}}>BOLETOS VENDIDOS</div>
                                        <div style={{color:'#FFFFFF', fontSize:14,fontFamily:'Oxygen',marginTop:4}}>{producto && producto.events && contarBoletos(producto.events)} Boleto(s)</div>
                                    </Grid>  
                                </Grid>
                                <br></br>
                                <Grid item xs={12}>{producto.descripcion}</Grid>
                                <br></br>
                                {producto.hojaDescriptiva &&
                                    <a href={'/documentos/'+producto.hojaDescriptiva} className='verproducto_pdf' target='_blank'><PictureAsPdfIcon style={{fontSize:18,marginRight:6}}></PictureAsPdfIcon> PDF</a>
                                }
                                <Grid container style={{justifyContent:'flex-end',marginBottom:12}}>
                                    <InertiaLink href={'#'} style={{marginTop:31,color:'white',fontSize:14,fontFamily:'Oxygen'}}><AddCircleIcon style={{marginRight:15}}></AddCircleIcon>Agregar evento</InertiaLink>
                                </Grid>
                                <hr style={{backgroundColor:'#535353'}}></hr>

                                {events && events.length > 0 && 
                                    events.map((evento,index)=>(
                                        <Evento key={index} evento={evento}/>
                                ))}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <div style={{display:'flex',width:25,height:25}}></div>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={modalClose}
                aria-labelledby={"modal-titulo"+producto.id}
                aria-describedby={"modal-descripcion"+producto.id}
            >
                <DialogTitle id={"modal-titulo"+producto.id} style={{color:'red'}}>{"¿Seguro que deseas eliminar el producto "+producto.titulo+"?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id={"modal-descripcion"+producto.id}>
                        Se eliminarán todos los datos relacionados con este producto incluyendo la información de los boletos vendidos.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={modalClose} style={{color:'black'}}>
                        Cancelar
                    </Button>
                    <InertiaLink onClick={modalClose} href={route('delete.producto', producto.id)} method="delete" style={{color:'red',fontSize:19,marginRight:10,marginTop:'-5px',textDecoration:'none'}}>
                        Eliminar
                    </InertiaLink>
                </DialogActions>
            </Dialog>
        </>
    );
};

Producto.layout = (page) => (
    <Layout children={page} title="Dashboard - Productos" pageTitle="Productos" />
);

export default Producto;
