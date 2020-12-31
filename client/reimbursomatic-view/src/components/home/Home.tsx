import React from 'react'
import { Redirect } from 'react-router'
import User from '../models/User'

interface IUser {
    currentUser: User
}

export const Home : React.FunctionComponent<any> = (props:IUser) => {
    console.log(props.currentUser)
    return (
        (props.currentUser) ?
        <div>
            <p>HOME PAGE HERE</p>
        </div>
        :
        <Redirect to="/login" />
    )
}