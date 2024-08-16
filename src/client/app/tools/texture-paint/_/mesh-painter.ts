import {
    TgdContext,
    TgdPainterMeshGltf,
    TgdParserGLTransfertFormatBinary,
} from "@tolokoban/tgd"

export class MeshPainter extends TgdPainterMeshGltf {
    constructor(context: TgdContext, asset: TgdParserGLTransfertFormatBinary) {
        super(context, {
            asset,
            meshIndex: 0,
            primitiveIndex: 0,
        })
    }
}
