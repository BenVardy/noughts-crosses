import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { IconButton, Paper, TextField, Typography } from '@material-ui/core';

import Done from '@material-ui/icons/Done';
import NewGameButton from './NewGameButton';


const paperStyle = theme => ({
    paper: {
        // ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        // paddingBottom: theme.spacing.unit * 2,
        display: 'inline-block',
        textAlign: 'center',
        height: 200,
        width: 250,
    },
    text: {
        marginBottom: theme.spacing.unit,
    },
    input: {
        width: 125
    },
    submit: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit
    }
})

function NewGamePage(props) {
    const { classes } = props;
    
    return (
        <div className="new-game-root">
            <Paper className={classes.paper} elevation={1}>
                <Typography className={classes.text}>{props.location.invalid && 'The game was full'}</Typography>
                <form autoComplete="off" onSubmit={props.handleSubmit}>
                    <TextField
                        id="url-input"
                        className={classes.input}
                        label="Game ID"
                        value={props.value}
                        onChange={props.handleChange}
                        margin="dense"
                        variant="outlined"
                    />
                    <IconButton type="submit" color="primary" className={classes.submit}><Done /></IconButton>
                </form>
                <NewGameButton variant="outlined" />
            </Paper>
        </div>
    )
}

NewGamePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(paperStyle)(NewGamePage)
