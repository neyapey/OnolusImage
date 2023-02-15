<script lang="ts">
    import type IEditorControlHooks from "./editor_control_if";


    let rotateAngle = 0;
    let flipHoriz = 1;
    let flipVert = 1;

    export const flipControlHooks:IEditorControlHooks = {
        init(p) {
            rotateAngle = 0;
            flipHoriz = 1;
            flipVert = 1;
        },

        draw(p) {
            const gr = p.gr
            gr.push()
            gr.imageMode(gr.CENTER)
            gr.angleMode(gr.DEGREES)
            gr.scale(flipHoriz, flipVert)
            gr.rotate(rotateAngle)

            gr.image(p.image, gr.width/2, gr.height/2)
            gr.pop()
        },

        drawFinal(p) {
            const p5 = p.p5
            p5.push()
            p5.imageMode(p5.CENTER)
            p5.angleMode(p5.DEGREES)
            p5.scale(flipHoriz, flipVert)
            p5.rotate(rotateAngle)

            p5.image(p.image, p5.width/2, p5.height/2)
            p5.pop()
        }
    }

</script>

<div>
    <button on:click={()=>{flipHoriz *= -1}}>Flip Horizontal</button>
    <button on:click={()=>{flipVert *= -1}}>Flip Vertical</button>
    <button on:click={()=>{rotateAngle = (rotateAngle + 90)%360}}>Rotate Clock</button>
    <button on:click={()=>{rotateAngle = (rotateAngle + 360 - 90)%360}}>Rotate Anti-clock</button>
    Rotate Angle:<input type="number" bind:value={rotateAngle} min=0 max=360 />
</div>
