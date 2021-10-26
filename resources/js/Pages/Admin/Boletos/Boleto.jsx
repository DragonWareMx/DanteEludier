import React from 'react';
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

import "/css/boletos.css";
import "/css/modal.css";
import { toInteger } from 'lodash';

import TextField from "@material-ui/core/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Boleto = ({compra}) => {

    const [open, setOpen] = React.useState(false);
    const [openD, setOpenD] = React.useState(false);

    const { errors, status } = usePage().props;

    const [values, setValues] = React.useState({
        mail:'',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        //const button = document.getElementById('boton-diploma');
        //button.disabled = true;
        Inertia.patch(route('ticket.update', compra.id), values,
            {
                // onError: () => {
                //     button.disabled = false;
                // },
                // onSuccess: () => {
                //     button.disabled = false;
                // },
                preserveScroll: (page) => Object.keys([page.props.status, page.props.errors]).length,
            }
        )
        // setValues({ ...values,
        //     nombre: '',
        //     mail:'',
        //     telefono:'',
        //     procedencia:'',
        //     facebook:'',
        //     instagram:'',});
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    //A los que se les agrega una D son para modal de eliminar
    const handleClickOpenD = () => {
        setOpenD(true);
    }

    const modalClose = () => {
        setOpen(false);
    };

    const modalCloseD = () => {
        setOpenD(false);
    };

    const useStyles = makeStyles((theme) => ({
        menuPaper: {
            backgroundColor: "#323232;",
            borderRadius: '4px',
            color: 'white',
        }
    }));

    const classes = useStyles();


    function subTotal(boletos){
        let subtotal = 0;

        boletos.forEach(boleto => {
            subtotal += parseFloat(boleto.precio);
        });

        return subtotal;
    }


    return (
        <>
        <Grid container style={{marginTop:21, marginBottom:40}} >
            <Grid item xs={12}>
                <Paper style={{backgroundColor:'#282828',padding:25,color:'#FFFFFF',fontFamily:'Oxygen'}}>
                    <Grid item xs={12} className="txt-orden-id">ORDEN #{compra.id}</Grid>

                    <Grid style={{display:'flex', flexWrap:'wrap', alignItems:'flex-start'}}>
                        <Grid item xs={12} md={8} className="grid-boleto">
                            {/* Imagen del producto */}
                            <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                                <img src={compra.events[0].product.images[0] && "/img/productos/"+compra.events[0].product.images[0].foto} className="img-product" style={{width:'100%',height:'100%', objectFit:'cover', borderTopLeftRadius:4, borderBottomLeftRadius:4}}></img>
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
                                    { compra.confirmed ?
                                        <Grid item xs={12} className="txt-info">Pagado</Grid> :
                                        <Grid item xs={12} className="txt-info">Sin pagar</Grid>
                                    }
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
                            {!compra.confirmed ?
                            <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                <Button variant="contained" onClick={handleClickOpen} className="btn-action">Marcar como pagado</Button>
                            </Grid>
                            :
                            <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                <Button variant="contained" onClick={handleClickOpen} className="btn-action">Enviar boleto (s) nuevamente</Button>
                            </Grid>
                            }
                            <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                <Button variant="contained" onClick={handleClickOpenD} className="btn-action">Eliminar compra</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Paper>
            </Grid>
        </Grid>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={modalClose}
            aria-labelledby={"modal-titulo"+compra.id}
            aria-describedby={"modal-descripcion"+compra.id}
        >
            {!compra.confirmed ?
            <form onSubmit={handleSubmit}>
                <DialogTitle id={"modal-titulo"+compra.id} className="modal-title-txt">{"¿Seguro que deseas marcar la compra de "+compra.user.name+" como pagada?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id={"modal-descripcion"+compra.id} className="modal-content-txt">
                        Una vez se haya marcado como pagado, la acción no se podrá deshacer. El usuario recibirá su(s) boleto(s) al correo {compra.user.email}
                    </DialogContentText>
                    <TextField
                        error={errors.mail ? true : false}
                        className="ml-2"
                        id="mail"
                        label="Si deseas enviar el boleto a otro correo electrónico, escríbelo aquí"
                        fullWidth
                        value={values.mail}
                        onChange={handleChange('mail')}
                    />
                </DialogContent>
                <DialogActions style={{marginBottom:10, marginRight:10}}>
                    <Button onClick={modalClose} className="btn-cancel-modal">
                        Cancelar
                    </Button>
                    <Button onClick={modalClose} type='submit' className="btn-delete-modal">
                        Marcar
                    </Button>
                </DialogActions>
            </form>
            :
            <form onSubmit={handleSubmit}>
                <DialogTitle id={"modal-titulo"+compra.id} className="modal-title-txt">{"¿Quieres reenviar los boletos de "+compra.user.name+"?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id={"modal-descripcion"+compra.id} className="modal-content-txt">
                        El usuario recibirá su(s) boleto(s) al correo {compra.user.email}
                    </DialogContentText>
                    <TextField
                        error={errors.mail ? true : false}
                        className="ml-2"
                        id="mail"
                        label="Si deseas enviar el boleto a otro correo electrónico, escríbelo aquí"
                        fullWidth
                        value={values.mail}
                        onChange={handleChange('mail')}
                    />
                </DialogContent>
                <DialogActions style={{marginBottom:10, marginRight:10}}>
                    <Button onClick={modalClose} className="btn-cancel-modal">
                        Cancelar
                    </Button>
                    <Button onClick={modalClose} type='submit' className="btn-delete-modal">
                        Enviar
                    </Button>
                </DialogActions>
            </form>
            }
        </Dialog>
        {/* modal eliminar */}
        <Dialog
            open={openD}
            TransitionComponent={Transition}
            keepMounted
            onClose={modalCloseD}
            aria-labelledby={"modal-titulo"+compra.id}
            aria-describedby={"modal-descripcion"+compra.id}
        >
            <DialogTitle id={"modal-titulo"+compra.id} className="modal-title-txt">{"¿Seguro que deseas eliminar la compra de "+compra.user.name+" ?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id={"modal-descripcion"+compra.id} className="modal-content-txt">
                    Una vez se haya eliminado, la acción no se podrá deshacer. Los boletos pertenecientes a esta compra también se eliminarán de la base de datos y volverán a estar disponibles esos lugares (siempre y cuando no haya pasado la fecha del evento).
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{marginBottom:10, marginRight:10}}>
                <Button onClick={modalCloseD} className="btn-cancel-modal">
                    Cancelar
                </Button>
                <InertiaLink onClick={modalCloseD} href={route('ticket.delete', compra.id)} method="delete" as="button" className="btn-delete-modal">
                    Eliminar
                </InertiaLink>
            </DialogActions>
        </Dialog>
        </>
    )
}

Boleto.layout = (page) => (
    <LayoutAdmin children={page} title="Boletos" pageTitle="Boletos" />
);

export default Boleto;
