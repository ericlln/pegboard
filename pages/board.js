import Todo from '../components/Todo/Todo';
import Taskbar from '@/components/Taskbar';
import TitleBar from '@/components/TitleBar';
import Pomodoro from '@/components/Pomodoro/Pomodoro';
import Habits from '@/components/Habits/Habits';

export default function Board() {
	return (
		<div>
			<div className="container max-w-full p-8">
				<TitleBar title="Board"></TitleBar>
				<div className="mb-20 grid gap-6 grid-cols-1 grid-rows-3 grid-flow-col lg:gap-6 lg:grid-cols-3 lg:grid-rows-1 lg:grid-flow-row">
					<div className="lg:col-span-1">
						<Pomodoro />
					</div>
					<div className="lg:col-span-1">
						<Todo />
					</div>
					<div className="lg:col-span-1">
						<Habits />
					</div>
				</div>
				<Taskbar />
			</div>
		</div>
	);
}
