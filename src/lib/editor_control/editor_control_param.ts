import type p5 from "p5";
import type { Graphics, Image } from "p5";

export default interface EditorControlParams {
    image: Image,
    gr: Graphics, //intermidiete drawing
    p5: p5 //final drawing -> will be saved into "image" attribute when draw_final is called
}
