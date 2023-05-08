import '@/styles/globals.css';
import { RecoilRoot } from 'recoil';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
	const [supabase] = useState(() => createBrowserSupabaseClient());

	return (
		<>
			<Head>
				<title>pegboard</title>
				<meta
					name="description"
					content="A minimalist productivity app with a Pomdoro timer, to-do list, and habit tracker."
				/>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			</Head>
			<SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
				<RecoilRoot>
					<Component {...pageProps} />
				</RecoilRoot>
			</SessionContextProvider>
		</>
	);
}
