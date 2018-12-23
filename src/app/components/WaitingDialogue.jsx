import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import '../css/WaitingDialogue.css';

export default class WaitingDialogue extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            copied: false
        }
    }

    render() {
        return (
            <div className="waiting">
                {this.props.disconnect ? 'A player has disconnected\n' : null}
                Waiting For Player 2...
                <div className="url-copy-wrapper">
                    {this.props.url}
                    <div className="copy-button">
                        <CopyToClipboard 
                            text={this.props.url}
                            onCopy={() => this.setState({ copied: true })}
                        >
                            <button id="copy-button-text">Copy</button>
                        </CopyToClipboard>
                    </div>
                    {this.state.copied ? <span id="copied">Copied</span> : null}
                </div>
            </div>
        )
    }
}