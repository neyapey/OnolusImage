import { writable } from 'svelte/store';
import type IEditorControlHooks from './editor_control/editor_control_if';
import type p5 from 'p5'

export const count = writable(0);
export const editorhooks = writable<IEditorControlHooks | null>();
export const p5Store = writable<p5 | null>()
export const imageStore = writable<p5.Image | null>()
