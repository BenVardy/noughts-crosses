import React from 'react';
import uuid from 'uuid/v4';

import history from '../history';

import Button from '@material-ui/core/Button';

export default function(props) {
    return (
        <Button
            variant="contained"
            id="new-game-button"
            onClick={() => history.push(`/${uuid().slice(0, 8)}`)}
        >
            New Game
        </Button>
    )
}
