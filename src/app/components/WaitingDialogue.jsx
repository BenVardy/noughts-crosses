import PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Button, Fab, TextField, Typography, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import FilterNone from '@material-ui/icons/FilterNone';

const styles = theme => ({
    waiting: {
        whiteSpace: 'pre-line',
        paddingTop: theme.spacing.unit * 2,
        textAlign: 'center'
    },
    wrapper: {
        display: 'inline-flex'
    },
    button: {
        marginTop: theme.spacing.unit + 2,
        marginLeft: theme.spacing.unit,
        alignSelf: 'center'
    },
    urlLink: {
        width: 125
    },
    copyFull: {
        marginTop: theme.spacing.unit * 2
    }
});

class WaitingDialogue extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idTooltip: false,
            urlTooltip: false
        };

        this.handleTooltipOpen = this.handleTooltipOpen.bind(this);
        this.handleTooltipClose = this.handleTooltipClose.bind(this);
    }

    handleTooltipOpen(id) {
        this.setState({ [id]: true });

        setTimeout(() => this.handleTooltipClose(id), 1000);
    }

    handleTooltipClose(id) {
        this.setState({ [id]: false });
    }

    render() {
        const { classes, url } = this.props;

        return (
            <div className={classes.waiting}>
                <Typography
                    variant="subtitle1"
                    style={{ visibility: this.props.disconnect ? 'visible' : 'hidden' }}
                >A player has disconnected</Typography>
                <Typography variant="subtitle1">
                    
                    Waiting For Player 2...
                </Typography>
                <div className={classes.wrapper}>
                    <TextField
                        id="id-readonly"
                        className={classes.urlLink}
                        label="Game ID"
                        defaultValue={url}
                        margin="dense"
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <div className="copy-button">
                        <CopyToClipboard 
                            text={url}
                            onCopy={() => this.handleTooltipOpen('idTooltip')}
                        >
                            <Tooltip
                                PopperProps={{ disablePortal: true }}
                                onClose={this.handleTooltipClose}
                                open={this.state.idTooltip}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title="Copied"
                                placement="top"
                            >
                                <Fab className={classes.button} color="secondary" size="small"><FilterNone /></Fab>
                            </Tooltip>
                        </CopyToClipboard>
                    </div>
                </div>
                <div className={classes.copyFull}>
                    <CopyToClipboard 
                        text={`${window.location.href}${url}`}
                        onCopy={() => this.handleTooltipOpen('urlTooltip')}
                    >
                        <Tooltip
                            PopperProps={{ disablePortal: true }}
                            onClose={this.handleTooltipClose}
                            open={this.state.urlTooltip}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Copied"
                            placement="right"
                        >
                            <Button size="large" variant="contained" color="primary">Copy Full URL</Button>
                        </Tooltip>
                    </CopyToClipboard>
                </div>
            </div>
        );
    }
}

WaitingDialogue.propType = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WaitingDialogue);
