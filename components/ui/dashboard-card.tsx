import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountUp from "./count-up";

interface DashboardCardProps {
	title: string;
	data: number;
}

export const DashboardCard = ({ title, data }: DashboardCardProps) => {
	return (
		<article className="flex flex-row min-w-64 justify-center items-center gap-4 rounded-sm border border-red-300 bg-background p-6 dark:border-zinc-700 dark:bg-zinc-800/40">
			<span className="flex items-center justify-center rounded-full p-3 text-red-500 w-12 h-12 bg-red-300/50 dark:bg-red-500/20 dark:text-red-400">
				<FontAwesomeIcon icon={faReceipt} size="xl" />
			</span>

			<div>
				<p className="text-3xl font-medium text-zinc-900 dark:text-white">
					<CountUp
						from={0}
						to={data}
						separator=","
						direction="up"
						duration={2}
						className="count-up-text"
					/>
				</p>

				<p className="text-xs uppercase text-zinc-500 dark:text-zinc-400">{title}</p>
			</div>
		</article>
	);
};
