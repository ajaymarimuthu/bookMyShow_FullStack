const { axiosInstance } = require('./index.js');

export const LoginUser = async(values) =>{
    try {
        const response = await axiosInstance.post('api/users/login', values);
        return response.data;
        
    } catch (error) {
        console.log(error);
        
    }
}

export const RegisterUser = async(values) =>{
    try {
        const response = await axiosInstance.post('api/users/register', values)
        return response;
        
    } catch (error) {
        console.log(error);
        
    }
}

export const GetCurrentUser = async () =>{
    try{

        const response = await axiosInstance.post('api/users/get-current-user');
        return response.data;

    }
    catch(err){

        debugger;

        console.log(err);
        

    }
}