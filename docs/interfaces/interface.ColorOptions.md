[sharp-utils](../README.md) / [Modules](../modules.md) / [interface](../modules/interface.md) / ColorOptions

# Interface: ColorOptions

[interface](../modules/interface.md).ColorOptions

## Hierarchy

- **`ColorOptions`**

  ↳ [`FillOptions`](interface.FillOptions.md)

  ↳ [`StrokeOptions`](interface.StrokeOptions.md)

## Table of contents

### Properties

- [color](interface.ColorOptions.md#color)
- [opacity](interface.ColorOptions.md#opacity)

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

#### Defined in

[interface.ts:49](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/interface.ts#L49)

___

### opacity

• **opacity**: `number`

透明度(0-1)

**`Default`**

```ts
1
```

#### Defined in

[interface.ts:55](https://github.com/Manju2367/sharpUtils/blob/ecfe1af/interface.ts#L55)
