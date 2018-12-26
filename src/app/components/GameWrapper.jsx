import React from 'react';
import history from '../history';
import uuid from 'uuid/v4';

import { Grid } from '@material-ui/core';

import Game from './Game';
import NewGamePage from './NewGamePage';

export default class GameWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newGameValue: '',
            games: [],
        };

        this.handleUrlInputChange = this.handleUrlInputChange.bind(this);
        this.handleUrlInputSubmit = this.handleUrlInputSubmit.bind(this);
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleQuit = this.handleQuit.bind(this);
    }

    componentDidMount() {
        let games;
        if (this.props.match.params.id) {
            games = [ { url: this.props.match.params.id, key: uuid() } ];
        } else {
            games = [ { url: uuid().slice(0, 8), key: uuid() } ];
        }

        this.setState({ games });
    }

    handleUrlInputChange(event) {
        this.setState({
            newGameValue: event.target.value
        });
    }

    handleUrlInputSubmit(event) {
        event.preventDefault();
        const { newGameValue, games } = this.state;

        if (newGameValue !== '') {
            games.push({ url: newGameValue, key: uuid() });
        }

        this.setState({
            newGameValue: '',
            games
        });
    }

    handleNewGame() {
        const { games } = this.state;

        games.push({ url: uuid().slice(0, 8), key: uuid() });

        this.setState({
            games
        });
    }

    handleQuit(gameId, gameKey) {
        const { games } = this.state;

        const pos = games.findIndex(value => {
            return value.key === gameKey;
        });

        if (gameId === this.props.match.params.id) history.push('/');

        if (pos === 0 && games.length === 1) {
            games.splice(pos, 1, { url: uuid().slice(0, 8), key: uuid() });
        } else {
            games.splice(pos, 1);
        }

        this.setState({ games });
    }

    render() {
        const { newGameValue, games } = this.state;

        return (
            <div>
                <Grid container justify="flex-start" >
                    {games.map(value => {
                        return (
                            <Grid item key={value.key}>
                                <Game
                                    id={value.key}
                                    url={value.url}
                                    handleQuit={this.handleQuit}
                                />
                            </Grid>
                        );
                    })}
                    {games.length < 5 && 
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
        );
    }

}