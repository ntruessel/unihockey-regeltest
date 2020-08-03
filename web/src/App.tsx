import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Practice } from './pages/Practice';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Statistics } from './pages/Statistics';

function App() {
    return (
        <Router>
            <Container>
                <Switch>
                    <Route exact path="/practice"><Practice/></Route>
                    <Route exact path="/statistics"><Statistics/></Route>
                    <Redirect exact from="/" to="/practice"/>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
