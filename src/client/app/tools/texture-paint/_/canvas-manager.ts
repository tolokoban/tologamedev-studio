import { TgdContext } from "@tolokoban/tgd"

export class CanvasManager {
    private _context: TgdContext | null = null

    isMounted() {
        return this._context !== null
    }

    readonly mount = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return

        this._context = new TgdContext(canvas)
    }

    private get context(): TgdContext {
        if (!this._context) throw Error("TgdContext has not been created yet!")

        return this._context
    }
}
