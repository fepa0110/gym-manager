interface TableSkeletonProps {
	numColumns: number;
	numRows: number;
}

export const TableSkeleton = ({ numColumns, numRows }: TableSkeletonProps) => {
	let rows: string[] = [];

	for (let index = 0; index <= numRows; index++) {
		rows.push(`${index}`);
	}

	return (
		<tbody className="gap-16">
			{rows.map((row) => {
				return (
					<tr
						// role="status"
						key={`skeleton${row}`}
						className="items-center w-full my-8 space-y-2 rounded-sm shadow-sm animate-pulse duration-1000 dark:divide-gray-700 dark:border-gray-700">
						<td className="place-items-center whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-slate-100">
							<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
						</td>
						<td className="place-items-center whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-slate-100">
							<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
						</td>
						<td className="place-items-center whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-slate-100">
							<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
						</td>
						<td className="place-items-center whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-slate-100">
							<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
						</td>
						<td className="place-items-center whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-slate-100">
							<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};
