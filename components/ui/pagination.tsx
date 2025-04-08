import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	showMaxPages: number;
	changePage: (page: number) => void;
}

export const Pagination = ({
	currentPage,
	totalPages,
	showMaxPages,
	changePage,
}: PaginationProps) => {
	const paginationNumbers = [];

	for (let index = 1; index <= showMaxPages; index++) {
		paginationNumbers.push(index);
	}

	return (
		<section className="flex justify-center gap-1 text-zinc-900 dark:text-zinc-200">
			<button
				onClick={() => changePage(currentPage - 1)}
				disabled={currentPage === 1}
				className="grid size-8 place-content-center rounded border border-zinc-200 transition-colors hover:bg-zinc-50 hover:text-zinc-700 rtl:rotate-180"
				aria-label="Previous page">
				<FontAwesomeIcon icon={faChevronLeft} size="sm" />
			</button>

			{paginationNumbers.map((page) => {
				if (page === currentPage) {
					return (
						<button
							key={`pageButton${page}`}
							className="block size-8 rounded border border-primary bg-primary text-center text-sm/8 font-medium text-white">
							{currentPage}
						</button>
					);
				}
				return (
					<button
						key={`pageButton${page}`}
						onClick={() => changePage(page)}
						className="block size-8 rounded border border-zinc-200 text-center text-sm/8 font-medium transition-colors hover:bg-zinc-50 hover:text-zinc-700">
						{page}
					</button>
				);
			})}

			<button
				onClick={() => changePage(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="grid size-8 place-content-center rounded border border-zinc-200 transition-colors hover:bg-zinc-50 hover:text-zinc-700 rtl:rotate-180"
				aria-label="Next page">
				<FontAwesomeIcon icon={faChevronRight} size="sm" />
			</button>
		</section>
	);
};
