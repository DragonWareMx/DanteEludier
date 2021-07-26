import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar'
import React from 'react'
import Layout from '../../../layouts/Layout'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: 25,
      backgroundColor:'#282828',
    },
}));

const Boletos = ({ tickets }) => {
    const classes = useStyles();
    
    const [state, setState] = React.useState({
        search: ""
    });

    return (
    <>
        <Paper className={classes.paper}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                {/* BUSCADOR Y FILTROS */}
                <Grid item container xs={12}>
                    {/* buscador */}
                    <Grid item>
                        <SearchBar
                            value={state.search}
                            onChange={(newValue) => setState({ search: newValue })}
                            //onRequestSearch={() => doSomethingWith(this.state.value)}
                            placeholder="Producto, evento o usuario"
                            >
                        </SearchBar>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </>
    )
}

// Boletos.layout = page => <Layout children={page} title="Boletos" />

export default Boletos