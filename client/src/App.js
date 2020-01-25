import React, {useEffect} from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import {NavBar} from "./components/NavBar";
import {UsersPage} from "./pages/UsersPage";
import {CoursesPage} from "./pages/CoursesPage";

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql',
});

const App = () => {

    useEffect(() => {
        M.AutoInit();
    });

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <NavBar/>
                <Switch>
                    <Route exact path='/users' component={ UsersPage } />
                    <Route exact path='/courses' component={ CoursesPage } />
                </Switch>
            </BrowserRouter>
        </ApolloProvider>
    )
};

export default App;
