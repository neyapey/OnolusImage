import type p5 from "p5";
import type EditorControlParams from "./editor_control_param";

export default interface IEditorControlHooks {
    /** called before draw */
    predraw?:(p: EditorControlParams)=>void 

    /** called after draw if action is "inactive" */
    postdraw?:(p: EditorControlParams)=>void

    /** called after draw if action is "active" */
    postdraw_virt?:(p: EditorControlParams)=>void

    /** draw during action */
    draw?:(p:EditorControlParams)=>void

    /** Called once when action starts */
    init(p:EditorControlParams):void

    /** final drawing. the canvas pixels will be captured into image after this */
    drawFinal(p:EditorControlParams):void
}