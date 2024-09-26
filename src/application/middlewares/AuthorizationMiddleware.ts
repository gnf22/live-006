import type { IData, IMiddleware, IResponse } from '../interfaces/IMiddleware';
import type { IRequest } from '../interfaces/IRequest';
import type { GetRolePermissionsUseCase } from '../useCases/GetRolePermissionsUseCase';

export class AuthorizationMiddleware implements IMiddleware {
	constructor(
		private readonly requiredPermissions: string[],
		private readonly getRolePermissionsUseCase: GetRolePermissionsUseCase,
	) {}

	async handle({ account }: IRequest): Promise<IResponse | IData> {
		if (!account) {
			return {
				statusCode: 403,
				body: {
					error: 'Access Denied.',
				},
			};
		}

		if (!this.requiredPermissions.includes(account.role)) {
			return {
				statusCode: 403,
				body: {
					error: 'Access Denied.',
				},
			};
		}

		return {
			data: {},
		};
	}
}
