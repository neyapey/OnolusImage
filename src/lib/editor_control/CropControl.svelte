<script lang="ts">
    import type IEditorControlHooks from "./editor_control_if";

    /** x and y of top left corner of cropped region*/
    let topLeft:[number, number] = [0, 0];

    /** width and height of cropped image */
    let size:[number, number] = [0, 0] //w, h
    let canSize: [number, number] = [0, 0] // W, H

    export const cropControlHooks:IEditorControlHooks = {
        init(p) {
            canSize[0] = p.p5.width
            canSize[1] = p.p5.height
            topLeft = [0, 0]
            size = [canSize[0]/2, canSize[1]/2]
        },

        draw: (p) => {
            if(canSize[0] != p.p5.width) canSize[0] = p.p5.width
            if(canSize[1] != p.p5.height) canSize[1] = p.p5.height

            const gr = p.gr
            let w = gr.width
            let h = gr.height
            gr.push()
            gr.stroke(255)
            gr.strokeWeight(2)
            //top left
            gr.line(topLeft[0], topLeft[1], topLeft[0] + w/10, topLeft[1])
            gr.line(topLeft[0], topLeft[1], topLeft[0], topLeft[1] + h/10)

            //top right
            gr.line(topLeft[0] + size[0], topLeft[1], topLeft[0] + size[0] - w/10, topLeft[1])
            gr.line(topLeft[0] + size[0], topLeft[1], topLeft[0] + size[0], topLeft[1] + h/10)
            
            //bottom left
            gr.line(topLeft[0], topLeft[1] + size[1], topLeft[0] + w/10, topLeft[1] + size[1])
            gr.line(topLeft[0], topLeft[1] + size[1], topLeft[0], topLeft[1] + size[1] - h/10)

            //bottom right
            gr.line(topLeft[0] + size[0], topLeft[1] + size[1], topLeft[0] + size[0] - w/10, topLeft[1] + size[1])
            gr.line(topLeft[0] + size[0], topLeft[1] + size[1], topLeft[0] + size[0], topLeft[1] + size[1] - h/10)
            
            gr.pop()

            p.gr.image(p.image, topLeft[0], topLeft[1], p.p5.width, p.p5.height)
        },

        drawFinal(p) {
            p.p5.resizeCanvas(size[0], size[1])
            p.p5.image(p.image, -topLeft[0], -topLeft[1])
        }
    }

</script>
<div>
    TopLeft: x:<input type="number" on:change={(e)=>{
        topLeft[0] = Number(e.currentTarget.value)
    }} min={0} max={canSize[0]} />
    y:<input type="number" on:change={(e)=>{
        topLeft[1] = Number(e.currentTarget.value)
    }} min={0} max={canSize[1]} />
</div>
<div>
    Size: h:<input type="number" on:change={(e)=>{
        size[1] = Number(e.currentTarget.value)
    }} min={topLeft[1]} max={canSize[1] - topLeft[1]} />
    w:<input type="number" on:change={(e)=>{
        size[0] = Number(e.currentTarget.value)
    }} min={topLeft[0]} max={canSize[0] - topLeft[0]} />
</div>
