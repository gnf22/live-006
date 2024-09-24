import { GetLeadByIdUseCase } from '../application/useCases/GetLeadByIdUseCase';

export function makeGetLeadByIdUseCase() {
	return new GetLeadByIdUseCase();
}
