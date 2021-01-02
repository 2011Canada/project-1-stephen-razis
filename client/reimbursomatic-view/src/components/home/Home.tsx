import { Button,Theme, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { Redirect } from 'react-router';
import User from '../../models/User';
import Divider from '@material-ui/core/Divider';

interface IUser {
    currentUser: User
}

//This page shows a user's info and their past tickets
//On a button press, a form will popup to submit a new ticket
//If the user is an admin or HR, they will have the option to go to the ticket management portal

//This page should have:
//  - A card representing the current user
//  - A table (exactly like the TicketManager), that shows only their tickets (sorted by date created)
//  - A button to logout

//If I have time:
//  - Sorting options
//  - Change user info option

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '50%',
      height: '1px',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 360,
      backgroundColor: theme.palette.primary.main,
    },
    ticketManagementButton: {
        marginTop: '2em',
        marginBottom: '2em'
    },
  }),
);

const getTicketManagementButton = (user:User, classStyle:any) => {
    if (user.roleId > 0 && user.roleId <= 2) {
        return <Button variant="outlined" color="primary" className={classStyle.ticketManagementButton}>Ticket Management</Button>
    }
}

export const Home : React.FunctionComponent<any> = (props:IUser) => {
    const classes = useStyles();
    return (
        (props.currentUser) ?
        <div>
            <br />
            <h1>Dashboard</h1>
            <br />
            <Divider variant="middle" className={classes.root}/>
            { getTicketManagementButton(props.currentUser, classes) }
            <br />
            <Button variant="outlined" color="primary">Test URI</Button>
        </div>
        :
        <Redirect to="/login" />
    )
}