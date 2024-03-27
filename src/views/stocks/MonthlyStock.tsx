import React, {type ReactNode, useDeferredValue, useMemo, useRef, useState} from 'react';
import {useStock} from '@/hooks/useStock';
import {StockFetchType} from '@/types/fetch.stock';
import {Dialog, DialogTrigger} from '@/component/ui/atoms/dialog';
import {Paginate} from '@/component/ui/molecules/paginate';
import Modal from '@/views/stocks/components/modal';
import {ModalItem} from '@/views/stocks/components/modalItem';
import {Input} from '@/component/ui/atoms/input';
import Loader from '@/component/ui/atoms/Loader';
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import Alert from '@/component/ui/atoms/alert';

const MonthlyStock = () => {
	const [searchText, setSearchText] = useState<string>('ibm');
	const deferredSearchText: string = useDeferredValue(searchText);
	const inputRef = useRef<HTMLInputElement>(null);
	const stockResult = useStock({
		symbol: deferredSearchText,
		type: StockFetchType.MONTHLY,
		adjustable: false,
	});

	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = useMemo(() => 18, []);
	const totalPages = useMemo(() => Math.ceil(stockResult.stockData.length / itemsPerPage), []);
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			if (inputRef.current !== null) {
				setSearchText(inputRef.current.value);
			}
		}
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
						<Modal id={idx.toString()} items={el} key={idx}>
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
			{tabs.length > 0 ? (
				<div className='flex flex-col flex-1'>
					<div className='flex flex-1 py-6 px-4'>
						<main className='sm:px-6 lg:px-8'>
							<div className='flex mb-4 justify-start'>
								<div className='relative'>
									<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
										<MagnifyingGlassIcon className='h-5 w-5 text-form-stroke' aria-hidden='true' />
									</div>
									<Input
										id='search'
										type='text'
										className='block w-full h-11 rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-body-text ring-1 ring-inset ring-form-stroke placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										placeholder='search company stock'
										ref={inputRef}
										// OnChange={handleSearchChange}
										onKeyDown={handleSearchKeyDown}
									/>
								</div>
							</div>
							<div className='mt-2'>
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
			) : (
				<div className='flex flex-col flex-1 justify-center text-center'>
					<div className='font-base text-graydark font-bold'> No stock was found </div>
				</div>
			)}
			{stockResult.errorMsg.length > 0 && <Alert message={'Unable to fetch API'} />}
		</>
	);
};

export default MonthlyStock;
