import React from "react";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";

import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import RoomIcon from "@material-ui/icons/Room";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SchoolIcon from "@material-ui/icons/School";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { green, purple } from "@material-ui/core/colors";
import "../../../public/css/navbar.css";

import { InertiaLink, usePage } from '@inertiajs/inertia-react'

import {
    createMuiTheme,
    withStyles,
    makeStyles,
    useTheme,
    ThemeProvider,
} from "@material-ui/core/styles";
import route from "ziggy-js";

const ColorButton = withStyles((theme) => ({
    root: {
        color: "#FFFFFF",
        backgroundColor: "#323232",
        "&:hover": {
            backgroundColor: "#1F1F1F",
        },
        borderRadius: 20,
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    formControl: {
        paddingLeft: "10px",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Navbar() {
    const { auth } = usePage().props;
    const classes = useStyles();
    const theme = useTheme();
    const [colorChange, setColorchange] = React.useState(false);
    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
        },
    });

    const [idioma, setIdioma] = React.useState("ES");
    const handleChange = (event) => {
        setIdioma(event.target.value);
    };

    const changeNavbarColor = () => {
        if (window.scrollY >= 60) {
            setColorchange(true);
        } else {
            setColorchange(false);
        }
    };
    window.addEventListener("scroll", changeNavbarColor);

    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    function isUrl(url) {
        return window.location.href.indexOf(url) > -1
    }

    return (
        <div className="fixed-top">
            {/* NAVBAR >= 992px */}
            <div className="d-none d-lg-block">
                <div
                    className={`nvbr p-3 d-flex ${colorChange ? "colorChange" : ""
                        }`}
                >
                    <div className="mr-auto">
                        <InertiaLink href={route('inicio')}>
                            <img
                                src="/img/danteLogoBlanco.png"
                                style={{ maxHeight: 40 }}
                            />
                        </InertiaLink>
                    </div>
                    <div className="align-self-center">
                        <InertiaLink href={route("inicio")} style={{ textDecoration: "none" }} >
                            <Button
                                style={{ color: "#FFFFFF" }}
                                startIcon={<HomeIcon />}
                                className="grow"
                            >
                                HOME
                            </Button>
                        </InertiaLink>

                        <InertiaLink href={route("Dante")} style={{ textDecoration: "none" }} >
                            <Button
                                style={{ color: "#FFFFFF" }}
                                startIcon={<AddIcon />}
                                className="ml-3 grow"
                            >
                                DE DANTE ELUDIER
                            </Button>
                        </InertiaLink>

                        <InertiaLink href={route("contacto")} style={{ textDecoration: "none" }} >
                            <Button
                                style={{ color: "#FFFFFF" }}
                                startIcon={<RoomIcon />}
                                className="ml-3 grow"
                            >
                                CONTACTO
                            </Button>
                        </InertiaLink>

                        <InertiaLink href={route("libros")} style={{ textDecoration: "none" }} >
                            <Button
                                style={{ color: "#FFFFFF" }}
                                startIcon={<BookmarkIcon />}
                                className="ml-3 grow"
                            >
                                LIBROS
                            </Button>
                        </InertiaLink>

                        <InertiaLink href={route("products.index")} style={{ textDecoration: "none" }} >
                            <ColorButton
                                variant="contained"
                                color="primary"
                                startIcon={<SchoolIcon />}
                                className="ml-3"
                            >
                                PRODUCTOS
                            </ColorButton>
                        </InertiaLink>

                        {auth.user &&
                            <InertiaLink href='/logout' method="post" style={{ textDecoration: "none" }} >
                                <Button
                                    style={{ color: "#FFFFFF" }}
                                    startIcon={<MeetingRoomIcon />}
                                    className="ml-3 grow"
                                >
                                    Cerrar sesión
                                </Button>
                            </InertiaLink>
                        }

                        {!auth.user &&
                            <InertiaLink href='/login' style={{ textDecoration: "none" }} >
                                <Button
                                    style={{ color: "#FFFFFF" }}
                                    startIcon={<AccountCircleIcon />}
                                    className="ml-3 grow"
                                >
                                    Iniciar sesión
                                </Button>
                            </InertiaLink>
                        }

                        <FormControl className={classes.formControl}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idioma}
                                onChange={handleChange}
                                style={{ color: "#FFFFFF", width: "50px" }}
                            >
                                <MenuItem value={"ES"}>ES</MenuItem>
                                <MenuItem value={"EN"}>EN</MenuItem>
                            </Select>
                        </FormControl>

                    </div>
                </div>
            </div>

            <div className="d-lg-none">
                <div
                    className={`nvbr p-3 d-flex ${colorChange ? "colorChange" : ""
                        }`}
                >
                    <IconButton
                        aria-label="delete"
                        style={{ color: "#FFFFFF" }}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img
                        className="flex-fill img-fluid px-3"
                        src="/img/danteLogoBlanco.png"
                        style={{ maxHeight: "40px", objectFit: "contain" }}
                    />
                    <IconButton
                        aria-label="delete"
                        style={{ color: "#FFFFFF" }}
                        href={route('products.index')}
                    >
                        <SchoolIcon />
                    </IconButton>

                    <ThemeProvider theme={darkTheme}>
                        <Drawer
                            className={classes.drawer}
                            variant="temporary"
                            anchor="top"
                            open={open}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            onClose={() => setOpen(false)}
                        >
                            <div className={classes.drawerHeader}>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === "ltr" ? (
                                        <ChevronLeftIcon />
                                    ) : (
                                        <ChevronRightIcon />
                                    )}
                                </IconButton>
                            </div>
                            <Divider />
                            <List>
                                <ListItem
                                    button
                                    key="Inicio"
                                    component="a"
                                    href={route("inicio")}
                                >
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Inicio" />
                                </ListItem>
                                <ListItem
                                    button
                                    key="De Dante Eludier"
                                    component="a"
                                    href={route("Dante")}
                                >
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="De Dante Eludier" />
                                </ListItem>
                                <ListItem
                                    button
                                    key="Contacto"
                                    component="a"
                                    href={route("contacto")}
                                >
                                    <ListItemIcon>
                                        <RoomIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Contacto" />
                                </ListItem>
                                <ListItem button
                                    key="Libros"
                                    component='a'
                                    href={route('libros')}>
                                    <ListItemIcon>
                                        <BookmarkIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Libros" />
                                </ListItem>
                                <ListItem
                                    button
                                    key="Productos"
                                    component="a"
                                    href={route("products.index")}
                                >
                                    <ListItemIcon>
                                        <SchoolIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Productos" />
                                </ListItem>
                                {auth.user &&
                                <ListItem
                                    button
                                    key="Logout"
                                    component="link"
                                    method='post'
                                    href='/logout'

                                >
                                    <ListItemIcon>
                                        <MeetingRoomIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Cerrar Sesión" />
                                </ListItem>
                                }
                                {!auth.user &&
                                <ListItem
                                    button
                                    key="Login"
                                    component="a"
                                    href='/login'
                                >
                                    <ListItemIcon>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Iniciar Sesión" />
                                </ListItem>
                                }
                            </List>
                            <Divider />
                        </Drawer>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}
