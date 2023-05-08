import { Auth } from '@supabase/auth-ui-react';

export default function CustomAuth({supabase}) {
	return (
		<div className="bg-white max-w-xs rounded-xl shadow-lg shadow-viridian/40 float-right px-8 py-4 border-4 border-viridian hover:shadow-xl hover:shadow-viridian/60 ease-linear duration-300">
			<Auth
				supabaseClient={supabase}
				providers={[]}
				appearance={{
					variables: {
						default: {
							colors: {
								brand: '#253237',
								brandAccent: '#417B5A',
								brandButtonText: '#f2f3f4',
								inputBorder: '#253237',
								inputBorderHover: '#253237',
								inputBorderFocus: '#253237',
							},
							space: {
								labelBottomMargin: '8px',
								anchorBottomMargin: '0px',
								emailInputSpacing: '4px',
								buttonPadding: '5px 10px',
								inputPadding: '5px 5px',
							},
							borderWidths: {
								buttonBorderWidth: '2px',
								inputBorderWidth: '2px',
							},
							radii: {
								borderRadiusButton: '4px',
								buttonBorderRadius: '4px',
								inputBorderRadius: '4px',
							},
						},
					},
				}}
				localization={{
					variables: {
						sign_up: {
							email_label: 'Email',
							password_label: 'Password',
							email_input_placeholder: '',
							password_input_placeholder: '',
							link_text: 'Sign up',
						},
						sign_in: {
							email_label: 'Email',
							password_label: 'Password',
							email_input_placeholder: '',
							password_input_placeholder: '',
							link_text: 'Back to Sign in',
						},
						forgotten_password: {
							email_label: 'Email',
							email_input_placeholder: '',
							button_label: 'Send Password Reset Link',
							link_text: 'Forgot password?',
						},
					},
				}}
			/>
		</div>
	);
}
