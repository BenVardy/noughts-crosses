import PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Fab, TextField, Typography, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import FilterNone from '@material-ui/icons/FilterNone';
import '../css/WaitingDialogue.css';

const styles = theme => ({
    wrapper: {
        display: 'inline-flex'
    },
    button: {
        marginTop: theme.spacing.unit + 2,
        marginLeft: theme.spacing.unit,
        alignSelf: 'center'
    },
    urlLink: {
        width: 125,
        cursor: 'default'
    }
});

class WaitingDialogue extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltipOpen: false
        }

        this.handleTooltipOpen = this.handleTooltipOpen.bind(this);
        this.handleTooltipClose = this.handleTooltipClose.bind(this);
    }

    handleTooltipOpen() {
        this.setState({ tooltipOpen: true });

        setTimeout(this.handleTooltipClose, 1000);
    }

    handleTooltipClose() {
        this.setState({ tooltipOpen: false });
    }

    render() {
        const { classes, url } = this.props;

        return (
            <div className="waiting">
                <Typography variant="subtitle1">
                    {this.props.disconnect ? 'A player has disconnected\n' : null}
                    Waiting For Player 2...
                </Typography>
                <div className={classes.wrapper}>
                    <TextField
                        id="url-readonly"
                        className={classes.urlLink}
                        label="Game ID"
                        defaultValue={url}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <div className="copy-button">
                        <CopyToClipboard 
                            text={this.props.url}
                            onCopy={this.handleTooltipOpen}
                        >
                            <Tooltip
                                PopperProps={{ disablePortal: true }}
                                onClose={this.handleTooltipClose}
                                open={this.state.tooltipOpen}
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
            </div>
        )
    }
}

WaitingDialogue.propType = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WaitingDialogue);
