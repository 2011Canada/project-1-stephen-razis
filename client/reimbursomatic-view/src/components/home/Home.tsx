import React from 'react'
import { Redirect } from 'react-router'
import User from '../../models/User'

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

export const Home : React.FunctionComponent<any> = (props:IUser) => {
    console.log(props.currentUser)
    return (
        (props.currentUser) ?
        <div>
            <p>Welcome to the Reimbursomatic Dashboard!</p>
        </div>
        :
        <Redirect to="/login" />
    )
}