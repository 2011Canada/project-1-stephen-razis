import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import User from '../models/User';

interface IHeaderProps {
    updateCurrentUser: (u:any) => void
    currentUser:User
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
        marginLeftt: theme.spacing(2),
    },
  }));


export const Header : React.FunctionComponent<IHeaderProps> = (props) => {
    const [logoutButton, changeLogoutButton] = useState(false);
    const classes = useStyles();

    const handleLogoutButtonChange = (user: User) => {
        user ? changeLogoutButton(true) : changeLogoutButton(false)
    }

    const handleLogoutClick = () => {
        props.updateCurrentUser(null)
    }

    useEffect(() => {
        console.log("Updated");
        handleLogoutButtonChange(props.currentUser);
    }, [props.currentUser])

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" className={classes.title} color={"primary"}>
                    Reimbursomatic
                </Typography>
                <div className={classes.root}></div>
                { logoutButton ? <Button variant="outlined" color="primary" className={classes.menuButton} onClick={handleLogoutClick}>Logout</Button> : <></> }
                </Toolbar>
            </AppBar>
        </div>
    )
}