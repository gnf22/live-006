import { z, ZodError } from 'zod';

import type {
	IController,
	IRequest,
	IResponse,
} from '../interfaces/IController';

import type { GetLeadByIdUseCase } from '../useCases/GetLeadByIdUseCase';
import { LeadNotFoundError } from '../errors/LeadNotFoundError';

const schema = z.object({
	leadId: z.string().uuid(),
});

export class GetLeadByIdController implements IController {
	constructor(private readonly getLeadByIdUseCase: GetLeadByIdUseCase) {}
	async handle({ params }: IRequest): Promise<IResponse> {
		try {
			const { leadId } = schema.parse(params);

			const lead = await this.getLeadByIdUseCase.execute({
				leadId,
			});

			return {
				statusCode: 200,
				body: lead,
			};
		} catch (error) {
			if (error instanceof ZodError) {
				return {
					statusCode: 400,
					body: error.issues,
				};
			}

			if (error instanceof LeadNotFoundError) {
				return {
					statusCode: 404,
					body: {
						error: 'Lead not found.',
					},
				};
			}

			throw error;
		}
	}
}
