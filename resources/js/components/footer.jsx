import React from "react";
import Grid from "@material-ui/core/Grid";

import Link from "@material-ui/core/Link";

//Iconos
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";

import "../../../public/css/footer.css";

export default function Navbar() {
    return (
        <div className="ftr">
            <div className="pt-4">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <a
                        href=""
                        target="_blank"
                        style={{ marginLeft: 12, marginRight: 12 }}
                    >
                        <FacebookIcon
                            style={{ color: "#FFFFFF" }}
                            fontSize="large"
                            className="grow"
                        ></FacebookIcon>
                    </a>
                    <a
                        href=""
                        target="_blank"
                        style={{ marginLeft: 12, marginRight: 12 }}
                    >
                        <TwitterIcon
                            style={{ color: "#FFFFFF" }}
                            fontSize="large"
                            className="grow"
                        ></TwitterIcon>
                    </a>
                    <a
                        href=""
                        target="_blank"
                        style={{ marginLeft: 12, marginRight: 12 }}
                    >
                        <InstagramIcon
                            style={{ color: "#FFFFFF" }}
                            fontSize="large"
                            className="grow"
                        ></InstagramIcon>
                    </a>
                    <a
                        href=""
                        target="_blank"
                        style={{ marginLeft: 12, marginRight: 12 }}
                    >
                        <YouTubeIcon
                            style={{ color: "#FFFFFF" }}
                            fontSize="large"
                            className="grow"
                        ></YouTubeIcon>
                    </a>
                </Grid>
            </div>
            <div className="row justify-content-center m-0 py-3">
                <div className="col-md-auto text-center pt-3 pt-md-0">
                    <Link href={route('aviso')} className="text-white links-ftr">
                        AVISO DE PRIVACIDAD
                    </Link>
                </div>
                <div className="col-md-auto text-center pt-3 pt-md-0">
                    <Link href="#" className="text-white links-ftr">
                        POLÍTICA DE PRIVACIDAD
                    </Link>
                </div>
                <div className="col-md-auto text-center pt-3 pt-md-0">
                    <Link href={route('terminos')} className="text-white links-ftr">
                        TÉRMINOS Y CONDICIONES
                    </Link>
                </div>
            </div>
            <div className="text-white text-center pt-2 text-copy">
                Copyright © 2020 Dante Eludier - Todos los derechos reservados.
            </div>
            <div className="text-center p-3 text-copy">
                <a href="https://dragonware.com.mx/" target="_blank">Desarrollado por DragonWare <img src="/img/icons/dragonware.png" /></a>
            </div>
        </div>
    );
}
