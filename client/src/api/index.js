import axios from 'axios'
export const axiosInstance = axios.create({
    header:{
        'content-Type' : 'application/json',        
    }
})