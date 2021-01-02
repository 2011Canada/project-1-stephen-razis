import { Button,Theme, createStyles, makeStyles } from '@material-ui/core';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import User from '../../models/User';
import Divider from '@material-ui/core/Divider';
import { getCurrentUsersReimbursements, sendTestURI } from '../remote/reimbursomatic/reimbursomatic-functions';
import Reimbursement from '../../models/Reimbursement';

interface IUser {
    currentUser: User
}

interface IReimbursement {
    currentReimbursement: Reimbursement
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

    const [reimbursements, setReimbursements] = useState([]);

    const testURI = async (e:SyntheticEvent) => {
        e.preventDefault()
        try {
            let res = await sendTestURI(props.currentUser)
            console.log(res)
        }catch(e){
            console.log(e)
            //display the error in some way
        }
    }

    useEffect(() => {
        const attemptReimbursementGrab = async () => {
            try {
                let reimbursements:Reimbursement[] = await getCurrentUsersReimbursements(props.currentUser)
                setReimbursements(reimbursements)
            }
            catch (e) {
                console.log(e)
            }
        }
        
        attemptReimbursementGrab()
    },[props.currentUser])

    return (
        (props.currentUser) ?
        <div>
            <br />
            <h1>Dashboard</h1>
            <br />
            <Divider variant="middle" className={classes.root}/>
            { getTicketManagementButton(props.currentUser, classes) }
            <br />
            <Button variant="outlined" color="primary" onClick={testURI}>Test URI</Button>
            <div>{JSON.stringify(props.currentUser)}</div>
            {reimbursements.map(r => <div>{JSON.stringify(r)}</div>)}
        </div>
        :
        <Redirect to="/login" />
    )
}