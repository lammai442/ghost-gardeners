import { useAuthStore } from '@mojjen/useauthstore';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
	children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
	const user = useAuthStore((state) => state.user);

	if (!user) return;
	return children;
};
