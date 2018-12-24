import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from './history';

import TopBar from './components/TopBar';
import Game from './components/Game';
import NewGame from './components/NewGamePage';

export default class App extends React.Component {

    render() {
        let value = "Click To Start a New Game";

        return (
            <div>
                <TopBar />
                <Router history={history}>
                    <div>
                        <Route exact path='/:id' component={Game} />
                        <Route exact path='/' component={NewGame} />
                    </div>
                </Router>
                
            </div>
        )
    }
}