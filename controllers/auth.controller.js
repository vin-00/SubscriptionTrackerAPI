import mongoose from "mongoose"

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js";

export const signUp =  async(req,res,next)=>{
    const session = await mongoose.startSession();
    // This is for mongoose session , so that transaction are atomic (all happen or nothing happens)
    session.startTransaction();
    try{
        const {name, email, password} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            const error = new Error("User already exists");
            error.statusCode = 400;
            throw error;
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        const newUsers = await User.create([{
            name,
            email,
            password:hashedPassword,
        }], {session});

        const token = jwt.sign({userId:newUsers[0]._id }, JWT_SECRET , {expiresIn : JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success:true,
            message:"User created successfully",
            data:{
                user:newUsers[0],
                token
            }
        });

    }
    catch(error){
        // Aborting , so that nothing happens (revert back to previous state before transaction)
        await session.abortTransaction();
        session.endSession();
        next(error);
    }   
}

export const signIn =  async(req,res,next)=>{}

export const signOut =  async(req,res,next)=>{}