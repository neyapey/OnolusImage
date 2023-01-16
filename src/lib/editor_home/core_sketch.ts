import type { Image } from "p5";
import type p5 from 'p5'

export function getCoreSketch(imageUrl:string): ((p:p5)=>void) {
    return (p:p5) => {
        let img:Image
        let width = 512
        let height = 512

        p.preload = () => {
            img = p.loadImage(imageUrl, (p1:Image) => {
                width = Math.min(p1.width, 1024)
                height = Math.min(p1.height, 1024)
            })
        }

        p.setup = () => {
            p.createCanvas(width, height)
        }

        p.draw = () => {
            p.image(img, 0, 0)
            p.noLoop()
        }
    }
}