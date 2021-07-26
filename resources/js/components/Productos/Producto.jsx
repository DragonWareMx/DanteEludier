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

export default function Producto({producto}){
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Grid container className='producto_card'>
                <Grid item xs={10} sm={2}>
                    <img src={producto.images[0] && "/img/productos/"+producto.images[0].foto} className="producto_img"/> 
                </Grid>
                <Grid item xs={10} sm={10} className="producto_info"> 
                    <Grid container alignItems='center' style={{justifyContent:'space-between'}}>
                        <Grid style={{color:'#FFFFFF',fontFamily:'Oxygen',fontSize:16,fontWeight:'bold'}}>{producto.titulo}</Grid>
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
                            >
                                <MenuItem onClick={handleClose} style={{backgroundColor:'#323232',color:"#FFFFFF",justifyContent:'space-between',padding:'none'}}><div style={{marginRight:15}}>Editar</div><EditIcon></EditIcon></MenuItem>
                                <MenuItem onClick={handleClose} style={{backgroundColor:'#323232',color:"#FFFFFF",justifyContent:'space-between',padding:'none'}}><div style={{marginRight:15}}>Eliminar</div><DeleteIcon></DeleteIcon></MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                    <Grid alignItems='center' style={{fontSize:12,fontFamily:'Oxygen',marginTop:9}}>DISPONIBLE <EventAvailableIcon style={{marginTop:'-5px'}}></EventAvailableIcon> /  NO DISPONIBLE <DateRangeIcon style={{marginTop:'-5px'}}></DateRangeIcon></Grid>
                    <Grid style={{fontFamily:'Oxygen',fontSize:14,color:'#D1D1D1',marginTop:9}}>Desde $99999.99 MXN</Grid>
                </Grid>
            </Grid>
        </>
    );
}