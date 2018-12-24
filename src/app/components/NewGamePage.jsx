import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NewGameButton from './NewGameButton';

export default function(props) {
    return (
        <div className="new-game">
            <div>{props.location.invalid ? 'The game was full' : ''}</div>
            <NewGameButton />
        </div>
    )
}
