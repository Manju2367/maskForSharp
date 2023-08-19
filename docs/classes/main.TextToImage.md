[sharp-utils](../README.md) / [Modules](../modules.md) / [main](../modules/main.md) / TextToImage

# Class: TextToImage

[main](../modules/main.md).TextToImage

## Table of contents

### Constructors

- [constructor](main.TextToImage.md#constructor)

### Properties

- [options](main.TextToImage.md#options)
- [renderer](main.TextToImage.md#renderer)

### Methods

- [getBuffer](main.TextToImage.md#getbuffer)
- [getSVG](main.TextToImage.md#getsvg)
- [getSharp](main.TextToImage.md#getsharp)
- [render](main.TextToImage.md#render)

## Constructors

### constructor

• **new TextToImage**(`fontLocation?`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fontLocation?` | `string` |
| `options?` | `GenerationOptions` |

#### Defined in

[main.ts:384](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/main.ts#L384)

## Properties

### options

• `Private` **options**: `GenerationOptions`

#### Defined in

[main.ts:382](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/main.ts#L382)

___

### renderer

• `Private` **renderer**: `TextToSVG`

#### Defined in

[main.ts:381](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/main.ts#L381)

## Methods

### getBuffer

▸ **getBuffer**(`text`, `options?`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `options?` | `GenerationOptions` |

#### Returns

`Buffer`

#### Defined in

[main.ts:430](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/main.ts#L430)

___

### getSVG

▸ **getSVG**(`text`, `options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `options?` | `GenerationOptions` |

#### Returns

`string`

#### Defined in

[main.ts:426](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/main.ts#L426)

___

### getSharp

▸ **getSharp**(`text`, `format?`, `options?`): `Sharp`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `text` | `string` | `undefined` |
| `format` | `string` | `"png"` |
| `options?` | `GenerationOptions` | `undefined` |

#### Returns

`Sharp`

#### Defined in

[main.ts:434](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/main.ts#L434)

___

### render

▸ `Private` **render**(`text`, `options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `options?` | `GenerationOptions` |

#### Returns

`string`

#### Defined in

[main.ts:408](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/main.ts#L408)
