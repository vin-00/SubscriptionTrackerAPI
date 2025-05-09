import express from 'express';

import {PORT} from './config/env.js';

import subscriptionRouter from './routes/subscriptions.routes.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

import connectToDatabase from './database/mongodb.js';

const app = express();

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/subscriptions",subscriptionRouter);

app.get("/" , (req,res)=>{
    res.send("Welcome to the subscription tracker api");
})

app.listen(PORT,async ()=>{
    console.log(`Subscription tracker API is running on http://localhost:${PORT}`);

    await connectToDatabase();
})

export default app;