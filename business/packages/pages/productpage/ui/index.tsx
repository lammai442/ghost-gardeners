import './index.scss';
import { HeaderComp } from '@mojjen/header';
import { ConstructError } from '@mojjen/construct-error';

export const ProductPage = () => {
	return (
		<>
			<HeaderComp />
			<main className="page__auth">
				<ConstructError
					color="bg-cucumber"
					title="Under uppbyggnad"
					text={
						'Vi håller just nu på att utveckla funktionalitet för att hantera produkter. \nArbetet omfattar möjligheten att ändra produktinformation och uppdatera saldon. \nFunktionen blir tillgänglig så snart den är färdigställd.'
					}
				/>
			</main>
			;
		</>
	);
};
