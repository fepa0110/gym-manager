import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DashboardCardProps {
	title: string;
	data: string;
}

export const DashboardCard = ({ title, data }: DashboardCardProps) => {
	return (
		<article className="flex items-center gap-4 rounded-lg border border-red-300 bg-background p-6 dark:border-zinc-700 dark:bg-zinc-800/40">
			<span className="flex items-center justify-center rounded-full p-3 text-red-500 w-12 h-12 bg-red-300/50 dark:bg-red-500/20 dark:text-red-400">
				<FontAwesomeIcon icon={faReceipt} size="xl" />
			</span>

			<div>
				<p className="text-2xl font-medium text-zinc-900 dark:text-white">
					{data}
				</p>

				<p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
			</div>
		</article>
	);
};
