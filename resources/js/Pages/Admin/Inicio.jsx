import { React, useEffect } from 'react';
import LayoutAdmin from "../../layouts/LayoutAdmin";
import { InertiaLink, Link } from '@inertiajs/inertia-react';
import route from "ziggy-js";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import EventIcon from '@material-ui/icons/Event';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginTop: '25px',
        backgroundColor: '#282828',
        borderRadius: '4px',
        padding: '1% 2%'
    },
    title: {
        display: 'inline-block',
        fontFamily: 'Oxygen',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '20px',
        margin: '0 2px',
        color: 'white',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'transparent',
        border: ' 1px solid #535353',
        boxSizing: 'border-box',
        borderRadius: '4px',
        minHeight: '70px',
        height: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    grid: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    text: {
        fontFamily: 'Oxygen',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        color: 'white',
        margin: '0px 5px'
    },
    inertiaLink: {
        padding: '0px',
        backgroundColor: 'transparent',
        border: 'none',
        "&:hover": {
            backgroundColor: "#000000",
            color: "white",
            borderRadius: '4px',
        }
    }
}));

const Inicio = ({ num_products, num_events, num_vendidos, num_pendientes }) => {
    const classes = useStyles();
    function hora() {
        var dt = new Date();
        var h = dt.getHours(), m = dt.getMinutes();
        if (h > 11 && h < 21) {
            return '¡Buenas tardes!'
        }
        else if (h > 5 && h < 12) {
            return '¡Buenos días!'
        }
        else {
            return '¡Buenas noches!'
        }
    };
    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.title}>
                    {hora()}
                </div>
                <Grid container spacing={3} className={classes.grid}>
                    <Grid item xs={12} sm={4} md={3}>
                        <InertiaLink href={route('dashboard.productos')} as="button" type="button" className={classes.inertiaLink}>
                            <Paper className={classes.paper}>
                                <ShoppingBasketIcon style={{ color: 'white', margin: '0px 5px' }} fontSize='large' />
                                <div className={classes.text}>{num_products} productos registrados</div>
                            </Paper>
                        </InertiaLink>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <InertiaLink href={route('dashboard.events')} as="button" type="button" className={classes.inertiaLink}>
                            <Paper className={classes.paper}>
                                <EventIcon style={{ color: 'white', margin: '0px 5px' }} fontSize='large' />
                                <div className={classes.text}>{num_events} eventos registrados</div>
                            </Paper>
                        </InertiaLink>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <InertiaLink href={route('ticket.index')} as="button" type="button" className={classes.inertiaLink}>
                            <Paper className={classes.paper}>
                                <ConfirmationNumberIcon style={{ color: 'white', margin: '0px 5px' }} fontSize='large' />
                                <div className={classes.text}>{num_vendidos} boletos vendidos</div>
                            </Paper>
                        </InertiaLink>
                    </Grid>
                </Grid>
                <div className={classes.title}>
                    Compras pendientes
                </div>
                <Grid container spacing={3} className={classes.grid}>
                    <Grid item xs={12} sm={4} md={3}>
                        <InertiaLink href="#" as="button" type="button" className={classes.inertiaLink}>
                            <Paper className={classes.paper}>
                                <LocalAtmIcon style={{ color: 'white', margin: '0px 5px' }} fontSize='large' />
                                <div className={classes.text}>{num_pendientes} compras pendientes</div>
                            </Paper>
                        </InertiaLink>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

Inicio.layout = (page) => (
    <LayoutAdmin children={page} title="Dashboard - Inicio" pageTitle="inicio" />
);

export default Inicio;