import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Button, IconButton, Paper, TextField, Typography } from '@material-ui/core';

import Done from '@material-ui/icons/Done';


const paperStyle = theme => ({
    paper: {
        display: 'inline-block',
        textAlign: 'center',
        height: 250,
        width: 250,
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2
    },
    container: {
        marginTop: theme.spacing.unit * 6
    },
    title: {
        paddingBottom: theme.spacing.unit * 2 + 3
    },
    input: {
        width: 125
    },
    submit: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit
    },
    newGameButton: {
        marginTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 6,
        paddingRight: theme.spacing.unit * 6
    }
});

function NewGamePage(props) {
    const { classes } = props;
    
    return (
        <div className="new-game-root">
            <Paper className={classes.paper} elevation={1}>
                <div className={classes.container}>
                    <Typography className={classes.title} variant="subtitle1">Noughts & Crosses</Typography>
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
                    <Button
                        variant="contained"
                        className={classes.newGameButton}
                        color="primary"
                        id="new-game-button"
                        onClick={props.handleNewGame}
                        size="large"
                    >
                        New Game
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

NewGamePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(paperStyle)(NewGamePage);
