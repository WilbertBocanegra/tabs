<script lang="ts">
	import { onMount } from 'svelte';
	import { tab } from '$lib/index.js';
	import _ from 'lodash';

	/** @type {string} */
	export let name: string = 'tabs';

	/** @type {boolean} */
	export let revalidate: boolean = false;

	/** @type {number}*/
	export let max = 1;

	let UID: number;

	const ls = localStorage;
	const s = JSON.stringify;
	const p = JSON.parse;

	onMount(() => {
		UID = Date.now();

		const store = ls.getItem(name);
		if (_.trim(store as string) === '' || _.isNull(store)) {
			ls.setItem(name, s([]));
		} else {
			console.log(store);
		}
	});

	const storage = (e: StorageEvent) => {
		if (e.key === name) {
			console.log(e);
			if (_.trim(e.newValue as string) === '' || _.isNull(e.newValue)) {
				ls.setItem(name, s([]));
			} else {
				try {
					const parse = p(e.newValue);
					if (_.isObject(parse)) {
						if (_.isArray(parse)) {
							const filter: number[] = _.filter(parse, Number);
							if (filter.length > max) {
								$tab = true;
							} else {
								$tab = false;
							}
						} else {
							ls.setItem(name, s([]));
						}
					} else {
						ls.setItem(name, s([]));
					}
				} catch (e) {
					ls.setItem(name, s([]));
				}
			}
		}
	};
</script>

<svelte:window on:storage={storage} />

<slot />
