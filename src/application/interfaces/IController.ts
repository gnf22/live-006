import type { IRequest } from './IRequest';
import type { IResponse } from './IResponse';

export interface IController {
	handle(request: IRequest): Promise<IResponse>;
}
