import { InertiaLink } from '@inertiajs/inertia-react'
import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core';


const Paginacion = ({links}) => {
    if(links.length > 3){
        return (
            // <ul className="pagination">
            //     {
            //         links.map((link, index) => (
            //             <li className={link.active ? "active" : link.url ? "waves-effect" : "disabled"} key={index}>
            //                 <InertiaLink href={link.url ?? "#"} preserveState>{
            //                 isNaN(link.label) ? 
            //                     index == 0 ? <i className="material-icons">chevron_left</i> 
            //                     : index != links.length-1 ? "..."
            //                         : <i className="material-icons">chevron_right</i> 
            //                 : link.label}</InertiaLink>
            //             </li>
            //         ))
            //     }
            // </ul>
            <div>
                {
                    links.map((link, index) => (
                        <InertiaLink href={link.url ?? "#"} preserveState key={index}>
                            <IconButton disabled={link.active ? false : link.url ? false : true} size="small">
                                {
                                isNaN(link.label) ? 
                                index == 0 ? 
                                    <ArrowBackIosIcon /> 
                                    : 
                                    index != links.length-1 ? 
                                        "..."
                                        : 
                                        <ArrowForwardIosIcon />
                                :
                                link.label
                                }
                            </IconButton>
                        </InertiaLink>
                    ))
                }
            </div>
        )
    }
    else
    {
        return (<></>)
    }
}

export default Paginacion
