import {
    ViewStrip,
    ViewStack,
    ViewPanel,
    ViewButton,
    IconImport,
} from "@tolokoban/ui"
import React from "react"
import { CanvasManager } from "./_/canvas-manager"
import { TgdParserGLTransfertFormatBinary } from "@tolokoban/tgd"

export default function PageTexturePaint() {
    const manager = React.useMemo(() => new CanvasManager(), [])
    const [glb, setGlb] =
        React.useState<TgdParserGLTransfertFormatBinary | null>(null)
    return (
        <ViewStack fullsize position="absolute">
            <canvas ref={manager.mount}></canvas>
            {!glb && (
                <ViewPanel display="grid" placeItems="center" fullsize>
                    <ViewButton icon={IconImport}>Load a GLB file</ViewButton>
                </ViewPanel>
            )}
        </ViewStack>
    )
}
