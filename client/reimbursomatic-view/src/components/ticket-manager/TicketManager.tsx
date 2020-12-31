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
//  - go back option
//  - sorting options
//  - different icons for the kinds of reimbursement requests
//  - skeletons for when the table is updating
//  - accessibility

export const Home : React.FunctionComponent<any> = (props:IUser) => {
    console.log(props.currentUser)
    return (
        (props.currentUser) ?
        <div>
            <p>Welcome to the Ticket Management Dashboard!</p>
        </div>
        :
        <Redirect to="/login" />
    )
}