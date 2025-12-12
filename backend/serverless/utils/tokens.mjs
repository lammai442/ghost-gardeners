import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 * Author: Klara
 * Generates and verifies tokens.
 * Edited by: ninerino and Lam
 * Changed payload and env secret
 */

export const generateToken = (user) => {
	const payload = {
		sub: user.id, // sub står för subject och är ett standardfält i JWT-payloaden enligt RFC 7519
		role: user.role,
	};
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		console.error('JWT error:', error.message);
		return null;
	}
};
