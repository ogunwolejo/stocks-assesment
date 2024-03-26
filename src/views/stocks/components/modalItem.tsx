import React from 'react';
import {Card, CardContent} from '@/component/ui/atoms/card';
import {type StockArray} from '@/types/fetch.stock';
import {DateTime} from 'luxon';

type Props = {
	items: StockArray;
};

export const ModalItem = ({items}: Props) => (
	<Card className='border-[#306DDD]'>
		<CardContent className='grid gap-4 place-items-center p-8 py-10'>
			<div className=''>
				<svg xmlns='http://www.w3.org/2000/svg' width={73} height={72} fill='none'>
					<circle cx={36.5} cy={36} r={36} fill='#306DDD' fillOpacity={0.1} />
					<path
						stroke='#5F96E0'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={1.733}
						d='M27.287 35.988V29.92a9.066 9.066 0 0 1 9.229-8.928 9.068 9.068 0 0 1 9.228 8.928v6.068'
					/>
					<path
						fill='#5F96E0'
						stroke='#5F96E0'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={1.733}
						d='M23.827 32.525h2.307a1.153 1.153 0 0 1 1.153 1.154V40.6a1.153 1.153 0 0 1-1.153 1.154h-2.307a2.307 2.307 0 0 1-2.308-2.307v-4.614a2.307 2.307 0 0 1 2.308-2.308Zm25.378 9.229h-2.308a1.154 1.154 0 0 1-1.153-1.154v-6.92a1.154 1.154 0 0 1 1.153-1.154h2.308a2.307 2.307 0 0 1 2.307 2.308v4.614a2.308 2.308 0 0 1-2.307 2.307Z'
					/>
					<path
						stroke='#5F96E0'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={1.733}
						d='M41.107 48.094a4.614 4.614 0 0 0 4.615-4.614v-5.19'
					/>
					<path
						fill='#5F96E0'
						stroke='#5F96E0'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={1.733}
						d='M41.148 48.11a2.884 2.884 0 0 1-2.883 2.884h-3.461a2.884 2.884 0 1 1 0-5.767h3.46a2.884 2.884 0 0 1 2.884 2.884Z'
					/>
				</svg>
			</div>

			<div className='text-center'>
				<h4 className='text-graydark font-semibold text-base lg:text-lg'>
					{DateTime.fromJSDate(new Date(items.date)).toFormat('dd MMMM, yyyy')}
				</h4>
				<div className='text-graydark text-sm lg:text-base capitalize font-normal'>Stock date</div>
			</div>
			<div>
				<p className='text-graydark font-semibold text-sm capitalize'>{items.volume}</p>
				<div className='capitalize text-graydark font-normal text-sm'>volume</div>
			</div>

			<div className='text-sm font-normal text-muted flex gap-1'>
				<p className='text-graydark'>
					{items.open} - {items.close}
				</p>
				<span>|</span>
				<span className='text-graydark text-sm'>Open - Close</span>
			</div>
		</CardContent>
	</Card>
);
