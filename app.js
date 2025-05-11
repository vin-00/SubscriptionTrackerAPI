import express from 'express';

import cookieParser from 'cookie-parser';

import {PORT} from './config/env.js';

import subscriptionRouter from './routes/subscriptions.routes.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

import arcjetMiddleware from './middlewares/arcjet.middleware.js';

import errorMiddleware from './middlewares/error.middleware.js';

import connectToDatabase from './database/mongodb.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

// To handle json data
app.use(express.json());

// To handle url encoded data
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(arcjetMiddleware);

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/subscriptions",subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter)

app.use(errorMiddleware);

app.get("/" , (req,res)=>{
    res.send("Welcome to the subscription tracker api");
})

app.listen(PORT,async ()=>{
    console.log(`Subscription tracker API is running on http://localhost:${PORT}`);

    await connectToDatabase();
})

export default app;