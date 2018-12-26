import propTypes from 'prop-types';
import io from 'socket.io-client';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Grow, IconButton, Paper, Typography } from '@material-ui/core';

import RestartDialogue from './RestartDialogue';
import Board from './Board';
import WaitingDialogue from './WaitingDialogue';

import Close from '@material-ui/icons/Close';
import styles from '../css/Game';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,

            squares: Array(9).fill(null),
            myValue: null,
            playerIndex: null,
            xIsNext: 0,

            waitingForPlayer2: true,
            playerLeft: false,
            finished: false,
            invalid: false,
            ready: [false, false],
            switched: false,

            mounted: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleRestartChange = this.handleRestartChange.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.handleQuit = this.handleQuit.bind(this);
    }

    componentDidMount() {
        const socket = io();

        socket.emit('join-room', this.props.url);

        socket.on('invalid-player', () => {
            this.setState({ invalid: true });

            setTimeout(() => {
                this.setState({ mounted: false });
            }, 1000);
        });

        socket.on('player-number', res => {
            let { ready } = this.state;
            ready[res.playerIndex] = true;

            this.setState({ 
                playerIndex: res.playerIndex,
                myValue: res.playerIndex,
                ready
            });
            
            if (res.shouldStart) {
                this.setState({ 
                    waitingForPlayer2: false
                });
            }
        });

        socket.on('start', index => {
            let { ready } = this.state;
            ready[index] = true;
    
            this.setState({ ready });

            this.setState({
                waitingForPlayer2: false
            });
        });

        socket.on('next-turn', squares => {
            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext
            });
        });

        socket.on('handle-ready', req => {
            const { ready } = this.state;
            const { playerIndex, status } = req;

            ready[playerIndex] = status;
            this.setState({ ready });

            this.resetGame();
        });

        socket.on('player-disconnect', () => {
            this.setState({
                squares: Array(9).fill(null),
                xIsNext: false,
                waitingForPlayer2: true,
                playerLeft: true,
            });
        });


        this.setState({
            socket,
            mounted: true
        });

    }

    componentDidUpdate() {
        if (!this.state.finished) {
            const winner = this.calculateWinner(this.state.squares);
            const draw = this.testDraw(this.state.squares);
            if (winner || draw) this.setState({ finished: true, ready: [false, false] });
        }
    }

    componentWillUnmount() {
        const { socket } = this.state;

        socket.emit('force-disconnect');
    }

    resetGame() {
        const { ready } = this.state;

        if (!ready.includes(false)) this.setState({ myValue: 1 - this.state.myValue });

        setTimeout(() =>{
            if (!ready.includes(false)) {
                this.setState({
                    squares: Array(9).fill(null),
                    waitingForPlayer2: false,
                    finished: false,
                    xIsNext: 0
                });
            }
        }, 1000);
    }

    handleClick(i) {
        const { socket } = this.state;

        const squares = this.state.squares.slice();
        if (squares[i] === null && !this.state.finished && this.state.myValue == this.state.xIsNext) {
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            this.setState({
                squares,
                xIsNext: !this.state.xIsNext
            });

            socket.emit('turn-done', squares);
        }
    }

    handleRestartChange(name) {
        return event => {
            const { socket, ready } = this.state;
            ready[name] = event.target.checked;
            this.setState({ ready });
            socket.emit('ready-restart', event.target.checked);
            this.resetGame(name);
        };
    }

    handleQuit() {
        this.setState({ mounted: false });
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
    
        return null;
    }

    testDraw(squares) {
        for (let square of squares) {
            if (square === null) return false;
        }

        return true;
    }

    render() {
        const { classes } = this.props;

        if (this.state.invalid) return (
            <Grow in={this.state.mounted} onExited={() => this.props.handleQuit(url, id)} >
                <Paper className={classes.root}>
                    <Typography className={classes.invalid} variant="subtitle1">This Game is Full</Typography>
                </Paper>
            </Grow>
        );

        let status;
        if (this.state.finished) {
            const winner = this.calculateWinner(this.state.squares);
            if (winner) {
                status = `Winner: ${winner}`;
            } else {
                status = 'It\'s a Draw!'; 
            }
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        const squares = this.state.squares.slice();

        const { url, id } = this.props;
        return (
            <Grow in={this.state.mounted} onExited={() => this.props.handleQuit(url, id)} unmountOnExit >
                <Paper className={classes.root}>
                    <IconButton className={classes.close} onClick={this.handleQuit}><Close /></IconButton>
                    <div className={classes.gameWrapper}>
                        {!this.state.waitingForPlayer2 ?
                            <div className={classes.game}>
                                <div className="status">
                                    {status}
                                    <div className="player-value">{!this.state.finished && 'You are ' + (this.state.myValue == 1 ? 'X' : 'O')}</div>
                                </div>
                                <Board squares={squares} handleClick={this.handleClick} />
                                <RestartDialogue
                                    ready={this.state.ready}
                                    playerIndex={this.state.playerIndex}
                                    handleChange={this.handleRestartChange}
                                    style={{
                                        visibility: this.state.finished ? 'visible' : 'hidden'
                                    }}
                                />
                            </div>
                            :
                            <WaitingDialogue disconnect={this.state.playerLeft} url={this.props.url} />
                        }
                    </div>
                </Paper>
            </Grow>
        );
    }
}

Game.propType = {
    classes: propTypes.object.isRequired
};

export default withStyles(styles)(Game);
