import { useState } from 'react';
import Card from '../Card';
import FeedbackForm from './FeedbackForm';
import SettingsButton from './SettingsButton';
import { useUser,useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Feedback() {
    const supabase = useSupabaseClient();
    const user = useUser();

	const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    async function sendFeedback() {
        try {
			setLoading(true);
			const updates = {
                id: user.id,
				feedback: text,
			};
			let { error } = await supabase.from('profiles').upsert(updates);
			if (error) throw error;
			alert('Feedback updated!');
		} catch (error) {
			alert('Error updating the data!');
			console.log(error);
		} finally {
			setLoading(false);
		}
    }

	return (
		<Card title="Feedback">
			<FeedbackForm text={text} setText={setText} />
			<SettingsButton label="Send" onClick={sendFeedback} />
		</Card>
	);
}
