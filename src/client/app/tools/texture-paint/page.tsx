import { TgdParserGLTransfertFormatBinary } from "@tolokoban/tgd"
import { IconImport, ViewInputFile, ViewPanel, ViewStack } from "@tolokoban/ui"
import React from "react"

import { CanvasManager } from "./_/canvas-manager"

import styles from "./page.module.css"

export default function PageTexturePaint() {
    const manager = React.useMemo(() => new CanvasManager(), [])
    const [glb, setGlb] =
        React.useState<TgdParserGLTransfertFormatBinary | null>(null)
    return (
        <ViewStack className={styles.page} fullsize position="absolute">
            <canvas ref={manager.mount}></canvas>
            {!glb && (
                <ViewPanel display="grid" placeItems="center" fullsize>
                    <ViewInputFile
                        icon={IconImport}
                        onLoad={(files: File[]) =>
                            manager
                                .loadFile(files)
                                .then(setGlb)
                                .catch(console.error)
                        }
                    >
                        Load a GLB file
                    </ViewInputFile>
                </ViewPanel>
            )}
        </ViewStack>
    )
}
