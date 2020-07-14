import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IdeaOverview from './pages/IdeaOverview';
import IdeaDetails from './pages/IdeaDetails';
import IdeaProvider from './context/idea/IdeaContextProvider';
import LoginPage from './pages/LoginPage';
import UserContextProvider, {
    LOGIN_SUCCESS,
} from './context/user/UserContextProvider';
import PrivateRoute from './pages/PrivateRoute';
import PlanningAppBar from './components/PlanningAppBar/PlanningAppBar';
import { UserDispatchContext } from './context/user/UserContext';
import { getDecodedJWTToken, isJWTTokenValid } from './utils/jwt-utils';
import { Container } from '@material-ui/core';

function Navigation() {
    const dispatch = useContext(UserDispatchContext);

    useEffect(() => {
        if (isJWTTokenValid()) {
            dispatch({ type: LOGIN_SUCCESS, payload: getDecodedJWTToken() });
        }
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Container maxWidth={'md'} component="main">
                <Switch>
                    <Route path="/login" exact>
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
                <Navigation />
        </UserContextProvider>
    );
}

export default App;