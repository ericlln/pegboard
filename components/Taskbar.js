import { useRouter } from 'next/router';

export default function Taskbar() {
	const router = useRouter();
	return (
		<div class="fixed bottom-0 left-0 z-50 grid w-full h-14 grid-cols-1 px-8 bg-white border-t border-gray-200 md:grid-cols-3 dark:bg-gray-700 dark:border-gray-600">
			<div class="items-center justify-center mr-auto text-gray-500 dark:text-gray-400 md:flex"></div>
			<div class="flex items-center justify-center mx-auto">
				<button type="button" class="p-2 mx-3" onClick={() => router.push('/board')}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="30"
						viewBox="0 96 960 960"
						width="30"
						class="hover:fill-viridian transition hover:-translate-y-1 ease-in duration-150"
					>
						<path d="M219 912q-29 0-52-23t-23-52V312q0-29.7 21.5-50.85Q187 240 216 240h528q29.7 0 50.85 21.15Q816 282.3 816 312v528q0 29-21.15 50.5T744 912H219Zm-3-72h228V312H216v528Zm300 0h228V576H516v264Zm0-336h228V312H516v192Z" />
					</svg>
				</button>
				<button type="button" class="p-2 mx-3" onClick={() => router.push('/settings')}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="30"
						viewBox="0 96 960 960"
						width="30"
						class="hover:fill-viridian hover:-translate-y-1 ease-in duration-150"
					>
						<path d="m367 976-15-126q-10-6-22-13t-22-13l-117 49L78 678l100-76v-52L78 474l113-195 117 49q10-6 22-13t22-13l15-126h226l15 126q10 6 22 13t22 13l117-49 113 195-99 76v52l99 76-113 195-117-49q-10 6-22 13t-22 13l-15 126H367Zm113-257q59 0 101-42t42-101q0-59-42-101t-101-42q-59 0-101 42t-42 101q0 59 42 101t101 42Zm0-84q-24 0-41.5-17.5T421 576q0-24 17.5-41.5T480 517q24 0 41.5 17.5T539 576q0 24-17.5 41.5T480 635Zm1-59Zm-41 316h80l12-104q29-8 56-24t49-38l97 41 40-66-85-65q5-14 7-29t2-31q0-14-2-28.5t-6-30.5l85-66-40-66-97 42q-23-23-49.5-38.5T533 365l-13-105h-80l-13 105q-29 8-55.5 23.5T323 426l-97-41-40 66 84 65q-4 16-6 31t-2 29q0 14 2 28.5t6 30.5l-84 66 40 66 97-41q22 22 48.5 37.5T427 787l13 105Z" />
					</svg>
				</button>
			</div>
		</div>
	);
}
