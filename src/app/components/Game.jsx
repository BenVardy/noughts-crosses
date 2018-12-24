import io from 'socket.io-client';
import React from 'react';
import { Redirect } from 'react-router-dom';

import RestartDialogue from './RestartDialogue';
import Board from './Board';
import WaitingDialogue from './WaitingDialogue';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            url: null,

            squares: Array(9).fill(null),
            myValue: null,
            playerIndex: null,
            xIsNext: 0,

            waitingForPlayer2: true,
            playerLeft: false,
            finished: false,
            invalid: false,
            ready: [false, false]
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleRestartClick = this.handleRestartClick.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    componentDidMount() {
        const socket = io();

        socket.emit('join-room', this.props.match.params.id);

        socket.on('invalid-player', () => {
            this.setState({
                invalid: true
            });
        })

        socket.on('player-number', res => {
            let { ready } = this.state;
            ready[res.playerIndex] = true;

            this.setState({ 
                myValue: res.playerIndex,
                playerIndex: res.playerIndex,
                ready
            });
            
            if (res.shouldStart) {
                console.log('starting')
                this.setState({ 
                    waitingForPlayer2: false
                });
            }
        });

        socket.on('start', this.resetGame);

        socket.on('next-turn', squares => {
            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext
            });
        });

        socket.on('player-disconnect', () => {
            this.setState({
                xIsNext: false,
                waitingForPlayer2: true,
                playerLeft: true,
            })
        })

        this.setState({
            socket,
            url: window.location.href
        })

    }

    componentDidUpdate() {
        if (!this.state.finished) {
            const winner = this.calculateWinner(this.state.squares);
            const draw = this.testDraw(this.state.squares);
            if (winner || draw) this.setState({ finished: true, ready: [false, false] });
        }
    }

    componentWillReceiveProps(newProps) {
        const { socket, url } = this.state;

        if (window.location.href === url) return;

        socket.emit('force-disconnect');

        this.setState({ ready: [false, false ]});
        socket.emit('join-room', newProps.match.params.id);

        this.resetGame();

        this.setState({ socket, url: window.location.href, waitingForPlayer2: true });
    }

    resetGame(index) {
        let { ready } = this.state;
        ready[index] = true;

        this.setState({ ready })

        setTimeout(() =>{
            if (!ready.includes(false)) {
                this.setState({
                    squares: Array(9).fill(null),
                    waitingForPlayer2: false,
                    finished: false,
                    xIsNext: 0,
                })
            }
        }, 500)
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

            socket.emit('turn-done', squares)
        }
    }

    handleRestartClick() {
        const { socket, playerIndex } = this.state;

        if (!this.state.ready[playerIndex]) {
            this.setState({ myValue: 1 - this.state.myValue });
        }

        socket.emit('ready-restart');
        this.resetGame(playerIndex);
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
        if (this.state.invalid) return <Redirect to={ { pathname: '/', invalid: true } } />;

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

        if (!this.state.waitingForPlayer2) {
            return (
                <div>
                    <div className="status">
                        {status}
                        <div className="player-value">You are {this.state.myValue == 1 ? 'X' : 'O'}</div>
                    </div>
                    <Board squares={squares} handleClick={this.handleClick} />
                    {this.state.finished ? <RestartDialogue ready={this.state.ready} onClick={this.handleRestartClick} /> : ""}
                </div>
            )
        } else {
            return <WaitingDialogue disconnect={this.state.playerLeft} playerNo={this.state.myValue} url={this.state.url} />;
        }
    }
}
