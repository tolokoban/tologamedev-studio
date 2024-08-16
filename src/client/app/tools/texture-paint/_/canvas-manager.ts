import {
    TgdContext,
    TgdControllerCameraOrbit,
    TgdPainterClear,
    TgdPainterGroup,
    TgdPainterState,
    TgdParserGLTransfertFormatBinary,
} from "@tolokoban/tgd"
import { MeshPainter } from "./mesh-painter"

export class CanvasManager {
    private _context: TgdContext | null = null
    private group: TgdPainterGroup | null = null
    private meshPainter: MeshPainter | null = null

    isMounted() {
        return this._context !== null
    }

    readonly mount = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return

        const context = new TgdContext(canvas)
        const clear = new TgdPainterClear(context, {
            color: [0, 0, 0, 0],
            depth: 1,
        })
        const group = new TgdPainterState(context, {
            depth: {
                func: "LESS",
                mask: true,
                range: [0, 1],
            },
            cull: "BACK",
        })
        this.group = group
        context.add(clear, group)
        const controller = new TgdControllerCameraOrbit(context, {
            inertiaOrbit: 500,
        })
        console.log("🚀 [canvas-manager] controller = ", controller) // @FIXME: Remove this line written on 2024-08-16 at 16:24
        context.paint()
        this._context = context
    }

    async loadFile(
        files: File[]
    ): Promise<TgdParserGLTransfertFormatBinary | null> {
        const [file] = files
        console.log("🚀 [canvas-manager] file = ", file) // @FIXME: Remove this line written on 2024-08-16 at 13:02
        if (!file) return null

        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = evt => {
                const buff = evt.target.result
                if (typeof buff === "string") {
                    reject(Error("File is a string instead of an Arraybuffer!"))
                    return
                }
                const glb = new TgdParserGLTransfertFormatBinary(buff)
                console.log("🚀 [canvas-manager] glb = ", glb) // @FIXME: Remove this line written on 2024-08-16 at 12:56
                const { context } = this
                if (this.meshPainter) {
                    this.group.remove(this.meshPainter)
                }
                this.meshPainter = new MeshPainter(context, glb)
                this.group.add(this.meshPainter)
                resolve(glb)
            }
            reader.readAsArrayBuffer(file)
        })
    }

    private get context(): TgdContext {
        if (!this._context) throw Error("TgdContext has not been created yet!")

        return this._context
    }
}
