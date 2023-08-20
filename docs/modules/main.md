[sharp-utils](../README.md) / [Modules](../modules.md) / main

# Module: main

## Table of contents

### Classes

- [TextToImage](../classes/main.TextToImage.md)

### Functions

- [circle](main.md#circle)
- [createImage](main.md#createimage)
- [mask](main.md#mask)
- [rect](main.md#rect)
- [regularPolygon](main.md#regularpolygon)
- [roundedRect](main.md#roundedrect)

## Functions

### circle

▸ **circle**(`radius`, `cx`, `cy`, `options?`): `Sharp`

円を描画します。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `radius` | `number` | 円の半径 |
| `cx` | `number` | 円の中心のx座標 |
| `cy` | `number` | 円の中心のy座標 |
| `options?` | `Partial`<[`ShapeOptions`](../interfaces/interface.ShapeOptions.md)\> | オプション |

#### Returns

`Sharp`

**`Throws`**

不明な引数が与えられた場合

#### Defined in

[interface.ts:148](https://github.com/Manju2367/sharpUtils/blob/7f05473/interface.ts#L148)

▸ **circle**(`radius`, `options?`): `Sharp`

円を描画します。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `radius` | `number` | 円の半径 |
| `options?` | `Partial`<[`ShapeOptions`](../interfaces/interface.ShapeOptions.md)\> | オプション |

#### Returns

`Sharp`

**`Throws`**

不明な引数が与えられた場合

#### Defined in

[interface.ts:156](https://github.com/Manju2367/sharpUtils/blob/7f05473/interface.ts#L156)

___

### createImage

▸ **createImage**(`width`, `height`, `options?`): `Sharp`

指定幅・色のSharpオブジェクトを生成します。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | 画像の横幅 |
| `height` | `number` | 画像の縦幅 |
| `options?` | `Partial`<[`RGBAOptions`](../interfaces/interface.RGBAOptions.md)\> | オプション |

#### Returns

`Sharp`

#### Defined in

[interface.ts:234](https://github.com/Manju2367/sharpUtils/blob/7f05473/interface.ts#L234)

___

### mask

▸ **mask**(`image`, `mask`, `options?`): `Promise`<`Sharp`\>

マスク処理をします。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Sharp` | 処理対象のSharpオブジェクト |
| `mask` | `Sharp` | マスク画像のSharpオブジェクト |
| `options?` | `Partial`<[`CoordinateOptions`](../interfaces/interface.CoordinateOptions.md)\> | オプション |

#### Returns

`Promise`<`Sharp`\>

#### Defined in

[interface.ts:136](https://github.com/Manju2367/sharpUtils/blob/7f05473/interface.ts#L136)

___

### rect

▸ **rect**(`width`, `height`, `x`, `y`, `options?`): `Sharp`

長方形を描画します。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | 長方形の横幅 |
| `height` | `number` | 長方形の縦幅 |
| `x` | `number` | 長方形のx座標 |
| `y` | `number` | 長方形のy座標 |
| `options?` | `Partial`<[`ShapeOptions`](../interfaces/interface.ShapeOptions.md)\> | オプション |

#### Returns

`Sharp`

**`Throws`**

不明な引数が与えられた場合

#### Defined in

[interface.ts:193](https://github.com/Manju2367/sharpUtils/blob/7f05473/interface.ts#L193)

▸ **rect**(`width`, `height`, `options?`): `Sharp`

長方形を描画します。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | 長方形の横幅 |
| `height` | `number` | 長方形の縦幅 |
| `options?` | `Partial`<[`ShapeOptions`](../interfaces/interface.ShapeOptions.md)\> | オプション |

#### Returns

`Sharp`

**`Throws`**

不明な引数が与えられた場合

#### Defined in

[interface.ts:202](https://github.com/Manju2367/sharpUtils/blob/7f05473/interface.ts#L202)

___

### regularPolygon

▸ **regularPolygon**(`n`, `r`, `rx`, `ry`, `options?`): `Sharp`

正多角形を描画します。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | 頂点の数 |
| `r` | `number` | 正多角形が外接する円の半径 |
| `rx` | `number` | 正多角形が外接する円の中心のx座標 |
| `ry` | `number` | 正多角形が外接する円の中心のy座標 |
| `options?` | `Partial`<[`ShapeOptions`](../interfaces/interface.ShapeOptions.md)\> | オプション |

#### Returns

`Sharp`

**`Throws`**

不明な引数が与えられた場合

#### Defined in

[interface.ts:215](https://github.com/Manju2367/sharpUtils/blob/7f05473/interface.ts#L215)

▸ **regularPolygon**(`n`, `r`, `options?`): `Sharp`

正多角形を描画します。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | 頂点の数 |
| `r` | `number` | 正多角形が外接する円の半径 |
| `options?` | `Partial`<[`ShapeOptions`](../interfaces/interface.ShapeOptions.md)\> | オプション |

#### Returns

`Sharp`

**`Throws`**

不明な引数が与えられた場合

#### Defined in

[interface.ts:224](https://github.com/Manju2367/sharpUtils/blob/7f05473/interface.ts#L224)

___

### roundedRect

▸ **roundedRect**(`width`, `height`, `x`, `y`, `round`, `options?`): `Sharp`

角丸の長方形を描画します。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | 長方形の横幅 |
| `height` | `number` | 長方形の縦幅 |
| `x` | `number` | 長方形のx座標 |
| `y` | `number` | 長方形のy座標 |
| `round` | `number` | 角丸の半径 |
| `options?` | `Partial`<[`ShapeOptions`](../interfaces/interface.ShapeOptions.md)\> | オプション |

#### Returns

`Sharp`

**`Throws`**

不明な引数が与えられた場合

#### Defined in

[interface.ts:170](https://github.com/Manju2367/sharpUtils/blob/7f05473/interface.ts#L170)

▸ **roundedRect**(`width`, `height`, `round`, `options?`): `Sharp`

角丸の長方形を描画します。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | 長方形の横幅 |
| `height` | `number` | 長方形の縦幅 |
| `round` | `number` | 角丸の半径 |
| `options?` | `Partial`<[`ShapeOptions`](../interfaces/interface.ShapeOptions.md)\> | オプション |

#### Returns

`Sharp`

**`Throws`**

不明な引数が与えられた場合

#### Defined in

[interface.ts:180](https://github.com/Manju2367/sharpUtils/blob/7f05473/interface.ts#L180)
