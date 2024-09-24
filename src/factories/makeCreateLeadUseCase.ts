import { CreateLeadUseCase } from '../application/useCases/CreateLeadUseCase';

export function makeCreateLeadUseCase() {
	return new CreateLeadUseCase();
}
