import React, {ReactNode, useMemo, useState} from 'react';
import {useStock} from '@/hooks/useStock';
import {StockFetchType} from '@/types/fetch.stock';
import Loader from '@/component/ui/atoms/Loader';
import Modal from '@/views/stocks/components/modal';
import {ModalItem} from '@/views/stocks/components/modalItem';
import {Paginate} from '@/component/ui/molecules/paginate';
import {DialogTrigger, Dialog} from '@/component/ui/atoms/dialog';
import Datepicker from '@/component/ui/atoms/datepicker';
import {type PagesProps} from '@/types/views';
import {useToast} from '@/component/ui/atoms/use-toast';

const DailyStock = ({setLoading, result}: PagesProps) => {
	if (!result) {
		return <> Not Found!! </>;
	}

	let stockResult = result;
	if (result.stockData.length === 0) {
		stockResult = useStock({
			symbol: 'ibm',
			type: StockFetchType.DAILY,
			adjustable: true,
			set: {
				setLoading,
			},
		});
	}

	const {toast} = useToast();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = useMemo(() => 18, []);
	const totalPages = useMemo(() => Math.ceil(stockResult.stockData.length / itemsPerPage), []);
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const data = stockResult.stockData;
	const tabs: Array<{
		current: boolean;
		element: ReactNode;
	}> = [
		{
			current: false,
			element: (
				<div className='bg-transparent grid grid-cols-1 md:grid-cols-2  gap-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-6 xl:gap-2'>
					{data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((el, idx: number) => (
						<Modal id={idx.toString()} items={el}>
							<ModalItem key={idx.toString()} items={el} />
						</Modal>
					))}
				</div>
			),
		},
	];

	if (stockResult.fetching === 'fetching') {
		return <Loader />;
	}

	return (
		<>
			<div className='flex flex-col flex-1'>
				<div className='mx-auto flex flex-1 py-6 px-4'>
					<main className='sm:px-6 lg:px-8'>
						<div className='flex mb-4 justify-between'>
							<div></div>
							<Datepicker />
						</div>
						<div className=''>
							<Dialog>
								<div className=''>
									{tabs.map((tab, idx: number) => (
										<DialogTrigger key={idx} value={`${idx}`}>
											{tab.element}
										</DialogTrigger>
									))}
								</div>
							</Dialog>
						</div>
					</main>
				</div>
				<Paginate handlePageChange={handlePageChange} totalPages={totalPages} currentPage={currentPage} />
			</div>
		</>
	);
};

export default DailyStock;
