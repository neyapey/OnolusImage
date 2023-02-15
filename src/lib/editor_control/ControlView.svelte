<script lang="ts" context="module">
    export const EditorControlTypes = ["CROP" , "FLIP_ROTATE"] as const
    export type EditorControlType = typeof EditorControlTypes[number]
</script>

<script lang="ts">
    import CropControl from "./CropControl.svelte";
    import type IEditorControlHooks from "./editor_control_if";
    import FlipRotateControl from "./FlipRotateControl.svelte";

    export let onActivateController:(hooks:IEditorControlHooks)=>void
    export let onDeactivateController:()=>void
    export let onFinalize:(hooks:IEditorControlHooks)=>void

    let activeControlType: EditorControlType | null = null

    const controls:{-readonly [P in EditorControlType]: IEditorControlHooks | null} = {
        CROP: null,
        FLIP_ROTATE: null
    }

    export const activateController = (controller: EditorControlType) => {
        activeControlType = controller
        return controls[controller]
    }

    export const deactivateController = () => {
        activeControlType = null
    }
</script>

<div>
    {#each EditorControlTypes as et}
        <button on:click={()=> {
            activeControlType = et
            onActivateController(controls[et])
        }}>{et}</button>
    {/each}
</div>
<button on:click={()=>{
    activeControlType = null;
    onDeactivateController()
}}>Cancel</button>
<button on:click={()=>{
    onFinalize(controls[activeControlType])
    activeControlType = null
}}>Done</button>

{#if activeControlType == "CROP"}
    <CropControl bind:cropControlHooks={controls.CROP} />
{:else if activeControlType == "FLIP_ROTATE"}
    <FlipRotateControl bind:flipControlHooks={controls.FLIP_ROTATE} />
{/if}