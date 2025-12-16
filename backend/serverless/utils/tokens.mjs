import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (user) => {
	// Payload containing userId and role
	const payload = {
		// sub stands for subject it's a standard in JWT-payload occuring to RFC 7519
		sub: user.id,
		role: user.role,
	};
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
	try {
		// Returning the payload after a successfully verification
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		console.error('JWT error:', error.message);
		return null;
	}
};

/**
 * Author: Klara
 * Generates and verifies tokens.
 * Edited by: ninerino and Lam
 * Changed payload and env secret
 */
