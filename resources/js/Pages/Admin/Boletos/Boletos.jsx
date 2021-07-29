import { Grid, Paper, FormControl, Select, MenuItem, TableHead, TableCell, TableRow, TableSortLabel, TableContainer, Table, TableBody } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { filter } from 'lodash';
import SearchBar from 'material-ui-search-bar'
import React from 'react'
import Paginacion from '../../../components/common/Paginacion';
import PaginacionAdmin from '../../../components/common/PaginacionAdmin';
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import { Inertia } from '@inertiajs/inertia'
import { useEffect } from 'react';

const headCells = [
    { id: 'producto', disablePadding: false, label: 'PRODUCTO' },
    { id: 'evento', disablePadding: false, label: 'EVENTO' },
    { id: 'usuario', disablePadding: false, label: 'USUARIO' },
    { id: 'telefono', disablePadding: false, label: 'TELÉFONO' },
    { id: 'boletos', disablePadding: false, label: 'BOLETOS' },
    { id: 'pago', disablePadding: false, label: 'TIPO DE PAGO' },
    { id: 'estatus', disablePadding: false, label: 'ESTATUS' },
]

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead
        className={classes.tableHead}
      >
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: 25,
      backgroundColor:'#282828',
      color:'#FFFFFF',
      marginBottom: "40px",
      marginTop: "21px"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
        maxWidth: 150,
        borderRadius: "5px",
        backgroundColor: "#323232",
        '& .MuiInputBase-root .MuiSelect-icon': {
            color:'#FFFFFF',
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "none",
        },
        "&:focus-within": {
            backgroundColor: "#434343",
            borderRadius: "5px",
        },
        "&:hover": {
            backgroundColor: "#434343",
            borderRadius: 5,
            opacity: 1
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none"
        },
    },
    orderText:{
        color: '#FFFFFF',

        fontFamily: 'Oxygen',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '18px',
    },
    select: {
        padding: "14px 14px",
        color: '#FFFFFF',
        border: "none"
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    tableHead: {
        '& .MuiTableRow-root .MuiTableCell-root': {
            color: "#9C9C9C",
            borderBottom: "0.5px solid #535353"
        },
        '& .MuiTableRow-root .MuiTableCell-root .MuiTableSortLabel-root.MuiTableSortLabel-active': {
            color: "#DDDDDD"
        },
        '& .MuiTableRow-root .MuiTableCell-root .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon': {
            color: "#DDDDDD"
        },
        '& .MuiTableRow-root .MuiTableCell-root .MuiTableSortLabel-root:hover': {
            color: "#DDDDDD"
        },
    },
    tableBody: {
        userSelect: "none",
        '& .MuiTableRow-root .MuiTableCell-root': {
            color: "#FFFFFF",
            border: "none"
        },
        '& .MuiTableRow-root.MuiTableRow-hover:hover': {
            backgroundColor: "#353535",
            borderRadius: 5
        },
    }
}));

