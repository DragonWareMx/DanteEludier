import React from 'react';
import LayoutAdmin from "../../../layouts/LayoutAdmin";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import "/css/boletos.css";
import { toInteger } from 'lodash';

const Boleto = ({compra}) => {
    
    function subTotal(boletos){
        let subtotal = 0;

        boletos.forEach(boleto => {
            subtotal += parseFloat(boleto.precio);
        });

        return subtotal;
    }
    return (
        <Grid container style={{marginTop:20, marginBottom:40}} >
            <Grid item xs={12}>
                <Paper style={{backgroundColor:'#282828',padding:25,color:'#FFFFFF',fontFamily:'Oxygen'}}>
                    <Grid item xs={12} className="txt-orden-id">ORDEN #{compra.id}</Grid>

                    <Grid style={{display:'flex', flexWrap:'wrap', alignItems:'flex-start'}}>
                        <Grid item xs={12} md={8} className="grid-boleto">
                            {/* Imagen del producto */}
                            <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                <img src="/img/productos/avatar.jpg" className="img-product" style={{width:'100%',height:'100%', objectFit:'cover', borderTopLeftRadius:4, borderBottomLeftRadius:4}}></img>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={9} xl={9} md={9} className="grid-sub-boleto">
                                <Grid item xs={12} className="grid-boleto-info">
                                    <div className="item-info-b">
                                        <Grid item xs={12} className="title-info"># BOLETOS</Grid>
                                        <Grid item xs={12} className="txt-info">{compra.events.length} boletos</Grid>
                                    </div>

                                    <div className="item-info-b">
                                        <Grid item xs={12} className="title-info">PRODUCTO</Grid>
                                        <Grid item xs={12} className="txt-info">{compra.events['0'].product.titulo}</Grid>
                                    </div>

                                    <div className="item-info-b">
                                        <Grid item xs={12} className="title-info">EVENTO</Grid>
                                        <Grid item xs={12} className="txt-info">{compra.events['0'].ciudad}, {compra.events['0'].sede}</Grid>
                                    </div>

                                    <div className="item-info-b">
                                        <Grid item xs={12} className="title-info">SUBTOTAL</Grid>
                                        <Grid item xs={12} className="txt-info">${subTotal(compra.events)} MXN</Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={12} className="total-price" style={{border:'none'}}>
                                    <Grid item xs={12} className="title-info">{compra.events['0'].descuento*100}% DESCUENTO</Grid>
                                    <Grid item xs={12} className="txt-info">$-{subTotal(compra.events)*compra.events['0'].descuento}</Grid>
                                </Grid>

                                <Grid item xs={12} className="total-price">
                                    <Grid item xs={12} className="title-info">TOTAL</Grid>
                                    <Grid item xs={12} className="txt-info" style={{fontWeight:'bold'}}>${compra.total} MXN</Grid>
                                </Grid>
                            </Grid>
                            
                        </Grid>

                        <Grid item xs={12} md={4} className="grid-boleto-compra">
                            <Grid item xs={12} className="grid-boleto-info" style={{paddingBottom:15, borderBottom:'0.5px solid #535353'}}>
                                <div className="item-info-b">
                                    <Grid item xs={12} className="title-info">FECHA DE COMPRA</Grid>
                                    <Grid item xs={12} className="txt-info">{compra.fecha}</Grid>
                                </div>

                                <div className="item-info-b">
                                    <Grid item xs={12} className="title-info">TIPO DE PAGO</Grid>
                                    <Grid item xs={12} className="txt-info">{compra.metodo_pago}</Grid>
                                </div>

                                <div className="item-info-b">
                                    <Grid item xs={12} className="title-info">ESTATUS</Grid>
                                    <Grid item xs={12} className="txt-info">Pagado, sin usar</Grid>
                                </div>
                            </Grid>

                            <Grid item xs={12} style={{marginBottom:10, marginTop:22}}>
                                <Grid item xs={12} className="title-info">USUARIO</Grid>
                                <Grid item xs={12} className="txt-info">{compra.user.name}</Grid>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:10}}>
                                <Grid item xs={12} className="title-info">CORREO</Grid>
                                <Grid item xs={12} className="txt-info">{compra.user.email}</Grid>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:10}}>
                                <Grid item xs={12} className="title-info">TELÉFONO</Grid>
                                <Grid item xs={12} className="txt-info">{compra.user.phone}</Grid>
                            </Grid>

                            <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                <Button variant="contained" className="btn-action">Marcar como pagado</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Paper>
            </Grid>
        </Grid>
        
    )
}

Boleto.layout = (page) => (
    <LayoutAdmin children={page} title="Boletos" pageTitle="Boletos" />
);

export default Boleto;