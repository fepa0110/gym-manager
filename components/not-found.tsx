import { faSadTear } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NotFoundProps {
	message: string;
}

export const NotFound = ({ message }: NotFoundProps) => {
	return (
		<section className="flex flex-col w-full justify-center items-center">
			<FontAwesomeIcon icon={faSadTear} size="2x" />
			<h1 className="py-3 text-lg text-zinc-800 dark:text-zinc-100">
				{message}
			</h1>
		</section>
	);
};
