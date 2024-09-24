import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middlewareAdapter';
import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddleware';
import { makeAuthorizationMiddleware } from '../../factories/makeAuthorizationMiddleware';
import { routeAdapter } from '../adapters/routeAdapter';
import { makeCreateLeadController } from '../../factories/makeCreateLeadController';
import { makeListLeadsController } from '../../factories/makeListLeadsController';
import { makeGetLeadByIdController } from '../../factories/makeGetLeadByIdController';

const leadRouter = Router();

leadRouter.post(
	'/leads',
	middlewareAdapter(makeAuthenticationMiddleware()),
	middlewareAdapter(makeAuthorizationMiddleware(['ADMIN'])),
	routeAdapter(makeCreateLeadController()),
);

leadRouter.get(
	'/leads',
	middlewareAdapter(makeAuthenticationMiddleware()),
	routeAdapter(makeListLeadsController()),
);

leadRouter.get(
	'/leads/:leadId',
	middlewareAdapter(makeAuthenticationMiddleware()),
	routeAdapter(makeGetLeadByIdController()),
);

export default leadRouter;
