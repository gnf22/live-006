import { Router } from 'express';
import authRouter from './authRoutes';
import leadRouter from './leadRoutes';

const routes = Router();

routes.use(authRouter);
routes.use(leadRouter);

export default routes;
