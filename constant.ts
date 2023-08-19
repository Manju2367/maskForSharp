import { FillOptions, DashOptions, StrokeOptions, ShapeOptions, RGBAOptions } from "./interface"



export const FillOptionDefault: FillOptions = {
    color: "black",
    opacity: 1
}

export const RGBAOptionDefault: RGBAOptions = {
    r: 0xFF,
    g: 0xFF,
    b: 0xFF,
    alpha: 0
}

export const DashOptionDefault: DashOptions = {
    array: [],
    offset: 0
}

export const StrokeOptionDefault: StrokeOptions = {
    color: "none",
    width: 1,
    opacity: 1,
    dash: DashOptionDefault
}

export const ShapeOptionDefault: ShapeOptions = {
    fill: FillOptionDefault,
    stroke: StrokeOptionDefault
}