import React from 'react';
import history from '../history';

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
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps) {

        let currentUrls;
        try {
            currentUrls = newProps.match.params.id.split('~');
            if (currentUrls[0].length === 0) currentUrls.shift()
        } catch {
            currentUrls = [];
        }
        
        
        this.setState({
            gameUrls: currentUrls,
        })
    }

    handleUrlInputChange(event) {
        this.setState({
            newGameValue: event.target.value
        })
    }

    handleUrlInputSubmit(event) {
        event.preventDefault();
        const { newGameValue } = this.state;

        if (newGameValue !== '') {
            let lastAddress = history.location.pathname;
            history.push(`${lastAddress}${lastAddress === '/' ? '' : '~'}${newGameValue}`);
        }

        this.setState({
            newGameValue: ''
        })
    }

    render() {
        const { newGameValue } = this.state;

        return (
            <div>
                <Grid container style={{ marginLeft: '10px' }} spacing={16} justify="flex-start" >
                    {this.state.gameUrls.map((url, index) => {
                        return (
                            <Grid item key={url + index}>
                                <Game url={url} />
                            </Grid>
                        );
                    })}
                    <Grid item>
                        <NewGamePage 
                            location={{}}
                            value={newGameValue}
                            handleSubmit={this.handleUrlInputSubmit} 
                            handleChange={this.handleUrlInputChange}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }

}