import './index.scss';
import { HeaderComp } from '@mojjen/header';
import { ConstructError } from '@mojjen/construct-error';
import { Page } from '@mojjen/page';

export const ProductPage = () => {
	return (
		<>
			<HeaderComp />
			<Page titleText="Produkter" srOnly={true}>
				{/* <main className="page__auth"> */}
				<ConstructError
					color="bg-cucumber"
					title="Under uppbyggnad"
					text={
						'Vi håller just nu på att utveckla funktionalitet för att hantera produkter. \n\nArbetet omfattar möjligheten att ändra produktinformation och uppdatera saldon. \nFunktionen blir tillgänglig så snart den är färdigställd.'
					}
				/>
				{/* </main> */}
			</Page>
			;
		</>
	);
};

/**
 * Modified by: Klara
 * WCAG sr-only h1
 *
 */
