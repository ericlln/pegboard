import { Modal, ToggleSwitch } from 'flowbite-react';
import { useState } from 'react';
import { Label } from 'flowbite-react';
import FormTextInput from './FormTextInput';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Datepicker from 'react-tailwindcss-datepicker';
import moment from 'moment';

export default function TodoModal({ id, task, completed, action, deadline, children, setModal, dateAdded, getTodos }) {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [date, setDate] = useState(deadline);
	const [dateChanged, setDateChanged] = useState(false);
	const [taskName, setTaskName] = useState(task);
	const [done, setDone] = useState(completed);
	const [loading, setLoading] = useState(false);

	const convertDate = (fullDate) => {
		const dateObject = moment(fullDate);
		return dateObject._i;
	};

	async function addTodos() {
		try {
			setLoading(true);
			let { error } = await supabase.from('todos').insert({
				task: `${taskName}`,
				is_complete: false,
				deadline: `${dateChanged ? date.startDate : moment(new Date()).format('YYYY-MM-DD')}`,
				user_id: user.id,
			});
			if (error) throw error;
			getTodos();
		} catch (error) {
			alert('Error adding Task!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	async function deleteTodos() {
		try {
			setLoading(true);
			let { error } = await supabase.from('todos').delete().eq('id', BigInt(id));
			if (error) throw error;
			getTodos();
		} catch (error) {
			alert('Error deleting Task!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	async function editTodos() {
		try {
			setLoading(true);
			let { error } = await supabase
				.from('todos')
				.update({
					task: `${taskName}`,
					is_complete: `${done}`,
					deadline: `${dateChanged ? date.startDate : convertDate(date)}`,
					user_id: user.id,
				})
				.eq('id', BigInt(id));
			if (error) throw error;
			getTodos();
		} catch (error) {
			alert('Error saving Task!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	const handleChange = (newValue) => {
		setTaskName(newValue);
	};

	const handleDateChange = (newValue) => {
		setDate(newValue);
		setDateChanged(true);
	};

	const onSave = () => {
		if (taskName) {
			if (taskName.length > 3) {
				switch (action) {
					case 'add':
						addTodos();
						setModal(false);
						break;
					case 'edit':
						editTodos();
						setModal(false);
						break;
				}
			} else {
				alert('The task name must be at least four characters.');
			}
		} else {
			alert('Please enter a valid task name.');
		}
	};

	return (
		<Modal show={true} onClose={() => setModal(false)}>
			<Modal.Header>{children}</Modal.Header>
			<Modal.Body>
				<div className="space-y-6">
					{action !== 'add' && (
						<ToggleSwitch
							color="green"
							checked={done}
							label="Completed?"
							onChange={() => {
								setDone(!done);
							}}
						/>
					)}
					<div className="mb-2 block">
						<FormTextInput
							id="taskName"
							label="Task"
							value={taskName}
							placeholder="What do you want to achieve?"
							required={true}
							handleChange={handleChange}
						/>
					</div>
					{action !== 'add' && <FormTextInput label="Date Added" value={dateAdded} required={false} disabled={true} />}
					<div className="mb-2 block">
						<Label value="Deadline" className="mb-1" />
						<Datepicker
							asSingle={true}
							placeholder={deadline ? deadline : moment(new Date()).format('YYYY-MM-DD')}
							value={date}
							onChange={handleDateChange}
						/>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className="flex">
					<div className="">
						<button className="bg-gunmetal text-off-white px-5 py-2 rounded-md text-sm mr-4 hover:bg-[#45B69C] ease-in duration-150" onClick={onSave}>
							Save
						</button>
					</div>
					<div className="">
						{action !== 'add' && (
							<button
								className="ring-2 ring-gunmetal text-gunmetal px-4 py-2 rounded-md text-sm hover:bg-[#DA344D] hover:ring-0 hover:text-off-white ease-in duration-150"
								onClick={() => deleteTodos()}
							>
								Delete Task
							</button>
						)}
					</div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
