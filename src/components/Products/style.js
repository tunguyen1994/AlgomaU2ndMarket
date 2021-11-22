import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    root: {
        flexGrow: 1,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", //16:9
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    cardContent: {
        display: "flex",
        justifyContent: 'space-between'
    },
}))