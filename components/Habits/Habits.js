import Card from '../Card';
import SortDropdown from '../Todo/SortDropdown';
import { useState, useEffect } from 'react';
import HabitModal from './HabitModal';
import Habit from './Habit';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export default function Habits() {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [modal, setModal] = useState(false);
	const [habits, setHabits] = useState(null);
	const [date, setDate] = useState('undefined');
	const [sort, setSort] = useState('Date Started');
	const [loading, setLoading] = useState(false);

	const sortHabits = (data) => {
		if (sort === 'Date Started') {
			const sorted = [...data].sort((a, b) => new Date(a.startdate) - new Date(b.startdate));
			setHabits(sorted);
		}
	};

	async function getHabits() {
		try {
			setLoading(true);
			let { data, error, status } = await supabase
				.from('habits')
				.select(`id, habit, days, startdate`)
				.eq('user_id', user.id);
			if (error && status !== 406) {
				throw error;
			}
			if (data) {
				setHabits(data);
				sortHabits(data);
			}
		} catch (error) {
			alert('Error loading user data!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (user) {
			getHabits();
		}
	}, [user, sort]);

	return (
		<div>
			<Card title="Habit Tracker">
				<div className="grid grid-cols-1 gap-1 grid-flow-row mb-4 justify-end">
					<button
						onClick={() => setModal(true)}
						className="p-2 text-off-white border-gunmetal bg-viridian shadow-lg shadow-viridian/50 hover:bg-ash-gray font-medium rounded-lg text-sm text-center mr-2 mb-2"
					>
						Add Habit
					</button>
				</div>
				<div>
					{habits &&
						habits.map((habit) => (
							<Habit
								key={habit.id}
								id={habit.id}
								habit={habit.habit}
								days={habit.days}
								startdate={habit.startdate}
								getHabits={getHabits}
							/>
						))}
				</div>
			</Card>
			{modal && (
				<HabitModal action="add" date={date} setDate={setDate} setModal={setModal} getHabits={getHabits}>
					Add a New Habit
				</HabitModal>
			)}
		</div>
	);
}
