import React, {useState, Fragment, Suspense, lazy} from 'react';
import {Routes, Route} from 'react-router-dom';
import Loader from '@/component/ui/atoms/Loader';
import Dashboard from '@/layout/dashboard';
import routes from '@/routes';
import {useStock} from '@/hooks/useStock';
import {StockFetchType} from '@/types/fetch.stock';

const DailyStockPage = lazy(async () => import('@/views/stocks/DailyStock'));

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const stockResult = useStock({
		symbol: 'ibm',
		type: StockFetchType.DAILY,
		adjustable: true,
		set: {
			setLoading,
		},
	});

	return loading ? (
		<Loader />
	) : (
		<Fragment>
			<Routes>
				<Route path={'/'} element={<Dashboard />}>
					<Route
						index
						element={
							<Suspense fallback={<Loader />}>
								{!loading && <DailyStockPage setLoading={setLoading} result={stockResult} />}
							</Suspense>
						}
					/>
					{routes.map((route, index: number) => {
						const {path, component: Component} = route;
						return (
							<Route
								key={index}
								path={path}
								element={<Suspense fallback={<Loader />}>{!loading && <Component setLoading={setLoading} />}</Suspense>}
							/>
						);
					})}
				</Route>
			</Routes>
		</Fragment>
	);
}

export default App;
