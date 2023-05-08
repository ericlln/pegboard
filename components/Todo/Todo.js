import Card from '../Card';
import Task from './Task';
import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import TodoModal from './TodoModal';
import SortDropdown from './SortDropdown';

export default function Todo() {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [loading, setLoading] = useState(false);
	const [todos, setTodos] = useState(null);
	const [modal, setModal] = useState(false);
	const [sort, setSort] = useState(null);

	useEffect(() => {
		if (user) {
			getTodos();
		}
	}, [user, sort]);

	async function getTodos() {
		try {
			setLoading(true);
			let { data, error, status } = await supabase
				.from('todos')
				.select(`id, task, is_complete, inserted_at, deadline`)
				.eq('user_id', user.id);
			if (error && status !== 406) {
				throw error;
			}
			if (data) {
				setTodos(data);
				sortTodos(data);
			}
		} catch (error) {
			alert('Error loading user data!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	const sortTodos = (data) => {
		if (sort === "Alphabetical") {
			const sorted = [...data].sort((a, b) => a.task.toLowerCase().localeCompare(b.task.toLowerCase()));
			setTodos(sorted);
		} else if (sort === "Completion") {
			const sorted = [...data].sort((a, b) => b.is_complete - a.is_complete);
			setTodos(sorted);
		} else if (sort === "Deadline") {
			const sorted = [...data].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
			setTodos(sorted);
		}
	};

	return (
		<div>
			<Card title="To-do">
				<div className="grid grid-cols-1 gap-1 grid-flow-row mb-4 justify-end">
					<button
						onClick={() => setModal(true)}
						className="col-start-1 text-off-white border-gunmetal bg-viridian shadow-lg shadow-viridian/50 hover:bg-ash-gray font-medium rounded-lg text-sm text-center mr-2 mb-2"
					>
						Add Task
					</button>
					<div className="col-start-3">
						<SortDropdown setSort={setSort} options={["Alphabetical", "Completion", "Deadline"]} />
					</div>
				</div>
				<div>
					{todos &&
						todos.map((todo) => (
							<Task
								id={todo.id}
								task={todo.task}
								completed={todo.is_complete}
								deadline={todo.deadline}
								key={todo.id}
								dateAdded={todo.inserted_at.substring(0, 10)}
								getTodos={getTodos}
							/>
						))}
				</div>
			</Card>
			{modal && (
				<TodoModal action="add" setModal={setModal} getTodos={getTodos}>
					Add a New Task
				</TodoModal>
			)}
		</div>
	);
}
