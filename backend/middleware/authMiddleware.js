const jwt = require("jsonwebtoken")

const verifyUserToken = (req, res, next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.json({
            status : "FaILED",
            message : "No token found"
            
        })
    }
    try{
        const checkUser = jwt.verify(token, process.env.JWT_SECRET);

        req.user = checkUser;           
        next();

    }
    catch(error){
        return res.json({
            status : "FaILED",
            message : "Invalid token"
        })
    }
}

module.exports = {
    verifyUserToken
}