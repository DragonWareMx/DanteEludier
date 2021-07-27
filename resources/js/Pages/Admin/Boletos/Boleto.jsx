import React from 'react';
import LayoutAdmin from "../../../layouts/LayoutAdmin";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import "/css/boletos.css";

const Boleto = () => {
    return (
        <Grid container style={{marginTop:20, marginBottom:40}} >
            <Grid item xs={12}>
                <Paper style={{backgroundColor:'#282828',padding:25,color:'#FFFFFF',fontFamily:'Oxygen'}}>
                    <Grid item xs={12} className="txt-orden-id">ORDEN #0014</Grid>

                    <Grid style={{display:'flex', flexWrap:'wrap', alignItems:'flex-start'}}>
                        <Grid item xs={12} md={8} className="grid-boleto">
                            {/* Imagen del producto */}
                            <Grid item xs={3}>
                                <img src="/img/productos/avatar.jpg" className="img-product" style={{width:'100%',height:'100%', objectFit:'cover', borderTopLeftRadius:4, borderBottomLeftRadius:4}}></img>
                            </Grid>
                            <Grid item xs={12} sm={9} lg={9} xl={9} md={9} className="grid-sub-boleto">
                                <Grid item xs={12} className="grid-boleto-info">
                                    <div className="item-info-b">
                                        <Grid item xs={12} className="title-info"># BOLETOS</Grid>
                                        <Grid item xs={12} className="txt-info">4 boletos</Grid>
                                    </div>

                                    <div className="item-info-b">
                                        <Grid item xs={12} className="title-info">PRODUCTO</Grid>
                                        <Grid item xs={12} className="txt-info">Taller Vivencial Avatar Financiero</Grid>
                                    </div>

                                    <div className="item-info-b">
                                        <Grid item xs={12} className="title-info">EVENTO</Grid>
                                        <Grid item xs={12} className="txt-info">Uruapan, Holliday In Lorem ipsum doolor sit amet</Grid>
                                    </div>

                                    <div className="item-info-b">
                                        <Grid item xs={12} className="title-info">SUBTOTAL</Grid>
                                        <Grid item xs={12} className="txt-info">$5,049.00 MXN</Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={12} className="total-price" style={{border:'none'}}>
                                    <Grid item xs={12} className="title-info">10% DESCUENTO</Grid>
                                    <Grid item xs={12} className="txt-info">$-5,04.90 MXN</Grid>
                                </Grid>

                                <Grid item xs={12} className="total-price">
                                    <Grid item xs={12} className="title-info">TOTAL</Grid>
                                    <Grid item xs={12} className="txt-info" style={{fontWeight:'bold'}}>$5,04.90 MXN</Grid>
                                </Grid>
                            </Grid>
                            
                        </Grid>

                        <Grid item xs={12} md={4} className="grid-boleto-compra">
                            <Grid item xs={12} className="grid-boleto-info" style={{paddingBottom:15, borderBottom:'0.5px solid #535353'}}>
                                <div className="item-info-b">
                                    <Grid item xs={12} className="title-info">FECHA DE COMPRA</Grid>
                                    <Grid item xs={12} className="txt-info">27 Abril 2021</Grid>
                                </div>

                                <div className="item-info-b">
                                    <Grid item xs={12} className="title-info">TIPO DE PAGO</Grid>
                                    <Grid item xs={12} className="txt-info">Transferencia</Grid>
                                </div>

                                <div className="item-info-b">
                                    <Grid item xs={12} className="title-info">ESTATUS</Grid>
                                    <Grid item xs={12} className="txt-info">Pagado, sin usar</Grid>
                                </div>
                            </Grid>

                            <Grid item xs={12} style={{marginBottom:10, marginTop:22}}>
                                <Grid item xs={12} className="title-info">USUARIO</Grid>
                                <Grid item xs={12} className="txt-info">Dulce Gabriela CandyPop Marín</Grid>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:10}}>
                                <Grid item xs={12} className="title-info">CORREO</Grid>
                                <Grid item xs={12} className="txt-info">correo@ejemplo.com</Grid>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:10}}>
                                <Grid item xs={12} className="title-info">TELÉFONO</Grid>
                                <Grid item xs={12} className="txt-info">4432209378</Grid>
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