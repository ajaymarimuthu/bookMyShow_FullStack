const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){


    // get thte token using the request headers
    // verify the token 
    // get the user out of the token 
    // send the user to the fucntion

    console.log('inside middleeeware');
    

    try{

        console.log('inside tryyyyyyyyyyyyyyyyyyyyyyyy');

        const token = req.headers.authorization.split(" ")[1];

        // secret Key = "ajay_bms "
        // used above key in user routes to sign the toekn. so using the same secret key to verify the token
        const verifiedToken = jwt.verify(token , "ajay_bms");

        // verify return an object containting userid, iat and  exp  

        // now send the signed token to the main funtion 

        req.body.userId=verifiedToken.userId;

        console.log('verifiedToken-------', verifiedToken)
        console.log('inside lasssssssssttttttttttt');
        next();

    }
    catch(err){

        res.status(401).send({success: false, message: "Token Invalid" });

    }

}