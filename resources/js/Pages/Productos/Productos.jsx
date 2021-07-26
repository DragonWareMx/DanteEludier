import React from "react";
// import Layout from "../../layouts/Layout";
// import { InertiaLink } from '@inertiajs/inertia-react';

//Material UI

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//css

//componentes
import Producto from '../../components/Productos/Producto';

const Productos = ({productos}) => {
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
    return (
        <>
            <Grid container >
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
                                <Producto key={index} producto={producto}/>
                            ))}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

// Productos.layout = (page) => (
//     <Layout children={page} title="Dashboard - Productos" pageTitle="Productos" />
// );

export default Productos;
