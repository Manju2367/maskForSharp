import sharp from "sharp"



export interface CoordinateOptions {
    x: number
    y: number
}

export interface FillOption {
    color: string
    opacity: number
}

export interface DashOption {
    array: Array<number>
    offset: number
}

export interface StrokeOption {
    color: string,
    width: number,
    opacity: number,
    dash: Partial<DashOption>
}

export interface ShapeOption {
    imageWidth?: number
    imageHeight?: number
    fill: Partial<FillOption>
    stroke: Partial<StrokeOption>
}

export interface Circle {
    (radius: number, cx: number, cy: number, options?: Partial<ShapeOption>): sharp.Sharp
    (radius: number, options?: Partial<ShapeOption>): sharp.Sharp
}

export interface RoundedRect {
    (width: number, height: number, x: number, y: number, round: number, options?: Partial<ShapeOption>): sharp.Sharp
    (width: number, height: number, round: number, options?: Partial<ShapeOption>): sharp.Sharp
}

export interface Rect {
    (width: number, height: number, x: number, y: number, options?: Partial<ShapeOption>): sharp.Sharp
    (width: number, height: number, options?: Partial<ShapeOption>): sharp.Sharp
}