# Scale Internals API Reference

## ScaleCoordinateMapper

`ScaleCoordinateMapper` is the unified coordinate translation layer that maps between data coordinates (dates, record indices, prices) and pixel coordinates (x, y) on the canvas. It delegates horizontal mapping to an `IHorizontalScaleCoordinateMapper` and vertical mapping to an `IVerticalScaleCoordinateMapper`.

See also: [Scales API](scales.md) | [Panes API](panes.md)

### Constructor

```ts
new ScaleCoordinateMapper(
    horizontalMapper?: IHorizontalScaleCoordinateMapper,
    verticalMapper?: IVerticalScaleCoordinateMapper
)
```

| Parameter | Type | Description |
|---|---|---|
| `horizontalMapper` | `IHorizontalScaleCoordinateMapper` | Mapper that translates dates/records to x-pixel coordinates. |
| `verticalMapper` | `IVerticalScaleCoordinateMapper` | Mapper that translates price values to y-pixel coordinates. |

### Properties

| Property | Type | Description |
|---|---|---|
| `horizontalMapper` | `IHorizontalScaleCoordinateMapper` | The horizontal scale mapper instance. |
| `verticalMapper` | `IVerticalScaleCoordinateMapper` | The vertical scale mapper instance. |

### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `horizontalScale` | `HorizontalScale` | readonly | The underlying horizontal scale (obtained from `horizontalMapper.scale`). |
| `verticalAxis` | `VerticalAxis` | readonly | The underlying vertical axis (obtained from `verticalMapper.axis`). |

### Methods

#### columnByDate

```typescript
columnByDate(date: Date): number
```

Returns the column index for a given date.

| Parameter | Type | Description |
|---|---|---|
| `date` | `Date` | The date to look up. |

Returns: `number` -- The column index.

---

#### columnByRecord

```typescript
columnByRecord(record: number, isIntegral?: boolean): number
```

Returns the column index for a given data record number.

| Parameter | Type | Description |
|---|---|---|
| `record` | `number` | The data record number. |
| `isIntegral` | `boolean` | *(optional)* Whether to return an integral column index. |

Returns: `number` -- The column index.

---

#### columnByX

```typescript
columnByX(x: number, isIntegral?: boolean): number
```

Returns the column index at the given pixel x-coordinate.

| Parameter | Type | Description |
|---|---|---|
| `x` | `number` | The pixel x-coordinate. |
| `isIntegral` | `boolean` | *(optional)* Whether to return an integral column index. |

Returns: `number` -- The column index.

---

#### dateByColumn

```typescript
dateByColumn(column: number): Date
```

Returns the date corresponding to a column index.

| Parameter | Type | Description |
|---|---|---|
| `column` | `number` | The column index. |

Returns: `Date` -- The date at the given column.

---

#### dateByRecord

```typescript
dateByRecord(record: number): Date
```

Returns the date for a given data record number.

| Parameter | Type | Description |
|---|---|---|
| `record` | `number` | The data record number. |

Returns: `Date` -- The date for the record.

---

#### dateByX

```typescript
dateByX(x: number): Date
```

Returns the date at the given pixel x-coordinate.

| Parameter | Type | Description |
|---|---|---|
| `x` | `number` | The pixel x-coordinate. |

Returns: `Date` -- The date at the given x position.

---

#### recordByColumn

```typescript
recordByColumn(column: number, isIntegral?: boolean): number
```

Returns the data record number for a column index.

| Parameter | Type | Description |
|---|---|---|
| `column` | `number` | The column index. |
| `isIntegral` | `boolean` | *(optional)* Whether to return an integral record number. |

Returns: `number` -- The data record number.

---

#### recordByDate

```typescript
recordByDate(date: Date): number
```

Returns the data record number for a given date.

| Parameter | Type | Description |
|---|---|---|
| `date` | `Date` | The date to look up. |

Returns: `number` -- The data record number.

---

#### recordByX

```typescript
recordByX(x: number, isIntegral?: boolean): number
```

