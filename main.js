"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regularPolygon = exports.rect = exports.roundedRect = exports.circle = exports.mask = void 0;
const sharp_1 = __importDefault(require("sharp"));
const constant_1 = require("./constant");
const function_1 = require("./function");
const exception_1 = require("./exception");
const mask = async (image, mask, options) => {
    if ((await image.metadata()).channels === 3)
        image.ensureAlpha(1);
    return new Promise((resolve, reject) => {
        image.raw().toBuffer(async (err, data, info) => {
            if (!err) {
                options ??= {
                    x: 0,
                    y: 0
                };
                options.x ??= 0;
                options.y ??= 0;
                let maskInfo = await (0, function_1.getImageInfo)(mask);
                let maskWidth = maskInfo.width + options.x;
                let maskHeight = maskInfo.height + options.y;
                if (maskWidth > info.width || maskHeight > info.height) {
                    console.log("extract");
                    mask.extract({
                        left: 0,
                        top: 0,
                        width: maskWidth > info.width ? info.width - options.x : (maskWidth - options.x),
                        height: maskHeight > info.height ? info.height - options.y : (maskHeight - options.y)
                    });
                }
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
                        input: await mask.toBuffer(),
                        left: options.x,
                        top: options.y
                    }]).grayscale().raw().toBuffer();
                data.forEach((v, i) => {
                    if ((i - 3) % 4 === 0) {
                        data[i] *= paste[(i - 3) / 4] / 0xFF;
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
const circle = (...args) => {
    if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && (typeof args[3] === "undefined" || (0, function_1.isShapeOption)(args[3]))) {
        let radius = args[0];
        let cx = args[1];
        let cy = args[2];
        let options = args[3];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.imageWidth ??= radius + cx;
        options.imageHeight ??= radius + cy;
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
            <svg viewBox="0 0 ${options.imageWidth} ${options.imageHeight}">
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
    else if (typeof args[0] === "number" && (typeof args[1] === "undefined" || (0, function_1.isShapeOption)(args[1]))) {
        let radius = args[0];
        let options = args[1];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.imageWidth ??= radius * 2;
        options.imageHeight ??= radius * 2;
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
            <svg viewBox="0 0 ${options.imageWidth} ${options.imageHeight}">
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
    else {
        throw new exception_1.UnknownArgumentsError("Unknown arguments exception");
    }
};
exports.circle = circle;
const roundedRect = (...args) => {
    if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && typeof args[4] === "number" && (typeof args[5] === "undefined" || (0, function_1.isShapeOption)(args[5]))) {
        let width = args[0];
        let height = args[1];
        let x = args[2];
        let y = args[3];
        let round = args[4];
        let options = args[5];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.imageWidth ??= width + x;
        options.imageHeight ??= height + y;
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
            <svg viewBox="0 0 ${options.imageWidth} ${options.imageHeight}">
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
    else if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && (typeof args[3] === "undefined" || (0, function_1.isShapeOption)(args[3]))) {
        let width = args[0];
        let height = args[1];
        let round = args[2];
        let options = args[3];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.imageWidth ??= width;
        options.imageHeight ??= height;
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
        <svg viewBox="0 0 ${options.imageWidth} ${options.imageHeight}">
            <rect 
                width="${width - (options.stroke.color !== "none" ? options.stroke.width : 0)}"
                height="${height - (options.stroke.color !== "none" ? options.stroke.width : 0)}"
                x="${(options.stroke.color !== "none" ? options.stroke.width / 2 : 0)}"
                y="${(options.stroke.color !== "none" ? options.stroke.width / 2 : 0)}"
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
        throw new exception_1.UnknownArgumentsError("Unknown arguments exception");
    }
};
exports.roundedRect = roundedRect;
const rect = (...args) => {
    if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && (typeof args[4] === "undefined" || (0, function_1.isShapeOption)(args[4]))) {
        let width = args[0];
        let height = args[1];
        let x = args[2];
        let y = args[3];
        let options = args[4];
        return (0, exports.roundedRect)(width, height, x, y, 0, options);
    }
    else if (typeof args[0] === "number" && typeof args[1] === "number" && (typeof args[2] === "undefined" || (0, function_1.isShapeOption)(args[2]))) {
        let width = args[0];
        let height = args[1];
        let options = args[2];
        return (0, exports.roundedRect)(width, height, 0, options);
    }
    else {
        throw new exception_1.UnknownArgumentsError("Unknown arguments exception");
    }
};
exports.rect = rect;
const regularPolygon = (...args) => {
    if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && (typeof args[4] === "undefined" || (0, function_1.isShapeOption)(args[4]))) {
        let n = args[0];
        let r = args[1];
        let rx = args[2];
        let ry = args[3];
        let options = args[4];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.imageWidth ??= rx + r;
        options.imageHeight ??= ry + r;
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
        let points = [];
        let angle = Math.PI;
        // 内側の頂点と外側の頂点の距離
        let strokeWidthCos = options.stroke.color !== "none" ?
            options.stroke.width / Math.cos(Math.PI / 2 - ((Math.PI * (n - 2)) / (2 * n))) :
            0;
        for (let i = 0; i < n; i++) {
            points.push(`${Math.sin(angle) * (r - strokeWidthCos) + rx},${Math.cos(angle) * (r - strokeWidthCos) + ry}`);
            angle += 2 * Math.PI / n;
        }
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${options.imageWidth} ${options.imageHeight}">
                <polygon 
                    points="${points.join(" ")}"
                    fill="${options.fill.color}"
                    fill-opacity="${options.fill.opacity}"
                    stroke="${options.stroke.color}"
                    stroke-width="${options.stroke.width * 2}"
                    stroke-opacity="${options.stroke.opacity}"
                    stroke-dasharray="${options.stroke.dash.array.join(" ")}"
                    stroke-dashoffset="${options.stroke.dash.offset}"
                />
            </svg>
        `));
    }
    else if (typeof args[0] === "number" && typeof args[1] === "number" && (typeof args[2] === "undefined" || (0, function_1.isShapeOption)(args[2]))) {
        let n = args[0];
        let r = args[1];
        let options = args[2];
        // init options
        options ??= constant_1.ShapeOptionDefault;
        options.imageWidth ??= r * 2;
        options.imageHeight ??= r * 2;
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
        let points = [];
        let angle = Math.PI;
        // 内側の頂点と外側の頂点の距離
        let strokeWidthCos = options.stroke.color !== "none" ?
            options.stroke.width / Math.cos(Math.PI / 2 - ((Math.PI * (n - 2)) / (2 * n))) :
            0;
        console.log(strokeWidthCos);
        for (let i = 0; i < n; i++) {
            points.push(`${Math.sin(angle) * (r - strokeWidthCos) + r},${Math.cos(angle) * (r - strokeWidthCos) + r}`);
            angle += 2 * Math.PI / n;
        }
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${options.imageWidth} ${options.imageHeight}">
                <polygon 
                    points="${points.join(" ")}"
                    fill="${options.fill.color}"
                    fill-opacity="${options.fill.opacity}"
                    stroke="${options.stroke.color}"
                    stroke-width="${options.stroke.width * 2}"
                    stroke-opacity="${options.stroke.opacity}"
                    stroke-dasharray="${options.stroke.dash.array.join(" ")}"
                    stroke-dashoffset="${options.stroke.dash.offset}"
                />
            </svg>
        `));
    }
    else {
        throw new exception_1.UnknownArgumentsError("Unknown arguments exception");
    }
};
exports.regularPolygon = regularPolygon;
