// Allows standard charcters, numbers and interpunctation. Prevents emojis in input fields.
export const safeCharacters =
	/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,!?@#$%&*()_+=\-:;"'\/\\[\]{}]*$/;

// The password must contain at least one of the following: 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number (0-9). Regex from: https://ihateregex.io/expr/password/.
// Updated by Claude, no emojis allowed.
export const passwordRegEx =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])[\p{L}\p{N}\p{P}\p{Z}]{8,}$/u;

// Pattern for the orderId
export const regExOrderId = /^order-[0-9a-fA-F]{5}$/;

// Pattern for the itemId
export const regExItemId = /^prod-[0-9a-fA-F]{5}$/;

/**
 * Author: Klara
 * Patterns for schemas.
 */
