"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCircle = exports.mask = void 0;
const sharp_1 = __importDefault(require("sharp"));
const FillOptionDefault = {
    color: "black",
    opacity: 1
};
const DashOptionDefault = {
    array: [],
    offset: 0
};
const StrokeOptionDefault = {
    color: "none",
    width: 1,
    opacity: 1,
    position: "outer",
    dash: DashOptionDefault
};
const ShapeOptionDefault = {
    fill: FillOptionDefault,
    stroke: StrokeOptionDefault
};
const isFillOption = (value) => {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const { color, opacity } = value;
    if (typeof color !== "string" && typeof color !== "undefined") {
        return false;
    }
    if (typeof opacity !== "number" && typeof opacity !== "undefined") {
        return false;
    }
    return true;
};
const isDashOption = (value) => {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const { array, offset } = value;
    if (!(array instanceof (Array)) && typeof array !== "undefined") {
        return false;
    }
    if (typeof offset !== "number" && typeof offset !== "undefined") {
        return false;
    }
    return true;
};
const isStrokeOption = (value) => {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const { color, width, opacity, position, dash } = value;
    if (typeof color !== "string" && typeof color !== "undefined") {
        return false;
    }
    if (typeof width !== "number" && typeof width !== "undefined") {
        return false;
    }
    if (typeof opacity !== "number" && typeof opacity !== "undefined") {
        return false;
    }
    if (typeof position !== "string" && typeof opacity !== "undefined") {
        return false;
    }
    if (!isDashOption(dash) && typeof dash !== "undefined") {
        return false;
    }
    return true;
};
const isShapeOption = (value) => {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const { fill, stroke } = value;
    if (!isFillOption(fill) && typeof fill !== "undefined") {
        return false;
    }
    if (!isStrokeOption(stroke) && typeof stroke !== "undefined") {
        return false;
    }
    return true;
};
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
    options.x ??= 0;
    options.y ??= 0;
    if ((await image.metadata()).channels === 3)
        image.ensureAlpha(1);
    return new Promise((resolve, reject) => {
        image.raw().toBuffer(async (err, data, info) => {
            if (!err) {
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
    if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && typeof args[3] === "number" && typeof args[4] === "number" && (typeof args[5] === "undefined" || isShapeOption(args[5]))) {
        let radius = args[0];
        let cx = args[1];
        let cy = args[2];
        let width = args[3];
        let height = args[4];
        let options = args[5];
        // init options
        options ??= ShapeOptionDefault;
        options.fill ??= FillOptionDefault;
        options.fill.color ??= FillOptionDefault.color;
        options.fill.opacity ??= FillOptionDefault.opacity;
        options.stroke ??= StrokeOptionDefault;
        options.stroke.color ??= StrokeOptionDefault.color;
        options.stroke.width ??= StrokeOptionDefault.width;
        options.stroke.opacity ??= StrokeOptionDefault.opacity;
        options.stroke.position ??= "middle";
        options.stroke.dash ??= DashOptionDefault;
        options.stroke.dash.array ??= DashOptionDefault.array;
        options.stroke.dash.offset ??= DashOptionDefault.offset;
        let drFill = options.stroke.position === "middle" ? options.stroke.width / 2 :
            (options.stroke.position === "outer" ? options.stroke.width : 0);
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                <circle 
                    cx="${cx}"
                    cy="${cy}"
                    r="${radius - drFill}"
                    fill="${options.fill.color}"
                    fill-opacity="${options.fill.opacity}"
                    stroke="none"
                />
                ${options.stroke.color !== "none" ? `
                <circle 
                    cx="${cx}"
                    cy="${cy}"
                    r="${radius - options.stroke.width / 2}"
                    fill="none"
                    stroke="${options.stroke.color}"
                    stroke-width="${options.stroke.width}"
                    stroke-opacity="${options.stroke.opacity}"
                    stroke-dasharray="${options.stroke.dash.array.join(" ")}"
                    stroke-dashoffset="${options.stroke.dash.offset}"
                />
                ` : ""}
            </svg>
        `));
    }
    else if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number" && isShapeOption(args[3])) {
        let radius = args[0];
        let cx = args[1];
        let cy = args[2];
        let options = args[3];
        // init options
        options ??= ShapeOptionDefault;
        options.fill ??= FillOptionDefault;
        options.fill.color ??= FillOptionDefault.color;
        options.fill.opacity ??= FillOptionDefault.opacity;
        options.stroke ??= StrokeOptionDefault;
        options.stroke.color ??= StrokeOptionDefault.color;
        options.stroke.width ??= StrokeOptionDefault.width;
        options.stroke.opacity ??= StrokeOptionDefault.opacity;
        options.stroke.position ??= "middle";
        options.stroke.dash ??= DashOptionDefault;
        options.stroke.dash.array ??= DashOptionDefault.array;
        options.stroke.dash.offset ??= DashOptionDefault.offset;
        let drFill = options.stroke.position === "middle" ? options.stroke.width / 2 :
            (options.stroke.position === "outer" ? options.stroke.width : 0);
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${cx + radius} ${cy + radius}" xmlns="http://www.w3.org/2000/svg">
                <circle 
                    cx="${cx}"
                    cy="${cy}"
                    r="${radius - drFill}"
                    fill="${options.fill.color}"
                    fill-opacity="${options.fill.opacity}"
                    stroke="none"
                />
                ${options.stroke.color !== "none" ? `
                <circle 
                    cx="${cx}"
                    cy="${cy}"
                    r="${radius - options.stroke.width / 2}"
                    fill="none"
                    stroke="${options.stroke.color}"
                    stroke-width="${options.stroke.width}"
                    stroke-opacity="${options.stroke.opacity}"
                    stroke-dasharray="${options.stroke.dash.array.join(" ")}"
                    stroke-dashoffset="${options.stroke.dash.offset}"
                />
                ` : ""}
            </svg>
        `));
    }
    else {
        let radius = args[0];
        let options = args[1];
        // init options
        options ??= ShapeOptionDefault;
        options.fill ??= FillOptionDefault;
        options.fill.color ??= FillOptionDefault.color;
        options.fill.opacity ??= FillOptionDefault.opacity;
        options.stroke ??= StrokeOptionDefault;
        options.stroke.color ??= StrokeOptionDefault.color;
        options.stroke.width ??= StrokeOptionDefault.width;
        options.stroke.opacity ??= StrokeOptionDefault.opacity;
        options.stroke.position ??= "middle";
        options.stroke.dash ??= DashOptionDefault;
        options.stroke.dash.array ??= DashOptionDefault.array;
        options.stroke.dash.offset ??= DashOptionDefault.offset;
        let drFill = options.stroke.position === "middle" ? options.stroke.width / 2 :
            (options.stroke.position === "outer" ? options.stroke.width : 0);
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${radius * 2} ${radius * 2}" xmlns="http://www.w3.org/2000/svg">
                <circle 
                    cx="${radius}"
                    cy="${radius}"
                    r="${radius - drFill}"
                    fill="${options.fill.color}"
                    fill-opacity="${options.fill.opacity}"
                    stroke="none"
                />
                ${options.stroke.color !== "none" ? `
                <circle 
                    cx="${radius}"
                    cy="${radius}"
                    r="${radius - options.stroke.width / 2}"
                    fill="none"
                    stroke="${options.stroke.color}"
                    stroke-width="${options.stroke.width}"
                    stroke-opacity="${options.stroke.opacity}"
                    stroke-dasharray="${options.stroke.dash.array.join(" ")}"
                    stroke-dashoffset="${options.stroke.dash.offset}"
                />
                ` : ""}
            </svg>
        `));
    }
};
exports.createCircle = createCircle;
