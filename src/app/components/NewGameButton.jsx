import React from 'react';
import uuid from 'uuid/v4';

import history from '../history';

import { Button } from '@material-ui/core';

export default function(props) {
    return (
        <Button
            variant={props.variant}
            color="inherit"
            id="new-game-button"
            onClick={() => {
                let lastAddress = history.location.pathname;
                history.push(`${lastAddress}${lastAddress === '/' ? '' : '~'}${uuid().slice(0, 8)}`);
            }}
        >
            New Game
        </Button>
    )
}