Returns the data record number at the given pixel x-coordinate.

| Parameter | Type | Description |
|---|---|---|
| `x` | `number` | The pixel x-coordinate. |
| `isIntegral` | `boolean` | *(optional)* Whether to return an integral record number. |

Returns: `number` -- The data record number.

---

#### xByColumn

```typescript
xByColumn(column: number, isColumnIntegral?: boolean, isXIntegral?: boolean): number
```

Returns the pixel x-coordinate for a column index.

| Parameter | Type | Description |
|---|---|---|
| `column` | `number` | The column index. |
| `isColumnIntegral` | `boolean` | *(optional)* Whether the column index is integral. |
| `isXIntegral` | `boolean` | *(optional)* Whether to return an integral x value. |

Returns: `number` -- The pixel x-coordinate.

---

#### xByDate

```typescript
xByDate(date: Date, isIntegral?: boolean): number
```

Returns the pixel x-coordinate for a given date.

| Parameter | Type | Description |
|---|---|---|
| `date` | `Date` | The date to convert. |
| `isIntegral` | `boolean` | *(optional)* Whether to return an integral x value. |

Returns: `number` -- The pixel x-coordinate.

---

#### xByRecord

```typescript
xByRecord(record: number, isIntegral?: boolean, isXIntegral?: boolean): number
```

Returns the pixel x-coordinate for a given data record number.

| Parameter | Type | Description |
|---|---|---|
| `record` | `number` | The data record number. |
| `isIntegral` | `boolean` | *(optional)* Whether the record number is integral. |
| `isXIntegral` | `boolean` | *(optional)* Whether to return an integral x value. |

Returns: `number` -- The pixel x-coordinate.

---

#### valueByY

```typescript
valueByY(y: number): number
```

Returns the data value (price) at the given pixel y-coordinate.

| Parameter | Type | Description |
|---|---|---|
| `y` | `number` | The pixel y-coordinate. |

Returns: `number` -- The data value (price).

---

#### yByValue

```typescript
yByValue(value: number): number
```

Returns the pixel y-coordinate for a given data value (price).

| Parameter | Type | Description |
|---|---|---|
| `value` | `number` | The data value (price). |

Returns: `number` -- The pixel y-coordinate.

---

### Usage

```js
const mapper = chart.primaryPane.coordinateMapper;

// Convert a date to an x pixel position
const x = mapper.xByDate(new Date('2025-06-15'));

// Convert a pixel click position to a price value
const price = mapper.valueByY(event.pointerPosition.y);

// Convert a price to a y pixel position
const y = mapper.yByValue(1.2345);

// Get the date at a specific pixel x
const date = mapper.dateByX(350);
```

---

## VerticalAxisPane

`VerticalAxisPane` renders the visual vertical axis panel alongside a chart pane. It extends `HtmlControl` and manages the DOM container, theming (borders, background), and layout for one side of the vertical scale.

