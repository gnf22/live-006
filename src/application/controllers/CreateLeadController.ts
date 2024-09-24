import { optional, z, ZodError } from 'zod';

import type { IController, IResponse } from '../interfaces/IController';
import type { IRequest } from '../interfaces/IRequest';

import type { CreateLeadUseCase } from '../useCases/CreateLeadUseCase';
import { LeadAlreadyExists } from '../errors/LeadAlreadyExists';

const schema = z.object({
	name: z.string().min(2),
	email: z.string().email().min(1),
	phone: z.string().min(8).optional().or(z.literal('')),
	source: z
		.enum(['WEBSITE', 'SOCIAL_MEDIA', 'EVENT', 'REFERRAL', 'OTHER'])
		.optional(),
});

export class CreateLeadController implements IController {
	constructor(private readonly createLeadUseCase: CreateLeadUseCase) {}
	async handle({ body }: IRequest): Promise<IResponse> {
		try {
			const { name, email, phone, source } = schema.parse(body);

			await this.createLeadUseCase.execute({
				name,
				email,
				phone,
				source,
			});

			return {
				statusCode: 204,
				body: null,
			};
		} catch (error) {
			if (error instanceof ZodError) {
				return {
					statusCode: 400,
					body: error.issues,
				};
			}

			if (error instanceof LeadAlreadyExists) {
				return {
					statusCode: 409,
					body: {
						error: 'This email is already in use.',
					},
				};
			}

			throw error;
		}
	}
}
