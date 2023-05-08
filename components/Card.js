export default function Card(props) {
	return (
		<div className="block p-6 bg-off-white border-4 shadow-lg shadow-viridian/40 border-viridian rounded-2xl">
			<div className="inline-flex">
				<h5 className="font-Lexend mb-4 text-2xl tracking-normal font-medium text-gray-500 dark:text-white">
					{props.title}
				</h5>
			</div>
			<div>{props.children}</div>
		</div>
	);
}
