import weeklyStockPage from '@/views/stocks/WeeklyStock';
import monthlyStockPage from '@/views/stocks/MonthlyStock';

// Const weeklyStockPage = lazy(async () => import('@/views/stocks/WeeklyStock'));
// Const monthlyStockPage = lazy(async () => import('@/views/stocks/MonthlyStock'));

export const stockRoutes = [
	{
		path: 'week',
		title: 'weekly',
		component: weeklyStockPage,
	},
	{
		path: 'month',
		title: 'monthly',
		component: monthlyStockPage,
	},
];

const routes = [...stockRoutes];
export default routes;
