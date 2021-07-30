import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'

//CSS
import '/css/producto.css';
import '/css/eventos.css';

//iconos
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TuneIcon from '@material-ui/icons/Tune';
import DeleteIcon from '@material-ui/icons/Delete';
import EventIcon from '@material-ui/icons/Event';

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

export default function evento({evento}){

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

    function yearFecha(fecha){
        const dob = new Date(fecha);
        const year = dob.getFullYear();
        return `${year} `;
    }

    function transformaFecha(fecha) {
        const dob = new Date(fecha);
        const monthNames = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ];
        const day = dob.getDate();
        const monthIndex = dob.getMonth();
        const year = dob.getFullYear();
        return `${day} ${monthNames[monthIndex]} ${year}, `;
    }

    const classes = useStyles();

    return (
        <>
        <Grid container className='evento_card'>
            <Grid item xs={12} sm={2} md={3}>
                <InertiaLink href={route('dashboard.event',evento.id)}><img src={evento.foto && "/img/productos/"+evento.foto} className="evento_img"/> </InertiaLink>
            </Grid>
            <Grid item xs={12} sm={10} md={9} className="producto_info"> 
                <Grid container alignItems='center' style={{flexWrap:'wrap-reverse'}}>
                    <Grid item xs={11}><InertiaLink  href={route('dashboard.event',evento.id)} style={{color:'#FFFFFF',fontFamily:'Oxygen',fontSize:16,fontWeight:'bold',textDecoration:'none'}}>{evento.titulo}</InertiaLink></Grid>
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
                            <InertiaLink href={route('dashboard.event',evento.id)} style={{display:'flex',textDecoration:'none', color:'white'}}><MenuItem style={{justifyContent:'space-between',width:'100%'}}><div style={{marginRight:15}}>Editar</div><TuneIcon></TuneIcon></MenuItem></InertiaLink>
                            <MenuItem style={{justifyContent:'space-between'}}><div style={{marginRight:15}}>Eliminar</div><DeleteIcon></DeleteIcon></MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
                {/* INFO EVENTO */}
                <Grid item xs={12} style={{fontFamily:'Oxygen',fontSize:15,fontWeight:'bold',color:'white',marginTop:5}}>{evento.ciudad}, {evento.sede}</Grid>
                <Grid item xs={12} style={{fontFamily:'Oxygen',fontSize:14,color:'white',marginTop:9}}>
                    

                    {evento.dates && evento.dates.map((date) =>
                        transformaFecha(date.fecha)
                    )}
                    {/* {yearFecha(evento.dates[0].fecha)}  */}
                    <EventIcon style={{fontSize:16}} />
                </Grid>
                <Grid item xs={12} style={{fontFamily:'Oxygen',fontSize:14,color:'#D1D1D1',marginTop:9}}>Precio ${evento.precio} MXN</Grid>
                
                <Grid container direction='row' style={{marginTop:32}}>
                    <Grid style={{marginRight:34, marginBottom:10}}>
                            <div style={{color:'#9c9c9c',fontSize:12, fontFamily:'Oxygen'}}>% DESCUENTO</div>
                            <div style={{color:'#FFFFFF', fontSize:14,fontFamily:'Oxygen',marginTop:4}}>{evento.descuento *100}% c/u</div>
                    </Grid>
                    <Grid style={{marginRight:34, marginBottom:10}}>
                        {/* No se revisa que los boletos vendidos esten confirmados */}
                        <div style={{color:'#9c9c9c',fontSize:12, fontFamily:'Oxygen'}}>BOLETOS VENDIDOS</div>
                        <div style={{color:'#FFFFFF', fontSize:14,fontFamily:'Oxygen',marginTop:4}}>{evento.limite - evento.total} Boleto(s)</div>
                    </Grid>
                    <Grid style={{marginRight:34, marginBottom:10}}>
                        <div style={{color:'#9c9c9c',fontSize:12, fontFamily:'Oxygen'}}>LIMITE DE BOLETOS</div>
                        <div style={{color:'#FFFFFF', fontSize:14,fontFamily:'Oxygen',marginTop:4}}>{evento.limite} Boleto(s)</div>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
        </>
    );
}