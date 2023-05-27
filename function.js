"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isShapeOption = exports.isStrokeOption = exports.isDashOption = exports.isFillOption = exports.isCoordinateOption = exports.getImageInfo = void 0;
//---------------------------------------
// Functions
//---------------------------------------
const getImageInfo = (s) => {
    return new Promise((resolve, reject) => {
        s.toBuffer((err, buffer, info) => {
            if (!err) {
                resolve(info);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.getImageInfo = getImageInfo;
//---------------------------------------
// Functions check type
//---------------------------------------
const isCoordinateOption = (value) => {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const { x, y } = value;
    if (typeof x !== "number" && typeof x !== "undefined") {
        return false;
    }
    if (typeof y !== "number" && typeof y !== "undefined") {
        return false;
    }
    return true;
};
exports.isCoordinateOption = isCoordinateOption;
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
exports.isFillOption = isFillOption;
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
exports.isDashOption = isDashOption;
const isStrokeOption = (value) => {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const { color, width, opacity, dash } = value;
    if (typeof color !== "string" && typeof color !== "undefined") {
        return false;
    }
    if (typeof width !== "number" && typeof width !== "undefined") {
        return false;
    }
    if (typeof opacity !== "number" && typeof opacity !== "undefined") {
        return false;
    }
    if (!(0, exports.isDashOption)(dash) && typeof dash !== "undefined") {
        return false;
    }
    return true;
};
exports.isStrokeOption = isStrokeOption;
const isShapeOption = (value) => {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const { fill, stroke } = value;
    if (!(0, exports.isFillOption)(fill) && typeof fill !== "undefined") {
        return false;
    }
    if (!(0, exports.isStrokeOption)(stroke) && typeof stroke !== "undefined") {
        return false;
    }
    return true;
};
exports.isShapeOption = isShapeOption;
