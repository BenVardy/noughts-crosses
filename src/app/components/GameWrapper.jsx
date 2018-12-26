import React from 'react';
import uuid from 'uuid/v4';

import { Grid } from '@material-ui/core';

import Game from './Game';
import NewGamePage from './NewGamePage';

export default class GameWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newGameValue: '',
            gameUrls: []
        }

        this.handleUrlInputChange = this.handleUrlInputChange.bind(this);
        this.handleUrlInputSubmit = this.handleUrlInputSubmit.bind(this);
        this.handleNewGame = this.handleNewGame.bind(this);
    }

    componentDidMount() {
        let gameUrls;
        if (this.props.match.params.id) {
            gameUrls = [ this.props.match.params.id ]
        } else {
            gameUrls = [ uuid().slice(0, 8) ]
        }

        this.setState({ gameUrls });
    }

    handleUrlInputChange(event) {
        this.setState({
            newGameValue: event.target.value
        })
    }

    handleUrlInputSubmit(event) {
        event.preventDefault();
        const { newGameValue, gameUrls } = this.state;

        if (newGameValue !== '') {
            gameUrls.push(newGameValue);
        }

        this.setState({
            newGameValue: '',
            gameUrls
        })
    }

    handleNewGame() {
        const { gameUrls } = this.state;

        gameUrls.push(uuid().slice(0, 8));

        this.setState({
            gameUrls
        });
    }

    render() {
        const { newGameValue, gameUrls } = this.state;

        return (
            <div>
                <Grid container style={{ marginLeft: '10px' }} spacing={16} justify="flex-start" >
                    {gameUrls.map((url, index) => {
                        return (
                            <Grid item key={url + index}>
                                <Game url={url} />
                            </Grid>
                        );
                    })}
                    {gameUrls.length < 5 && 
                    <Grid item>
                        <NewGamePage 
                            location={{}}
                            value={newGameValue}
                            handleSubmit={this.handleUrlInputSubmit}
                            handleChange={this.handleUrlInputChange}
                            handleNewGame={this.handleNewGame}
                        />
                    </Grid>}
                </Grid>
            </div>
        )
    }

}