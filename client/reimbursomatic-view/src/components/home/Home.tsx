import { Button,Theme, createStyles, makeStyles, Container } from '@material-ui/core';
import React, { ReactChild, SyntheticEvent, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import User from '../../models/User';
import Divider from '@material-ui/core/Divider';
import { getCurrentUsersReimbursements, sendTestURI } from '../remote/reimbursomatic/reimbursomatic-functions';
import Reimbursement from '../../models/Reimbursement';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Link } from 'react-router-dom';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    color: 'white'
  }
});

function createData(
  id: number,
  amount: number,
  dateSubmitted: string,
  dateResolved: string,
  authorId: number,
  resolverId: number,
  statusId: number,
  typeId: number,
  description: string
) {
  return {
    id,
    amount,
    dateSubmitted,
    dateResolved,
    authorId,
    resolverId,
    statusId,
    typeId,
    description
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} className={classes.root}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className={classes.root}>
          {row.id}
        </TableCell>
        <TableCell align="right" className={classes.root}>{row.amount}</TableCell>
        <TableCell align="right" className={classes.root}>{row.dateSubmitted}</TableCell>
        <TableCell align="right" className={classes.root}>{row.dateResolved}</TableCell>
        <TableCell align="right" className={classes.root}>{row.authorId}</TableCell>
        <TableCell align="right" className={classes.root}>{row.resolverId}</TableCell>
        <TableCell align="right" className={classes.root}>{row.statusId}</TableCell>
        <TableCell align="right" className={classes.root}>{row.typeId}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, color:'white'}} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <p>{ row.description }</p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

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
      marginBottom: '1em',
      backgroundColor: theme.palette.primary.main,
    },
    ticketManagementButton: {
        marginTop: '2em',
        marginBottom: '2em'
    },
    headers: {
        marginTop: '2em',
        color: theme.palette.primary.main

    },
    userInfo: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "25em",
        backgroundColor: '#333333',
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

export const Home : React.FunctionComponent<any> = (props:IUser) => {
    const classes = useStyles();

    const [reimbursements, setReimbursements] = useState([]);

    let rows:any[] = [];
    reimbursements.forEach((item) => {
        rows.push(createData(
            item.id, 
            item.amount, 
            item.submitted, 
            item.resolved, 
            item.authorId, 
            item.resolverId,
            item.statusId,
            item.typeId,
            item.description))
    })


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

    const showTicketForm = () => {

    }


    const getTicketManagementButton = (user:User, classStyle:any) => {
        if (user.roleId > 0 && user.roleId <= 2) {
            return <Link to="/manager"><Button variant="outlined" color="primary">Ticket Management</Button></Link>
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
            {/* <Button variant="outlined" color="primary" onClick={testURI}>Test URI</Button>
            <div>{JSON.stringify(props.currentUser)}</div>
            {reimbursements.map(r => <div>{JSON.stringify(r)}</div>)} */}
            <h2 className={classes.headers}>Your Information</h2>
            <TableContainer component={Paper} className={classes.userInfo}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell className={classes.tableCell}>ID:</TableCell>
                        <TableCell align="left" className={classes.tableCell}>{props.currentUser.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell />
                        <TableCell className={classes.tableCell}>Username:</TableCell>
                        <TableCell align="left" className={classes.tableCell}>{props.currentUser.username}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell />
                        <TableCell className={classes.tableCell}>First Name:</TableCell>
                        <TableCell align="left" className={classes.tableCell}>{props.currentUser.firstName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell />
                        <TableCell className={classes.tableCell}>Last Name:</TableCell>
                        <TableCell align="left" className={classes.tableCell}>{props.currentUser.lastName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell />
                        <TableCell className={classes.tableCell}>Email:</TableCell>
                        <TableCell align="left" className={classes.tableCell}>{props.currentUser.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell />
                        <TableCell className={classes.tableCell}>Role ID:</TableCell>
                        <TableCell align="left" className={classes.tableCell}>{props.currentUser.roleId}</TableCell>
                    </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <h2 className={classes.headers}>Your Past Tickets</h2>
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
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                    <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell>
                        <Button variant="outlined" color="primary" onClick={showTicketForm}>New Ticket</Button>
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        :
        <Redirect to="/login" />
    )
}