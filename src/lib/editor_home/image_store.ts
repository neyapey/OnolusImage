import type p5 from 'p5'
import { writable } from 'svelte/store';

export const p5Store = writable<p5 | null>()