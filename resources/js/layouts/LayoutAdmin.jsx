import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Header from './parts/Header';
import { Navbar } from "./parts/Navbar";
import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    grid: "nav header" min-content
                          "nav main" 1fr / min-content 1fr;
    min-height: 100vh;
`;

const GridNav = styled.nav`
    grid-area: nav;
    z-index: 2000;
`;

const GridHeader = styled.div`
    grid-area: header;
`;

const GridMain = styled.div`
    grid-area: main;
    background-color: #121212;
`;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function LayoutAdmin({ title, pageTitle, children }) {
    const [showNav, setShowNav] = useState(0);
    const toggle = () => {
        setShowNav(Number(!showNav));
        setCompact(0);
    };
    const [compact, setCompact] = React.useState(0);
    const handleCompact = () => setCompact(Number(!compact));

    const classes = useStyles();
    useEffect(() => {
        document.title = title;
    }, [title]);


    return (
        <React.Fragment>
            {/* contenido */}
            <Grid>
                <GridNav>
                    <Navbar visible={showNav} close={toggle} compact={compact} />
                </GridNav>
                <GridHeader>
                    <Header toggle={toggle} handleCompact={handleCompact} />
                </GridHeader>
                <GridMain>
                    {pageTitle}
                    {children}
                </GridMain>
            </Grid>
        </React.Fragment>
    );
}
