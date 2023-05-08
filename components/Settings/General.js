import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Card from '../Card';
import SettingsButton from './SettingsButton';
import SettingsInput from './SettingsInput';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { settingState } from '../atoms';

export default function General(props) {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [loading, setLoading] = useState(false);
	const [config, setConfig] = useRecoilState(settingState);

	const [pomodoro, setPomodoro] = useState(config.pomodoro);
	const [sbreak, setSbreak] = useState(config.sbreak);
	const [lbreak, setLbreak] = useState(config.lbreak);

	async function updateSettings() {
		try {
			setLoading(true);
			const updates = {
				settings: { pomodoro: pomodoro, sbreak: sbreak, lbreak: lbreak},
			};
			let { error } = await supabase.from('profiles').update(updates).eq('id', user.id);;
			if (error) throw error;
			alert('Settings updated!');
		} catch (error) {
			alert('Error updating settings!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

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
		<Card title="General">
			<div>
				<SettingsInput label="Pomodoro Length (minutes)" value={pomodoro} setValue={setPomodoro} />
				<SettingsInput label="Short Break Length (minutes)" value={sbreak} setValue={setSbreak} />
				<SettingsInput label="Long Break Length (minutes)" value={lbreak} setValue={setLbreak} />
			</div>
			<div>
				<SettingsButton label="Save Changes" onClick={updateSettings} />
			</div>
		</Card>
	);
}
