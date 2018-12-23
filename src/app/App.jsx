import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import uuid from 'uuid/v4'

import Board from './components/Board';

const Button = withRouter(({ history }) => (
    <button
        type="button"
        onClick={() => history.push(`/${uuid().slice(0, 8)}`)}
    >Click To Start A new Game</button>
))

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path='/:id' component={Board} />
                        <Route exact path='/' component={Button} />
                    </div>
                </Router>
                
            </div>
        )
    }
}