import {useEffect, useState} from 'react';
import useEnvVariables from '@/hooks/env';
import {type FetchStock, type StockArray, type StockData, StockFetchType} from '@/types/fetch.stock';
import {type PagesProps} from '@/types/views';

export const useStock = ({type, symbol, adjustable = false, set}: FetchStock) => {
	const [fetching, setFetching] = useState<'fetching' | 'done'>('fetching');
	const [stockData, setStockData] = useState<StockArray[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const stockUrl = useEnvVariables('REACT_APP_ALPHA_VINTAGE_API');
	const stockKey = useEnvVariables('REACT_APP_ALPHA_VINTAGE_API_KEY');

	useEffect(() => {
		(async () => {
			if (fetching === 'fetching') {
				setFetching('fetching');
			}

			let responseHeader = '';
			switch (type) {
				case StockFetchType.DAILY:
					responseHeader = 'Time Series (Daily)';
					break;
				case StockFetchType.MONTHLY:
					responseHeader = adjustable ? 'Monthly Adjusted Time Series' : 'Monthly Time Series';
					break;
				case StockFetchType.WEEKLY:
					responseHeader = 'Weekly Time Series';
					break;
				default:
					responseHeader = '';
					break;
			}

			try {
				const symbolToUpper = symbol.toUpperCase();
				const stock = await fetch(`${stockUrl}function=TIME_SERIES_${type}&symbol=${symbolToUpper}&apikey=demo`);
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const response = await stock.json();
				const responseData = [];
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				for (const [date, result] of Object.entries(response[responseHeader])) {
					responseData.push({
						date,
						open: (result as StockData)['1. open'],
						high: (result as StockData)['2. high'],
						low: (result as StockData)['3. low'],
						close: (result as StockData)['4. close'],
						volume: (result as StockData)['5. volume'],
					});
				}

				setStockData(responseData);
			} catch (e) {
				setErrorMessage((e as Error).message);
			} finally {
				set.setLoading(false);
				setFetching('done');
			}
		})();

		return () => {
			setErrorMessage('');
		};
	}, [symbol]);

	return {stockData, errorMessage, fetching};
};
