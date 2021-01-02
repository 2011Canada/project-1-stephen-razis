import { reimbursomaticBaseClient } from '.';
import User from '../../../models/User';

export const getLogin = async (username:string, password:string) => {
    let credentials = {
        username,
        password
    }

    try {
        let res = await reimbursomaticBaseClient.post('/login', credentials)
        return res.data
    } catch(e) {
        if (e.response) {
            throw new Error(e.response.status)
        } else {
            throw new Error("Something went wrong.")
        }
    }
}

export const sendTestURI = async (user:User) => {
    try {
        let res = await reimbursomaticBaseClient.post('/users/fdsa', null)
        return res.data
    } catch(e) {
        if (e.response) {
            throw new Error(JSON.stringify(e.response))
        } else {
            throw new Error("Something went wrong.")
        }
    }
}

export const getCurrentUsersReimbursements = async (user:User) => {
    try {
        let requestURI = '/users/' + user.id
        let res = await reimbursomaticBaseClient.post(requestURI, null)
        return res.data
    } catch(e) {
        if (e.response) {
            throw new Error(e)
        } else {
            throw new Error("Something went wrong.")
        }
    }
}


// format like this
// limit: number it grabs
// offset: start from where
// "http://localhost:8080/users?limit=10&offset=0"
// "http://localhost:8080/reimbursements?limit=10&offset=0"
// have to keep track of it in the state of the limit and offset in the state of the component