import { useRecoilState, useSetRecoilState } from 'recoil';
import { timeState, timerState, pauseState, threeButtonState } from '../atoms';

export default function TimerButton({ id, label, value }) {
	const setTimeState = useSetRecoilState(timeState);
	const setTimerState = useSetRecoilState(timerState);
	const setPause = useSetRecoilState(pauseState);
	const [threeButton, setThreeButton] = useRecoilState(threeButtonState)

	const clickHandler = (e) => {
		e.preventDefault()
		setTimeState(value);
		setTimerState(value);
		setPause(true);
		setThreeButton(parseInt(e.currentTarget.id))
	};

	return (
		<div>
			<button
				id={id}
				type="button"
				className={`text-off-white border-gunmetal bg-viridian shadow-lg shadow-viridian/50 hover:bg-ash-gray ${id === threeButton ? "ring-2 ring-gunmetal": "border-none"} ease-in duration-150 focus:font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
				onClick={clickHandler}
			>
				<div>{label}</div>
			</button>
		</div>
	);
}
