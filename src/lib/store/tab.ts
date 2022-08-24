import { writable, type Writable } from 'svelte/store';

export const tab: Writable<boolean> = writable(false);
