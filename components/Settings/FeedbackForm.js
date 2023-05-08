import { Label, Textarea } from "flowbite-react";

export default function FeedbackForm(props) {
	return (
		<div>
			<div id="textarea" className="mb-4">
				<div className="mb-2 block">
					<Label htmlFor="feedback" value="Note - You can only have one active feedback at a time." />
				</div>
				<Textarea id="feedback" placeholder="Leave some feedback for the developer..." value={props.text} required={true} rows={4} onChange={(e) => {props.setText(e.target.value)}}/>
			</div>
		</div>
	);
}
