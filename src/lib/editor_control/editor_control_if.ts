import type p5 from "p5";
import type EditorControlParams from "./editor_control_param";

export default interface IEditorControlHooks {
    predraw?:(p: EditorControlParams)=>void
    postdraw?:(p: EditorControlParams)=>void
    postdraw_virt?:(p: EditorControlParams)=>void
    draw?:(p:EditorControlParams)=>void
    drawFinal(p:EditorControlParams):void
}