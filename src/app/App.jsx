import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import uuid from 'uuid/v4'

import Board from './components/Board';
import NewGameButton from './components/NewGameButton';

export default class App extends React.Component {

    render() {
        let value = "Click To Start a New Game";

        return (
            <div>
                <Router>
                    <div>
                        <Route exact path='/:id' component={Board} />
                        <Route exact path='/' render={() => <NewGameButton value={value}/>} />
                    </div>
                </Router>
                
            </div>
        )
    }
}