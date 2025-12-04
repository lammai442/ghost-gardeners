import { useAuthStore } from '@mojjen/useauthstore';
import { type JSX } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
	children: JSX.Element;
};

export const ProtectedRoute = ({ children }: Props) => {
	const { user } = useAuthStore();

	if (!user) return <Navigate to={'/'} />;

	return children;
};
