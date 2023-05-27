[sharp-utils](../README.md) / [Modules](../modules.md) / [interface](../modules/interface.md) / StrokeOption

# Interface: StrokeOption

[interface](../modules/interface.md).StrokeOption

## Hierarchy

- [`ColorOption`](interface.ColorOption.md)

  ↳ **`StrokeOption`**

## Table of contents

### Properties

- [color](interface.StrokeOption.md#color)
- [dash](interface.StrokeOption.md#dash)
- [opacity](interface.StrokeOption.md#opacity)
- [width](interface.StrokeOption.md#width)

## Properties

### color

• **color**: `string`

描画色
default: "black"

**`Example`**

color option
```ts
"tomato" // web color name
"#ff6347" // hex color code
"rgb(255, 99, 71)" // rgb
```

#### Inherited from

[ColorOption](interface.ColorOption.md).[color](interface.ColorOption.md#color)

#### Defined in

[interface.ts:49](https://github.com/Manju2367/sharpUtils/blob/27aec64/interface.ts#L49)

___

### dash

• **dash**: `Partial`<[`DashOption`](interface.DashOption.md)\>

dashオプション

#### Defined in

[interface.ts:72](https://github.com/Manju2367/sharpUtils/blob/27aec64/interface.ts#L72)

___

### opacity

• **opacity**: `number`

透明度(0-1)
default: 1

#### Inherited from

[ColorOption](interface.ColorOption.md).[opacity](interface.ColorOption.md#opacity)

#### Defined in

[interface.ts:55](https://github.com/Manju2367/sharpUtils/blob/27aec64/interface.ts#L55)

___

### width

• **width**: `number`

線幅
default: 1

#### Defined in

[interface.ts:67](https://github.com/Manju2367/sharpUtils/blob/27aec64/interface.ts#L67)
