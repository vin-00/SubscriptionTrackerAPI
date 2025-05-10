import Subscription from '../models/subscription.model.js';


export const createSubscription = async (req, res,next) => {
    try{
        const subscription = await Subscription.create({...req.body, user: req.user._id});

        res.status(201).json({
            status:"success",
            data:subscription
        });
    }
    catch(e){
        next(e);
    }
}

export const getAllSubscriptions = async (req, res , next) => {
    try{
        if(req.user.id!=req.params.id){
            const error = new Error("You are not authorized to view this resource");
            error.statusCode = 403;
            throw error;
        }
        const subscriptions = await Subscription.find({user:req.user.id});

        res.status(200).json({
            status:"success",
            data:subscriptions
        });
    }
    catch(e){
        next(e);
    }
}