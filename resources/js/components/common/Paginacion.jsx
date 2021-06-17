import { InertiaLink } from '@inertiajs/inertia-react'
import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";

const Paginacion = ({links}) => {
    if(links.length > 3){
        return (
            <>
            <ul className="pagination" style={{width: "fit-content", margin: "auto", marginBottom: "20px", flexWrap: "wrap"}}>
                {
                    links.map((link, index) => (
                        <li className={link.active ? "page-item active" : link.url ? "page-item" : "page-item disabled"} key={index}>
                            <InertiaLink href={link.url ?? "#"} className="page-link" style={{backgroundColor: link.active && "black", borderColor: link.active && "black", color: link.active ? "white" : link.url ? "black" : "#6c757d"}} preserveState>{
                            isNaN(link.label) ? 
                                index == 0 ? "Previous" 
                                : index != links.length-1 ? "..."
                                    : "Next"
                            : link.label}</InertiaLink>
                        </li>
                    ))
                }
            </ul>
            </>
        )
    }
    else
    {
        return (<></>)
    }
}

export default Paginacion
