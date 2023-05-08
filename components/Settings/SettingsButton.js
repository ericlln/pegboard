export default function SettingsButton({label, onClick}) {
	return (
		<div>
			<button
				onClick={() => onClick()}
				className="mt-2 py-2 px-3 text-off-white border-gunmetal bg-viridian shadow-lg shadow-viridian/50 hover:bg-ash-gray font-medium rounded-lg text-sm text-center"
			>
				{label}
			</button>
		</div>
	);
}
