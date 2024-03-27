import React, {type JSX, memo} from 'react';
import {
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
	Pagination,
} from '@/component/ui/atoms/pagination';

type Props = {
	totalPages: number;
	handlePageChange: (arg: number) => void;
	currentPage: number;
};

export const Paginate = memo(({totalPages, handlePageChange, currentPage}: Props) => {
	const renderPaginationLinks = (): JSX.Element => {
		const links = [];
		for (let i = 1; i <= totalPages; i++) {
			links.push(
				<PaginationItem key={i}>
					<PaginationLink
						href='#'
						onClick={() => {
							handlePageChange(i);
						}}
					>
						{i}
					</PaginationLink>
				</PaginationItem>,
			);
		}

		// @ts-expect-error
		return links;
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href='#'
						onClick={() => {
							handlePageChange(currentPage - 1);
						}}
					/>
				</PaginationItem>
				{renderPaginationLinks()}
				<PaginationItem>
					<PaginationNext
						href='#'
						onClick={() => {
							handlePageChange(currentPage + 1);
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
});

Paginate.displayName = 'Paginate';
