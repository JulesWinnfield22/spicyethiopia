<script setup lang="ts">
	import UserForm   from '@/features/admin/user/form/UserForm.vue'
import icons from '@/utils/icons';
import { closeModal } from '@customizer/modal-x';
import type { PropType } from 'vue';

	const props = defineProps({
		title: String,
		size: {
			type: String as PropType<'sm' | 'md' | 'lg' | 'full'>,
			default: 'md'
		}
	})
</script>
<template>
	<div @click.self="closeModal()" class='grid p-4 overflow-hidden min-h-full bg-black/80 place-items-center' >
		<div :class="[$style[size]]" class='h-full flex flex-col px-4 min-h-[20rem] max-h-full shadow-2xl bg-white rounded' >
			<div class='h-12 border-b border-b-gray flex justify-between items-center' >
				<span class="font-bold text-base" >{{ title }}</span>
				<button @click="closeModal()" class="size-6 grid place-items-center" v-ripple ><i v-html="icons.close" /></button>
			</div>
			<div class='mt-2 p-2 flex-1 overflow-auto' >
				<slot />
			</div>
			<div class=' border-t border-gray min-h-12 p-2' >
				<slot name='bottom' />
			</div>
		</div>
	</div>
</template>

<style module >
	.sm {
		height: 20rem;
		width: 30rem;
	}

	.md {
		height: 35rem;
		width: 45rem;
	}

	.full {
		width: 100%;
		height: 100%;
	}
</style>