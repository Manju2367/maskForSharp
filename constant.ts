import { FillOption, DashOption, StrokeOption, ShapeOption } from "./interface"



export const FillOptionDefault: FillOption = {
    color: "black",
    opacity: 1
}

export const DashOptionDefault: DashOption = {
    array: [],
    offset: 0
}

export const StrokeOptionDefault: StrokeOption = {
    color: "none",
    width: 1,
    opacity: 1,
    dash: DashOptionDefault
}

export const ShapeOptionDefault: ShapeOption = {
    fill: FillOptionDefault,
    stroke: StrokeOptionDefault
}