"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCircle = exports.mask = void 0;
const sharp_1 = __importDefault(require("sharp"));
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
    if (typeof args[2] === "undefined" && typeof args[3] === "undefined" && typeof args[4] === "undefined" && typeof args[5] === "undefined") {
        if (typeof args[1] === "undefined") {
            args[1] = {
                fill: "black",
                stroke: "none"
            };
        }
        else {
            args[1].fill ??= "black";
            args[1].stroke ??= "none";
        }
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${args[0] * 2} ${args[0] * 2}" xmlns="http://www.w3.org/2000/svg">
                <circle cx="${args[0]}" cy="${args[0]}" r="${args[0]}" fill="${args[1].fill}" stroke="${args[1].stroke}" />
            </svg>
        `));
    }
    else if (typeof args[1] === "number" && typeof args[2] === "number") {
        if (typeof args[3] === "undefined") {
            args[3] = {
                fill: "black",
                stroke: "none"
            };
        }
        else {
            args[3].fill ??= "black";
            args[3].stroke ??= "none";
        }
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${args[1] + args[0] * 2} ${args[2] + args[0] * 2}" xmlns="http://www.w3.org/2000/svg">
                <circle cx="${args[1]}" cy="${args[2]}" r="${args[0]}" />
            </svg>
        `));
    }
    else {
        if (typeof args[5] === "undefined") {
            args[5] = {
                fill: "black",
                stroke: "none"
            };
        }
        else {
            args[5].fill ??= "black";
            args[5].stroke ??= "none";
        }
        return (0, sharp_1.default)(Buffer.from(`
            <svg viewBox="0 0 ${args[3]} ${args[4]}" xmlns="http://www.w3.org/2000/svg">
                <circle cx="${args[1]}" cy="${args[2]}" r="${args[0]}" />
            </svg>
        `));
    }
};
exports.createCircle = createCircle;