const Boletos = ({ tickets, request }) => {
    const classes = useStyles();
    
    const [state, setState] = React.useState({
        search: "",
        filter: ""
    });
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');

    //evento para ordenar las columnas de la tabla
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    //onChange del select para filtrar los resultados
    const handleChangeFilter = (event) => {
        const value = event.target.value

        //se cambia el state del filtro y la búsqueda
        if(value == 'evento' || value == 'usuario' || value == 'telefono' || value == 'pago' || value == 'estatus'){
            setState(state => ({
                ...state,
                filter: value
            }))
        }
        else{
            setState(state => ({
                ...state,
                filter: ""
            }))
        }

    }

    //filtra los eventos repetidos
    function filterEvent(events){
        var ids = {}
        var eventsJson = []

        events.forEach(event => {
            if(!(event.id in ids)){
                eventsJson.push(event)
                ids[event.id] = true
            }
        });

        return eventsJson
    }

    //filtra los eventos y productos repetidos
    function filterProduct(events){
        var productIds = {}
        var filteredEvents = filterEvent(events)
        var filteredProducts = []

        filteredEvents.forEach(event => {
            if(!(event.product.id in productIds)){
                filteredProducts.push(event.product)
                productIds[event.product.id] = true
            }
        });

        return filteredProducts
    }

    //se activa cada vez que se cambia el filtro o la busqueda
    //recarga los datos filtrados
    useEffect(() => {
        Inertia.replace(route('ticket.index'), { data: state })
    }, [state])

    //se activa cada vez que se da click a uno de los haeders de la tabla
    //recarga los datos reordenados
    useEffect(() => {
        Inertia.replace(route('ticket.index'), {
            data: {
                orderby: orderBy,
                order: order,
                search: state.search,
                filter: state.filter
            } 
        })
    }, [orderBy, order])

    const cancelSearch = () => {
        setState(state => ({
            ...state,
            search: ""
        }))
    };

    return (
    <>
        <Paper className={classes.paper}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                {/* BUSCADOR Y FILTROS */}
                <Grid 
                    item
                    xs={12}
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    {/* buscador */}
                    <Grid item xs={12} sm={8}>
                        <SearchBar
                            value={state.search}
                            onChange={(newValue) => setState(state => ({
                                ...state,
                                search: newValue
                            }))}
                            onCancelSearch={cancelSearch}
                            //onRequestSearch={() => doSomethingWith(this.state.value)}
                            placeholder="Buscar"
                            style={{borderRadius: 50}}
                            >
                        </SearchBar>
                    </Grid>

                    {/* filtros */}
                    <Grid item container alignItems="center" style={{width: "fit-content"}}>
                        <Grid item className={classes.orderText} >
                            Filtrar
                        </Grid>

                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Select
                                    value={state.filter}
                                    onChange={handleChangeFilter}
                                    displayEmpty
                                    classes={{ root: classes.select, select: classes.selectFocus }}
                                >
                                    <MenuItem value="">
                                        Producto
                                    </MenuItem>

                                    <MenuItem value="evento">Evento</MenuItem>
                                    <MenuItem value="usuario">Usuario</MenuItem>
                                    <MenuItem value="telefono">Teléfono</MenuItem>
                                    <MenuItem value="pago">Tipo de pago</MenuItem>
                                    <MenuItem value="estatus">Estatus</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                {/* TABLA DE PRODUCTOS */}
                <Grid item style={{width: "100%"}}>
                    <TableContainer>
                        <Table>
                            <EnhancedTableHead
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody
                                className={classes.tableBody}
                            >
                            {tickets && tickets.data && tickets.data.length > 0 && tickets.data.map((ticket) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox" tabIndex={-1} key={ticket.id}
                                        // onClick={(event) => handleClick(event, row.name)}
                                    >
                                        <TableCell style={{borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}>
                                            {ticket.events.length > 0 ?
                                                filterProduct(ticket.events).map((product) => (
                                                    <div key={product.id + "producto"}>
                                                        {product.titulo}
                                                    </div>
                                                ))
                                            :
                                                "Sin productos"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {ticket.events.length > 0 ?
                                                filterEvent(ticket.events).map((event) => (
                                                    <div key={event.id + "evento"}>
                                                        {event.ciudad}, {event.sede}
                                                    </div>
                                                ))
                                            :
                                                "Sin eventos"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {ticket.user ?
                                                <>
                                                    {ticket.user.name} {ticket.user.apellido_p} {ticket.user.apellido_m}
                                                </>
                                            :
                                                "Sin usuario"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {ticket.user ?
                                                <>
                                                    {ticket.user.phone}
                                                </>
                                            :
                                                "Sin teléfono"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {ticket.events_count}
                                        </TableCell>
                                        <TableCell>
                                            {ticket.metodo_pago ?
                                            ticket.metodo_pago
                                            :
                                            "No registrado"
                                            }
                                        </TableCell>
                                        <TableCell style={{borderTopRightRadius: 5, borderBottomRightRadius: 5}}>
                                            {ticket.confirmed ?
                                            "Pagado"
                                            :
                                            "Pendiente"
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            {/* PAGINACION */}
            <Grid item style={{marginTop: 25}}>
                <PaginacionAdmin links={tickets.links} />
            </Grid>
        </Paper>
    </>
    )
}
Boletos.layout = (page) => (
    <LayoutAdmin children={page} title="Boletos" pageTitle="Boletos" />
)

export default Boletos