import React, {lazy} from 'react';
const chartPage = lazy(async () => import('@/views/Chart'));
const dailyStockPage = lazy(async () => import('@/views/stocks/DailyStock'));
const weeklyStockPage = lazy(async () => import('@/views/stocks/WeeklyStock'));
const monthlyStockPage = lazy(async () => import('@/views/stocks/MonthlyStock'));
const newPage = lazy(async () => import('@/views/News'));

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

export const secondaryRoutes = [
	{
		path: 'news',
		title: 'news',
		component: newPage,
		svg: (
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
				<path
					fill-rule='evenodd'
					d='M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z'
					clip-rule='evenodd'
				/>
				<path d='M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z' />
			</svg>
		),
	},
	{
		path: 'chart',
		title: 'charts',
		component: chartPage,
		svg: (
			<svg
				className='fill-current'
				width='18'
				height='19'
				viewBox='0 0 18 19'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g clipPath='url(#clip0_130_9801)'>
					<path
						d='M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z'
						fill=''
					/>
					<path
						d='M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z'
						fill=''
					/>
				</g>
				<defs>
					<clipPath id='clip0_130_9801'>
						<rect width='18' height='18' fill='white' transform='translate(0 0.052124)' />
					</clipPath>
				</defs>
			</svg>
		),
	},
];

const coreRoutes = [
	...stockRoutes,
	...secondaryRoutes.map((el) => ({
		path: el.path,
		title: el.title,
		component: el.component,
	})),
];

const routes = [...coreRoutes];
export default routes;
