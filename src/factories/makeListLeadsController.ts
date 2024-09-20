import { ListLeadsController } from '../application/controllers/ListLeadsController';
import { makeListLeadsUseCase } from './makeListLeadsUseCase';

export function makeListLeadsController() {
	const listLeadsUseCase = makeListLeadsUseCase();
	return new ListLeadsController(listLeadsUseCase);
}
