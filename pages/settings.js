import Taskbar from '@/components/Taskbar';
import TitleBar from '@/components/TitleBar';
import Account from '@/components/Settings/Account';
import General from '@/components/Settings/General';
import Feedback from '@/components/Settings/Feedback';

export default function Settings() {
	return (
		<div>
			<div className="container max-w-full p-8">
				<TitleBar title="Settings"></TitleBar>
				<div className="mb-20 grid gap-6 grid-cols-1 grid-rows-3 grid-flow-col lg:gap-6 lg:grid-cols-3 lg:grid-rows-1 lg:grid-flow-row">
					<div className="lg:col-span-1">
						<General />
					</div>
					<div className="lg:col-span-1">
						<Account />
					</div>
					<div className="lg:col-span-1">
						<Feedback />
					</div>
				</div>
				<Taskbar />
			</div>
		</div>
	);
}
