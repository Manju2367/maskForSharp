[sharp-utils](../README.md) / [Modules](../modules.md) / [interface](../modules/interface.md) / Mask

# Interface: Mask

[interface](../modules/interface.md).Mask

## Callable

### Mask

▸ **Mask**(`image`, `mask`, `options?`): `Promise`<`Sharp`\>

マスク処理をします。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Sharp` | 処理対象のSharpオブジェクト |
| `mask` | `Sharp` | マスク画像のSharpオブジェクト |
| `options?` | `Partial`<[`CoordinateOptions`](interface.CoordinateOptions.md)\> | オプション |

#### Returns

`Promise`<`Sharp`\>

#### Defined in

[interface.ts:136](https://github.com/Manju2367/sharpUtils/blob/fdd5058/interface.ts#L136)
