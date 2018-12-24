import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Board from './components/Board';
import NewGameButton from './components/NewGame';

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