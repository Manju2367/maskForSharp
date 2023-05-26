import sharp from "sharp"





//---------------------------------------
// Option interfaces
//---------------------------------------

export interface CoordinateOption {
    /**
     * x座標
     */
    x: number

    /**
     * y座標
     */
    y: number
}

export interface DashOption {
    /**
     * 点線の周期
     * default: []
     */
    array: Array<number>

    /**
     * 点線の開始地点
     * default: 0
     */
    offset: number
}

export interface ColorOption {
    /**
     * 描画色
     * default: "black"
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
     * default: 1
     */
    opacity: number,
}

export interface FillOption extends ColorOption {

}

export interface StrokeOption extends ColorOption {
    /**
     * 線幅
     * default: 1
     */
    width: number,

    /**
     * dashオプション
     */
    dash: Partial<DashOption>
}

export interface ShapeOption {
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
    fill: Partial<FillOption>
    
    /**
     * strokeオプション
     */
    stroke: Partial<StrokeOption>
}



//---------------------------------------
// Function interfaces
//---------------------------------------

export interface Mask {
    (image: sharp.Sharp, mask: sharp.Sharp, options?: Partial<CoordinateOption>): Promise<sharp.Sharp>
}

export interface Circle {
    /**
     * 円を描画します。
     * @param radius 円の半径
     * @param cx 円の中心のx座標
     * @param cy 円の中心のy座標
     * @param options オプション
     */
    (radius: number, cx: number, cy: number, options?: Partial<ShapeOption>): sharp.Sharp

    /**
     * 円を描画します。
     * @param radius 円の半径
     * @param options オプション
     */
    (radius: number, options?: Partial<ShapeOption>): sharp.Sharp
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
     */
    (width: number, height: number, x: number, y: number, round: number, options?: Partial<ShapeOption>): sharp.Sharp

    /**
     * 角丸の長方形を描画します。
     * @param width 長方形の横幅
     * @param height 長方形の縦幅
     * @param round 角丸の半径
     * @param options オプション
     */
    (width: number, height: number, round: number, options?: Partial<ShapeOption>): sharp.Sharp
}

export interface Rect {
    /**
     * 長方形を描画します。
     * @param width 長方形の横幅
     * @param height 長方形の縦幅
     * @param x 長方形のx座標
     * @param y 長方形のy座標
     * @param options オプション
     */
    (width: number, height: number, x: number, y: number, options?: Partial<ShapeOption>): sharp.Sharp

    /**
     * 長方形を描画します。
     * @param width 長方形の横幅
     * @param height 長方形の縦幅
     * @param options オプション
     */
    (width: number, height: number, options?: Partial<ShapeOption>): sharp.Sharp
}

export interface RegularPolygon {
    /**
     * 正多角形を描画します。
     * @param n 頂点の数
     * @param r 正多角形が外接する円の半径
     * @param oprions オプション
     */
    (n: number, r: number, options?: Partial<ShapeOption>): sharp.Sharp
}