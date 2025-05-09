import {Router} from 'express';

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  // Handle user signup logic here
  res.send({title: "User signed up"});
});

authRouter.post("/sign-in", (req, res) => {
  // Handle user signup logic here
  res.send({title:"User signed up"});
});

authRouter.post("/sign-out", (req, res) => {
  // Handle user signup logic here
  res.send({title:"User signed up"});
});

export default authRouter;