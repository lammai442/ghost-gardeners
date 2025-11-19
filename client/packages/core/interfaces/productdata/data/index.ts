/**
 * Author: Lam
 * Interface for Meal products
 */

export interface Meal {
	prodId?: string;
	title: string;
	summary: string;
	price: number;
	img: string;
	classBgColor?: string;
	status: string;
}
