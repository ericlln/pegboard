import moment from 'moment';
import Tracker from './Tracker';
import { useState } from 'react';
import HabitModal from './HabitModal';

export default function Habit({ id, habit, days, startdate, getHabits }) {
	const [modal, setModal] = useState(false);

	const [daysCounter, setDaysCounter] = useState(days);
	const [date, setDate] = useState(startdate);

	const getDaysSinceStart = () => {
		const daysSinceStart = moment(moment()).diff(startdate, 'days');
		if (daysSinceStart < 0) {
			return 'Not Started Yet';
		} else {
			return daysSinceStart;
		}
	};

	return (
		<div>
			<div className="grid grid-cols-1 gap-2 mt-1">
				<button
					onClick={() => {
						setModal(true);
					}}
					className="text-left col-start-1 box-content bg-ash-gray mb-4 rounded-lg px-3 py-1.5 hover:text-off-white hover:bg-viridian transition hover:-translate-y-1 ease-in duration-150"
				>
					<h1 className="	text-decoration-line: underline">{habit}</h1>
					<h1 className='font-medium'>
						{typeof getDaysSinceStart() === 'string' ? getDaysSinceStart() : `Days Since Start: ${getDaysSinceStart()}`}
					</h1>
				</button>
				<div className="col-start-3">
					<Tracker id={id} daysCounter={daysCounter} setDaysCounter={setDaysCounter} daysSinceStart={getDaysSinceStart()} />
				</div>
			</div>
			{modal && (
				<HabitModal
					action="edit"
					id={id}
					habit={habit}
					days={daysCounter}
					date={date}
					setDate={setDate}
					setDaysCounter={setDaysCounter}
					daysSinceStart={getDaysSinceStart()}
					setModal={setModal}
					getHabits={getHabits}
				>
					Edit Existing Habit
				</HabitModal>
			)}
		</div>
	);
}
