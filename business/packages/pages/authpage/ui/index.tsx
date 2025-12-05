import './index.scss';
import { AuthForm } from '@mojjen/authform';

export const AuthPage = () => {
	return (
		<div className="page__auth">
			<section>
				<img src="/mojjen-logo-text.png" alt="" />
				<section className="login__wrapper">
					<h1 className="heading-1">Logga in</h1>
					<span>Välkommen! Här kan du som anställd följa alla ordrar.</span>
					<AuthForm />
				</section>
			</section>
		</div>
	);
};
