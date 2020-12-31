import { Button, Grid, makeStyles, TextField, withStyles } from '@material-ui/core';
import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router';
import User from '../models/User';
import { getLogin } from '../remote/reimbursomatic/reimbursomatic-functions';

const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: 4,
      backgroundColor: '#555555',
      color: theme.palette.primary.main,
      fillColor: theme.palette.secondary.main,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#666666',
      },
      '&$focused': {
        backgroundColor: '#666666',
        borderColor: theme.palette.secondary.main,
      },
    },
    focused: {},
    button: {
        borderRadius: 4,
        backgroundColor: '#1c1c1c',
        color: theme.palette.primary.main,
        fillColor: theme.palette.secondary.main,
        borderColor: theme.palette.primary.main,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
          backgroundColor: '#373737',
        },
        '&$focused': {
          backgroundColor: '#373737',
          borderColor: theme.palette.secondary.main,
        },
      },
      grid: {}
  }));


interface ILoginProps {
    currentUser:User
}

export const LoginForm : React.FunctionComponent<any> = (props:ILoginProps) => {
    const [username, changeUsername] = useState("");
    const [password, changePassword] = useState("");
    const [user, changeUser] = useState(props.currentUser);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeUsername(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changePassword(e.target.value)
    }

    const submitLogin = async (e:SyntheticEvent) => {
        e.preventDefault()

        try {
            let user = await getLogin(username, password)
            changeUser(user)
            
            console.log("successful login")
        }catch(e){
            changePassword("")
            console.log(e)
            //display the error in some way
        }
    }

    const classes = useStyles();
    //REDIRECT NOT WORKING
    return (
        user ?
        <Redirect
            to={{
            pathname: "/",
            state: { currentUser: user }
          }}
        />
        :
        <form onSubmit={submitLogin}>
            <h1 className="LoginHeader">
                Login
            </h1>
            <Grid
                className={classes.grid}
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={8} spacing={3}>
                    <TextField className={classes.root} value={username} onChange={handleUsernameChange} id="username" label="Username" variant="filled" autoComplete="off" />
                </Grid>
                <Grid item xs={8} spacing={3}>
                    <TextField className={classes.root} value={password} onChange={handlePasswordChange} id="password" label="Password" variant="filled" type="password" />
                </Grid>
                <Grid item xs={4} spacing={3}>
                    <Button className={classes.button} type="submit" variant="outlined">Submit</Button>
                </Grid>
                    
            </Grid>
        </form>
    )
}