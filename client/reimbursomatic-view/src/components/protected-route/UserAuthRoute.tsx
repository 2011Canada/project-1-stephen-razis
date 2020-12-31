import React from 'react';
import { Redirect } from 'react-router'
import { UserContext } from '../../App'

const UserAuthRoute: React.FunctionComponent<any> = (props) => {
    return (
        <UserContext.Consumer>
        { user =>

            (user.roles) ?
            <>
                {props.children}
            </>
            :
            <Redirect to="/login" />
        }
        </UserContext.Consumer>
    )
}

const protectComponent = (Component: any) => {
    return (props: any) => {
        return (
            <>
                <UserAuthRoute>
                    <Component {...props} />
                </UserAuthRoute>
            </>
        )
    }
}

export default protectComponent