import sharp from "sharp"
import { ShapeOption, Mask, Circle, RoundedRect, Rect, RegularPolygon  } from "./interface"
import { ShapeOptionDefault, FillOptionDefault, StrokeOptionDefault, DashOptionDefault } from "./constant"
import { getImageInfo, isShapeOption } from "./function"
import { UnknownArgumentsError } from "./exception"





export const mask: Mask = async (image, mask, options?): Promise<sharp.Sharp> => {
    if((await image.metadata()).channels === 3) image.ensureAlpha(1)

    return new Promise((resolve, reject) => {
        image.raw().toBuffer(async (err, data, info) => {
            if(!err) {
                options ??= {
                    x: 0,
                    y: 0
                }
                options.x ??= 0
                options.y ??= 0



                let maskInfo = await getImageInfo(mask)
                let maskWidth = maskInfo.width + options.x
                let maskHeight = maskInfo.height + options.y

                if(maskWidth > info.width || maskHeight > info.height) {
                    console.log("extract")
                    mask.extract({
                        left: 0,
                        top: 0,
                        width: maskWidth > info.width ? info.width - options.x : (maskWidth - options.x),
                        height: maskHeight > info.height ? info.height - options.y : (maskHeight - options.y)
                    })
                }

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
                    input: await mask.toBuffer(),
                    left: options.x,
                    top: options.y
                }]).grayscale().raw().toBuffer()
                
                data.forEach((v: number, i: number) => {
                    if((i - 3) % 4 === 0) {
                        data[i] *= paste[(i - 3)/4] / 0xFF
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

export const circle: Circle = (...args: any): sharp.Sharp => {
    if(typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && (typeof args[3] === "undefined" || isShapeOption(args[3]))) {
        let radius: number = args[0]
        let cx: number = args[1]
        let cy: number = args[2]
        let options: ShapeOption|undefined = args[3]

        // init options
        options ??= ShapeOptionDefault
        options.imageWidth ??= radius + cx
        options.imageHeight ??= radius + cy
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
            <svg viewBox="0 0 ${ options.imageWidth } ${ options.imageHeight }">
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
    } else if(typeof args[0] === "number" && (typeof args[1] === "undefined" || isShapeOption(args[1]))) {
        let radius: number = args[0]
        let options: ShapeOption|undefined = args[1]

        // init options
        options ??= ShapeOptionDefault
        options.imageWidth ??= radius * 2
        options.imageHeight ??= radius * 2
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
            <svg viewBox="0 0 ${ options.imageWidth } ${ options.imageHeight }">
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
    } else {
        throw new UnknownArgumentsError("Unknown arguments exception")
    }
}

export const roundedRect: RoundedRect = (...args: any): sharp.Sharp => {
    if(typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && typeof args[4] === "number" && (typeof args[5] === "undefined" || isShapeOption(args[5]))) {
        let width: number = args[0]
        let height: number = args[1]
        let x: number = args[2]
        let y: number = args[3]
        let round: number = args[4]
        let options: ShapeOption|undefined = args[5]

        // init options
        options ??= ShapeOptionDefault
        options.imageWidth ??= width + x
        options.imageHeight ??= height + y
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
            <svg viewBox="0 0 ${ options.imageWidth } ${ options.imageHeight }">
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
    } else if(typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && (typeof args[3] === "undefined" || isShapeOption(args[3]))) {
        let width: number = args[0]
        let height: number = args[1]
        let round: number = args[2]
        let options: ShapeOption|undefined = args[3]

        // init options
        options ??= ShapeOptionDefault
        options.imageWidth ??= width
        options.imageHeight ??= height
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
        <svg viewBox="0 0 ${ options.imageWidth } ${ options.imageHeight }">
            <rect 
                width="${ width - (options.stroke.color !== "none" ? options.stroke.width : 0) }"
                height="${ height - (options.stroke.color !== "none" ? options.stroke.width : 0) }"
                x="${ (options.stroke.color !== "none" ? options.stroke.width/2 : 0) }"
                y="${ (options.stroke.color !== "none" ? options.stroke.width/2 : 0) }"
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
        throw new UnknownArgumentsError("Unknown arguments exception")
    }
}

export const rect: Rect = (...args: any): sharp.Sharp => {
    if(typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && (typeof args[4] === "undefined" || isShapeOption(args[4]))) {
        let width: number = args[0]
        let height: number = args[1]
        let x: number = args[2]
        let y: number = args[3]
        let options: ShapeOption|undefined = args[4]


     
        return roundedRect(width, height, x, y, 0, options)
    } else if(typeof args[0] === "number" && typeof args[1] === "number" && (typeof args[2] === "undefined" || isShapeOption(args[2]))) {
        let width: number = args[0]
        let height: number = args[1]
        let options: ShapeOption|undefined = args[2]



        return roundedRect(width, height, 0, options)
    } else {
        throw new UnknownArgumentsError("Unknown arguments exception")
    }
}

export const regularPolygon: RegularPolygon = (...args: any): sharp.Sharp => {
    if(typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && (typeof args[4] === "undefined" || isShapeOption(args[4]))) {
        let n: number = args[0]
        let r: number = args[1]
        let rx: number = args[2]
        let ry: number = args[3]
        let options: ShapeOption|undefined = args[4]

        // init options
        options ??= ShapeOptionDefault
        options.imageWidth ??= rx + r
        options.imageHeight ??= ry + r
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



        let points: Array<string> = []
        let angle: number = Math.PI
        // 内側の頂点と外側の頂点の距離
        let strokeWidthCos = options.stroke.color !== "none" ?
            options.stroke.width / Math.cos(Math.PI/2 - ((Math.PI * (n - 2)) / (2*n))) :
            0
        for(let i = 0; i < n; i++) {
            points.push(`${ Math.sin(angle) * (r - strokeWidthCos) + rx },${ Math.cos(angle) * (r - strokeWidthCos) + ry }`)
            angle += 2*Math.PI / n
        }
    
        return sharp(Buffer.from(`
            <svg viewBox="0 0 ${ options.imageWidth } ${ options.imageHeight }">
                <polygon 
                    points="${ points.join(" ") }"
                    fill="${ options.fill.color }"
                    fill-opacity="${ options.fill.opacity }"
                    stroke="${ options.stroke.color }"
                    stroke-width="${ options.stroke.width*2 }"
                    stroke-opacity="${ options.stroke.opacity }"
                    stroke-dasharray="${ options.stroke.dash.array.join(" ") }"
                    stroke-dashoffset="${ options.stroke.dash.offset }"
                />
            </svg>
        `))
    } else if(typeof args[0] === "number" && typeof args[1] === "number" && (typeof args[2] === "undefined" || isShapeOption(args[2]))) {
        let n: number = args[0]
        let r: number = args[1]
        let options: ShapeOption|undefined = args[2]

        // init options
        options ??= ShapeOptionDefault
        options.imageWidth ??= r * 2
        options.imageHeight ??= r * 2
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



        let points: Array<string> = []
        let angle: number = Math.PI
        // 内側の頂点と外側の頂点の距離
        let strokeWidthCos = options.stroke.color !== "none" ?
            options.stroke.width / Math.cos(Math.PI/2 - ((Math.PI * (n - 2)) / (2*n))) :
            0
        console.log(strokeWidthCos)
        for(let i = 0; i < n; i++) {
            points.push(`${ Math.sin(angle) * (r - strokeWidthCos) + r },${ Math.cos(angle) * (r - strokeWidthCos) + r }`)
            angle += 2*Math.PI / n
        }
    
        return sharp(Buffer.from(`
            <svg viewBox="0 0 ${ options.imageWidth } ${ options.imageHeight }">
                <polygon 
                    points="${ points.join(" ") }"
                    fill="${ options.fill.color }"
                    fill-opacity="${ options.fill.opacity }"
                    stroke="${ options.stroke.color }"
                    stroke-width="${ options.stroke.width*2 }"
                    stroke-opacity="${ options.stroke.opacity }"
                    stroke-dasharray="${ options.stroke.dash.array.join(" ") }"
                    stroke-dashoffset="${ options.stroke.dash.offset }"
                />
            </svg>
        `))
    } else {
        throw new UnknownArgumentsError("Unknown arguments exception")
    }
}