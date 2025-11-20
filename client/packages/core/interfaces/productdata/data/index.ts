/**
 * Author: Lam
 * Interface for Meal products
 */

export interface Meal {
	id?: string;
	name: string;
	summary: string;
	details?: string;
	price: number;
	img: string;
	classBgColor?: string;
	status: string;
	items?: string[];
	qty?: number | undefined;
}
