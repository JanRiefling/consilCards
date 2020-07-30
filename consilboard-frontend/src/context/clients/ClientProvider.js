import { ClientStateContext, ClientDispatchContext } from './ClientContext';
import React, { useReducer } from 'react';
import clientReducer from './clientReducer';

export default function ClientProvider({ children }) {
    const [state, dispatch] = useReducer(clientReducer, {
        clients: [],
        clientsToBoard: [],
        fetchStatus: undefined,
        addStatus: undefined,
        addToBoardStatus: undefined,
    });

    return (
        <ClientStateContext.Provider value={state}>
            <ClientDispatchContext.Provider value={dispatch}>
                {children}
            </ClientDispatchContext.Provider>
        </ClientStateContext.Provider>
    );
}