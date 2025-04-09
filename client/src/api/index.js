import axios from 'axios'
export const axiosInstance = axios.create({
    headers:{
        'content-Type' : 'application/json', 
        'Authorization' : `Bearer ${localStorage.getItem('token')}`       
    }
})