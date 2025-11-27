import { v4 as uuid } from 'uuid';

/**
 * Author: Lam
 * GenerateId function
 *
 */

export const generateId = (): string => {
	return uuid().substring(0, 5);
};
