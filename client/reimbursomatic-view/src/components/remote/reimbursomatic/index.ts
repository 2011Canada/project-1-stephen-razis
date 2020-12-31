import axios from 'axios'

export const reimbursomaticBaseClient = axios.create({
        baseURL: 'http://localhost:8080/reimbursomatic',
        headers: { 
                'Content-Type': 'application/json'
        }
})