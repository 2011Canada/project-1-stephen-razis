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

export const getAllReimbursements = async (user:User) => { 
    try {
        let requestURI = '/reimbursements/all'
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

function getFormattedDateTimeForCreate() {
    let out: string = ""
    let date = new Date();

    let month: string = (date.getMonth() + 1 < 10) ? (`0` + String(date.getMonth() + 1)) : String(date.getMonth() + 1)
    let day: string = (date.getDate() < 10) ? (`0` + String(date.getDate())) : String(date.getDate())
    let hours: string = (date.getHours() < 10) ? (`0` + String(date.getHours())) : String(date.getHours())
    let minutes: string = date.getMinutes() < 10 ? (`0` + String(date.getMinutes())) : String(date.getMinutes())
    let seconds: string = date.getSeconds() < 10 ? (`0` + String(date.getSeconds())) : String(date.getSeconds())

    out = date.getFullYear() + `-` + month + `-` + day + 
            ` ` + hours + `:` + minutes + `:` + seconds

    return out
}

function getFormattedDateTimeForUpdate() {
    let out: string = ""
    let date = new Date();

    let month: string = (date.getMonth() + 1 < 10) ? (`0` + String(date.getMonth() + 1)) : String(date.getMonth() + 1)
      let day: string = (date.getDate() < 10) ? (`0` + String(date.getDate())) : String(date.getDate())
      let hours: string = (date.getHours() < 10) ? (`0` + String(date.getHours())) : String(date.getHours())
      let minutes: string = date.getMinutes() < 10 ? (`0` + String(date.getMinutes())) : String(date.getMinutes())
      let seconds: string = date.getSeconds() < 10 ? (`0` + String(date.getSeconds())) : String(date.getSeconds())

    out = date.getFullYear() + `-` + month + `-` + day + 
            `T` + hours + `:` + minutes + `:` + seconds

    return out
}

export const SendReimbursementRequest = async (amount:string, typeId:string, description:string, authorId:string) => {
    let dateTime:string = getFormattedDateTimeForCreate();
    
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
        console.log(res)
        return res.data;

    } catch(e) {
        if (e.response) {
            console.log(e)
        } else {
            console.log("failed to send request.")
        }
    }
}

export const UpdateReimbursement = async (id:Number, amount:string, submitted:string, description:string, authorId:Number, resolverId:Number, statusId:Number, typeId:Number) => {
    let dateTime:string = getFormattedDateTimeForUpdate();
    
    let reimbursementData = {
        id,
        amount,
        submitted,
        resolved:dateTime,
        description,
        authorId,
        resolverId,
        statusId,
        typeId
    }

    try {
        let requestURI = '/reimbursements/' + id + '/update'
        let res = await reimbursomaticBaseClient.post(requestURI, reimbursementData)
        console.log(res)
        return res.data;

    } catch(e) {
        if (e.response) {
            console.log(e)
        } else {
            console.log("failed to send request.")
        }
    }
}

// export const RequestReimbursementById = async (id:Number) => { 
//     try {
//         let requestURI = '/reimbursements/' + id
//         let res = await reimbursomaticBaseClient.post(requestURI, null)

//         return res.data
//     } catch(e) {
//         if (e.response) {
//             throw new Error(e)
//         } else {
//             throw new Error("Something went wrong.")
//         }
//     }
// }


// format like this
// limit: number it grabs
// offset: start from where
// "http://localhost:8080/users?limit=10&offset=0"
// "http://localhost:8080/reimbursements?limit=10&offset=0"
// have to keep track of it in the state of the limit and offset in the state of the component