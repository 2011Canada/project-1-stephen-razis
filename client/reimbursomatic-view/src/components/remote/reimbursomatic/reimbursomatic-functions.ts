import { timeStamp } from 'console';
import { reimbursomaticBaseClient } from '.';
import Reimbursement from '../../../models/Reimbursement';
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

function getFormattedDateTime() {
    let out: string = ""
    let date = new Date();
    out = date.getFullYear() + `-` + date.getMonth() + 1 + `-` + date.getDate() + ` ` + 
            date.getHours() + `:` + date.getMinutes() + `:` + date.getSeconds()

    return out
}

export const TestFormSend = () => {
    console.log(getFormattedDateTime());
    
}

export const SendReimbursementRequest = async (amount:string, typeId:string, description:string, authorId:string) => {
    let dateTime:string = getFormattedDateTime();
    
    let reimbursementData = {
        id:0,
        amount,
        submitted:dateTime,
        description,
        authorId,
        typeId
    }

    try {
        let requestURI = '/reimbursements/create'
        let res = await reimbursomaticBaseClient.post(requestURI, reimbursementData)
        return res.data;

    } catch(e) {
        if (e.response) {
            console.log(e)
        } else {
            console.log("failed to send request.")
        }
    }
}


// format like this
// limit: number it grabs
// offset: start from where
// "http://localhost:8080/users?limit=10&offset=0"
// "http://localhost:8080/reimbursements?limit=10&offset=0"
// have to keep track of it in the state of the limit and offset in the state of the component