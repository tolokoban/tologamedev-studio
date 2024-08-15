import nodeFS from "node:fs"
import nodePath from "node:path"

import { app, BrowserWindow } from "electron"
import { asyncCreateDebouncer } from "./async"
import { isType } from "@tolokoban/type-guards"

const ROOT = nodePath.join(app.getPath("userData"), ".tolo-game-dev-studio")

export function preferencesWindowSave(id: string, window: BrowserWindow) {
    const [width, height] = window.getSize()
    const [left, top] = window.getPosition()
    const maximized = window.isMaximized()

    void save(`windows/${id}.json`, {
        left,
        top,
        width,
        height,
        maximized,
    })
}

export function preferencesWindowRestore(id: string, window: BrowserWindow) {
    try {
        const data = load(`windows/${id}.json`)
        console.log("🚀 [preferences] data = ", data) // @FIXME: Remove this line written on 2024-08-15 at 16:01
        if (isWindowSizeAndPosition(data)) {
            window.setPosition(data.left, data.top)
            window.setSize(data.width, data.height)
            if (data.maximized) window.maximize()
        }
    } catch (ex) {
        console.error(`Unable to restore state of window "${id}"!`)
        console.error(ex)
    }
}

function load(filename: string): unknown {
    const path = nodePath.join(ROOT, filename)
    try {
        const content = nodeFS.readFileSync(path).toString()
        return JSON.parse(content)
    } catch (ex) {
        console.error(`Unable to load file "${path}":`, ex)
        return null
    }
}

const save = asyncCreateDebouncer((filename: string, data: unknown) => {
    const path = nodePath.join(ROOT, filename)
    try {
        const dirname = nodePath.dirname(path)
        if (!isDirectory(dirname)) {
            console.log("Creating folder:", dirname)
            nodeFS.mkdirSync(dirname, { recursive: true })
        }
        nodeFS.writeFileSync(path, JSON.stringify(data))
    } catch (ex) {
        console.error(`Unable to save file "${path}":`, ex)
        return null
    }
}, 300)

interface WindowSizeAndPosition {
    left: number
    top: number
    width: number
    height: number
    maximized: boolean
}

function isWindowSizeAndPosition(data: unknown): data is WindowSizeAndPosition {
    return isType(data, {
        left: "number",
        top: "number",
        width: "number",
        height: "number",
        maximized: "boolean",
    })
}

function isDirectory(path: string): boolean {
    if (!nodeFS.existsSync(path)) return false

    const stat = nodeFS.statSync(path)
    return stat.isDirectory()
}
