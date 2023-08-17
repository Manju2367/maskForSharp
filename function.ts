import sharp from "sharp"
import { FillOptions, DashOptions, StrokeOptions, ShapeOptions, CoordinateOptions } from "./interface"



//---------------------------------------
// Functions
//---------------------------------------

export const getImageInfo = (s: sharp.Sharp): Promise<sharp.OutputInfo> => {
    return new Promise((resolve, reject) => {
        s.toBuffer((err, buffer, info) => {
            if(!err) {
                resolve(info)
            } else {
                reject(err)
            }
        })
    })
}



//---------------------------------------
// Functions check type
//---------------------------------------

export const isCoordinateOption = (value: unknown): value is CoordinateOptions => {
    if(typeof value !== "object" || value === null) {
        return false
    }

    const { x, y } = value as Record<keyof CoordinateOptions, unknown>

    if(typeof x !== "number" && typeof x !== "undefined") {
        return false
    }

    if(typeof y !== "number" && typeof y !== "undefined") {
        return false
    }

    return true
}

export const isFillOption = (value: unknown): value is FillOptions => {
    if(typeof value !== "object" || value === null) {
        return false
    }

    const { color, opacity } = value as Record<keyof FillOptions, unknown>

    if(typeof color !== "string" && typeof color !== "undefined") {
        return false
    }

    if(typeof opacity !== "number" && typeof opacity !== "undefined") {
        return false
    }

    return true
}

export const isDashOption = (value: unknown): value is DashOptions => {
    if(typeof value !== "object" || value === null) {
        return false
    }

    const { array, offset } = value as Record<keyof DashOptions, unknown>

    if(!(array instanceof Array) && typeof array !== "undefined") {
        return false
    }

    if(typeof offset !== "number" && typeof offset !== "undefined") {
        return false
    }

    return true
}

export const isStrokeOption = (value: unknown): value is StrokeOptions => {
    if(typeof value !== "object" || value === null) {
        return false
    }

    const { color, width, opacity, dash } = value as Record<keyof StrokeOptions, unknown>

    if(typeof color !== "string" && typeof color !== "undefined") {
        return false
    }

    if(typeof width !== "number" && typeof width !== "undefined") {
        return false
    }

    if(typeof opacity !== "number" && typeof opacity !== "undefined") {
        return false
    }

    if(!isDashOption(dash) && typeof dash !== "undefined") {
        return false
    }

    return true
}

export const isShapeOption = (value: unknown): value is ShapeOptions => {
    if(typeof value !== "object" || value === null) {
        return false
    }

    const { fill, stroke } = value as Record<keyof ShapeOptions, unknown>

    if(!isFillOption(fill) && typeof fill !== "undefined") {
        return false
    }

    if(!isStrokeOption(stroke) && typeof stroke !== "undefined") {
        return false
    }

    return true
}