import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { FormGroup, FormControlLabel, FormLabel, Switch } from '@material-ui/core';

const style = theme => ({
    title: {
        marginTop: theme.spacing.unit
    },
    root: {
        marginLeft: theme.spacing.unit * 2,
    }
});

function RestartDialogue(props) {
    const { classes } = props;

    return (
        <div style={props.style}>
            <FormLabel className={classes.title} component="legend">Ready?</FormLabel>
            <FormGroup row className={classes.root}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.ready[0]}
                            onChange={props.handleChange(0)}
                            value="ready1"
                            disabled={props.playerIndex !== '0'}
                            color="primary"
                        />
                    }
                    label="Player 1"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.ready[1]}
                            onChange={props.handleChange(1)}
                            value="ready2"
                            disabled={props.playerIndex !== '1'}
                            color="secondary"
                        />
                    }
                    label="Player 2"
                />
            </FormGroup>
        </div>
    )
}

export default withStyles(style)(RestartDialogue);
