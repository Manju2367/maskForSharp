"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeOptionDefault = exports.StrokeOptionDefault = exports.DashOptionDefault = exports.RGBAOptionDefault = exports.FillOptionDefault = void 0;
exports.FillOptionDefault = {
    color: "black",
    opacity: 1
};
exports.RGBAOptionDefault = {
    r: 0xFF,
    g: 0xFF,
    b: 0xFF,
    alpha: 0
};
exports.DashOptionDefault = {
    array: [],
    offset: 0
};
exports.StrokeOptionDefault = {
    color: "none",
    width: 1,
    opacity: 1,
    dash: exports.DashOptionDefault
};
exports.ShapeOptionDefault = {
    fill: exports.FillOptionDefault,
    stroke: exports.StrokeOptionDefault
};
