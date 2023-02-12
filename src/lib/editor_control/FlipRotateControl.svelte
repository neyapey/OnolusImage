<script lang="ts">
    import type p5 from "p5";
    import { scale } from "svelte/types/runtime/transition";


    let rotateCount = 0;
    let flipHoriz = 1;
    let flipVert = 1;
    export let p5Ins:p5

    export const predraw = () => {
        p5Ins.imageMode(p5Ins.CENTER)
        p5Ins.angleMode(p5Ins.DEGREES)
        p5Ins.scale(flipHoriz, flipVert)
        p5Ins.rotate(rotateCount*90)
    }
</script>

<div>
    <button on:click={()=>{flipHoriz *= -1}}>Flip Horizontal</button>
    <button on:click={()=>{flipVert *= -1}}>Flip Vertical</button>
    <button on:click={()=>{rotateCount = (rotateCount + 1)%4}}>Rotate Clock</button>
    <button on:click={()=>{rotateCount = (rotateCount + 3)%4}}>Rotate Anti-clock</button>
</div>
