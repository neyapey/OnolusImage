<script lang="ts">
    import type { EditorControlProps } from "./editor_control_prop";


    export let controlProps: EditorControlProps<number>
    $: ({label, value, placeholder, onChange} = controlProps)
</script>

<div >
    <span>{label}</span>
    <input 
    type="number" 
    bind:value 
    on:change={(e) => {
        onChange(Number(e.currentTarget.value))
    }}
    {placeholder} 
    />
</div>
