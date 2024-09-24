import { prismaClient } from '../libs/prismaClient';

import { LeadAlreadyExists } from '../errors/LeadAlreadyExists';

import type { LeadSource } from '../enums/LeadSource';
import type { LeadStatus } from '../enums/LeadStatus';

interface IInput {
	name: string;
	email: string;
	phone?: string;
	source?: LeadSource;
}

type IOutput = void;

export class CreateLeadUseCase {
	async execute({ name, email, phone, source }: IInput): Promise<IOutput> {
		const leadAlreadyExists = await prismaClient.lead.findUnique({
			where: { email },
		});

		if (leadAlreadyExists) {
			throw new LeadAlreadyExists();
		}

		await prismaClient.lead.create({
			data: {
				name,
				email,
				status: 'NEW',
				phone,
				source,
			},
		});
	}
}
