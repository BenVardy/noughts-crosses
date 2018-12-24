import React from 'react';

import NewGameButton from './NewGameButton';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

export default function(props) {

    return (
        <div className="root">
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Noughts & Crosses
                    </Typography>
                    <NewGameButton />
                </Toolbar>
            </AppBar>
        </div>
    )
}

