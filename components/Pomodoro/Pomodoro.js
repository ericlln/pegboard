import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import Card from '../Card';
import Time from './Time';
import ProgressBar from './ProgressBar';
import TimerButton from './TimerButton';
import { timeState, timerState, pauseState, settingState } from '../atoms';
import { useRecoilState } from 'recoil';

export default function Pomodoro() {
	const supabase = useSupabaseClient();
	const user = useUser();
	const [config, setConfig] = useRecoilState(settingState);

	const [loading, setLoading] = useState(false);
	const [seconds, setSeconds] = useRecoilState(timeState);
	const [timer, setTimer] = useRecoilState(timerState);
	const [pause, setPause] = useRecoilState(pauseState);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!pause) {
				if (seconds > 0) {
					setSeconds(seconds - 1);
				}
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [seconds, pause]);

	async function getSettings() {
		try {
			setLoading(true);
			let { data, error, status } = await supabase.from('profiles').select(`settings`).eq('id', user.id).single();
			if (error && status !== 406) {
				throw error;
			}
			if (data) {
				setConfig(data.settings);
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
			getSettings();
		}
	}, [user]);

	return (
		<Card title="Pomodoro">
			<div className="grid grid-cols-1 gap-6 justify-items-start xl:justify-items-center">
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-1 grid-flow-cols mb-2">
					<TimerButton id={0} label="Pomodoro" value={parseInt(config.pomodoro) * 60} />
					<TimerButton id={1} label="Short Break" value={parseInt(config.sbreak) * 60} />
					<TimerButton id={2} label="Long Break" value={parseInt(config.lbreak) * 60} />
				</div>

				<Time seconds={seconds} />
				<ProgressBar seconds={seconds} length={timer} />
			</div>
		</Card>
	);
}
