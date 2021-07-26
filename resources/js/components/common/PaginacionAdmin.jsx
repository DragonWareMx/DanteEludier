import { InertiaLink } from '@inertiajs/inertia-react'
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';

//iconos
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    roundedButton: {
        border: "1px solid #9C9C9C",
        height: "32px",
        minWidth: "32px",
        padding: "0 6px",
        fontSize: "0.875rem",
        textAlign: "center",
        color: "#fff",
        '&:hover':{
            backgroundColor: "#313131"
        }
    },
    selected: {
        border: "1px solid #9C9C9C",
        height: "32px",
        minWidth: "32px",
        padding: "0 6px",
        fontSize: "0.875rem",
        textAlign: "center",
        color: "#fff",
        backgroundColor: "#424242",
        '&:hover':{
            backgroundColor: "#313131"
        }
    },
    iconButton: {
        height: "32px",
        minWidth: "32px",
        padding: "0 6px",
        color: "#FFFFFF",
        border: "1px solid #9C9C9C",
        borderRadius: "4px",
        '&.Mui-disabled':{
            color: "#424242",
            border: "1px solid #424242",
        }
    },
    dotsButton: {
        height: "32px",
        minWidth: "32px",
        '&.Mui-disabled':{
            color: "#FFFFFF",
        }
    }
}));

const PaginacionAdmin = ({links}) => {
    const classes = useStyles();

    if(links.length > 3){
        return (
            <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                {
                    links.map((link, index) => (
                        <Grid item key={index}>
                            <InertiaLink href={link.url ?? "#"} preserveState preserveScroll style={{textDecoration: "none"}}>
                            {/* SI NO ES UN NUMERO */}
                            {isNaN(link.label) ? 
                                //SI ES EL PRIMER ELEMENTO ENTONCES ES LA FLECHA
                                index == 0 ?
                                    <IconButton aria-label="anterior" disabled={!link.url} className={classes.iconButton}>
                                        <NavigateBeforeIcon fontSize="small" />
                                    </IconButton>
                                :
                                    //SI NO ES EL ULTIMO ELEMENTO DE LA LISTA ENTONCES SON LOS 3 PUNTOS
                                    index != links.length-1 ?
                                        <Button disabled className={classes.dotsButton}>
                                            ...
                                        </Button>
                                    :
                                    //ES EL ULTIMO ELEMENTO DE LA LISTA
                                        <IconButton aria-label="anterior" disabled={!link.url} className={classes.iconButton}>
                                            <NavigateNextIcon fontSize="small" />
                                        </IconButton>
                            :
                            //ES UN NUMERO
                            <Button className={link.active ? classes.selected : classes.roundedButton} disabled={!link.url}>
                                {link.label}
                            </Button>
                            }
                            </InertiaLink>
                        </Grid>
                    ))
                }
            </Grid>
        )
    }
    else
    {
        return (<></>)
    }
}

export default PaginacionAdmin