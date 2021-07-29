import React from 'react';
import styled from "styled-components";
import Backdrop from "./Backdrop";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { InertiaLink, Link } from '@inertiajs/inertia-react';
import route from "ziggy-js";

import List from '@material-ui/core/List';
import MuiListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import EventIcon from '@material-ui/icons/Event';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';


const StyledNav = styled.nav`
    background-color:  #000000;
    color: white;
    height: 100vh;
    width: ${p => p.compact ? '60px' : '226px'};
    position: sticky;
    top: 0px;
    left: 0px;
    z-index: 1;
    padding: 35px 10px;
    transition: width 0.2s cubic-bezier( 0.4, 0, 1, 1);
    border: none;
    &::before{
        content: "",
        background-color: rgba(0,0,0, .2);
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    @media(max-width: 990px){
        position: fixed;
        transform: translate3d( ${p => p.visible ? 0 : "-230px"}, 0,0);
        transition:  transform .3s ${p => p.visible ? "cubic-bezier( 0.4, 0, 1, 1)" : "cubic-bezier( 0, 0, 0.2, 1)"} !important;
    };

`;

const Logo = styled.img`
    width: 100%;
    height:  ${p => p.compact ? '0px' : '40px'};
    margin-bottom: ${p => p.compact ? '0px' : '60px'} !important;
    padding: 0px 15px;
    transition: height 0.2s cubic-bezier( 0.4, 0, 1, 1);
`;

const MLogo = styled.img`
    width: 40px;
    height:  ${p => p.compact ? '40px' : '0px'};
    margin-top: -20px;
    margin-bottom: ${p => p.compact ? '45px' : '0px'} !important;
    padding: 0px 0px;
    transition: height 0.2s cubic-bezier( 0.4, 0, 1, 1);
`;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'transparent',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    separador: {
        marginTop: '5px',
        marginBottom: '5px',
        border: '0.5px solid #323232',
        width: '100%',
        height: '1px',
    },
    texto: {
        fontFamily: 'Oxygen',
        fontWeight: '400px',
        fontStyle: 'normal',
        fontSize: '14px',
        lineHeight: '18px'
    },
    inertiaLink: {
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0px 0px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0px',
        "&:hover": {
            backgroundColor: "#282828;",
            color: "white",
            borderRadius: '4px',
        }
    },
    inertiaLink2: {
        backgroundColor: 'transparent',
        border: 'none',
        width: '100%',
        color: 'white',
        textDecoration: 'none'
    },
    inertiaLinkNested: {
        backgroundColor: 'transparent',
        border: 'none',
        width: '100%',
        color: 'white',
        textDecoration: 'none',
        padding: '0px',
    }
}));

const ListItem = withStyles({
    root: {
        // "&$selected": {
        //     backgroundColor: "red",
        //     color: "white"
        // },
        // "&$selected:hover": {
        //     backgroundColor: "purple",
        //     color: "white"
        // },
        "&:hover": {
            backgroundColor: "#282828;",
            color: "white",
            borderRadius: '4px',
        }
    },
    selected: {}
})(MuiListItem);

export function Navbar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Backdrop visible={props.visible} onClick={props.close} />
            <StyledNav {...props}>
                {/* {props.compact ?
                    <img src="/img/DE.png" alt="Logo" className={classes.logo2} /> :
                    <img src="/img/danteLogoBlanco.png" alt="Logo" className={classes.logo} />
                } */}
                <Logo src="/img/danteLogoBlanco.png" alt="Logo" className={classes.logo}  {...props} />
                <MLogo src="/img/DE.png" alt="Logo" className={classes.logo2}   {...props} />
                {props.compact ?
                    <div id="lista-con-compact" >
                        <InertiaLink href={route('dashboard.inicio')} as="button" type="button" className={classes.inertiaLink}>
                            <HomeIcon style={{ color: 'white' }} />
                        </InertiaLink>
                        <InertiaLink href={route('dashboard.productos')} as="button" type="button" className={classes.inertiaLink}>
                            <ShoppingBasketIcon style={{ color: 'white' }} />
                        </InertiaLink>
                        <InertiaLink href={route('dashboard.events')} as="button" type="button" className={classes.inertiaLink}>
                            <EventIcon style={{ color: 'white' }} />
                        </InertiaLink>
                        <InertiaLink href={route('ticket.index')} as="button" type="button" className={classes.inertiaLink}>
                            <ConfirmationNumberIcon style={{ color: 'white' }} />
                        </InertiaLink>
                        <div className={classes.separador}></div>
                        <InertiaLink href={route('crear.producto')} as="button" type="button" className={classes.inertiaLink}>
                            <AddCircleIcon style={{ color: 'white' }} />
                        </InertiaLink>
                    </div> :
                    <div id="lista-sin-compact" >
                        <List
                            component="nav"
                            className={classes.root}
                        >
                            <InertiaLink href={route('dashboard.inicio')} className={classes.inertiaLink2}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <HomeIcon style={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Inicio" classes={{ primary: classes.texto }} />
                                </ListItem>
                            </InertiaLink>
                            <ListItem button onClick={handleClick}>
                                <ListItemIcon>
                                    <SchoolIcon style={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Productos" classes={{ primary: classes.texto }} />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component='nav' disablePadding>
                                    <InertiaLink href={route('dashboard.productos')} as="button" type="button" className={classes.inertiaLinkNested}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <ShoppingBasketIcon style={{ color: 'white' }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Productos" classes={{ primary: classes.texto }} />
                                        </ListItem>
                                    </InertiaLink>

                                    <InertiaLink href={route('dashboard.events')} as="button" type="button" className={classes.inertiaLinkNested}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <EventIcon style={{ color: 'white' }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Eventos" classes={{ primary: classes.texto }} />
                                        </ListItem>
                                    </InertiaLink>

                                    <InertiaLink href={route('ticket.index')} as="button" type="button" className={classes.inertiaLinkNested}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <ConfirmationNumberIcon style={{ color: 'white' }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Boletos" classes={{ primary: classes.texto }} />
                                        </ListItem>
                                    </InertiaLink>
                                </List>
                            </Collapse>
                        </List>
                        <div className={classes.separador}></div>
                        <InertiaLink href={route('crear.producto')} className={classes.inertiaLink2}>
                            <ListItem button>
                                <ListItemIcon>
                                    <AddCircleIcon style={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Agregar producto" classes={{ primary: classes.texto }} />
                            </ListItem>
                        </InertiaLink>
                    </div>
                }
            </StyledNav>

        </>
    )
}