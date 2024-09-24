import { GetLeadByIdController } from '../application/controllers/GetLeadByIdController';
import { makeGetLeadByIdUseCase } from './makeGetLeadByIdUseCase';

export function makeGetLeadByIdController() {
	const getLeadByIdUseCase = makeGetLeadByIdUseCase();

	return new GetLeadByIdController(getLeadByIdUseCase);
}
