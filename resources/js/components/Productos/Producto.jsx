import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'

//CSS
import '/css/producto.css';

//iconos
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DateRangeIcon from '@material-ui/icons/DateRange';

//Material ui
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


//Cosas del modal de eliminar
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Producto({producto, precio, disponible, totalEventos, totalBoletos}){
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

    return (
        <>
            <Grid container className='producto_card'>
                <Grid item xs={12} sm={2} md={3}>
                    <InertiaLink href={route('dashboard.producto',producto.id)}><img src={producto.images[0] && "/img/productos/"+producto.images[0].foto} className="producto_img"/> </InertiaLink>
                </Grid>
                <Grid item xs={12} sm={10} md={9} className="producto_info"> 
                    <Grid container alignItems='center' style={{justifyContent:'space-between'}}>
                        <InertiaLink  href={route('dashboard.producto',producto.id)} style={{color:'#FFFFFF',fontFamily:'Oxygen',fontSize:16,fontWeight:'bold',textDecoration:'none'}}>{producto.titulo}</InertiaLink>
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
                                <MenuItem style={{justifyContent:'space-between'}}><InertiaLink href={route('editar.producto',producto.id)} style={{display:'flex',textDecoration:'none', color:'white'}}><div style={{marginRight:15}}>Editar</div><EditIcon></EditIcon></InertiaLink></MenuItem>
                                <MenuItem onClick={handleClickOpen} style={{justifyContent:'space-between'}}><div style={{marginRight:15}}>Eliminar</div><DeleteIcon></DeleteIcon></MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                    { disponible == true ?
                    <Grid container alignItems='center' style={{fontSize:12,fontFamily:'Oxygen',marginTop:9}}>
                        DISPONIBLE <EventAvailableIcon></EventAvailableIcon> 
                    </Grid>
                    :
                    <Grid container alignItems='center' style={{fontSize:12,fontFamily:'Oxygen',marginTop:9}}>
                    NO DISPONIBLE <DateRangeIcon></DateRangeIcon>
                    </Grid>
                    }
                    <Grid style={{fontFamily:'Oxygen',fontSize:14,color:'#D1D1D1',marginTop:9}}>Desde ${precio} MXN</Grid>
                    <Grid container direction='row' style={{marginTop:32}}>
                        <Grid style={{marginRight:34}}>
                            <div style={{color:'#9c9c9c',fontSize:12, fontFamily:'Oxygen'}}>TOTAL DE EVENTOS</div>
                            <div style={{color:'#FFFFFF', fontSize:14,fontFamily:'Oxygen',marginTop:4}}>{totalEventos} Evento(s)</div>
                        </Grid>
                        <Grid style={{marginRight:34}}>
                            <div style={{color:'#9c9c9c',fontSize:12, fontFamily:'Oxygen'}}>BOLETOS VENDIDOS</div>
                            <div style={{color:'#FFFFFF', fontSize:14,fontFamily:'Oxygen',marginTop:4}}>{totalBoletos} Boleto(s)</div>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
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
}