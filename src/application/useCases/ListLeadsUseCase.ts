import { prismaClient } from '../libs/prismaClient';
import type { LeadSource } from '../enums/LeadSource';
import type { LeadStatus } from '../enums/LeadStatus';

interface LeadOutput {
	id: string;
	name: string;
	email: string;
	phone: string | null;
	source: LeadSource | null;
	status: LeadStatus;
	createdAt: Date;
}

type IOutput = LeadOutput[];

export class ListLeadsUseCase {
	async execute(): Promise<IOutput> {
		const leads = await prismaClient.lead.findMany({});

		return leads;
	}
}
