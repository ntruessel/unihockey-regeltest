import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Practice } from './pages/Practice';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Statistics } from './pages/Statistics';
import { Header } from './components/Header';

function App() {
    return (
        <Router>
            <Route path="/:lang"><Header/></Route>
            <Container>
                <Switch>
                    <Redirect exact from="/" to="/de"/>
                    <Redirect exact from="/:lang" to="/:lang/practice"/>
                    <Route exact path="/:lang/practice"><Practice/></Route>
                    <Route exact path="/:lang/statistics"><Statistics/></Route>
                    <Route>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
