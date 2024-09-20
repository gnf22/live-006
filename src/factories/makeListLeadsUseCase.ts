import { ListLeadsUseCase } from '../application/useCases/ListLeadsUseCase';

export function makeListLeadsUseCase() {
	return new ListLeadsUseCase();
}
