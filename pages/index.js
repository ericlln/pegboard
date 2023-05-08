import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

import Taskbar from '@/components/Taskbar';
import Board from './board';
import CustomAuth from '@/components/CustomAuth';

export default function Home() {
	const session = useSession();
	const supabase = useSupabaseClient();

	return (
		<div>
			{!session ? (
				<div className="px-10 xl:px-40 grid grid-flow-row grid-row-2 lg:grid-flow-row lg:grid-cols-3 lg:grid-rows-3 lg:auto-cols-max lg:auto-rows-max">
					<div className="justify-self-center lg:col-start-1 lg:col-end-2 lg:row-start-2">
						<h1 className="text-viridian text-5xl text-center lg:text-left mt-10 lg:mt-0 mb-4">Pegboard</h1>
						<p className="text-gunmetal text-center lg:text-left font-bold">A minimalist productivity app with: </p>
						<ul className="text-center lg:text-left mt-1 lg:ml-4 lg:list-disc">
							<li>A Pomodoro timer, to-do list, and habit tracker, </li>
							<li>quick and easy sign up, </li>
							<li>cloud sync of tasks and settings, </li>
							<li>full mobile support,</li>
							<li>and more features being added!</li>
						</ul>
					</div>
					<div className="justify-self-center mt-12 lg:mt-0 lg:col-start-3 lg:row-start-2 ">
						<div className="">
							<CustomAuth supabase={supabase} />
						</div>
					</div>
				</div>
			) : (
				<div>
					<Board />
					<Taskbar />
				</div>
			)}
		</div>
	);
}
