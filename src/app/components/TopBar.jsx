import React from 'react';

import NewGameButton from './NewGameButton';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import '../css/TopBar.css';

export default function(props) {

    return (
        <div className="bar-root">
            <AppBar position="static">
                <Toolbar>
                    <Typography className="grow" variant="h6" color="inherit">
                        Noughts & Crosses
                    </Typography>
                    <NewGameButton variant="outlined" />
                </Toolbar>
            </AppBar>
        </div>
    )
}

