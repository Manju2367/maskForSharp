import { FillOption, DashOption, StrokeOption, ShapeOption } from "./interface"



export const isFillOption = (value: unknown): value is FillOption => {
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

export const isDashOption = (value: unknown): value is DashOption => {
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

export const isStrokeOption = (value: unknown): value is StrokeOption => {
    if(typeof value !== "object" || value === null) {
        return false
    }

    const { color, width, opacity, dash } = value as Record<keyof StrokeOption, unknown>

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

export const isShapeOption = (value: unknown): value is ShapeOption => {
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