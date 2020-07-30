import React, {useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import {ClientDispatchContext, ClientStateContext} from "../../context/clients/ClientContext";
import ClientCard from "../ClientCard/ClientCard";
import {ADD_CLIENT_TO_CONSILBOARD, ADD_CLIENT_TO_CONSILBOARD_SUCCESS} from "../../context/clients/client-actions";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
}));




export default function ConsilBoard(){

    const {clientsToBoard} = useContext(ClientStateContext);
    const dispatch = useContext(ClientDispatchContext)

    useEffect(() => {
        dispatch({type: ADD_CLIENT_TO_CONSILBOARD})
        if(ADD_CLIENT_TO_CONSILBOARD_SUCCESS) {
            console.log(clientsToBoard);
        }
    }, [dispatch, clientsToBoard]);




    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {clientsToBoard.map((client) => (
                <ClientCard
                    key= {client.id}
                    client={client}
                />
                ))}
            </GridList>
        </div>
    );
}