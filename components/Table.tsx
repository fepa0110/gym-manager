/* interface TableProps {
	// rows: typeof Column
}

interface ColumnProps {
	name: string;
}

interface RowProps {
	value: string;
}

export default function TableRoot() {
	return (
		<table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-400 bg-background text-sm"></table>
	);
}

export const TableHead = () => {
	return (
		<thead className="ltr:text-left rtl:text-right">
			<tr>
				<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
					Fecha
				</th>
				<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
					Precio
				</th>
				<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
					Abonada
				</th>
			</tr>
		</thead>
	);
};

export const TableBody = () => {
	return (
		<tbody className="divide-y divide-gray-200">
			{cuotasCliente?.map((cuota) => {
				return (
					<tr key={`clientrow${cuota.id}`}>
						<td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-slate-100">
							{cuota.fecha_creacion}
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
							{cuota.precio}
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
							{cuota.abonada.toString()}
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};

export const Column = ({ name }: ColumnProps) => {
	return (
		<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
			{name}
		</th>
	);
};

export const Row = ({ value }: RowProps) => {
	return (
		<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
			{value}
		</td>
	);
};

export const Table = {
	Column: Column,
	Row: Row,
};
 */