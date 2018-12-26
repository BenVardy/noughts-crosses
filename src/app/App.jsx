import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';

import history from './history';

import TopBar from './components/TopBar';
import GameWrapper from './components/GameWrapper';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { lightGreen, yellow } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: lightGreen,
        secondary: yellow
    },
    typography: {
        useNextVariants: true
    }
});

export default class App extends React.Component {

    render() {
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <TopBar />
                    <Router history={history}>
                        <div>
                            <Route exact path='/' component={GameWrapper} />
                            <Route path='/:id' component={GameWrapper} />
                        </div>
                    </Router>                    
                </MuiThemeProvider>
            </div>
        );
    }
}