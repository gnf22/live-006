import { Router } from 'express';
import { routeAdapter } from '../adapters/routeAdapter';
import { makeSignUpController } from '../../factories/makeSignUpController';
import { makeSignInController } from '../../factories/makeSignInController';

const authRouter = Router();

authRouter.post('/sign-up', routeAdapter(makeSignUpController()));
authRouter.post('/sign-in', routeAdapter(makeSignInController()));

export default authRouter;