See also: [VerticalScale](scales.md#verticalscale) | [Chart Themes](theme.md)

### Constructor

```ts
new VerticalAxisPane(config: IVerticalAxisPaneConfig)
```

#### IVerticalAxisPaneConfig

| Property | Type | Required | Description |
|---|---|---|---|
| `cssClass` | `string` | yes | CSS class applied to the axis container (left or right). |
| `verticalScale` | `VerticalScale` | yes | The parent vertical scale this pane belongs to. |
| `visible` | `boolean` | no | Initial visibility state. Defaults to `true`. |

### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `chart` | `Chart` | readonly | The chart that owns this axis pane. |
| `contentSize` | `ISize` | readonly | The content dimensions of the container element. |
| `cssClass` | `string` | readonly | The CSS class applied to the container. |
| `verticalScale` | `VerticalScale` | readonly | The parent vertical scale instance. |
| `size` | `ISize` | readonly | The outer dimensions of the container element. |
| `visible` | `boolean` | get / set | Controls whether the axis pane is rendered. |

### Methods

#### setupLayoutTheme

```typescript
setupLayoutTheme(): void
```

Applies the current theme (border color, width, background fill) to the container. Automatically called on `THEME_CHANGED` events.

Returns: `void`

---

#### getWidth

```typescript
getWidth(): number
```

Calculates and returns the preferred width of the axis pane in pixels. Uses `manualWidth` when `useManualWidth` is enabled; otherwise derives width from the widest label in all panes.

Returns: `number` -- The preferred width in pixels.

---

#### resize

```typescript
resize(frame: Bounds, isLeftPane?: boolean): Bounds
```

Positions and sizes the container within the given frame. Creates the container if it does not exist, or removes it if `visible` is `false`. Returns the computed frame or `null`.

| Parameter | Type | Description |
|---|---|---|
| `frame` | `Bounds` | The frame to position within. |
| `isLeftPane` | `boolean` | *(optional)* Whether this is a left-side pane. |

Returns: `Bounds` -- The computed frame or `null`.

---

### Usage

```js
const pane = chart.primaryPane;
const verticalScale = pane.getVerticalAxis();

// Access the right axis pane
const rightPane = verticalScale.rightAxisPane;
rightPane.visible = true;

// Get the computed width
const width = rightPane.getWidth();
```

---

## HorizontalAxis

`HorizontalAxis` renders the visual horizontal (time/date) axis at the top or bottom of the chart. It extends `HtmlControl` and manages a `CanvasLayer` to paint tick marks and date labels.

See also: [HorizontalScale](scales.md#horizontalscale) | [Chart Themes](theme.md)

### Constructor

```ts
new HorizontalAxis(config: {
    horizontalScale: HorizontalScale;
    cssClass: string;
    visible?: boolean;
})
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `config.horizontalScale` | `HorizontalScale` | yes | The horizontal scale this axis visualizes. |
| `config.cssClass` | `string` | yes | CSS class for the container element. |
| `config.visible` | `boolean` | no | Initial visibility. Defaults to `true`. |

### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `chart` | `Chart` | readonly | The chart that owns this axis. |
| `cssClass` | `string` | readonly | The CSS class applied to the container. |
| `layer` | `CanvasLayer` | readonly | The canvas layer used for rendering tick marks and labels. |
| `scale` | `HorizontalScale` | readonly | The parent horizontal scale instance. |
| `visible` | `boolean` | readonly | Whether the axis is visible. |

### Methods

#### setupLayoutTheme

```typescript
setupLayoutTheme(): void
```

Applies the current theme (border, background) to the container. Automatically called on `THEME_CHANGED` events.

Returns: `void`

---

#### clearPane

```typescript
clearPane(): void
```

Clears all rendered content from the canvas layer.

Returns: `void`

---

#### paint

```typescript
paint(): void
```

Renders major tick labels and minor tick marks onto the canvas using the current theme and adapter tick data.

Returns: `void`

---

#### hitTest

```typescript
hitTest(point: IPoint): boolean
```

Returns `true` if the given point falls within the axis frame.

| Parameter | Type | Description |
|---|---|---|
| `point` | `IPoint` | The point to test. |

Returns: `boolean` -- Whether the point is within the axis frame.

---

#### resize

```typescript
resize(frameInChart: Bounds, isTopPane?: boolean): void
```

Positions and sizes the container and canvas layer within the provided frame.

| Parameter | Type | Description |
|---|---|---|
| `frameInChart` | `Bounds` | The frame within the chart. |
| `isTopPane` | `boolean` | *(optional)* Whether this is a top-side pane. |

Returns: `void`

---

#### layoutPane

```typescript
layoutPane(frameInChart: Bounds, isTopPane: boolean): Bounds
```

Calculates and applies the layout position. Returns the computed frame or `null`.

| Parameter | Type | Description |
|---|---|---|
| `frameInChart` | `Bounds` | The frame within the chart. |
| `isTopPane` | `boolean` | Whether this is a top-side pane. |

Returns: `Bounds` -- The computed frame or `null`.

---

#### lock

```typescript
lock(): void
```

Permanently locks the axis, preventing scroll and zoom interactions.

Returns: `void`

---

### Interaction

The horizontal axis supports the following user interactions (unless `lock()` has been called):

| Interaction | Behavior |
|---|---|
| **Left-button drag** | Scrolls the time axis horizontally. |
| **Right-button drag** | Zooms the time axis. |
| **Mouse wheel** | Zooms in/out with the scroll position as the anchor. |
| **Double-click** | Resets the view by calling `chart.refreshAsync()`. |

---

## NumberFormatter

`NumberFormatter` is the abstract base class for all number formatting strategies. Concrete subclasses (registered via `NumberFormatterFactory`) provide the actual `format()` implementation.

See also: [Formatters](formatters.md)

### INumberFormatter Interface

```ts
interface INumberFormatter {
    locale: string;
    format(value: number, tickSize: number): string;
    saveState(): INumberFormatterState;
    restoreState(state: INumberFormatterState): void;
}
```

### INumberFormatterState

| Property | Type | Description |
|---|---|---|
| `type` | `string` | The registered type name of the formatter. |
| `locale` | `string` | The locale string used for formatting. |

### NumberFormatter (abstract class)

#### Constructor

```ts
protected constructor(locale?: string)
```

| Parameter | Type | Description |
|---|---|---|
| `locale` | `string` | Optional locale identifier (e.g. `"en-US"`). |

#### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `locale` | `string` | get / set | The locale used for number formatting. Setting triggers `onLocaleChanged()`. |

#### Methods

##### format

```typescript
format(value: number): string
```

**Abstract.** Formats the given numeric value as a display string.

| Parameter | Type | Description |
|---|---|---|
| `value` | `number` | The numeric value to format. |

Returns: `string` -- The formatted display string.

---

##### saveState

```typescript
saveState(): INumberFormatterState
```

Serializes the formatter type and locale.

Returns: `INumberFormatterState` -- The serialized state.

---

##### restoreState

```typescript
restoreState(state: INumberFormatterState): void
```

Restores the locale from a previously saved state.

| Parameter | Type | Description |
|---|---|---|
| `state` | `INumberFormatterState` | The previously saved state. |

Returns: `void`

---

#### Protected Methods

##### onLocaleChanged

```typescript
protected onLocaleChanged(): void
```

Optional callback invoked when the `locale` property changes. Override in subclasses to rebuild locale-sensitive resources.

Returns: `void`

---

## NumberFormatterFactory

`NumberFormatterFactory` is a static factory for creating and restoring `INumberFormatter` instances by type name.

### Static Accessors

| Accessor | Type | Description |
|---|---|---|
| `knownTypes` | `IterableIterator<string>` | Iterator over all registered formatter type names. |

### Static Methods

#### add

```typescript
static add(type: typeof NumberFormatter): void
```

Registers a `NumberFormatter` subclass. The subclass must define a static `type` getter.

| Parameter | Type | Description |
|---|---|---|
| `type` | `typeof NumberFormatter` | The formatter subclass to register. |

Returns: `void`

---

#### create

```typescript
static create(typeName: string): INumberFormatter
```

Creates a new formatter instance of the specified type name.

| Parameter | Type | Description |
|---|---|---|
| `typeName` | `string` | The registered type name. |

Returns: `INumberFormatter` -- The new formatter instance.

---

#### restore

```typescript
static restore(state?: INumberFormatterState): INumberFormatter | null
```

Creates a formatter from a saved state, or returns `null` if no state is provided.

| Parameter | Type | Description |
|---|---|---|
| `state` | `INumberFormatterState` | *(optional)* The saved state to restore from. |

Returns: `INumberFormatter | null` -- The restored formatter, or `null`.

---

### Usage

```js
// Register a custom formatter
NumberFormatterFactory.add(MyCustomFormatter);

// Create by type name
const formatter = NumberFormatterFactory.create('myCustom');
formatter.locale = 'de-DE';
const text = formatter.format(12345.678);

// Save and restore
const state = formatter.saveState();
const restored = NumberFormatterFactory.restore(state);
```
