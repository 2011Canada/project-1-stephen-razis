import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
  }));

//TODO:
//  - Put a Logout button here, if the user is logged in

export const Header : React.FunctionComponent<any> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" className={classes.title} color={"primary"}>
                    Reimbursomatic
                </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}