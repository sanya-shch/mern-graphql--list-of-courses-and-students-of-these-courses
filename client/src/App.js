import React, {useEffect} from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import {NavBar} from "./components/NavBar";
import {UsersPage} from "./pages/UsersPage";
import {CoursesPage} from "./pages/CoursesPage";
import AddCoursesModal from "./components/AddCoursesModal";
import EditCoursesModal from "./components/EditCoursesModal";
import DeleteCoursesModal from "./components/DeleteCoursesModal";
import AddUsersModal from "./components/AddUsersModal";
import EditUsersModal from "./components/EditUsersModal";
import DeleteUsersModal from "./components/DeleteUsersModal";

import CurrentState from './context/current/CurrentState';

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
        <CurrentState>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <NavBar/>
                    <Switch>
                        <Route exact path='/users' component={ UsersPage } />
                        <Route exact path='/courses' component={ CoursesPage } />
                    </Switch>
                    <AddCoursesModal/>
                    <EditCoursesModal/>
                    <DeleteCoursesModal/>
                    <AddUsersModal/>
                    <EditUsersModal/>
                    <DeleteUsersModal/>
                </BrowserRouter>
            </ApolloProvider>
        </CurrentState>
    )
};

export default App;
