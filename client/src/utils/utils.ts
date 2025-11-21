/**
 * Author: Klara Sköld
 * Utility function for makes calculations on an array.
 * Used on the cart page to calculate the total sum and total qty
 *
 */

// https://medium.com/@anandgupta20588/how-to-use-reduce-method-to-add-the-prices-of-cart-items-in-js-abb81a930883

// <T> är en generisk typ som används för att funktionen ska kunna ta emot vilken array som helst. Typescript känner då automatiskt av vilken sorts array den får in och returnera samma sort tillbaka. Lärde mig den här lösningen i en Scrimbakurs. /Klara

// mapper-lösningen kommer från ChatGPT
export const calcSum = <T>(array: T[], mapper: (item: T) => number): number => {
	return array.reduce((acc, curr) => acc + mapper(curr), 0);
};
