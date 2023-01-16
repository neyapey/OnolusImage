<script lang="ts">
    import p5 from "p5";
    import {getCoreSketch} from "./core_sketch";
    import { p5Store } from "./image_store";

    let canvasParent:HTMLDivElement
    let files: FileList;

    $: if(files) {
        let f = files[0]
        let url = URL.createObjectURL(f)
        let p = new p5(getCoreSketch(url), canvasParent)
        p5Store.set(p)
    }
</script>

<div>
    <div 
    bind:this={canvasParent}
    ></div>
    {#if $p5Store == null}
        <input 
        type="file" 
        accept="image/" 
        bind:files 
        />
    {/if}
</div>
