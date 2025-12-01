import './index.scss';

export const OrderPage = () => {
	return (
		<main className="order-page">
			<section className="order-page__container">
				<h1>Ordrar</h1>

				<section>
					<section>
						<h2>Väntande (10 st)</h2>
						<section>
							<div>order1</div>
							<div>order2</div>
							<div>order3</div>
							<div>order4</div>
							<div>order5</div>
							<div>order6</div>
						</section>
					</section>
					<section>
						<h2>Tillagas</h2>
						<section>
							<div>order1</div>
							<div>order2</div>
							<div>order3</div>
							<div>order4</div>
							<div>order5</div>
							<div>order6</div>
						</section>
					</section>
					<section>
						<h2>Redo att hämtas</h2>
						<section>
							<div>order1</div>
							<div>order2</div>
							<div>order3</div>
							<div>order4</div>
							<div>order5</div>
							<div>order6</div>
						</section>
					</section>
				</section>
			</section>
		</main>
	);
};
