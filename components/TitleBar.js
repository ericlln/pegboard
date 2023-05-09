import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from 'next/router';

export default function TitleBar({ title }) {
	const supabase = useSupabaseClient()
	const router = useRouter()

	const clickHandler = () => {
		supabase.auth.signOut()
		router.push('./')
	}

	return (
		<div className="flex flex-row relative">
			<div>
				<h1 className="font-sans text-4xl mb-6 ml-1 font-semibold text-gunmetal">{title}</h1>
			</div>
			<div className="fixed right-0 mr-6">
				<button
					type="button"
					className="text-off-white bg-gunmetal hover:bg-viridian focus:ring-2 focus:outline-none focus:ring-viridian font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ease-in duration-150"
					onClick={clickHandler}
				>
					<svg
						aria-hidden="true"
						className="w-5 h-5"
						fill="currentColor"
						viewBox="0 96 960 960"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M216 912q-29.7 0-50.85-21.15Q144 869.7 144 840V312q0-29.7 21.15-50.85Q186.3 240 216 240h264v72H216v528h264v72H216Zm432-168-51-51 81-81H384v-72h294l-81-81 51-51 168 168-168 168Z"
							clipRule="evenodd"
						></path>
					</svg>
				</button>
			</div>
		</div>
	);
}
