import { Router } from "express";
import { signOut, signUp, singIn } from "./authController";
import { authenticateJWT } from "./middleware/authMiddleware";
import { mailAndPasswordValidator } from "./middleware/mailAndPasswordValidatorMiddleware";

const authRouter = Router();

authRouter.post('/api/signin', mailAndPasswordValidator, singIn)
authRouter.post('/api/signup', mailAndPasswordValidator, signUp)
authRouter.post('/api/signout', authenticateJWT, signOut)

export default authRouter;