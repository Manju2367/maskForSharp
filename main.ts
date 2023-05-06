import sharp from "sharp"



interface Options {
    x: number
    y: number
}

/**
 * 
 * @param image 処理対称のsharpオブジェクト
 * @param mask マスク画像のsharpオブジェクト
 * @param options 
 * @param options.x 
 * @param options.y 
 * @returns 
 */
export const mask = async (image: sharp.Sharp, mask: sharp.Sharp, options: Partial<Options> = {
    x: 0,
    y: 0 
}): Promise<sharp.Sharp> => {
    options.x ??= 0
    options.y ??= 0

    if((await image.metadata()).channels === 3) image.ensureAlpha(1)

    return new Promise((resolve, reject) => {
        image.raw().toBuffer(async (err, data, info) => {
            if(!err) {
                let maskBuffer = await mask.toBuffer()
                let paste = await sharp({
                    create: {
                        channels: 4,
                        background: {
                            r: 0xFF,
                            g: 0xFF,
                            b: 0xFF,
                            alpha: 1
                        },
                        width: info.width,
                        height: info.height
                    }
                }).composite([{
                    input: maskBuffer,
                    left: options.x,
                    top: options.y
                }]).grayscale().raw().toBuffer()
                
                data.forEach((v: number, i: number) => {
                    if((i + 1) % 4 === 0) {
                        data[i] *= paste[(i + 1)/4] / 0xFF
                    }
                })

                resolve(sharp(data, {
                    raw: {
                        width: info.width,
                        height: info.height,
                        channels: 4
                    }
                }))
            } else {
                reject(err)
            }
        })
    })
}