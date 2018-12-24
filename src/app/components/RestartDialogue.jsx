import React from 'react';

export default function(props) {
    const { ready } = props;
    let readyDiv = [];
    for (let i = 0; i < ready.length; i++) {
        readyDiv.push(
            <div key={i} className="ready">Player {i + 1}: {ready[i] ? '✔️' : ''}</div>
        )
    }

    return (
        <div className="restart">
            <div className="ready-wrapper">{readyDiv}</div>
            <div>Click to start a new game</div>
            <button id="restart-button" onClick={props.onClick}>Ready?</button>
        </div>
    )
}
