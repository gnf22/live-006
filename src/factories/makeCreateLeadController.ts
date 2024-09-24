import { CreateLeadController } from '../application/controllers/CreateLeadController';
import { makeCreateLeadUseCase } from './makeCreateLeadUseCase';

export function makeCreateLeadController() {
	const createLeadUseCase = makeCreateLeadUseCase();

	return new CreateLeadController(createLeadUseCase);
}
