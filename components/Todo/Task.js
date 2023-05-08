import { useState } from 'react';
import TodoModal from './TodoModal';
import moment from 'moment';

export default function Task({ id, task, completed, dateAdded, deadline, getTodos }) {
	const [modal, setModal] = useState(false);

	const getremainingDays = () => {
		const remainingDays = moment(deadline).diff(moment(), 'days');
		if (remainingDays < 0) return '!!!';
		else if (remainingDays > 99) return '99+';
		else return remainingDays;
	};

	return (
		<div>
			<div className="inline-flex w-8 h-8 rounded-lg ring-2 ring-gray-400 ml-1 mr-5 justify-center">
				<h1 className="text-center mt-1">{getremainingDays()}</h1>
			</div>
			<button
				class="box-content bg-ash-gray mb-4 rounded-lg px-3 py-1.5 hover:text-off-white hover:bg-viridian transition hover:-translate-y-1 ease-in duration-150"
				onClick={() => setModal(true)}
			>
				<div class="inline-flex">
					<h1 className="">{task}</h1>
				</div>
			</button>
			<div class={`float-right mr-2 mt-3 w-4 h-4 ${completed ? 'bg-[#45B69C]' : 'bg-[#DA344D]'} rounded-full`}></div>
			{modal && (
				<TodoModal
					action="edit"
					setModal={setModal}
					id={id}
					task={task}
					completed={completed}
					dateAdded={dateAdded}
					deadline={deadline}
					getTodos={getTodos}
				>
					Edit Existing Task
				</TodoModal>
			)}
		</div>
	);
}
