export default theme => ({
    root: {
        height: 250,
        width: 250,
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2
    },
    gameWrapper: {
        paddingTop: theme.spacing.unit * 3,
    },
    game: {
        paddingTop: theme.spacing.unit * 3
    },
    close: {
        display: 'block',
        padding: 5,
        float: 'right'
    },
    invalid: {
        paddingTop: theme.spacing.unit * 3
    }
});