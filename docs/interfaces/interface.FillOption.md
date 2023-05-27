[sharp-utils](../README.md) / [Modules](../modules.md) / [interface](../modules/interface.md) / FillOption

# Interface: FillOption

[interface](../modules/interface.md).FillOption

## Hierarchy

- [`ColorOption`](interface.ColorOption.md)

  ↳ **`FillOption`**

## Table of contents

### Properties

- [color](interface.FillOption.md#color)
- [opacity](interface.FillOption.md#opacity)

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

### opacity

• **opacity**: `number`

透明度(0-1)
default: 1

#### Inherited from

[ColorOption](interface.ColorOption.md).[opacity](interface.ColorOption.md#opacity)

#### Defined in

[interface.ts:55](https://github.com/Manju2367/sharpUtils/blob/27aec64/interface.ts#L55)
