import type EditorControlParams from "./editor_control_param";

export default interface IEditorControlHooks {
    /** Called once when action starts */
    init(p:EditorControlParams):void

    /** draw during action. draw the image and controls */
    draw:(p:EditorControlParams)=>void

    /** final drawing. The canvas pixels will be written to the image after this */
    drawFinal(p:EditorControlParams):void
}