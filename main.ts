import sharp from "sharp"



interface Options {
    x?: number
    y?: number
}



interface FillOption {
    color: string
    opacity: number
}

const FillOptionDefault: FillOption = {
    color: "black",
    opacity: 1
}

const isFillOption = (value: unknown): value is FillOption => {
    if(typeof value !== "object" || value === null) {
        return false
    }

    const { color, opacity } = value as Record<keyof FillOption, unknown>

    if(typeof color !== "string" && typeof color !== "undefined") {
        return false
    }

    if(typeof opacity !== "number" && typeof opacity !== "undefined") {
        return false
    }

    return true
}



interface DashOption {
    array: Array<number>
    offset: number
}

const DashOptionDefault: DashOption = {
    array: [],
    offset: 0
}

const isDashOption = (value: unknown): value is DashOption => {
    if(typeof value !== "object" || value === null) {
        return false
    }

    const { array, offset } = value as Record<keyof DashOption, unknown>

    if(!(array instanceof Array<number>) && typeof array !== "undefined") {
        return false
    }

    if(typeof offset !== "number" && typeof offset !== "undefined") {
        return false
    }

    return true
}



interface StrokeOption {
    color: string,
    width: number,
    opacity: number,
    position: "inner"|"middle"|"outer",
    dash: Partial<DashOption>
}

const StrokeOptionDefault: StrokeOption = {
    color: "none",
    width: 1,
    opacity: 1,
    position: "outer",
    dash: DashOptionDefault
}

const isStrokeOption = (value: unknown): value is StrokeOption => {
    if(typeof value !== "object" || value === null) {
        return false
    }

    const { color, width, opacity, position, dash } = value as Record<keyof StrokeOption, unknown>

    if(typeof color !== "string" && typeof color !== "undefined") {
        return false
    }

    if(typeof width !== "number" && typeof width !== "undefined") {
        return false
    }

    if(typeof opacity !== "number" && typeof opacity !== "undefined") {
        return false
    }

    if(typeof position !== "string" && typeof opacity !== "undefined") {
        return false
    }

    if(!isDashOption(dash) && typeof dash !== "undefined") {
        return false
    }

    return true
}



interface ShapeOption {
    fill: Partial<FillOption>
    stroke: Partial<StrokeOption>
}

const ShapeOptionDefault: ShapeOption = {
    fill: FillOptionDefault,
    stroke: StrokeOptionDefault
}

const isShapeOption = (value: unknown): value is ShapeOption => {
    if(typeof value !== "object" || value === null) {
        return false
    }

    const { fill, stroke } = value as Record<keyof ShapeOption, unknown>

    if(!isFillOption(fill) && typeof fill !== "undefined") {
        return false
    }

    if(!isStrokeOption(stroke) && typeof stroke !== "undefined") {
        return false
    }

    return true
}



interface CreateCircle {
    (radius: number, cx: number, cy: number, width: number, height: number, options?: Partial<ShapeOption>): sharp.Sharp
    (radius: number, cx: number, cy: number, options?: Partial<ShapeOption>): sharp.Sharp
    (radius: number, options?: Partial<ShapeOption>): sharp.Sharp
}













