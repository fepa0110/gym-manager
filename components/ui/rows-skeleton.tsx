interface TableSkeletonProps{
	cols: number;
	rows: number;
}

export const RowsSkeleton = () => {
	return (
		<div
			role="status"
			className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse duration-750 dark:divide-gray-700 md:p-6 dark:border-gray-700">
			<div className="flex items-center justify-between">
				<div>
					<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
				</div>
				<div>
					<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
				</div>
				<div>
					<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
				</div>
				<div>
					<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
				</div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
			</div>
			
			<div className="flex items-center justify-between">
				<div>
					<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
				</div>
				<div>
					<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
				</div>
				<div>
					<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
				</div>
				<div>
					<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
				</div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
			</div>
		</div>
	);
};
