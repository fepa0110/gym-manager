import { ReactNode } from "react";

type TableRootProps = {
	children: ReactNode;
};

type TableProps = {
	children: ReactNode;
};

type RowProps = {
	children: ReactNode;
	key?: string;
};

interface ColumnProps {
	name: string;
}

interface DataRowProps {
	value: string;
}

const TableRoot = ({ children }: TableRootProps) => {
	return (
		<div className="relative overflow-x-auto">
			<table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-400 bg-background text-sm">
				{children}
			</table>
		</div>
	);
};

const TableHead = ({ children }: TableProps) : ReactNode => {
	return (
		<thead className="ltr:text-left rtl:text-right">
			<tr>{children}</tr>
		</thead>
	);
};

const TableBody = ({ children }: TableProps) => {
	return <tbody className="divide-y divide-gray-200">{children}</tbody>;
};

export const Column = ({ name }: ColumnProps) => {
	return (
		<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
			{name}
		</th>
	);
};

export const Row = ({ children, key }: RowProps) => {
	return (
		<tr key={key} className="text-center">
			{children}
		</tr>
	);
};

export const RowData = ({ value }: DataRowProps) => {
	return (
		<td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-slate-100">
			{value}
		</td>
	);
};

export const RowComponent = ({ children }: TableProps) => {
	return (
		<td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-slate-100">
			{children}
		</td>
	);
};

export const Table = {
	Root: TableRoot,
	Head: TableHead,
	Body: TableBody,
	Column: Column,
	Row: Row,
	RowData: RowData,
	RowComponent: RowComponent
};
