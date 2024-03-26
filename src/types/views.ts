import {Dispatch, SetStateAction} from 'react';
import type {StockArray} from '@/types/fetch.stock';

export type PagesProps = {
	setLoading: Dispatch<SetStateAction<boolean>>;
	result?: ResultProps | undefined;
};

type ResultProps = {
	stockData: StockArray[];
	errorMessage: string;
	fetching: string;
};
