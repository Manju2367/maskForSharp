[sharp-utils](../README.md) / [Modules](../modules.md) / [interface](../modules/interface.md) / ColorOption

# Interface: ColorOption

[interface](../modules/interface.md).ColorOption

## Hierarchy

- **`ColorOption`**

  ↳ [`FillOption`](interface.FillOption.md)

  ↳ [`StrokeOption`](interface.StrokeOption.md)

## Table of contents

### Properties

- [color](interface.ColorOption.md#color)
- [opacity](interface.ColorOption.md#opacity)

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

#### Defined in

[interface.ts:49](https://github.com/Manju2367/sharpUtils/blob/27aec64/interface.ts#L49)

___

### opacity

• **opacity**: `number`

透明度(0-1)
default: 1

#### Defined in

[interface.ts:55](https://github.com/Manju2367/sharpUtils/blob/27aec64/interface.ts#L55)
