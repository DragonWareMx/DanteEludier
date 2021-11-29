import React from "react";
import Layout from "../layouts/Layout";
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import FormHelperText from '@material-ui/core/FormHelperText'
import { sizing } from '@material-ui/system';

//componentes
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import Checkbox from '@material-ui/core/Checkbox';

import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

//estilos
import "/css/contacto.css";
import "/css/inicio.css";

import {
    FormControl,
    makeStyles,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { maxHeight } from "@material-ui/system";
import route from "ziggy-js";
import Grid from "@material-ui/core/Grid";


//iconos
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import Instagram from "@material-ui/icons/Instagram";



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
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
}));

const HmmRegistro =  () => {
    const { errors, status } = usePage().props;

    const [values, setValues] = React.useState({
        _method: 'post',
        nombre: '',
        apellidos:'',
        mail:'',
        telefono:'',
        procedencia:'',
        avatar:'',
        ciudad_avatar:'',
        quien_te_invito:'',
        dinero_espiritual:'',
        curso_solvencia:'',
        fb: false,
        insta: false,
        tw: false,
        tiktok: false,
        youtube: false,
        todas:false,
        conoces_axen:'',
        eres_cliente:'',
        staff:'',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    //manda el forumulario
    function handleSubmit(e) {
        e.preventDefault();
        const button = document.getElementById('boton-diploma');
        button.disabled = true;
        Inertia.post(route('hmm.create'), values,
            {
                onError: () => {
                    button.disabled = false;

                },
                onSuccess: () => {
                    button.disabled = false;
                    setValues({ ...values,
                        nombre: '',
                        apellidos:'',
                        mail:'',
                        telefono:'',
                        procedencia:'',
                        avatar:false,
                        ciudad_avatar:'',
                        quien_te_invito:'',
                        dinero_espiritual:'',
                        curso_solvencia:'',
                        fb:'',
                        insta:'',
                        tw:'',
                        tiktok:'',
                        youtube: '',
                        todas:'',
                        });
                },
                preserveScroll: (page) => Object.keys([page.props.status, page.props.errors]).length,
            }
        )

    }

    return (
        <>
            <div style={{ backgroundColor: "#000000" }}>
                <div className="portadaContacto">
                    <img
                        src="/img/portadas/cuentas.jpg"
                        className="img-fluid"
                    ></img>
                </div>
                <div
                    className="text-center"
                    style={{
                        color: "#FFFFFF",
                        position: "absolute",
                        top: "30%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                     <img src="/img/HappyMoneyblanco.png" className="img-fluid" />
                    {/* <h1
                        className="display-3 font-weight-bold"
                        style={{
                            fontFamily: "Roboto Slab",
                        }}
                    >
                        Happy Money Movement
                    </h1>*/}
                </div>

                {/* CARD DE PRODUCTOS */}
                <Grid
                    container
                    justify="center"
                    style={{ backgroundColor: "#E5E5E5" }}

                >
                    <div className="Hmm_rounded" style={{ zIndex: "2" }} >
                        <div class='container'>
                                <form className="row-cols-sm-1 p-5" onSubmit={handleSubmit}>
                                    {status &&
                                        <FormHelperText id="component-text" style={{ color: "green", fontSize: 16 }}>{status}</FormHelperText>
                                    }
                                    <p
                                        className=""
                                        style={{
                                            fontFamily: "Roboto Slab",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Con la finalidad de generar más valor para tu vida con todas las opciones que Dante Eludier tiene para ti, te pedimos nos ayudes a responder las siguientes preguntas:
                                    </p>

                                    <div className="col d-flex pt-4">
                                        <AccountCircle
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.nombre ? true : false}
                                            className="ml-2"
                                            id="nombre"
                                            label="Nombre(s)"
                                            fullWidth
                                            required
                                            value={values.nombre}
                                            onChange={handleChange('nombre')}
                                        />
                                        {errors.nombre &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.nombre}</FormHelperText>
                                        }
                                    </div>
                                    <div className="col d-flex pt-4">
                                        <AccountCircle
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.apellidos ? true : false}
                                            className="ml-2"
                                            id="apellidos"
                                            label="Apellidos"
                                            fullWidth
                                            required
                                            value={values.apellidos}
                                            onChange={handleChange('apellidos')}
                                        />
                                        {errors.apellidos &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.apellidos}</FormHelperText>
                                        }
                                    </div>
                                    <div className="col d-flex pt-4">
                                        <MailIcon
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.mail ? true : false}
                                            className="ml-2"
                                            id="mail"
                                            label="Correo electrónico"
                                            fullWidth
                                            required
                                            value={values.mail}
                                            onChange={handleChange('mail')}
                                        />
                                        {errors.mail &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.mail}</FormHelperText>
                                        }
                                    </div>
                                    <div className="col d-flex pt-4">
                                        <PhoneIcon
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.telefono ? true : false}
                                            className="ml-2"
                                            id="telefono"
                                            label="Teléfono"
                                            fullWidth
                                            required
                                            value={values.telefono}
                                            onChange={handleChange('telefono')}
                                        />
                                        {errors.telefono &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.telefono}</FormHelperText>
                                        }
                                    </div>
                                    <div className="col d-flex pt-4">
                                        <AddLocationIcon
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.procedencia ? true : false}
                                            className="ml-2"
                                            id="procedencia"
                                            label="Ciudad de residencia"
                                            fullWidth
                                            required
                                            value={values.procedencia}
                                            onChange={handleChange('procedencia')}
                                        />
                                        {errors.procedencia &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.procedencia}</FormHelperText>
                                        }
                                    </div>

                                    {/* Avatar */}

                                    <div className="col pt-4">
                                        <FormLabel component="legend">¿Ya asististe al taller Avatar Financiero?</FormLabel>
                                        <RadioGroup aria-label="avatar" name="avatar" value={values.avatar} onChange={handleChange('avatar')}>
                                            <FormControlLabel value='true' control={<Radio />} label="Sí"/>
                                            <FormControlLabel value='false' control={<Radio />} label="No"/>
                                        </RadioGroup>
                                        {errors.avatar &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.avatar}</FormHelperText>
                                        }
                                    </div>

                                    {/* Ciudad del avatar */}

                                    <div id="ciudad" className="col pt-4"
                                    style={{
                                        display: values.avatar == "true" ? 'flex' : 'none'}}
                                    >
                                        <LocationCityIcon
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.ciudad_avatar ? true : false}
                                            className="ml-2"
                                            id="ciudad_avatar"
                                            label="¿En qué ciudad asististe al Avatar?"
                                            fullWidth
                                            value={values.ciudad_avatar}
                                            onChange={handleChange('ciudad_avatar')}
                                        />
                                        {errors.ciudad_avatar &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.ciudad_avatar}</FormHelperText>
                                        }
                                    </div>

                                    {/* Quién te invitó */}
                                    <div className="col pt-4"
                                    style={{
                                        display: values.avatar == "true" ? 'flex' : 'none'}}
                                    >
                                        <EmojiPeopleIcon
                                            className="align-self-end"
                                            style={{ color: "#BFBFBF" }}
                                        />
                                        <TextField
                                            error={errors.quien_te_invito ? true : false}
                                            className="ml-2"
                                            id="quien_te_invito"
                                            label="¿Quién te invitó a este taller?"
                                            fullWidth
                                            value={values.quien_te_invito}
                                            onChange={handleChange('quien_te_invito')}
                                        />
                                        {errors.quien_te_invito &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.quien_te_invito}</FormHelperText>
                                        }
                                    </div>
                                    <div className='col pt-3'
                                    style={{
                                        display: values.avatar == "true" ? 'flex' : 'none'}}
                                    >
                                        <FormLabel component="legend" style={{ color: 'green', fontSize:'12px'}}>Si fuiste becado, sólo menciónalo</FormLabel>
                                    </div>

                                    {/* DINERO ESPIRITUAL */}

                                    <div className="col pt-4">
                                        <FormLabel component="legend">¿Ya leíste el libro "Dinero espiritual"?</FormLabel>
                                        <RadioGroup aria-label="dinero_espiritual" name="dinero_espiritual" value={values.dinero_espiritual} onChange={handleChange('dinero_espiritual')}>
                                            <FormControlLabel value='Sí' control={<Radio />} label="Sí" />
                                            <FormControlLabel value='No' control={<Radio />} label="No" />
                                            <FormControlLabel value='Quiero' control={<Radio />} label="Lo quiero, ¿dónde lo consigo?" />
                                        </RadioGroup>
                                        {errors.dinero_espiritual &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.dinero_espiritual}</FormHelperText>
                                        }
                                    </div>

                                    {/* CURSO DE LA SOLVENCIA */}

                                    <div className="col pt-4">
                                        <FormLabel component="legend">¿Ya leíste el libro "Curso de la solvencia"?</FormLabel>
                                        <RadioGroup aria-label="curso_solvencia" name="curso_solvencia" value={values.curso_solvencia} onChange={handleChange('curso_solvencia')}>
                                            <FormControlLabel value='Sí' control={<Radio />} label="Sí" />
                                            <FormControlLabel value='No' control={<Radio />} label="No" />
                                            <FormControlLabel value='Quiero' control={<Radio />} label="Lo quiero, ¿dónde lo consigo?" />
                                        </RadioGroup>
                                        {errors.curso_solvencia &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.curso_solvencia}</FormHelperText>
                                        }
                                    </div>

                                    {/* REDES SOCIALES */}

                                    <div className='col pt-4'>
                                        <FormLabel component="legend">¿En cuáles de sus redes sociales sigues a Dante Eludier?</FormLabel>
                                        <FormControlLabel
                                            control={<Checkbox icon={<FacebookIcon />}
                                            checkedIcon={<FacebookIcon />} name="fb" />}
                                            label="Facebook"
                                            value={values.fb == 'true' ? 'false' : 'true'}
                                            onChange={handleChange('fb')}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox icon={<TwitterIcon />}
                                            checkedIcon={<TwitterIcon />} name="tw" />}
                                            label="Twitter"
                                            value={values.tw == 'true' ? 'false' : 'true'}
                                            onChange={handleChange('tw')}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox icon={<YouTubeIcon />}
                                            checkedIcon={<YouTubeIcon />} name="youtube" />}
                                            label="Youtube"
                                            value={values.youtube == 'true' ? 'false' : 'true'}
                                            onChange={handleChange('youtube')}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox icon={<Instagram />}
                                            checkedIcon={<InstagramIcon />} name="insta" />}
                                            label="Instagram"
                                            value={values.insta == 'true' ? 'false' : 'true'}
                                            onChange={handleChange('insta')}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox icon={<MusicVideoIcon />}
                                            checkedIcon={<MusicVideoIcon />} name="tiktok" />}
                                            label="TikTok"
                                            value={values.tiktok == 'true' ? 'false' : 'true'}
                                            onChange={handleChange('tiktok')}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox icon={<FavoriteBorder />}
                                            checkedIcon={<Favorite />} name="checkedH" />}
                                            label="Todas"
                                            value={values.todas == 'true' ? 'false' : 'true'}
                                            onChange={handleChange('todas')}
                                        />
                                    </div>

                                    {/* Conoces Axen capital */}

                                    <div className="col pt-4">
                                        <FormLabel component="legend">¿Conoces Axen Capital?</FormLabel>
                                        <RadioGroup aria-label="axen" name="axen" value={values.conoces_axen} onChange={handleChange('conoces_axen')}>
                                            <FormControlLabel value='true' control={<Radio />} label="Sí" />
                                            <FormControlLabel value='false' control={<Radio />} label="No" />
                                        </RadioGroup>
                                        {errors.conoces_axen &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.conoces_axen}</FormHelperText>
                                        }
                                    </div>

                                    {/* Eres cliente de Axen */}

                                    <div className="col pt-4"
                                    style={{
                                        display: values.conoces_axen == "true" ? 'block' : 'none'}}
                                    >
                                        <FormLabel component="legend">¿Eres cliente de Axen Capital?</FormLabel>
                                        <RadioGroup aria-label="axen_cliente" name="axen_cliente" value={values.eres_cliente} onChange={handleChange('eres_cliente')}>
                                            <FormControlLabel value='true' control={<Radio />} label="Sí" />
                                            <FormControlLabel value='false' control={<Radio />} label="No" />
                                        </RadioGroup>
                                        {errors.eres_cliente &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.eres_cliente}</FormHelperText>
                                        }
                                    </div>

                                    {/* ERES STAFF DE AXEN */}

                                    <div className="col pt-4"
                                    style={{
                                        display: values.conoces_axen == "true" ? 'block' : 'none'}}
                                    >
                                        <FormLabel component="legend">¿Eres staff de Axen Capital?</FormLabel>
                                        <RadioGroup aria-label="axen_staff" name="axen_staff" value={values.staff} onChange={handleChange('staff')}>
                                            <FormControlLabel value='interno' control={<Radio />} label="Sí, interno" />
                                            <FormControlLabel value='externo' control={<Radio />} label="Sí, externo" />
                                            <FormControlLabel value='no' control={<Radio />} label="No" />
                                        </RadioGroup>
                                        {errors.staff &&
                                            <FormHelperText id="component-error-text" style={{ color: 'red' }}>{errors.staff}</FormHelperText>
                                        }
                                    </div>

                                    <div>
                                        <FormLabel component="legend">Al dar clic en enviar aceptas que has leído y estás de acuerdo con el <a href={route('aviso')} style={{textDecoration:'none', color:"black"}} target="_blank" >Aviso de Privacidad</a> </FormLabel>
                                    </div>

                                    <div className="col justify-content-center justify-content-md-end pb-4 pb-md-0">
                                        <ColorButton
                                            variant="contained"
                                            color="primary"
                                            className="mt-4"
                                            size="large"
                                            id='boton-diploma'
                                            type='submit'
                                        >
                                            Enviar
                                        </ColorButton>
                                    </div>
                                </form>
                                                        </div>
                    </div>
                </Grid>
            </div>

        </>
    );
};

HmmRegistro.layout = (page) => (
    <Layout children={page} title="Happy Money Movement" pageTitle="Happy Money Movement" />
);

export default HmmRegistro;
