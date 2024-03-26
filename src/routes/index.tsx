import React, {lazy} from 'react';
const dailyStockPage = lazy(async () => import('@/views/stocks/DailyStock'));
const weeklyStockPage = lazy(async () => import('@/views/stocks/WeeklyStock'));
const monthlyStockPage = lazy(async () => import('@/views/stocks/MonthlyStock'));

export const stockRoutes = [
	{
		path: '/',
		title: 'daily',
		component: dailyStockPage,
	},
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

const coreRoutes = [...stockRoutes];

const routes = [...coreRoutes];
export default routes;
