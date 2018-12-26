import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

import '../css/TopBar.css';

export default function TopBar() {
    return (
        <div className="bar-root">
            <AppBar position="static">
                <Toolbar>
                    <Typography className="grow" variant="h6" color="inherit">
                        Noughts & Crosses
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

