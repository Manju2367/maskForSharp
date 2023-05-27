[sharp-utils](../README.md) / [Modules](../modules.md) / main

# Module: main

## Table of contents

### Functions

- [circle](main.md#circle)
- [mask](main.md#mask)
- [rect](main.md#rect)
- [regularPolygon](main.md#regularpolygon)
- [roundedRect](main.md#roundedrect)

## Functions

### circle

▸ **circle**(`radius`, `cx`, `cy`, `options?`): `Sharp`

円を描画します。

**`Throws`**

不明な引数が与えられた場合

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `radius` | `number` | 円の半径 |
| `cx` | `number` | 円の中心のx座標 |
| `cy` | `number` | 円の中心のy座標 |
| `options?` | `Partial`<[`ShapeOption`](../interfaces/interface.ShapeOption.md)\> | オプション |

#### Returns

`Sharp`

#### Defined in

[interface.ts:116](https://github.com/Manju2367/sharpUtils/blob/88cc34b/interface.ts#L116)

▸ **circle**(`radius`, `options?`): `Sharp`

円を描画します。

**`Throws`**

不明な引数が与えられた場合

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `radius` | `number` | 円の半径 |
| `options?` | `Partial`<[`ShapeOption`](../interfaces/interface.ShapeOption.md)\> | オプション |

#### Returns

`Sharp`

#### Defined in

[interface.ts:124](https://github.com/Manju2367/sharpUtils/blob/88cc34b/interface.ts#L124)

___

### mask

▸ **mask**(`image`, `mask`, `options?`): `Promise`<`Sharp`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `image` | `Sharp` |
| `mask` | `Sharp` |
| `options?` | `Partial`<[`CoordinateOption`](../interfaces/interface.CoordinateOption.md)\> |

#### Returns

`Promise`<`Sharp`\>

#### Defined in

[interface.ts:104](https://github.com/Manju2367/sharpUtils/blob/88cc34b/interface.ts#L104)

___

### rect

▸ **rect**(`width`, `height`, `x`, `y`, `options?`): `Sharp`

長方形を描画します。

**`Throws`**

不明な引数が与えられた場合

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | 長方形の横幅 |
| `height` | `number` | 長方形の縦幅 |
| `x` | `number` | 長方形のx座標 |
| `y` | `number` | 長方形のy座標 |
| `options?` | `Partial`<[`ShapeOption`](../interfaces/interface.ShapeOption.md)\> | オプション |

#### Returns

`Sharp`

#### Defined in

[interface.ts:161](https://github.com/Manju2367/sharpUtils/blob/88cc34b/interface.ts#L161)

▸ **rect**(`width`, `height`, `options?`): `Sharp`

長方形を描画します。

**`Throws`**

不明な引数が与えられた場合

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | 長方形の横幅 |
| `height` | `number` | 長方形の縦幅 |
| `options?` | `Partial`<[`ShapeOption`](../interfaces/interface.ShapeOption.md)\> | オプション |

#### Returns

`Sharp`

#### Defined in

[interface.ts:170](https://github.com/Manju2367/sharpUtils/blob/88cc34b/interface.ts#L170)

___

### regularPolygon

▸ **regularPolygon**(`n`, `r`, `rx`, `ry`, `options?`): `Sharp`

正多角形を描画します。

**`Throws`**

不明な引数が与えられた場合

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | 頂点の数 |
| `r` | `number` | 正多角形が外接する円の半径 |
| `rx` | `number` | 正多角形が外接する円の中心のx座標 |
| `ry` | `number` | 正多角形が外接する円の中心のy座標 |
| `options?` | `Partial`<[`ShapeOption`](../interfaces/interface.ShapeOption.md)\> | - |

#### Returns

`Sharp`

#### Defined in

[interface.ts:183](https://github.com/Manju2367/sharpUtils/blob/88cc34b/interface.ts#L183)

▸ **regularPolygon**(`n`, `r`, `options?`): `Sharp`

正多角形を描画します。

**`Throws`**

不明な引数が与えられた場合

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | 頂点の数 |
| `r` | `number` | 正多角形が外接する円の半径 |
| `options?` | `Partial`<[`ShapeOption`](../interfaces/interface.ShapeOption.md)\> | - |

#### Returns

`Sharp`

#### Defined in

[interface.ts:192](https://github.com/Manju2367/sharpUtils/blob/88cc34b/interface.ts#L192)

___

### roundedRect

▸ **roundedRect**(`width`, `height`, `x`, `y`, `round`, `options?`): `Sharp`

角丸の長方形を描画します。

**`Throws`**

不明な引数が与えられた場合

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | 長方形の横幅 |
| `height` | `number` | 長方形の縦幅 |
| `x` | `number` | 長方形のx座標 |
| `y` | `number` | 長方形のy座標 |
| `round` | `number` | 角丸の半径 |
| `options?` | `Partial`<[`ShapeOption`](../interfaces/interface.ShapeOption.md)\> | オプション |

#### Returns

`Sharp`

#### Defined in

[interface.ts:138](https://github.com/Manju2367/sharpUtils/blob/88cc34b/interface.ts#L138)

▸ **roundedRect**(`width`, `height`, `round`, `options?`): `Sharp`

角丸の長方形を描画します。

**`Throws`**

不明な引数が与えられた場合

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | 長方形の横幅 |
| `height` | `number` | 長方形の縦幅 |
| `round` | `number` | 角丸の半径 |
| `options?` | `Partial`<[`ShapeOption`](../interfaces/interface.ShapeOption.md)\> | オプション |

#### Returns

`Sharp`

#### Defined in

[interface.ts:148](https://github.com/Manju2367/sharpUtils/blob/88cc34b/interface.ts#L148)
