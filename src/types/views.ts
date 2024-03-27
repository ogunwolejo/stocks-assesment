import type {StockArray} from '@/types/fetch.stock';

export type PagesProps = {
	result: StockArray[];
	fetching: 'done' | 'fetching';
	errorMsg: string;
};
