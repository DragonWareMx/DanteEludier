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
            <div className="pt-3">
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
                        ></FacebookIcon>
                    </a>
                    <a
                        href=""
                        target="_blank"
                        style={{ marginLeft: 12, marginRight: 12 }}
                    >
                        <TwitterIcon style={{ color: "#FFFFFF" }}></TwitterIcon>
                    </a>
                    <a
                        href=""
                        target="_blank"
                        style={{ marginLeft: 12, marginRight: 12 }}
                    >
                        <InstagramIcon
                            style={{ color: "#FFFFFF" }}
                        ></InstagramIcon>
                    </a>
                    <a
                        href=""
                        target="_blank"
                        style={{ marginLeft: 12, marginRight: 12 }}
                    >
                        <YouTubeIcon style={{ color: "#FFFFFF" }}></YouTubeIcon>
                    </a>
                </Grid>
            </div>
            <div className="row justify-content-center m-0 py-3">
                <div className="col-md-auto">
                    <Link href="#" className="text-white">
                        AVISO DE PRIVACIDAD
                    </Link>
                </div>
                <div className="col-md-auto">
                    <Link href="#" className="text-white">
                        POLÍTICA DE PRIVACIDAD
                    </Link>
                </div>
                <div className="col-md-auto">
                    <Link href="#" className="text-white">
                        TÉRMINOS Y CONDICIONES
                    </Link>
                </div>
            </div>
            <div className="text-white text-center">
                Copyright © 2020 Dante Eludier - Todos los derechos reservados.
            </div>
            <div className="text-muted text-center">
                <small>Desarrollado por DragonWare</small>
            </div>
        </div>
    );
}
