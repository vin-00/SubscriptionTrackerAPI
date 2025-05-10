
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

import User from "../models/user.model.js"

// Middleware to make sure only the user can see his /her details , no other person . 
// When user is signed in , a token is generated and then user can use this token to access his/her details.
const authorize = async (req, res, next) => {
    try{

        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(401).json({message:"Unauthorized, no token provided"})
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({message:"Unauthorized, no user found"})
        }

        req.user = user;
        next();
    }

    catch(error){
        res.status(401).json({message:"Unauthorized" , error:error.message})
    }
}

export default authorize;