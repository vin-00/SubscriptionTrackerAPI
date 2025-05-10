import {Router} from 'express';

import {signUp ,signIn , signOut} from '../controllers/auth.controller.js';

const authRouter = Router();

// Path : /api/v1/auth/sign-up (POST)
authRouter.post("/sign-up", (req, res) => {
  signUp
});

authRouter.post("/sign-in", (req, res) => {
  signIn
});

authRouter.post("/sign-out", (req, res) => {
  signOut
});

export default authRouter;