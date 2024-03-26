import {PagesProps} from '@/types/views';

export enum StockFetchType {
	DAILY = 'DAILY',
	WEEKLY = 'WEEKLY',
	MONTHLY = 'MONTHLY',
}

export type FetchStock = {
	type: StockFetchType;
	adjustable: boolean;
	symbol: string;
	set: PagesProps;
};

export type StockData = {
	'1. open': string;
	'2. high': string;
	'3. low': string;
	'4. close': string;
	'5. volume': string;
};

export type StockArray = {
	date: string;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
};
