import React, {useContext, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserContextProvider, {
    LOGIN_SUCCESS,
} from './context/user/UserContextProvider';
import { UserDispatchContext } from './context/user/UserContext';
import { getDecodedJWTToken, isJWTTokenValid } from './utils/jwt-utils';
import { Container } from '@material-ui/core';
import ConsilBoardUserPage from "./pages/ConsilBoardUserPage";
import ConsilBoardAppBar from "./components/ConsilBoardAppBar/ConsilBoardAppBar";
import ClientProvider from "./context/clients/ClientProvider";
import PrivateRoute from "./pages/PrivateRoute";
import ClientDetails from "./pages/ClientDetails";
import ConsilBoardProvider from "./context/consilboard/ConsilBoardProvider";

function Navigation() {
    const dispatch = useContext(UserDispatchContext);

    useEffect(() => {
        if (isJWTTokenValid()) {
            dispatch({ type: LOGIN_SUCCESS, payload: getDecodedJWTToken() });
        }
    }, [dispatch]);



    return (
        <BrowserRouter>
            <ConsilBoardAppBar />
            <Container maxWidth={'md'} component="main">
                <Switch>
                    <PrivateRoute
                        path="/api/:id"
                        component={ClientDetails}
                        exact
                    />
                    <PrivateRoute path="/api" component={ConsilBoardUserPage} exact />
                    <Route path="/" exact>
                        <LoginPage />
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

function App() {
    return (
        <UserContextProvider>
            <ClientProvider>
                <ConsilBoardProvider>
                <Navigation />
                </ConsilBoardProvider>
            </ClientProvider>
        </UserContextProvider>
    );
}

export default App;