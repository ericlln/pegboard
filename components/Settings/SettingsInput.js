import { Label, TextInput } from 'flowbite-react';

export default function SettingsInput(props) {
	return (
		<div className="mb-4 block">
			<div className="mb-2">
				<Label value={props.label} />
			</div>
			<TextInput id="task" onChange={(e) => {props.setValue(e.currentTarget.value)}} placeholder={props.placeholder} value={props.value} disabled={props.disabled} type={props.type}/>
		</div>
	);
}
