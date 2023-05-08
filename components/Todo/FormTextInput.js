import { TextInput, Label } from 'flowbite-react';
import { useState } from 'react';

export default function FormTextInput(props) {
	const [value, setValue] = useState(props.value);

	const handleChange = (e) => {
		setValue(e.currentTarget.value);
	}

	const handleBlur = () => {
		props.handleChange(value);
	}

	return (
		<div>
			<div className="mb-2 block">
				<Label value={props.label} />
			</div>
			<TextInput
				id="task"
				placeholder={props.placeholder}
				required={props.required}
				disabled={props.disabled}
				value={value}
				color={value?.length > 3 ? "null" : "failure"}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
		</div>
	);
}
