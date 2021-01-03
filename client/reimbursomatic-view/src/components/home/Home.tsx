import { Button,Theme, createStyles, makeStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputAdornment, Input } from '@material-ui/core';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import User from '../../models/User';
import Divider from '@material-ui/core/Divider';
import { getCurrentUsersReimbursements, sendTestURI, TestFormSend, SendReimbursementRequest } from '../remote/reimbursomatic/reimbursomatic-functions';
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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

//This page should have:
// ticket creation (see 'Form Dialog' in Material UI)

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
    dialog: {
      backgroundColor: '#676767',
      color: theme.palette.primary.main
    },
    formInput: {
      color: 'white',
      borderColor: 'white'
    }
  }),
);

export const Home : React.FunctionComponent<any> = (props:IUser) => {
    const classes = useStyles();

    const [reimbursements, setReimbursements] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [formSubmitted, setFormSubmit] = React.useState(0);

    const [formAmount, setFormAmount] = React.useState('0');
    const [formExpenseType, setFormExpenseType] = React.useState('1');
    const [formDescription, setFormDescription] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormAmount((event.target as HTMLInputElement).value);
  }

  const handleFormExpenseType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormExpenseType((event.target as HTMLInputElement).value);
  }

  const handleFormDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormDescription((event.target as HTMLInputElement).value);
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


  // const testURI = async (e:SyntheticEvent) => {
  //     e.preventDefault()
  //     try {
  //         let res = await sendTestURI(props.currentUser)
  //         console.log(res)
  //     }catch(e){
  //         console.log(e)
  //         //display the error in some way
  //     }
  //   }


  const getTicketManagementButton = (user:User, classStyle:any) => {
      if (user.roleId > 0 && user.roleId <= 2) {
          return <Link to="/manager"><Button variant="outlined" color="primary">Ticket Management</Button></Link>
      }
  }

  const submitReimbursementRequest = async(event:SyntheticEvent) => {
    event.preventDefault()

    handleClose()

    //TODO: handle input cleaning better
    
    try {
      await SendReimbursementRequest(formAmount, formExpenseType, formDescription, props.currentUser.id)

      setFormAmount('0')
      setFormExpenseType('1')
      setFormDescription('')
      setFormSubmit(formSubmitted + 1)
    }
    catch(e) {
      console.log(e)
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
  },[props.currentUser, formSubmitted])

  return (
      (props.currentUser) ?
      <div>
          <br />
          <h1>Dashboard</h1>
          <br />
          <Divider variant="middle" className={classes.root}/>
          { getTicketManagementButton(props.currentUser, classes) }

          {/* User info */}
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

          {/* Past tickets */}
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
                      <Button variant="outlined" color="primary" onClick={handleClickOpen}>New Ticket</Button>
                      </TableCell>
                  </TableRow>
                  </TableBody>
              </Table>
          </TableContainer>
        
        {/* Dialog popup */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.dialog} style={{backgroundColor:'#333333'}}>New Ticket</DialogTitle>
            <DialogContent className={classes.dialog}>
              <DialogContentText style={{color:'black'}}>
                Please fill out the following information to create a new reimbursement request.
              </DialogContentText>
              <Input 
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                autoFocus
                margin="dense"
                id="amount"
                type=""
                fullWidth
                value={formAmount}
                onChange={handleFormAmount}
              />
              <FormControl component="fieldset" style={{marginTop: '2em', marginBottom: '0.5em', color: 'black'}}>
                <FormLabel component="legend">Expense Type</FormLabel>
                <RadioGroup aria-label="expense type" name="expenseType" value={formExpenseType} onChange={handleFormExpenseType}>
                  <FormControlLabel value="1" control={<Radio />} label="Lodging" />
                  <FormControlLabel value="2" control={<Radio />} label="Travel" />
                  <FormControlLabel value="3" control={<Radio />} label="Food" />
                  <FormControlLabel value="4" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type=""
                fullWidth
                multiline
                value={formDescription}
                onChange={handleFormDescription}
              />
            </DialogContent>
            <DialogActions className={classes.dialog}>
              <Button onClick={handleClose} variant="outlined" color="primary">
                Cancel
              </Button>
              <Button onClick={submitReimbursementRequest} variant="outlined" color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      </div>
      :
      <Redirect to="/login" />
  )
}