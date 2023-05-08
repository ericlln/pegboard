import { atom } from 'recoil';

// pomodoro
export const timeState = atom({
	key: 'timeState',
	default: 1500,
});
export const timerState = atom({
	key: 'timerState',
	default: 1500,
});
export const pauseState = atom({
	key: 'pauseState',
	default: true,
});
export const threeButtonState = atom({
	key: 'threeButtonState',
	default: 0,
})

// todo
export const modalState = atom({
	key: 'modalState',
	default: false,
})

// settings
export const settingState = atom({
	key:'settingState',
	default: {},
})