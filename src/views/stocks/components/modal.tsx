import React, {memo} from 'react';
import {Button} from '@/component/ui/atoms/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from '@/component/ui/atoms/dialog';
import type {StockArray} from '@/types/fetch.stock';
import {DateTime} from 'luxon';

type Props = {
	id?: string;
	children: React.ReactNode;
	items: StockArray;
};

const Modal = memo(({id, children, items}: Props) => {
	return (
		<>
			<Dialog
				key={id}
				onOpenChange={(open) => {
					if (!open) {
						// SetContent('details');
					}
				}}
			>
				<DialogTrigger>{children}</DialogTrigger>
				<DialogContent className={`max-w-[687px] max-w-lg`}>
					<>
						<DialogHeader className='pt-6'>
							<div className='flex gap-3 items-center mb-4'>
								<span className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#8544B81A]'>
									<span className='text-sm font-bold leading-none text-[#8544B8] uppercase'>S</span>
								</span>
								<DialogTitle className='text-base font-semibold capitalize'>
									{DateTime.fromJSDate(new Date(items.date)).toFormat('dd MMMM, yyyy')}
								</DialogTitle>
							</div>
							<hr className='border-muted-light' />
						</DialogHeader>
						<DialogDescription className='mb-12'>
							<h4 className='font-semibold mb-4'>Stock brief</h4>
							<p className='text-muted mb-6'>
								Dear customer, the data shows a comprehensive description of the stock that o a certain company which
								you have searched for. We ensure to make available the volume of stock traded, also the highest and
								lowest traded, this is to ensure transparency to the public{' '}
							</p>

							<h4 className='font-semibold mb-4'>Stock details</h4>
							<p className='text-muted'>
								Stock volume: <span className='text-graydark capitalize'>{items.volume}</span>
							</p>
							<p className='text-muted'>
								Stock highest: <span className='text-graydark capitalize'>{items.high}</span>
							</p>
							<p className='text-muted'>
								Stock lowest: <span className='text-graydark capitalize'>{items.low}</span>
							</p>
							<div className='flex gap-3 text-muted mb-6'>
								<p>
									{items.open} - {items.close}
								</p>
								<span>|</span>
								<p>Open - Close</p>
							</div>
						</DialogDescription>

						<DialogFooter>
							<div className='flex flex-col mb-8'>
								<DialogClose asChild>
									<Button variant={'link'}>Back to previous page</Button>
								</DialogClose>
							</div>
						</DialogFooter>
					</>
				</DialogContent>
			</Dialog>
		</>
	);
});

export default Modal;
Modal.displayName = 'Modal';
