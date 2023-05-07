import sharp from "sharp"
import { CoordinateOptions, FillOption, DashOption, StrokeOption, ShapeOption, CreateCircle, CreateRect  } from "./interface"
import { ShapeOptionDefault, FillOptionDefault, StrokeOptionDefault, DashOptionDefault } from "./constant"
import { isShapeOption } from "./function"





/**
 * imageに対してmaskを用いてマスク処理をします。
 * @param image 処理対称のsharpオブジェクト
 * @param mask マスク画像のsharpオブジェクト
 * @param options 
 * @param options.x maskを適応するx座標
 * @param options.y maskを適応するy座標
 * @returns 
 */
export const mask = async (image: sharp.Sharp, mask: sharp.Sharp, options: Partial<CoordinateOptions> = {
    x: 0,
    y: 0 
}): Promise<sharp.Sharp> => {
    options ??= {
        x: 0,
        y: 0
    }
    options.x ??= 0
    options.y ??= 0

    if((await image.metadata()).channels === 3) image.ensureAlpha(1)

    return new Promise((resolve, reject) => {
        image.raw().toBuffer(async (err, data, info) => {
            if(!err) {
                let maskWidth = ((await mask.metadata()).width ?? 0) + (options.x ?? 0)
                let maskHeight = ((await mask.metadata()).height ?? 0) + (options.y ?? 0)

                if(maskWidth > info.width || maskHeight > info.height) {
                    mask.extract({
                        left: 0,
                        top: 0,
                        width: maskWidth > info.width ? info.width - (options.x ?? 0) : (maskWidth - (options.x ?? 0)),
                        height: maskHeight > info.height ? info.height - (options.y ?? 0) : (maskHeight - (options.y ?? 0))
                    })
                }

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
        options.stroke.dash ??= DashOptionDefault
        options.stroke.dash.array ??= DashOptionDefault.array
        options.stroke.dash.offset ??= DashOptionDefault.offset



        return sharp(Buffer.from(`
            <svg viewBox="0 0 ${ width } ${ height }">
                <circle 
                    cx="${ cx }"
                    cy="${ cy }"
                    r="${ radius - (options.stroke.color !== "none" ? options.stroke.width/2 : 0) }"
                    fill="${ options.fill.color }"
                    fill-opacity="${ options.fill.opacity }"
                    stroke="${ options.stroke.color }"
                    stroke-width="${ options.stroke.width }"
                    stroke-opacity="${ options.stroke.opacity }"
                    stroke-dasharray="${ options.stroke.dash.array.join(" ") }"
                    stroke-dashoffset="${ options.stroke.dash.offset }"
                />
            </svg>
        `))
    } else if(typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && (typeof args[3] === "undefined" || isShapeOption(args[3]))) {
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
        options.stroke.dash ??= DashOptionDefault
        options.stroke.dash.array ??= DashOptionDefault.array
        options.stroke.dash.offset ??= DashOptionDefault.offset



        return sharp(Buffer.from(`
            <svg viewBox="0 0 ${ radius + cx } ${ radius + cy }">
                <circle 
                    cx="${ cx }"
                    cy="${ cy }"
                    r="${ radius - (options.stroke.color !== "none" ? options.stroke.width/2 : 0) }"
                    fill="${ options.fill.color }"
                    fill-opacity="${ options.fill.opacity }"
                    stroke="${ options.stroke.color }"
                    stroke-width="${ options.stroke.width }"
                    stroke-opacity="${ options.stroke.opacity }"
                    stroke-dasharray="${ options.stroke.dash.array.join(" ") }"
                    stroke-dashoffset="${ options.stroke.dash.offset }"
                />
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
        options.stroke.dash ??= DashOptionDefault
        options.stroke.dash.array ??= DashOptionDefault.array
        options.stroke.dash.offset ??= DashOptionDefault.offset



        return sharp(Buffer.from(`
            <svg viewBox="0 0 ${ radius*2 } ${ radius*2 }">
                <circle 
                    cx="${ radius }"
                    cy="${ radius }"
                    r="${ radius - (options.stroke.color !== "none" ? options.stroke.width/2 : 0) }"
                    fill="${ options.fill.color }"
                    fill-opacity="${ options.fill.opacity }"
                    stroke="${ options.stroke.color }"
                    stroke-width="${ options.stroke.width }"
                    stroke-opacity="${ options.stroke.opacity }"
                    stroke-dasharray="${ options.stroke.dash.array.join(" ") }"
                    stroke-dashoffset="${ options.stroke.dash.offset }"
                />
            </svg>
        `))
    }
}

export const createRect: CreateRect = (...args: any): sharp.Sharp => {
    if(typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && typeof args[4] === "number" && (typeof args[5] === "undefined" || isShapeOption(args[5]))) {
        let width: number = args[0]
        let height: number = args[1]
        let x: number = args[2]
        let y: number = args[3]
        let round: number = args[4]
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
        options.stroke.dash ??= DashOptionDefault
        options.stroke.dash.array ??= DashOptionDefault.array
        options.stroke.dash.offset ??= DashOptionDefault.offset


     
        return sharp(Buffer.from(`
            <svg viewBox="0 0 ${ width + x } ${ height + y }">
                <rect 
                    width="${ width - (options.stroke.color !== "none" ? options.stroke.width : 0) }"
                    height="${ height - (options.stroke.color !== "none" ? options.stroke.width : 0) }"
                    x="${ x + (options.stroke.color !== "none" ? options.stroke.width/2 : 0) }"
                    y="${ y + (options.stroke.color !== "none" ? options.stroke.width/2 : 0) }"
                    rx="${ round }"
                    ry="${ round }"
                    fill="${ options.fill.color }"
                    fill-opacity="${ options.fill.opacity }"
                    stroke="${ options.stroke.color }"
                    stroke-width="${ options.stroke.width }"
                    stroke-opacity="${ options.stroke.opacity }"
                    stroke-dasharray="${ options.stroke.dash.array.join(" ") }"
                    stroke-dashoffset="${ options.stroke.dash.offset }"
                />
            </svg>
        `))
    } else if(typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && (typeof args[4] === "undefined" || isShapeOption(args[4]))) {
        let width: number = args[0]
        let height: number = args[1]
        let x: number = args[2]
        let y: number = args[3]
        let options: ShapeOption|undefined = args[4]

        // init options
        options ??= ShapeOptionDefault
        options.fill ??= FillOptionDefault
        options.fill.color ??= FillOptionDefault.color
        options.fill.opacity ??= FillOptionDefault.opacity
        options.stroke ??= StrokeOptionDefault
        options.stroke.color ??= StrokeOptionDefault.color
        options.stroke.width ??= StrokeOptionDefault.width
        options.stroke.opacity ??= StrokeOptionDefault.opacity
        options.stroke.dash ??= DashOptionDefault
        options.stroke.dash.array ??= DashOptionDefault.array
        options.stroke.dash.offset ??= DashOptionDefault.offset


     
        return sharp(Buffer.from(`
            <svg viewBox="0 0 ${ width + x } ${ height + y }">
                <rect 
                    width="${ width - (options.stroke.color !== "none" ? options.stroke.width : 0) }"
                    height="${ height - (options.stroke.color !== "none" ? options.stroke.width : 0) }"
                    x="${ x + (options.stroke.color !== "none" ? options.stroke.width/2 : 0) }"
                    y="${ y + (options.stroke.color !== "none" ? options.stroke.width/2 : 0) }"
                    rx="0"
                    ry="0"
                    fill="${ options.fill.color }"
                    fill-opacity="${ options.fill.opacity }"
                    stroke="${ options.stroke.color }"
                    stroke-width="${ options.stroke.width }"
                    stroke-opacity="${ options.stroke.opacity }"
                    stroke-dasharray="${ options.stroke.dash.array.join(" ") }"
                    stroke-dashoffset="${ options.stroke.dash.offset }"
                />
            </svg>
        `))
    } else if(typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && (typeof args[3] === "undefined" || isShapeOption(args[3]))) {
        let width: number = args[0]
        let height: number = args[1]
        let round: number = args[2]
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
        options.stroke.dash ??= DashOptionDefault
        options.stroke.dash.array ??= DashOptionDefault.array
        options.stroke.dash.offset ??= DashOptionDefault.offset
        


        return sharp(Buffer.from(`
            <svg viewBox="0 0 ${ width } ${ height }">
                <rect 
                    width="${ width - (options.stroke.color !== "none" ? options.stroke.width : 0) }"
                    height="${ height - (options.stroke.color !== "none" ? options.stroke.width : 0) }"
                    x="${ options.stroke.color !== "none" ? options.stroke.width/2 : 0 }"
                    y="${ options.stroke.color !== "none" ? options.stroke.width/2 : 0 }"
                    rx="${ round }"
                    ry="${ round }"
                    fill="${ options.fill.color }"
                    fill-opacity="${ options.fill.opacity }"
                    stroke="${ options.stroke.color }"
                    stroke-width="${ options.stroke.width }"
                    stroke-opacity="${ options.stroke.opacity }"
                    stroke-dasharray="${ options.stroke.dash.array.join(" ") }"
                    stroke-dashoffset="${ options.stroke.dash.offset }"
                />
            </svg>
        `))
    } else {
        let width: number = args[0]
        let height: number = args[1]
        let options: ShapeOption|undefined = args[2]

        // init options
        options ??= ShapeOptionDefault
        options.fill ??= FillOptionDefault
        options.fill.color ??= FillOptionDefault.color
        options.fill.opacity ??= FillOptionDefault.opacity
        options.stroke ??= StrokeOptionDefault
        options.stroke.color ??= StrokeOptionDefault.color
        options.stroke.width ??= StrokeOptionDefault.width
        options.stroke.opacity ??= StrokeOptionDefault.opacity
        options.stroke.dash ??= DashOptionDefault
        options.stroke.dash.array ??= DashOptionDefault.array
        options.stroke.dash.offset ??= DashOptionDefault.offset



        return sharp(Buffer.from(`
        <svg viewBox="0 0 ${ width } ${ height }">
            <rect 
                width="${ width }"
                height="${ height }"
                x="0"
                y="0"
                rx="0"
                ry="0"
                fill="${ options.fill.color }"
                fill-opacity="${ options.fill.opacity }"
                stroke="${ options.stroke.color }"
                stroke-width="${ options.stroke.width }"
                stroke-opacity="${ options.stroke.opacity }"
                stroke-dasharray="${ options.stroke.dash.array.join(" ") }"
                stroke-dashoffset="${ options.stroke.dash.offset }"
            />
        </svg>
        `))
    }
}