import { useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Tracker({ id, daysCounter, setDaysCounter, daysSinceStart }) {
    const supabase = useSupabaseClient();
	const user = useUser();

    const [loading, setLoading] = useState(false);
	
    async function saveDays(day) {
        try {
			setLoading(true);
			let { error } = await supabase
				.from('habits')
				.update({
					days: day,
					user_id: user.id,
				})
				.eq('id', BigInt(id));
			if (error) throw error;
		} catch (error) {
			alert('Error saving Task!');
			console.log(error);
		} finally {
			setLoading(false);
		}
    }

	const clickHandler = (e) => {
		if (e.currentTarget.id === 'minus') {
			setDaysCounter(daysCounter - 1);
            saveDays(daysCounter - 1);
		} else if (e.currentTarget.id === 'add') {
			setDaysCounter(daysCounter + 1);
            saveDays(daysCounter + 1);
		}
	};

    const addButtonState = () => {
        if (typeof daysSinceStart !== 'string') {
            if (daysCounter >= parseInt(daysSinceStart)) {
                return true;
            }
        } else if (typeof daysSinceStart === 'string') {
            return true;
        }
        return false;
    }

	return (
		<div className="grid grid-cols-3 gap-1 mt-2.5">
			<div>
				<button
					disabled={daysCounter === 0 ? true : false}
					id="minus"
					type="button"
					className=" text-gunmetal ring-2 ring-gray-400 hover:bg-gunmetal hover:text-off-white hover:ring-0 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center ease-in duration-150"
					onClick={clickHandler}
				>
					<svg
						aria-hidden="true"
						className="w-4 h-4"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						height="20"
						viewBox="0 96 960 960"
						width="20"
					>
						<path d="M240 612v-72h480v72H240Z" />
					</svg>
				</button>
			</div>
			<div className="box-content bg-none rounded-lg text-center">
				{<h1 className="text-lg">{daysCounter}</h1>}
			</div>
			<div>
				<button
					disabled={addButtonState()}
					id="add"
					type="button"
					className="text-gunmetal ring-2 ring-gray-400 hover:bg-gunmetal hover:text-off-white hover:ring-0 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center ease-in duration-150"
					onClick={clickHandler}
				>
					<svg
						aria-hidden="true"
						className="w-4 h-4"
						fill="currentColor"
						viewBox="0 96 960 960"
						xmlns="http://www.w3.org/2000/svg"
						height="20"
						width="20"
					>
						<path d="M440 856V616H200v-80h240V296h80v240h240v80H520v240h-80Z" />
					</svg>
				</button>
			</div>
		</div>
	);
}
