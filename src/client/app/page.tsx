import { ViewButton } from "@tolokoban/ui"
import { makeGoto } from "./routes"

export default function Page() {
    return (
        <div>
            <p>How are you?</p>
            <h1>Hello people</h1>
            <ViewButton onClick={makeGoto("/tools/texture-paint")}>
                Texture Paint
            </ViewButton>
        </div>
    )
}
