import { useRecoilState } from 'recoil';
import { pauseState } from '../atoms';

export default function Time({ seconds }) {
	const [pause, setPause] = useRecoilState(pauseState);

	const m = Math.floor(seconds / 60);
	const s = seconds - m * 60;

	const displayMinutes = m < 10 ? `0${m}` : m;
	const displaySeconds = s < 10 ? `0${s}` : s;

	const clickHandler = () => {
		pause ? setPause(false) : setPause(true);
	};

	return (
		<div className="mb-4">
			<button
				type="button"
				className="text-gunmetal bg-ash-gray hover:scale-105 transition font-medium rounded-full text-sm px-16 py-8 text-center inline-flex items-center"
				onClick={clickHandler}
			>
				<div className="text-4xl">{displayMinutes} </div>
				{pause === false ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						viewBox="0 96 960 960"
						width="48"
						className="mx-1 fill-gunmetal ease-in duration-300"
					>
						<path d="M326.154 896h307.692V776q0-66.769-44.308-115.693Q545.231 611.384 480 611.384t-109.538 48.923Q326.154 709.231 326.154 776v120Zm-142.306 59.999V896h82.308V776q0-65.231 33.5-119.885 33.5-54.654 91.424-80.115-57.924-25.461-91.424-80.115-33.5-54.654-33.5-119.885V256h-82.308v-59.999h592.304V256h-82.308v120q0 65.231-33.5 119.885-33.5 54.654-91.424 80.115 57.924 25.461 91.424 80.115 33.5 54.654 33.5 119.885v120h82.308v59.999H183.848Z" />
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						viewBox="0 96 960 960"
						width="48"
						className="mx-1 fill-gunmetal ease-in duration-300"
					>
						<path d="M480 540.616q65.231 0 109.538-48.923Q633.846 442.769 633.846 376V256H326.154v120q0 66.769 44.308 115.693Q414.769 540.616 480 540.616ZM183.848 955.999V896h82.308V776q0-65.231 33.5-119.885 33.5-54.654 91.424-80.115-57.924-25.461-91.424-80.115-33.5-54.654-33.5-119.885V256h-82.308v-59.999h592.304V256h-82.308v120q0 65.231-33.5 119.885-33.5 54.654-91.424 80.115 57.924 25.461 91.424 80.115 33.5 54.654 33.5 119.885v120h82.308v59.999H183.848Z" />
					</svg>
				)}
				<div className="text-4xl">{displaySeconds}</div>
			</button>
		</div>
	);
}
