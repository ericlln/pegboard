import { Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Label } from 'flowbite-react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Datepicker from 'react-tailwindcss-datepicker';
import moment from 'moment';
import HabitInput from './HabitInput';

export default function HabitModal({
	id,
	days,
	setDaysCounter,
	date,
	setDate,
	habit,
	daysSinceStart,
	action,
	children,
	setModal,
	getHabits,
}) {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [loading, setLoading] = useState(false);

	const [habitName, setHabitName] = useState(habit);

	const [dateChanged, setDateChanged] = useState(false);


	const handleChange = (newValue) => {
		setHabitName(newValue);
	};


	async function addHabit() {
		try {
			setLoading(true);
			let { error } = await supabase.from('habits').insert({
				habit: `${habitName}`,
				startdate: `${dateChanged ? date.startDate : moment().format('YYYY-MM-DD')}`,
				user_id: user.id,
			});
			getHabits();
			if (error) throw error;
		} catch (error) {
			alert('Error adding Task!');
			console.log(error);
		} finally {
			setLoading(false);
			setModal(false);
		}
	}

	async function editHabit() {
		try {
			setLoading(true);
			let { error } = await supabase
				.from('habits')
				.update({
					habit: habitName,
					days: days,
					startdate: date.startDate,
					user_id: user.id,
				})
				.eq('id', BigInt(id));
			if (error) throw error;
			getHabits();
		} catch (error) {
			alert('Error saving Task!');
			console.log(error);
		} finally {
			setLoading(false);
			setModal(false);
		}
	}

	async function deleteHabit() {
		try {
			setLoading(true);
			let { error } = await supabase.from('habits').delete().eq('id', BigInt(id));
			if (error) throw error;
			getHabits();
		} catch (error) {
			alert('Error deleting Task!');
			console.log(error);
		} finally {
			setLoading(false);
			setModal(false);
		}
	}

	const onSave = () => {
		if (habitName) {
			if (habitName.length > 3) {
				switch (action) {
					case 'add':
						addHabit();
						setModal(false);
						break;
					case 'edit':
						editHabit();
						setModal(false);
						break;
				}
			} else {
				alert('The habit name must be at least four characters.');
			}
		} else {
			alert('Please enter a habit task name.');
		}
	};

	const handleDateChange = (newValue) => {
		setDate(newValue);
		setDateChanged(true);
	};

	return (
		<Modal show={true} onClose={() => setModal(false)}>
			<Modal.Header>{children}</Modal.Header>
			<Modal.Body>
				<div className="space-y-6">
					<div className="mb-2 block">
						<HabitInput label="Habit" type="name" placeholder="Enter a habit..." value={habit} handleChange={handleChange} />
					</div>
					<div className="mb-2 block">
						<Label value="Start Date" className="mb-1" />
						<Datepicker asSingle={true} placeholder={action === 'add' ? moment().format('YYYY-MM-DD') : date} value={date} onChange={handleDateChange} />
					</div>
					<div className="mb-2 block">
						{action !== 'add' && <HabitInput label="Days Completed" value={days} handleChange={setDaysCounter} />}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className="flex">
					<div className="">
						<button
							className="bg-gunmetal text-off-white px-5 py-2 rounded-md text-sm mr-4 hover:bg-[#45B69C] ease-in duration-150"
							onClick={onSave}
						>
							Save
						</button>
					</div>
					<div className="">
						{action !== 'add' && (
							<button
								className="ring-2 ring-gunmetal text-gunmetal px-4 py-2 rounded-md text-sm hover:bg-[#DA344D] hover:ring-0 hover:text-off-white ease-in duration-150"
								onClick={() => deleteHabit()}
							>
								Delete Habit
							</button>
						)}
					</div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
