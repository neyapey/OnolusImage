<script lang="ts">
    import p5 from "p5";
    import ControlView, { EditorControlType } from "../editor_control/ControlView.svelte";
    import {createCoreSketch} from "./core_sketch";
    import { editorhooks, p5Store } from "../stores";
    import type IEditorControlHooks from "../editor_control/editor_control_if";
    import { get } from "svelte/store";
    import type EditorControlParams from "../editor_control/editor_control_param";
    import { draw } from "svelte/types/runtime/transition";

    let canvasParent:HTMLDivElement
    let files: FileList;

    let editorParams: EditorControlParams;
    let controllerInit = true //controller's init() called?
    let finalized = false;
    let controllerHooks: IEditorControlHooks | null = null
    let canv:HTMLCanvasElement;

    $: if(files) {
        let f = files[0]
        let url = URL.createObjectURL(f)
        let sketch = (p:p5) => {
            let img:p5.Image
            let width = 512
            let height = 512

            p.preload = () => {
                img = p.loadImage(url, (p1:p5.Image) => {
                    width = Math.min(p1.width, 1024)
                    height = Math.min(p1.height, 1024)
                })
                editorParams.image = img;
            }

            p.setup = () => {
                canv = p.createCanvas(width, height).elt
                editorParams.gr = p.createGraphics(width, height)
                p.noLoop()
            }

            p.draw = () => {
                let hook: IEditorControlHooks = {
                    init(par){},
                    draw(par) {
                        par.p5.image(editorParams.image, 0, 0)
                    },
                    drawFinal(par) {
                        par.p5.image(editorParams.image, 0, 0)
                    },
                }
                if(controllerHooks != null) {
                    hook = controllerHooks
                }
                if(!controllerInit) {
                    controllerInit = true;
                    hook.init(editorParams)
                }
                if(finalized) {
                    finalized = false;
                    hook.drawFinal(editorParams)
                    editorParams.image = p.loadImage(url, (p1:p5.Image) => {
                        width = Math.min(p1.width, 1024)
                        height = Math.min(p1.height, 1024)
                    })
                }
            }
        }
        let p = new p5(sketch, canvasParent);
        editorParams.p5 = p;
        //let p = new p5(createCoreSketch(url), canvasParent)
        //p5Store.set(p)
    }

    function onActivateController(hooks: IEditorControlHooks) {
        if(editorParams.p5.isLooping()) editorParams.p5.noLoop();
        let ct = 100;
        while(editorParams.p5.isLooping() && ct > 0) {
            --ct;
        }
        controllerHooks = hooks;
        controllerInit = false;
        editorParams.p5.loop()
    }

    function onDeactivateController() {
        controllerHooks = null
        editorParams.p5.noLoop()
        let ct = 100;
        while(editorParams.p5.isLooping() && ct > 0) {
            --ct;
        }
    }

    function onFinalize() {
        editorParams.p5.noLoop()
        let ct = 100;
        while(editorParams.p5.isLooping() && ct > 0) {
            --ct;
        }
        finalized = true;
        editorParams.p5.redraw();
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
<div>
    Controls:
    <ControlView {onActivateController} {onDeactivateController} {onFinalize} />
</div>
