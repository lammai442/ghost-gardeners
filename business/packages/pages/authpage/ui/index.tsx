import './index.scss';
import { AuthForm } from '@mojjen/authform';

export const AuthPage = () => {
	return (
		<div className="page__auth">
			<img
				className="login__img"
				src="/mojjen-logo-text.png"
				alt="Logo of Mojjen"
			/>
			<section className="login__wrapper">
				<section className="login__title">
					<h1 className="heading-1">Logga in</h1>
					<span className="base">
						Välkommen! Här kan du som anställd följa alla ordrar.
					</span>
				</section>
				<AuthForm />
			</section>
		</div>
	);
};
