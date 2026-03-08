import { ref } from 'vue';
import type { Flip } from 'gsap/Flip';

export const flipState = ref<any>(null);

export const saveFlipState = (state: any) => {
	flipState.value = state;
};

export const getAndClearFlipState = () => {
	const state = flipState.value;
	flipState.value = null;
	return state;
};
