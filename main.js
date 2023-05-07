"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRect = exports.createCircle = exports.mask = void 0;
const sharp_1 = __importDefault(require("sharp"));
const constant_1 = require("./constant");
const function_1 = require("./function");
/**
 * imageに対してmaskを用いてマスク処理をします。
 * @param image 処理対称のsharpオブジェクト
 * @param mask マスク画像のsharpオブジェクト
 * @param options
 * @param options.x maskを適応するx座標
 * @param options.y maskを適応するy座標
 * @returns
 */
const mask = async (image, mask, options = {
    x: 0,
    y: 0
}) => {
    options ??= {
        x: 0,
        y: 0
    };
    options.x ??= 0;
    options.y ??= 0;
    if ((await image.metadata()).channels === 3)
        image.ensureAlpha(1);
    return new Promise((resolve, reject) => {
        image.raw().toBuffer(async (err, data, info) => {
            if (!err) {
                let maskWidth = ((await mask.metadata()).width ?? 0) + (options.x ?? 0);
                let maskHeight = ((await mask.metadata()).height ?? 0) + (options.y ?? 0);
                if (maskWidth > info.width || maskHeight > info.height) {
                    mask.extract({
                        left: 0,
                        top: 0,
                        width: maskWidth > info.width ? info.width - (options.x ?? 0) : (maskWidth - (options.x ?? 0)),
                        height: maskHeight > info.height ? info.height - (options.y ?? 0) : (maskHeight - (options.y ?? 0))
                    });
                }
                let maskBuffer = await mask.toBuffer();
                let paste = await (0, sharp_1.default)({
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
                    }]).grayscale().raw().toBuffer();
                data.forEach((v, i) => {
                    if ((i + 1) % 4 === 0) {
                        data[i] *= paste[(i + 1) / 4] / 0xFF;
                    }
                });
                resolve((0, sharp_1.default)(data, {
                    raw: {
                        width: info.width,
                        height: info.height,
                        channels: 4
                    }
                }));
            }
            else {
                reject(err);
            }
        });
    });
};
exports.mask = mask;
const createCircle = (...args) => {
    if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && typeof args[4] === "number" && (typeof args[5] === "undefined" || (0, function_1.isShapeOption)(args[5]))) {
        let radius = args[0];
        let cx = args[1];
        let cy = args[2];
        let width = args[3];
        let height = args[4];
        let options = args[5];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.fill ??= constant_1.FillOptionDefault;
        options.fill.color ??= constant_1.FillOptionDefault.color;
        options.fill.opacity ??= constant_1.FillOptionDefault.opacity;
        options.stroke ??= constant_1.StrokeOptionDefault;
        options.stroke.color ??= constant_1.StrokeOptionDefault.color;
        options.stroke.width ??= constant_1.StrokeOptionDefault.width;
        options.stroke.opacity ??= constant_1.StrokeOptionDefault.opacity;
        options.stroke.dash ??= constant_1.DashOptionDefault;
        options.stroke.dash.array ??= constant_1.DashOptionDefault.array;
        options.stroke.dash.offset ??= constant_1.DashOptionDefault.offset;
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${width} ${height}">
                <circle 
                    cx="${cx}"
                    cy="${cy}"
                    r="${radius - (options.stroke.color !== "none" ? options.stroke.width / 2 : 0)}"
                    fill="${options.fill.color}"
                    fill-opacity="${options.fill.opacity}"
                    stroke="${options.stroke.color}"
                    stroke-width="${options.stroke.width}"
                    stroke-opacity="${options.stroke.opacity}"
                    stroke-dasharray="${options.stroke.dash.array.join(" ")}"
                    stroke-dashoffset="${options.stroke.dash.offset}"
                />
            </svg>
        `));
    }
    else if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && (typeof args[3] === "undefined" || (0, function_1.isShapeOption)(args[3]))) {
        let radius = args[0];
        let cx = args[1];
        let cy = args[2];
        let options = args[3];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.fill ??= constant_1.FillOptionDefault;
        options.fill.color ??= constant_1.FillOptionDefault.color;
        options.fill.opacity ??= constant_1.FillOptionDefault.opacity;
        options.stroke ??= constant_1.StrokeOptionDefault;
        options.stroke.color ??= constant_1.StrokeOptionDefault.color;
        options.stroke.width ??= constant_1.StrokeOptionDefault.width;
        options.stroke.opacity ??= constant_1.StrokeOptionDefault.opacity;
        options.stroke.dash ??= constant_1.DashOptionDefault;
        options.stroke.dash.array ??= constant_1.DashOptionDefault.array;
        options.stroke.dash.offset ??= constant_1.DashOptionDefault.offset;
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${radius + cx} ${radius + cy}">
                <circle 
                    cx="${cx}"
                    cy="${cy}"
                    r="${radius - (options.stroke.color !== "none" ? options.stroke.width / 2 : 0)}"
                    fill="${options.fill.color}"
                    fill-opacity="${options.fill.opacity}"
                    stroke="${options.stroke.color}"
                    stroke-width="${options.stroke.width}"
                    stroke-opacity="${options.stroke.opacity}"
                    stroke-dasharray="${options.stroke.dash.array.join(" ")}"
                    stroke-dashoffset="${options.stroke.dash.offset}"
                />
            </svg>
        `));
    }
    else {
        let radius = args[0];
        let options = args[1];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.fill ??= constant_1.FillOptionDefault;
        options.fill.color ??= constant_1.FillOptionDefault.color;
        options.fill.opacity ??= constant_1.FillOptionDefault.opacity;
        options.stroke ??= constant_1.StrokeOptionDefault;
        options.stroke.color ??= constant_1.StrokeOptionDefault.color;
        options.stroke.width ??= constant_1.StrokeOptionDefault.width;
        options.stroke.opacity ??= constant_1.StrokeOptionDefault.opacity;
        options.stroke.dash ??= constant_1.DashOptionDefault;
        options.stroke.dash.array ??= constant_1.DashOptionDefault.array;
        options.stroke.dash.offset ??= constant_1.DashOptionDefault.offset;
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${radius * 2} ${radius * 2}">
                <circle 
                    cx="${radius}"
                    cy="${radius}"
                    r="${radius - (options.stroke.color !== "none" ? options.stroke.width / 2 : 0)}"
                    fill="${options.fill.color}"
                    fill-opacity="${options.fill.opacity}"
                    stroke="${options.stroke.color}"
                    stroke-width="${options.stroke.width}"
                    stroke-opacity="${options.stroke.opacity}"
                    stroke-dasharray="${options.stroke.dash.array.join(" ")}"
                    stroke-dashoffset="${options.stroke.dash.offset}"
                />
            </svg>
        `));
    }
};
exports.createCircle = createCircle;
const createRect = (...args) => {
    if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && typeof args[4] === "number" && (typeof args[5] === "undefined" || (0, function_1.isShapeOption)(args[5]))) {
        let width = args[0];
        let height = args[1];
        let x = args[2];
        let y = args[3];
        let round = args[4];
        let options = args[5];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.fill ??= constant_1.FillOptionDefault;
        options.fill.color ??= constant_1.FillOptionDefault.color;
        options.fill.opacity ??= constant_1.FillOptionDefault.opacity;
        options.stroke ??= constant_1.StrokeOptionDefault;
        options.stroke.color ??= constant_1.StrokeOptionDefault.color;
        options.stroke.width ??= constant_1.StrokeOptionDefault.width;
        options.stroke.opacity ??= constant_1.StrokeOptionDefault.opacity;
        options.stroke.dash ??= constant_1.DashOptionDefault;
        options.stroke.dash.array ??= constant_1.DashOptionDefault.array;
        options.stroke.dash.offset ??= constant_1.DashOptionDefault.offset;
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${width + x} ${height + y}">
                <rect 
                    width="${width - (options.stroke.color !== "none" ? options.stroke.width : 0)}"
                    height="${height - (options.stroke.color !== "none" ? options.stroke.width : 0)}"
                    x="${x + (options.stroke.color !== "none" ? options.stroke.width / 2 : 0)}"
                    y="${y + (options.stroke.color !== "none" ? options.stroke.width / 2 : 0)}"
                    rx="${round}"
                    ry="${round}"
                    fill="${options.fill.color}"
                    fill-opacity="${options.fill.opacity}"
                    stroke="${options.stroke.color}"
                    stroke-width="${options.stroke.width}"
                    stroke-opacity="${options.stroke.opacity}"
                    stroke-dasharray="${options.stroke.dash.array.join(" ")}"
                    stroke-dashoffset="${options.stroke.dash.offset}"
                />
            </svg>
        `));
    }
    else if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && (typeof args[4] === "undefined" || (0, function_1.isShapeOption)(args[4]))) {
        let width = args[0];
        let height = args[1];
        let x = args[2];
        let y = args[3];
        let options = args[4];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.fill ??= constant_1.FillOptionDefault;
        options.fill.color ??= constant_1.FillOptionDefault.color;
        options.fill.opacity ??= constant_1.FillOptionDefault.opacity;
        options.stroke ??= constant_1.StrokeOptionDefault;
        options.stroke.color ??= constant_1.StrokeOptionDefault.color;
        options.stroke.width ??= constant_1.StrokeOptionDefault.width;
        options.stroke.opacity ??= constant_1.StrokeOptionDefault.opacity;
        options.stroke.dash ??= constant_1.DashOptionDefault;
        options.stroke.dash.array ??= constant_1.DashOptionDefault.array;
        options.stroke.dash.offset ??= constant_1.DashOptionDefault.offset;
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${width + x} ${height + y}">
                <rect 
                    width="${width - (options.stroke.color !== "none" ? options.stroke.width : 0)}"
                    height="${height - (options.stroke.color !== "none" ? options.stroke.width : 0)}"
                    x="${x + (options.stroke.color !== "none" ? options.stroke.width / 2 : 0)}"
                    y="${y + (options.stroke.color !== "none" ? options.stroke.width / 2 : 0)}"
                    rx="0"
                    ry="0"
                    fill="${options.fill.color}"
                    fill-opacity="${options.fill.opacity}"
                    stroke="${options.stroke.color}"
                    stroke-width="${options.stroke.width}"
                    stroke-opacity="${options.stroke.opacity}"
                    stroke-dasharray="${options.stroke.dash.array.join(" ")}"
                    stroke-dashoffset="${options.stroke.dash.offset}"
                />
            </svg>
        `));
    }
    else if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && (typeof args[3] === "undefined" || (0, function_1.isShapeOption)(args[3]))) {
        let width = args[0];
        let height = args[1];
        let round = args[2];
        let options = args[3];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.fill ??= constant_1.FillOptionDefault;
        options.fill.color ??= constant_1.FillOptionDefault.color;
        options.fill.opacity ??= constant_1.FillOptionDefault.opacity;
        options.stroke ??= constant_1.StrokeOptionDefault;
        options.stroke.color ??= constant_1.StrokeOptionDefault.color;
        options.stroke.width ??= constant_1.StrokeOptionDefault.width;
        options.stroke.opacity ??= constant_1.StrokeOptionDefault.opacity;
        options.stroke.dash ??= constant_1.DashOptionDefault;
        options.stroke.dash.array ??= constant_1.DashOptionDefault.array;
        options.stroke.dash.offset ??= constant_1.DashOptionDefault.offset;
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${width} ${height}">
                <rect 
                    width="${width - (options.stroke.color !== "none" ? options.stroke.width : 0)}"
                    height="${height - (options.stroke.color !== "none" ? options.stroke.width : 0)}"
                    x="${options.stroke.color !== "none" ? options.stroke.width / 2 : 0}"
                    y="${options.stroke.color !== "none" ? options.stroke.width / 2 : 0}"
                    rx="${round}"
                    ry="${round}"
                    fill="${options.fill.color}"
                    fill-opacity="${options.fill.opacity}"
                    stroke="${options.stroke.color}"
                    stroke-width="${options.stroke.width}"
                    stroke-opacity="${options.stroke.opacity}"
                    stroke-dasharray="${options.stroke.dash.array.join(" ")}"
                    stroke-dashoffset="${options.stroke.dash.offset}"
                />
            </svg>
        `));
    }
    else {
        let width = args[0];
        let height = args[1];
        let options = args[2];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.fill ??= constant_1.FillOptionDefault;
        options.fill.color ??= constant_1.FillOptionDefault.color;
        options.fill.opacity ??= constant_1.FillOptionDefault.opacity;
        options.stroke ??= constant_1.StrokeOptionDefault;
        options.stroke.color ??= constant_1.StrokeOptionDefault.color;
        options.stroke.width ??= constant_1.StrokeOptionDefault.width;
        options.stroke.opacity ??= constant_1.StrokeOptionDefault.opacity;
        options.stroke.dash ??= constant_1.DashOptionDefault;
        options.stroke.dash.array ??= constant_1.DashOptionDefault.array;
        options.stroke.dash.offset ??= constant_1.DashOptionDefault.offset;
        return (0, sharp_1.default)(Buffer.from(`
        <svg viewBox="0 0 ${width} ${height}">
            <rect 
                width="${width}"
                height="${height}"
                x="0"
                y="0"
                rx="0"
                ry="0"
                fill="${options.fill.color}"
                fill-opacity="${options.fill.opacity}"
                stroke="${options.stroke.color}"
                stroke-width="${options.stroke.width}"
                stroke-opacity="${options.stroke.opacity}"
                stroke-dasharray="${options.stroke.dash.array.join(" ")}"
                stroke-dashoffset="${options.stroke.dash.offset}"
            />
        </svg>
        `));
    }
};
exports.createRect = createRect;
