import sharp from "sharp"
import { UnknownArgumentsError } from "./exception"





//---------------------------------------
// Interfaces define options
//---------------------------------------

export interface CoordinateOptions {
    /**
     * x座標
     */
    x: number

    /**
     * y座標
     */
    y: number
}

export interface DashOptions {
    /**
     * 点線の周期
     * @default []
     */
    array: Array<number>

    /**
     * 点線の開始地点
     * @default 0
     */
    offset: number
}

export interface ColorOptions {
    /**
     * 描画色
     * @default "black"
     * @example color option
     * ```ts
     * "tomato" // web color name
     * "#ff6347" // hex color code
     * "rgb(255, 99, 71)" // rgb
     * ```
     */
    color: string,

    /**
     * 透明度(0-1)
     * @default 1
     */
    opacity: number,
}

export interface FillOptions extends ColorOptions {

}

export interface StrokeOptions extends ColorOptions {
    /**
     * 線幅
     * @default 1
     */
    width: number,

    /**
     * dashオプション
     */
    dash: Partial<DashOptions>
}

export interface RGBAOptions {
    /**
     * 赤(0-255)
     * @default 255
     */
    r: number,

    /**
     * 緑(0-255)
     * @default 255
     */
    g: number,

    /**
     * 青(0-255)
     * @default 255
     */
    b: number,

    /**
     * 透明度(0-1)
     * @default 0
     */
    alpha: number
}

export interface ShapeOptions {
    /**
     * 画像の横幅
     */
    imageWidth?: number

    /**
     * 画像の縦幅
     */
    imageHeight?: number

    /**
     * fillオプション
     */
    fill: Partial<FillOptions>
    
    /**
     * strokeオプション
     */
    stroke: Partial<StrokeOptions>
}



//---------------------------------------
// Interfaces define function
//---------------------------------------

export interface Mask {
    /**
     * マスク処理をします。
     * @param image 処理対象のSharpオブジェクト
     * @param mask マスク画像のSharpオブジェクト
     * @param options オプション
     */
    (image: sharp.Sharp, mask: sharp.Sharp, options?: Partial<CoordinateOptions>): Promise<sharp.Sharp>
}

export interface Circle {
    /**
     * 円を描画します。
     * @param radius 円の半径
     * @param cx 円の中心のx座標
     * @param cy 円の中心のy座標
     * @param options オプション
     * @throws {UnknownArgumentsError} 不明な引数が与えられた場合
     */
    (radius: number, cx: number, cy: number, options?: Partial<ShapeOptions>): sharp.Sharp

    /**
     * 円を描画します。
     * @param radius 円の半径
     * @param options オプション
     * @throws {UnknownArgumentsError} 不明な引数が与えられた場合
     */
    (radius: number, options?: Partial<ShapeOptions>): sharp.Sharp
}

export interface RoundedRect {
    /**
     * 角丸の長方形を描画します。
     * @param width 長方形の横幅
     * @param height 長方形の縦幅
     * @param x 長方形のx座標
     * @param y 長方形のy座標
     * @param round 角丸の半径
     * @param options オプション
     * @throws {UnknownArgumentsError} 不明な引数が与えられた場合
     */
    (width: number, height: number, x: number, y: number, round: number, options?: Partial<ShapeOptions>): sharp.Sharp

    /**
     * 角丸の長方形を描画します。
     * @param width 長方形の横幅
     * @param height 長方形の縦幅
     * @param round 角丸の半径
     * @param options オプション
     * @throws {UnknownArgumentsError} 不明な引数が与えられた場合
     */
    (width: number, height: number, round: number, options?: Partial<ShapeOptions>): sharp.Sharp
}

export interface Rect {
    /**
     * 長方形を描画します。
     * @param width 長方形の横幅
     * @param height 長方形の縦幅
     * @param x 長方形のx座標
     * @param y 長方形のy座標
     * @param options オプション
     * @throws {UnknownArgumentsError} 不明な引数が与えられた場合
     */
    (width: number, height: number, x: number, y: number, options?: Partial<ShapeOptions>): sharp.Sharp

    /**
     * 長方形を描画します。
     * @param width 長方形の横幅
     * @param height 長方形の縦幅
     * @param options オプション
     * @throws {UnknownArgumentsError} 不明な引数が与えられた場合
     */
    (width: number, height: number, options?: Partial<ShapeOptions>): sharp.Sharp
}

export interface RegularPolygon {
    /**
     * 正多角形を描画します。
     * @param n 頂点の数
     * @param r 正多角形が外接する円の半径
     * @param rx 正多角形が外接する円の中心のx座標
     * @param ry 正多角形が外接する円の中心のy座標
     * @param options オプション
     * @throws {UnknownArgumentsError} 不明な引数が与えられた場合
     */
    (n: number, r: number, rx: number, ry: number, options?: Partial<ShapeOptions>): sharp.Sharp

    /**
     * 正多角形を描画します。
     * @param n 頂点の数
     * @param r 正多角形が外接する円の半径
     * @param options オプション
     * @throws {UnknownArgumentsError} 不明な引数が与えられた場合
     */
    (n: number, r: number, options?: Partial<ShapeOptions>): sharp.Sharp
}

export interface CreateImage {
    /**
     * 指定幅・色のSharpオブジェクトを生成します。
     * @param width 画像の横幅
     * @param height 画像の縦幅
     * @param options オプション
     */
    (width: number, height: number, options?: Partial<RGBAOptions>): sharp.Sharp
}