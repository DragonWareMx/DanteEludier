import React from "react";
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import FormHelperText from '@material-ui/core/FormHelperText'
import Layout from '../../layouts/LayoutAdmin';

//Material UI

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//css

//componentes
import Producto from '../../components/Productos/Producto';
import { toInteger } from "lodash";

const Productos = ({productos}) => {
    
    const {status } = usePage().props;
    const [state, setState] = React.useState({
        orden: '',
      });
    
      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      }; 

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

    //revisa la disponibilidad
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
            {status &&
                <FormHelperText id="component-text" style={{ color: "green", fontSize: 16 }}>{status}</FormHelperText>
            }
                <Grid item xs={12}>
                    <Paper style={{backgroundColor:'#282828',padding:25,color:'#FFFFFF',fontFamily:'Oxygen'}}>
                        <Grid container alignItems='center' style={{justifyContent:'flex-end'}}>
                            Ordenar por
                            <FormControl style={{marginLeft:18,}}>
                                <Select
                                native
                                value={state.orden}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'orden',
                                    id: 'orden',
                                }}
                                style={{border:'none',backgroundColor:'#323232',color:'#FFFFFF', fontFamily:'Oxygen',fontSize:13,width:128,height:33,padding:10}}
                                >
                                    <option style={{backgroundColor:'#323232',fontSize:13}} value="Estatus">Estatus</option>
                                    <option style={{backgroundColor:'#323232',fontSize:13}} value="Precio">Precio</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        {productos &&
                            productos.map((producto,index)=>(
                                <Producto key={index} producto={producto} 
                                precio={(producto.events && producto.events.length > 0) ? calcularPrecioMasBajo(producto.events) : null}
                                disponible={(producto.events && producto.events.length > 0) ? disponibilidad(producto.events) : false}
                                totalEventos = {producto && producto.events && producto.events.length}
                                totalBoletos = {producto && producto.events && contarBoletos(producto.events)}/>
                            ))}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

Productos.layout = (page) => (
    <Layout children={page} title="Dashboard - Productos" pageTitle="Productos" />
);

export default Productos;
