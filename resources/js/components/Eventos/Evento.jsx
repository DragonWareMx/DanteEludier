import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'

//CSS
import '/css/producto.css';

//iconos
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TuneIcon from '@material-ui/icons/Tune';
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

export default function evento(){

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

    const classes = useStyles();

    return (
        <>
         <Grid container className='producto_card'>
            <Grid item xs={12} sm={2} md={3}>
                <InertiaLink href="#!"><img src="/img/productos/avatar.jpg" className="producto_img"/> </InertiaLink>
            </Grid>
            <Grid item xs={12} sm={10} md={9} className="producto_info"> 
                <Grid container alignItems='center' style={{justifyContent:'space-between'}}>
                    <InertiaLink  href="#!" style={{color:'#FFFFFF',fontFamily:'Oxygen',fontSize:16,fontWeight:'bold',textDecoration:'none'}}>Taller Vivencial Avatar Financiero</InertiaLink>
                    <Grid>
                        <Button aria-controls={"menu-"+1} aria-haspopup="true" onClick={handleClick}>
                            <MoreVertIcon style={{color:'#FFFFFF'}}></MoreVertIcon>
                        </Button>
                        <Menu
                            // id={"menu-"+producto.id}
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
                            <MenuItem onClick={handleClose} style={{justifyContent:'space-between'}}><div style={{marginRight:15}}>Editar</div><TuneIcon></TuneIcon></MenuItem>
                            <MenuItem style={{justifyContent:'space-between'}}><div style={{marginRight:15}}>Eliminar</div><DeleteIcon></DeleteIcon></MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
                {/* INFO EVENTO */}
                <Grid item xs={12} style={{fontFamily:'Oxygen',fontSize:15,fontWeight:'bold',color:'white',marginTop:5}}>Uruapan, Holliday Uruapan</Grid>
                <Grid item xs={12} style={{fontFamily:'Oxygen',fontSize:14,color:'white',marginTop:9}}>3 Septiembre 4 Septiembre 5 Septiembre</Grid>
                <Grid item xs={12} style={{fontFamily:'Oxygen',fontSize:14,color:'#D1D1D1',marginTop:9}}>Precio $5004.90 MXN</Grid>
                
                <Grid container direction='row' style={{marginTop:32}}>
                    <Grid style={{marginRight:34}}>
                            <div style={{color:'#9c9c9c',fontSize:12, fontFamily:'Oxygen'}}>% DESCUENTO</div>
                            <div style={{color:'#FFFFFF', fontSize:14,fontFamily:'Oxygen',marginTop:4}}>10% c/u</div>
                    </Grid>
                    <Grid style={{marginRight:34}}>
                        <div style={{color:'#9c9c9c',fontSize:12, fontFamily:'Oxygen'}}>BOLETOS VENDIDOS</div>
                        <div style={{color:'#FFFFFF', fontSize:14,fontFamily:'Oxygen',marginTop:4}}>4 Boleto(s)</div>
                    </Grid>
                    <Grid style={{marginRight:34}}>
                        <div style={{color:'#9c9c9c',fontSize:12, fontFamily:'Oxygen'}}>BOLETOS DISPONIBLES</div>
                        <div style={{color:'#FFFFFF', fontSize:14,fontFamily:'Oxygen',marginTop:4}}>10 Boleto(s)</div>
                    </Grid>
                    
                </Grid>

            </Grid>
        </Grid>
        </>
    );
}