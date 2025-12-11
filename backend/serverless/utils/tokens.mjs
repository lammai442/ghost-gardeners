import jwt from 'jsonwebtoken';

/**
 * Author: Klara
 * Generates and verifies tokens.
 */

export const generateToken = (user) => {
	const payload = user;
	const token = jwt.sign(payload, 'avubja8712ncag', { expiresIn: '1h' });
	return token;
};

export const verifyToken = (token) => {
	try {
		return jwt.verify(token, 'avubja8712ncag');
	} catch (error) {
		console.error(error.message);
		return null;
	}
};
