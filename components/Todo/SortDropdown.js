import { Dropdown } from 'flowbite-react';

export default function SortDropdown({ setSort, options }) {
	const onClick0 = () => {
		setSort(options[0]);
	};
	const onClick1 = () => {
		setSort(options[1]);
	};
	const onClick2 = () => {
		setSort(options[2]);
	};

	return (
		<div>
			<Dropdown
				label="Sort By"
				class="text-off-white border-gunmetal bg-viridian shadow-lg shadow-viridian/50 hover:bg-ash-gray font-medium rounded-lg text-sm text-center mr-2 mb-2"
			>
				<Dropdown.Item onClick={onClick0}>{options[0]}</Dropdown.Item>
				<Dropdown.Item onClick={onClick1}>{options[1]}</Dropdown.Item>
				<Dropdown.Item onClick={onClick2}>{options[2]}</Dropdown.Item>
			</Dropdown>
		</div>
	);
}
