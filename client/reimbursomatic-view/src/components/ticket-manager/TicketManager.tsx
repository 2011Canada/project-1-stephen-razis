import { createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from '@material-ui/core';
import React from 'react'
import { Redirect } from 'react-router'
import User from '../../models/User'

interface IUser {
    currentUser: User
}

//This page allows a HR employee or an admin to search through tickets and view, accept, or decline them.
//It just needs to be a table (see "Collapsible table" in material-ui)
//But, the different options for the table will return different results
//  - Get all tickets by user
//  - Get all pending/accepted/declined tickets
//  - Get all tickets by type
//  - Get a ticket by ID
// NOTE: also needs a button to logout

//If I have time:
//  - sorting options
//  - different icons for the kinds of reimbursement requests
//  - skeletons for when the table is updating
//  - accessibility
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    lineBreak: {
        width: '75%',
        height: '1px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '4em',
        marginBottom: '2em',
        maxWidth: 500,
        backgroundColor: theme.palette.primary.main,
    },
    headers: {
        marginTop: '2em',
        color: theme.palette.primary.main

    },
    table: {
        width: '80%',
        marginTop: '2em',
        marginBottom: '2em',
        marginLeft: '10%',
        backgroundColor: '#333333',
    },
    tableCell: {
        color: 'white',
    },
  }),
);

export const TicketManager : React.FunctionComponent<any> = (props:IUser) => {
    const classes = useStyles();

    return (
        (props.currentUser && props.currentUser.roleId < 3) ?
        <div>
            <h1 style={{marginTop:'2em'}}>Ticket Manager</h1>
            <div className={classes.lineBreak}></div>
            <h2 className={classes.headers}>Pending Tickets</h2>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell className={classes.tableCell}>Reimbursement ID</TableCell>
                            <TableCell align="right" className={classes.tableCell}>Amount</TableCell>
                            <TableCell align="right" className={classes.tableCell}>Date Submitted</TableCell>
                            <TableCell align="right" className={classes.tableCell}>Date Resolved</TableCell>
                            <TableCell align="right" className={classes.tableCell}>Author ID</TableCell>
                            <TableCell align="right" className={classes.tableCell}>Resolver ID</TableCell>
                            <TableCell align="right" className={classes.tableCell}>Status ID</TableCell>
                            <TableCell align="right" className={classes.tableCell}>Type ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        :
        <Redirect to="/login" />
    )
}