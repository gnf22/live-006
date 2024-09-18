import { hash } from 'bcryptjs';
import { prismaClient } from '../libs/prsimaClient';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import type { Role } from '@prisma/client';

interface IInput {
	name: string;
	email: string;
	password: string;
	role: Role;
}

type IOutput = void;

export class SignUpUseCase {
	constructor(private readonly salt: number) {}

	async execute({ name, email, password }: IInput): Promise<IOutput> {
		const accountAlreadyExists = await prismaClient.account.findUnique({
			where: { email },
		});

		if (accountAlreadyExists) {
			throw new AccountAlreadyExists();
		}

		const hashedPassword = await hash(password, this.salt);

		await prismaClient.account.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: 'USER',
			},
		});
	}
}
