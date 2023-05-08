import { useRecoilValue } from 'recoil';
import { pauseState } from '../atoms';

export default function ProgressBar({seconds, length}) {
	const pause = useRecoilValue(pauseState);
	const percentage = (seconds / length) * 100;

	return (
		<div className="w-full lg:w-3/4 bg-gray-200 rounded-full h-3.5 dark:bg-gray-700">
			<div
				className={`bg-viridian h-3.5 rounded-full ${pause ? null : 'animate-pulse'} ease-linear duration-500`}
				style={{ width: `${percentage}%` }}
			></div>
		</div>
	);
}
