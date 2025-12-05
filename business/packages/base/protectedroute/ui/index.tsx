import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@mojjen/useauthstore';

type Props = {
	element: React.ReactElement;
};

export const ProtectedRoute = ({ element }: Props) => {
	const { user } = useAuthStore();

	// Check if user is null or role is not admin then navigate to auth
	if (!user || user.role !== 'admin') return <Navigate to="/auth" replace />;

	// Otherwise go to the route page
	return element;
};

/**
 * Author: Lam Mai
 * Protected route component
 *
 */
