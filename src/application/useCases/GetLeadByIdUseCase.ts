import type { LeadSource } from '../enums/LeadSource';
import type { LeadStatus } from '../enums/LeadStatus';
import { LeadNotFoundError } from '../errors/LeadNotFoundError';
import { prismaClient } from '../libs/prismaClient';

interface IInput {
	leadId: string;
}

interface IOutput {
	id: string;
	name: string;
	email: string;
	phone: string | null;
	source: LeadSource | null;
	status: LeadStatus;
	createdAt: Date;
}

export class GetLeadByIdUseCase {
	async execute({ leadId }: IInput): Promise<IOutput> {
		const lead = await prismaClient.lead.findUnique({
			where: {
				id: leadId,
			},
		});

		if (!lead) {
			throw new LeadNotFoundError();
		}

		return lead;
	}
}
