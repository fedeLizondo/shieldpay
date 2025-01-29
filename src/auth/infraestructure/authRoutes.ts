import { Router } from "express";
import { signOut, signUp, singIn } from "./authController";
import { authenticateJWT } from "./middleware/authMiddleware";
import { mailAndPasswordValidator } from "./middleware/mailAndPasswordValidatorMiddleware";

const authRouter = Router();

authRouter.post('/api/v1/signin', mailAndPasswordValidator, singIn)
authRouter.post('/api/v1/signup', mailAndPasswordValidator, signUp)
authRouter.post('/api/v1/signout', authenticateJWT, signOut)

export default authRouter;