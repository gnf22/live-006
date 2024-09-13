import { prismaClient } from '../libs/prsimaClient';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';

interface IInput {
	name: string;
	email: string;
	password: string;
}

// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
type IOutput = void;

export class SignUpUseCase {
	async execute({ name, email, password }: IInput): Promise<IOutput> {
		const accountAlreadyExists = await prismaClient.account.findUnique({
			where: { email },
		});

		if (accountAlreadyExists) {
			throw new AccountAlreadyExists();
		}

		await prismaClient.account.create({
			data: {
				name,
				email,
				password,
			},
		});
	}
}
