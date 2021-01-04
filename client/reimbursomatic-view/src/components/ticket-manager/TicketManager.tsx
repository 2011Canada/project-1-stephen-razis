import { Box, Button, Collapse, createStyles, FormControl, IconButton, InputLabel, makeStyles, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { PowerSettingsNewRounded } from '@material-ui/icons';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import Reimbursement from '../../models/Reimbursement';
import User from '../../models/User'
import { getAllReimbursements, getCurrentUsersReimbursements, UpdateReimbursement } from '../remote/reimbursomatic/reimbursomatic-functions';


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


interface IUser {
    currentUser: User
}

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
      color: 'white'
    },
    greenButton: {
        color: 'white',
        backgroundColor: green[500],
        '&:hover': {
        backgroundColor: green[700],
        },
    },
    redButton: {
        color: 'white',
        backgroundColor: red[500],
        '&:hover': {
        backgroundColor: red[700],
        },
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
  
  function Row(props: { row: ReturnType<typeof createData>, currentUser: User, rowChanges: number, pinger: any}) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    //THIS IS A HACK TO SAVE ME TIME BECAUSE I'M BEHIND ON THIS PROJECT
    const ReimbursementStatus = ["Denied", "Pending", "Approved" ]
    const ReimbursementTypes = ["Lodging", "Travel","Food", "Other"]

    function parseDateString(dateString:string) {
        let out: string = ""
        if (dateString) {
          let date = new Date(dateString);
    
          let month: string = (date.getMonth() + 1 < 10) ? (`0` + String(date.getMonth() + 1)) : String(date.getMonth() + 1)
          let day: string = (date.getDate() < 10) ? (`0` + String(date.getDate())) : String(date.getDate())
          let minutes: string = date.getMinutes() < 10 ? (`0` + String(date.getMinutes())) : String(date.getMinutes())
          let seconds: string = date.getSeconds() < 10 ? (`0` + String(date.getSeconds())) : String(date.getSeconds())
    
          out = date.getFullYear() + `-` + month + `-` + day + 
                  `T` + (date.getHours()) + `:` + minutes + `:` + seconds
        }
        return out
      }

    const submittedDate = parseDateString(row.dateSubmitted);
    const resolvedDate = parseDateString(row.dateResolved);

    const acceptReimbursementRequest = async() => {
        let userIdNum:Number = Number(props.currentUser.id)
        let safeAmount:string = String(row.amount)
        
        await UpdateReimbursement(row.id, safeAmount, row.dateSubmitted, row.description, row.authorId, userIdNum, 3, row.typeId)
        props.pinger(props.rowChanges + 1);
    }

    const rejectReimbursementRequest = async() => {
        let userIdNum:Number = Number(props.currentUser.id)
        let safeAmount:string = String(row.amount)
        
        await UpdateReimbursement(row.id, safeAmount, row.dateSubmitted, row.description, row.authorId, userIdNum, 1, row.typeId)
        props.pinger(props.rowChanges + 1);
    }

    const classes = useRowStyles();

    const disableButtonHandler = () => {
        if (props.row.statusId !== 2) {
            return <><TableCell align="center" className={classes.root}>
                        <Button className={classes.greenButton} variant="contained" disabled={true}>Accept</Button>
                    </TableCell>
                    <TableCell align="center" className={classes.root}>
                        <Button className={classes.redButton} variant="contained" disabled={true}>Decline</Button>
                    </TableCell></>
        } else {
            return <><TableCell align="center" className={classes.root}>
            <Button className={classes.greenButton} variant="contained" disabled={false} onClick={acceptReimbursementRequest}>Accept</Button>
        </TableCell>
        <TableCell align="center" className={classes.root}>
            <Button className={classes.redButton} variant="contained" disabled={false} onClick={rejectReimbursementRequest}>Decline</Button>
        </TableCell></>
        }
    }

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
          <TableCell align="right" className={classes.root}>{submittedDate}</TableCell>
          <TableCell align="right" className={classes.root}>{resolvedDate}</TableCell>
          <TableCell align="right" className={classes.root}>{row.authorId}</TableCell>
          <TableCell align="right" className={classes.root}>{row.resolverId}</TableCell>
          <TableCell align="right" className={classes.root}>{ReimbursementStatus[row.statusId-1]}</TableCell>
          <TableCell align="right" className={classes.root}>{ReimbursementTypes[row.typeId-1]}</TableCell>
          {disableButtonHandler()}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, color:'white'}} colSpan={11}>
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        color: 'white',
        backgroundColor: '#333333',
    },
    menuItem: {
        color:'white',
        backgroundColor: '#333333'
    },
  }),
);


export const TicketManager : React.FunctionComponent<any> = (props:IUser) => {
    const classes = useStyles();

    const [reimbursements, setReimbursements] = useState([]);
    const [filterState, setFilterState] = useState('');
    const [rowChanges, pingRowChanges] = useState(0);

    const handleFilterStateChange = (event: React.ChangeEvent<{value:unknown}>) => {
        setFilterState(event.target.value as string);
    }

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

    useEffect(() => {
        const attemptReimbursementGrab = async () => {
            try {
                let reimbursements:Reimbursement[] = await getAllReimbursements(props.currentUser)
                if (filterState === 'pending') {
                    reimbursements = reimbursements.filter((reimbursement) => {
                        return reimbursement.statusId === 2;
                    })
                }
                setReimbursements(reimbursements)
            }
            catch (e) {
                console.log(e)
            }
        }
        
        attemptReimbursementGrab()
    },[props.currentUser, filterState, rowChanges])

    return (
        (props.currentUser && props.currentUser.roleId < 3) ?
        <div>
            <h1 style={{marginTop:'2em'}}>Ticket Manager</h1>
            <div className={classes.lineBreak}></div>
            <h2 className={classes.headers}>All Tickets</h2>
            <Box>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="filter-options-label">Filter By</InputLabel>
                    <Select
                    labelId="filter-options"
                    id="filter-options"
                    value={filterState}
                    className={classes.menuItem}
                    onChange={handleFilterStateChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'pending'}>Pending</MenuItem>
                    </Select>
                </FormControl>
            </Box>
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
                            <TableCell align="right" className={classes.tableCell}>Status</TableCell>
                            <TableCell align="right" className={classes.tableCell}>Type</TableCell>
                            <TableCell align="center" className={classes.tableCell}></TableCell>
                            <TableCell align="center" className={classes.tableCell}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                      <Row key={row.id} currentUser={props.currentUser} row={row} rowChanges={rowChanges} pinger={pingRowChanges} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        :
        <Redirect to="/login" />
    )
}