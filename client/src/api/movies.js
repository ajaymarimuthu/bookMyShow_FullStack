const { axiosInstance } = require('./index.js');


export const GetAllMovies = async () =>{
    try{

        const response = await axiosInstance.get('api/movies/get-all-movies');
        console.log('------------',response);
        return response.data;
    }
    catch(err){
        // debugger 
        console.log(err);
    }
}