/**
 * imageに対してmaskを用いてマスク処理をします。
 * @param image 処理対称のsharpオブジェクト
 * @param mask マスク画像のsharpオブジェクト
 * @param options 
 * @param options.x maskを適応するx座標
 * @param options.y maskを適応するy座標
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

export const createCircle: CreateCircle = (...args: any): sharp.Sharp => {
    if(typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && typeof args[4] === "number" && (typeof args[5] === "undefined" || isShapeOption(args[5]))) {
        let radius: number = args[0]
        let cx: number = args[1]
        let cy: number = args[2]
        let width: number = args[3]
        let height: number = args[4]
        let options: ShapeOption|undefined = args[5]

        // init options
        options ??= ShapeOptionDefault
        options.fill ??= FillOptionDefault
        options.fill.color ??= FillOptionDefault.color
        options.fill.opacity ??= FillOptionDefault.opacity
        options.stroke ??= StrokeOptionDefault
        options.stroke.color ??= StrokeOptionDefault.color
        options.stroke.width ??= StrokeOptionDefault.width
        options.stroke.opacity ??= StrokeOptionDefault.opacity
        options.stroke.position ??= "middle"
        options.stroke.dash ??= DashOptionDefault
        options.stroke.dash.array ??= DashOptionDefault.array
        options.stroke.dash.offset ??= DashOptionDefault.offset

        let drFill: number = options.stroke.position === "middle" ? options.stroke.width/2 : 
                                (options.stroke.position === "outer" ? options.stroke.width : 0)



        return sharp(Buffer.from(`
            <svg viewBox="0 0 ${ width } ${ height }" xmlns="http://www.w3.org/2000/svg">
                <circle 
                    cx="${ cx }"
                    cy="${ cy }"
                    r="${ radius - drFill }"
                    fill="${ options.fill.color }"
                    fill-opacity="${ options.fill.opacity }"
                    stroke="none"
                />
                ${ options.stroke.color !== "none" ? `
                <circle 
                    cx="${ cx }"
                    cy="${ cy }"
                    r="${ radius - options.stroke.width/2 }"
                    fill="none"
                    stroke="${ options.stroke.color }"
                    stroke-width="${ options.stroke.width }"
                    stroke-opacity="${ options.stroke.opacity }"
                    stroke-dasharray="${ options.stroke.dash.array.join(" ") }"
                    stroke-dashoffset="${ options.stroke.dash.offset }"
                />
                ` : "" }
            </svg>
        `))
    } else if(typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && isShapeOption(args[3])) {
        let radius: number = args[0]
        let cx: number = args[1]
        let cy: number = args[2]
        let options: ShapeOption|undefined = args[3]

        // init options
        options ??= ShapeOptionDefault
        options.fill ??= FillOptionDefault
        options.fill.color ??= FillOptionDefault.color
        options.fill.opacity ??= FillOptionDefault.opacity
        options.stroke ??= StrokeOptionDefault
        options.stroke.color ??= StrokeOptionDefault.color
        options.stroke.width ??= StrokeOptionDefault.width
        options.stroke.opacity ??= StrokeOptionDefault.opacity
        options.stroke.position ??= "middle"
        options.stroke.dash ??= DashOptionDefault
        options.stroke.dash.array ??= DashOptionDefault.array
        options.stroke.dash.offset ??= DashOptionDefault.offset

        let drFill: number = options.stroke.position === "middle" ? options.stroke.width/2 : 
                                (options.stroke.position === "outer" ? options.stroke.width : 0)



        return sharp(Buffer.from(`
            <svg viewBox="0 0 ${ cx + radius } ${ cy + radius }" xmlns="http://www.w3.org/2000/svg">
                <circle 
                    cx="${ cx }"
                    cy="${ cy }"
                    r="${ radius - drFill }"
                    fill="${ options.fill.color }"
                    fill-opacity="${ options.fill.opacity }"
                    stroke="none"
                />
                ${ options.stroke.color !== "none" ? `
                <circle 
                    cx="${ cx }"
                    cy="${ cy }"
                    r="${ radius - options.stroke.width/2 }"
                    fill="none"
                    stroke="${ options.stroke.color }"
                    stroke-width="${ options.stroke.width }"
                    stroke-opacity="${ options.stroke.opacity }"
                    stroke-dasharray="${ options.stroke.dash.array.join(" ") }"
                    stroke-dashoffset="${ options.stroke.dash.offset }"
                />
                ` : "" }
            </svg>
        `))
    } else {
        let radius: number = args[0]
        let options: ShapeOption|undefined = args[1]

        // init options
        options ??= ShapeOptionDefault
        options.fill ??= FillOptionDefault
        options.fill.color ??= FillOptionDefault.color
        options.fill.opacity ??= FillOptionDefault.opacity
        options.stroke ??= StrokeOptionDefault
        options.stroke.color ??= StrokeOptionDefault.color
        options.stroke.width ??= StrokeOptionDefault.width
        options.stroke.opacity ??= StrokeOptionDefault.opacity
        options.stroke.position ??= "middle"
        options.stroke.dash ??= DashOptionDefault
        options.stroke.dash.array ??= DashOptionDefault.array
        options.stroke.dash.offset ??= DashOptionDefault.offset

        let drFill: number = options.stroke.position === "middle" ? options.stroke.width/2 : 
                                (options.stroke.position === "outer" ? options.stroke.width : 0)



        return sharp(Buffer.from(`
            <svg viewBox="0 0 ${ radius*2 } ${ radius*2 }" xmlns="http://www.w3.org/2000/svg">
                <circle 
                    cx="${ radius }"
                    cy="${ radius }"
                    r="${ radius - drFill }"
                    fill="${ options.fill.color }"
                    fill-opacity="${ options.fill.opacity }"
                    stroke="none"
                />
                ${ options.stroke.color !== "none" ? `
                <circle 
                    cx="${ radius }"
                    cy="${ radius }"
                    r="${ radius - options.stroke.width/2 }"
                    fill="none"
                    stroke="${ options.stroke.color }"
                    stroke-width="${ options.stroke.width }"
                    stroke-opacity="${ options.stroke.opacity }"
                    stroke-dasharray="${ options.stroke.dash.array.join(" ") }"
                    stroke-dashoffset="${ options.stroke.dash.offset }"
                />
                ` : "" }
            </svg>
        `))
    }
}