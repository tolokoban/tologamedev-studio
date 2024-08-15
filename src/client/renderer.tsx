/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./app"

import "./index.css"
import { Theme } from "@tolokoban/ui"

function get(id: string): HTMLElement {
    const elem = document.getElementById(id)
    if (!id) throw Error(`Unable to get element with id "${id}"!`)

    return elem
}

const theme = new Theme({
    colors: {
        primary: ["rgb(2, 41, 100)", "#09d", "rgb(203, 249, 255)"],
        secondary: ["rgb(107, 64, 0)", "#f90", "rgb(253, 217, 140)"],
        neutral: ["#999", "#ccc"],
        input: "#fff",
        error: "#f30",
    },
})
theme.apply()

const root = createRoot(get("root"))
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)

const splash = get("splash-screen")
const duration = 1000
splash.style.setProperty("--duration", `${duration}ms`)
splash.classList.add("vanish")
setTimeout(() => {
    splash.parentNode.removeChild(splash)
}, 1000)
