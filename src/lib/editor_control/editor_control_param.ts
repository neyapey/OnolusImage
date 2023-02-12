import type p5 from "p5";
import type { Graphics, Image } from "p5";

export default interface EditorControlParams {
    image: Image,
    gr: Graphics,
    p5: p5
}