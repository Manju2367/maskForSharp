"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mask = void 0;
const sharp_1 = __importDefault(require("sharp"));
/**
 *
 * @param image 処理対称のsharpオブジェクト
 * @param mask マスク画像のsharpオブジェクト
 * @param options
 * @param options.x
 * @param options.y
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
