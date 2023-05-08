import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Card from '../Card';
import SettingsInput from './SettingsInput';
import { useEffect, useState } from 'react';
import SettingsButton from './SettingsButton';

export default function Account(props) {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (user) {
			getProfile();
			setEmail(user.email);
		}
	}, [user]);

	async function getProfile() {
		try {
			setLoading(true);
			let { data, error, status } = await supabase.from('profiles').select(`full_name`).eq('id', user.id).single();
			if (error && status !== 406) {
				throw error;
			}
			if (data) {
				if (data.full_name) {
					setName(data.full_name);
				}
			}
		} catch (error) {
			alert('Error loading user data!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	async function saveProfile() {
		try {
			setLoading(true);
			const updates = {
				id: user.id,
				full_name: name,
				updated_at: new Date().toISOString(),
			};
			let { error } = await supabase.from('profiles').upsert(updates);
			if (error) throw error;
			alert('Profile updated!');
		} catch (error) {
			alert('Error updating the data!');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Card title="Account">
			<div>
				<SettingsInput label="Name" value={name} setValue={setName} />
				<SettingsInput label="Email Address" value={email} setValue={setEmail} disabled={true} />
			</div>
			<div>
				<SettingsButton label="Save Changes" onClick={saveProfile} />
			</div>
		</Card>
	);
}
