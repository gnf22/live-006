import type { IController, IResponse } from '../interfaces/IController';
import type { ListLeadsUseCase } from '../useCases/ListLeadsUseCase';

export class ListLeadsController implements IController {
	constructor(private readonly listLeadsUseCase: ListLeadsUseCase) {}
	async handle(): Promise<IResponse> {
		const leads = await this.listLeadsUseCase.execute();

		return {
			statusCode: 200,
			body: leads,
		};
	}
}
