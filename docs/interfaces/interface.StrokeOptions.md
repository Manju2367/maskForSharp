[sharp-utils](../README.md) / [Modules](../modules.md) / [interface](../modules/interface.md) / StrokeOptions

# Interface: StrokeOptions

[interface](../modules/interface.md).StrokeOptions

## Hierarchy

- [`ColorOptions`](interface.ColorOptions.md)

  ↳ **`StrokeOptions`**

## Table of contents

### Properties

- [color](interface.StrokeOptions.md#color)
- [dash](interface.StrokeOptions.md#dash)
- [opacity](interface.StrokeOptions.md#opacity)
- [width](interface.StrokeOptions.md#width)

## Properties

### color

• **color**: `string`

描画色

**`Default`**

```ts
"black"
```

**`Example`**

color option
```ts
"tomato" // web color name
"#ff6347" // hex color code
"rgb(255, 99, 71)" // rgb
```

#### Inherited from

[ColorOptions](interface.ColorOptions.md).[color](interface.ColorOptions.md#color)

#### Defined in

[interface.ts:49](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/interface.ts#L49)

___

### dash

• **dash**: `Partial`<[`DashOptions`](interface.DashOptions.md)\>

dashオプション

#### Defined in

[interface.ts:72](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/interface.ts#L72)

___

### opacity

• **opacity**: `number`

透明度(0-1)

**`Default`**

```ts
1
```

#### Inherited from

[ColorOptions](interface.ColorOptions.md).[opacity](interface.ColorOptions.md#opacity)

#### Defined in

[interface.ts:55](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/interface.ts#L55)

___

### width

• **width**: `number`

線幅

**`Default`**

```ts
1
```

#### Defined in

[interface.ts:67](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/interface.ts#L67)
