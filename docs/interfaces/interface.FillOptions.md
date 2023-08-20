[sharp-utils](../README.md) / [Modules](../modules.md) / [interface](../modules/interface.md) / FillOptions

# Interface: FillOptions

[interface](../modules/interface.md).FillOptions

## Hierarchy

- [`ColorOptions`](interface.ColorOptions.md)

  ↳ **`FillOptions`**

## Table of contents

### Properties

- [color](interface.FillOptions.md#color)
- [opacity](interface.FillOptions.md#opacity)

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

[interface.ts:49](https://github.com/Manju2367/sharpUtils/blob/fdd5058/interface.ts#L49)

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

[interface.ts:55](https://github.com/Manju2367/sharpUtils/blob/fdd5058/interface.ts#L55)
