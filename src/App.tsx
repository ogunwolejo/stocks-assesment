import React, {useState, Fragment, useEffect, Suspense, lazy} from 'react';
import {Routes, Route} from 'react-router-dom';
import Loader from '@/component/ui/atoms/Loader';
import Dashboard from '@/layout/dashboard';
import routes from '@/routes';

const DailyStockPage = lazy(async () => import('@/views/stocks/DailyStock'));

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	}, []);

	return loading ? (
		<Loader />
	) : (
		<Fragment>
			<Routes>
				<Route path={'/'} element={<Dashboard />} >
					{/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
					<Route index element={
						<Suspense fallback={<Loader/>}>
							<DailyStockPage/>
						</Suspense>
					}/>
					{routes.map((route, index: number) => {
						const {path, component: Component} = route;
						return (
							<Route
								key={index}
								path={`:${path}`}
								element={
									<Suspense fallback={<Loader />}>
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
