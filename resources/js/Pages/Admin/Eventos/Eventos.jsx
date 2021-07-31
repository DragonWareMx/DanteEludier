import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import FormHelperText from '@material-ui/core/FormHelperText'
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import PaginacionAdmin from '../../../components/common/PaginacionAdmin';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid, Paper, FormControl, Select, MenuItem} from '@material-ui/core'
import Evento from "../../../components/Eventos/Evento"

import "/css/boletos.css";

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: 25,
      backgroundColor:'#282828',
      color:'#FFFFFF',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
        maxWidth: 150,
        borderRadius: "5px",
        backgroundColor: "#323232",
        '& .MuiInputBase-root .MuiSelect-icon': {
            color:'#FFFFFF',
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "none",
        },
        "&:focus-within": {
            backgroundColor: "#434343",
            borderRadius: "5px",
        },
        "&:hover": {
            backgroundColor: "#434343",
            borderRadius: 5,
            opacity: 1
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none"
        },
    },
    orderText:{
        color: '#FFFFFF',

        fontFamily: 'Oxygen',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '18px',
    },
    select: {
        padding: "14px 14px",
        color: '#FFFFFF',
        border: "none"
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    }
}));


const Eventos = ({eventos}) => {
    const {status } = usePage().props;

    const classes = useStyles();

    return (
        <Grid container style={{marginTop:21, marginBottom:40}} >
            {status &&
                <FormHelperText id="component-text" style={{ color: "green", fontSize: 16 }}>{status}</FormHelperText>
            }
            <Grid item xs={12}>
                <Paper style={{backgroundColor:'#282828',padding:25,color:'#FFFFFF',fontFamily:'Oxygen'}}>
                    {/* Items eventos */}
                    {eventos && eventos.data && eventos.data.length > 0 && eventos.data.map((evento,index)=>(
                        <Evento key={index}
                        evento={evento}
                         />
                    ))}

                    {!eventos || eventos.data.length <= 0
                    ? <p>SIN EVENTOS REGISTRADOS</p>
                    : ''
                    }

                    <Grid item style={{marginTop: 25}}>
                        <PaginacionAdmin links={eventos.links} />
                    </Grid>

                </Paper>
                
            </Grid>
        </Grid>
        
    )
}

Eventos.layout = (page) => (<LayoutAdmin children={page} title="Eventos" pageTitle="Eventos" />);

export default Eventos;