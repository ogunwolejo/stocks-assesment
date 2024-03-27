import React, {useState, Fragment, Suspense, lazy, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Loader from '@/component/ui/atoms/Loader';
import Dashboard from '@/layout/dashboard';
import routes from '@/routes';
import {useStock} from '@/hooks/useStock';
import {StockFetchType} from '@/types/fetch.stock';

const DailyStockPage = lazy(async () => import('@/views/stocks/DailyStock'));

function App() {
	const stockResult = useStock({
		symbol: 'ibm',
		type: StockFetchType.DAILY,
		adjustable: true,
	});

	return (
		<Fragment>
			<Routes>
				<Route path={'/'} element={<Dashboard />}>
					<Route
						index
						element={
							<Suspense fallback={<Loader />}>
								<DailyStockPage
									result={stockResult.stockData}
									fetching={stockResult.fetching}
									errorMsg={stockResult.errorMsg}
								/>
							</Suspense>
						}
					/>
					{routes.map((route, index: number) => {
						const {path, component: Component} = route;
						return (
							<Route
								key={index}
								path={path}
								element={
									<Suspense fallback={<div>loading.....</div>}>
										<Component />
									</Suspense>
								}
							/>
						);
					})}
				</Route>
			</Routes>
		</Fragment>
	);
}

export default App;
