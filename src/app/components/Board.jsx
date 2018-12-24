import io from 'socket.io-client';
import React from 'react';
import { Redirect } from 'react-router-dom';

import Square from './Square';
import WaitingDialogue from './WaitingDialogue';


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            url: null,

            squares: Array(9).fill(null),
            myValue: null,
            xIsNext: 0,

            waitingForPlayer2: true,
            playerLeft: false,
            finished: false,

            invalid: false
        }
    }

    componentDidMount() {
        const socket = io('http://localhost:8080');

        socket.emit('join-room', this.props.match.params.id);

        socket.on('invalid-player', () => {
            this.setState({
                invalid: true
            });
        })

        socket.on('player-number', res => {
            this.setState({ myValue: res.playerIndex });
            
            console.log(res.playerIndex)
            console.log(res.shouldStart)
            if (res.shouldStart) {
                console.log('starting')
                this.setState({ 
                    waitingForPlayer2: false
                });
            }
        });

        socket.on('start', () => {
            console.log('starting');
            this.setState({
                squares: Array(9).fill(null),
                waitingForPlayer2: false
            })
        })

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
                playerLeft: true
            })
        })

        this.setState({
            socket,
            url: window.location.href
        })

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

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
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

        const winner = this.calculateWinner(this.state.squares);
        const draw = this.testDraw(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
            if (!this.state.finished) this.setState({ finished: true });
        } else if (draw) {
            status = 'Its a Draw!'
            if (!this.state.finished) this.setState({ finished: true });
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        if (!this.state.waitingForPlayer2) {
            return (
                <div className="board">
                    <div className="status">
                        {status}
                        <br />
                        You are {this.state.myValue == 1 ? 'X' : 'O'}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                    {winner || draw ? <div></div> : ""}
                </div>
            )
        } else {
            return <WaitingDialogue disconnect={this.state.playerLeft} playerNo={this.state.myValue} url={this.state.url} />;
        }
    }
}