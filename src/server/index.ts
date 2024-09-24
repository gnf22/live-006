import express from 'express';

import { middlewareAdapter } from './adapters/middlewareAdapter';
import { routeAdapter } from './adapters/routeAdapter';

import { makeSignUpController } from '../factories/makeSignUpController';
import { makeSignInController } from '../factories/makeSignInController';
import { makeListLeadsController } from '../factories/makeListLeadsController';
import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddleware';
import { makeGetLeadByIdController } from '../factories/makeGetLeadByIdController';
import { makeCreateLeadController } from '../factories/makeCreateLeadController';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.post(
	'/leads',
	middlewareAdapter(makeAuthenticationMiddleware()),
	routeAdapter(makeCreateLeadController()),
);

app.get(
	'/leads',
	middlewareAdapter(makeAuthenticationMiddleware()),
	routeAdapter(makeListLeadsController()),
);

app.get(
	'/leads/:leadId',
	middlewareAdapter(makeAuthenticationMiddleware()),
	routeAdapter(makeGetLeadByIdController()),
);

app.listen(3001, () => {
	console.log('Server started at http://localhost:3001');
});
