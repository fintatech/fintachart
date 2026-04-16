# Panes API Reference

## PanesContainer

The `PanesContainer` manages a collection of [Pane](#pane) instances within the chart, handling layout, sizing, and state persistence.

### Constructor

```js
const container = new FintaChart.PanesContainer(config);
```

### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `defaultHeightRatio` | `number` | get / set | Default height ratio assigned to newly created panes. |
| `panePadding` | `number` | get / set | Padding (in pixels) between adjacent panes. |
| `panes` | `Pane[]` | readonly | Array of all panes currently managed by the container. |
| `panesContentFrame` | `Bounds` | readonly | Bounding rectangle representing the combined content area of all panes. |

### Methods

#### addPane

```typescript
addPane(index?: number, heightRatio?: number, reduceHeightPrimaryPane?: boolean): Pane
```

Adds a new pane at the given `index`. Optional `heightRatio` sets its initial height proportion. When `reduceHeightPrimaryPane` is `true`, the primary pane shrinks to accommodate the new pane.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `index` | `number` | No | Position at which to insert the new pane. |
| `heightRatio` | `number` | No | Initial height proportion for the new pane. |
| `reduceHeightPrimaryPane` | `boolean` | No | When `true`, the primary pane shrinks to accommodate the new pane. |

Returns: `Pane`

---

#### removePane

```typescript
removePane(pane: number | Pane): void
```

Removes a pane by index or reference.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pane` | `number \| Pane` | Yes | The pane index or pane instance to remove. |

Returns: `void`

---

#### findPaneAt

```typescript
findPaneAt(y: number): Pane
```

Returns the pane located at the vertical coordinate `y`.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `y` | `number` | Yes | Vertical coordinate in pixels. |

Returns: `Pane`

---

#### movePane

```typescript
movePane(pane: Pane, offset: number): void
```

Moves `pane` by the specified `offset` in the pane list.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pane` | `Pane` | Yes | The pane to move. |
| `offset` | `number` | Yes | Number of positions to move the pane. |

Returns: `void`

---

#### setPaneHeightRatio

```typescript
setPaneHeightRatio(pane: Pane, ratio: number): void
```

Sets the height ratio of the given `pane`.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pane` | `Pane` | Yes | The pane to update. |
| `ratio` | `number` | Yes | New height ratio value. |

Returns: `void`

---

#### totalPanesHeight

```typescript
totalPanesHeight(): number
```

Returns the total computed height of all panes.

Returns: `number`

---

#### saveState

```typescript
saveState(): object
```

Serializes the current container state for persistence.

Returns: `object`

---

#### restoreState

```typescript
restoreState(): void
```

Restores a previously saved container state.

---

## Pane

A `Pane` represents a single drawing area within the chart. Each pane can host indicators, shapes, plots, positions, orders, and alerts. It also manages its own grid visibility, scaling, and rendering.

See also: [Scales API](scales.md) | [Chart Types API](chart-types.md) | [CrossHair API](crosshair.md)

### Constructor

```js
const pane = new FintaChart.Pane(config: IPaneConfig);
```

### Key Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `chart` | `Chart` | readonly | Reference to the parent chart instance. |
| `formatter` | `Formatter` | readonly | Formatter used for value display in this pane. |
| `heightRatio` | `number` | get / set | Proportional height of the pane within the container. |
| `indicators` | `Indicator[]` | readonly | Indicators attached to this pane. |
| `objects` | `ChartObject[]` | readonly | Generic chart objects in this pane. |
| `shapes` | `Shape[]` | readonly | Drawing shapes (lines, rectangles, etc.) in this pane. |
| `positions` | `Position[]` | readonly | Trading positions rendered in this pane. |
| `orders` | `Order[]` | readonly | Pending orders rendered in this pane. |
| `alerts` | `Alert[]` | readonly | Price alerts rendered in this pane. |
| `gridX` | `boolean` | get / set | Toggles horizontal grid lines. |
| `gridY` | `boolean` | get / set | Toggles vertical grid lines. |
| `state` | `PaneState` | readonly | Current state of the pane (see [PaneState](#panestate)). |
| `theme` | `Theme` | readonly | Theme object applied to this pane. |
| `visible` | `boolean` | get / set | Controls pane visibility. |
| `moveDirection` | `PaneMoveDirection` | get / set | Allowed move direction (see [PaneMoveDirection](#panemovedirection)). |
| `moveKind` | `PaneMoveKind` | get / set | Move behavior kind (see [PaneMoveKind](#panemovekind)). |

### Methods

### Object Management

#### addObjects

```typescript
addObjects(objects: ChartObject[]): void
```

Adds one or more chart objects to the pane.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `objects` | `ChartObject[]` | Yes | The chart objects to add. |

Returns: `void`

---

#### removeObjects

```typescript
removeObjects(objects: ChartObject[]): void
```

Removes one or more chart objects from the pane.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `objects` | `ChartObject[]` | Yes | The chart objects to remove. |

Returns: `void`

---

#### addPlot

```typescript
addPlot(plot: Plot): void
```

Adds a plot (data series visualization) to the pane.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `plot` | `Plot` | Yes | The plot to add. |

Returns: `void`

---

#### removePlot

```typescript
removePlot(plot: Plot): void
```

Removes a plot from the pane.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `plot` | `Plot` | Yes | The plot to remove. |

Returns: `void`

---

#### addShapes

```typescript
addShapes(shapes: Shape[]): void
```

Adds one or more drawing shapes to the pane.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `shapes` | `Shape[]` | Yes | The shapes to add. |

Returns: `void`

---

#### removeShapes

```typescript
removeShapes(shapes: Shape[]): void
```

Removes one or more drawing shapes from the pane.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `shapes` | `Shape[]` | Yes | The shapes to remove. |

Returns: `void`

---

#### addComponent

```typescript
addComponent(component: Component): void
```

Adds a custom component to the pane.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `component` | `Component` | Yes | The component to add. |

Returns: `void`

---

#### removeComponent

```typescript
removeComponent(component: Component): void
```

Removes a custom component from the pane.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `component` | `Component` | Yes | The component to remove. |

Returns: `void`

---

### Shape Operations

#### executeShapes

```typescript
executeShapes(): void
```

Executes (applies) all pending shape actions.

---

#### unExecuteShapes

```typescript
unExecuteShapes(): void
```

Reverts the last executed shape action.

---

#### forceRemoveShapes

```typescript
forceRemoveShapes(): void
```

Forcefully removes all shapes from the pane, bypassing undo history.

---

#### getShapesBetweenDates

```typescript
getShapesBetweenDates(startDate: Date, endDate: Date): Shape[]
```

Returns shapes that fall within the specified date range.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `startDate` | `Date` | Yes | Start of the date range. |
| `endDate` | `Date` | Yes | End of the date range. |

Returns: `Shape[]`

---

### Scale

#### minMax

```typescript
minMax(): { min: number, max: number }
```

Returns the current min/max values of the pane's vertical range.

Returns: `{ min: number, max: number }`

---

#### autoScaledMinMax

```typescript
autoScaledMinMax(): { min: number, max: number }
```

Returns the auto-scaled min/max values.

Returns: `{ min: number, max: number }`

---

#### getCoordinateMapper

```typescript
getCoordinateMapper(): CoordinateMapper
```

Returns the coordinate mapper for pixel-to-value conversions.

Returns: `CoordinateMapper`

---

#### getVerticalAxis

```typescript
getVerticalAxis(): VerticalAxis
```

Returns the active vertical axis (see [Scales API](scales.md)).

Returns: `VerticalAxis`

---

#### formatValue

```typescript
formatValue(value: number): string
```

Formats a numeric value using the pane's formatter.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `value` | `number` | Yes | The numeric value to format. |

Returns: `string`

---

### Rendering

#### paint

```typescript
paint(): void
```

Triggers a full repaint of the pane.

---

#### paintBarProgress

```typescript
paintBarProgress(): void
```

Paints progress of the current in-progress bar.

---

### State

#### saveState

```typescript
saveState(): object
```

Serializes the pane's state.

Returns: `object`

---

#### restoreState

```typescript
restoreState(): void
```

Restores a previously saved pane state.

---

## PaneEvent Constants

Use these constants to subscribe to pane-level events:

| Constant | Description |
|---|---|
| `PaneEvent.THEME_CHANGED` | Fired when the pane's theme changes. |
| `PaneEvent.X_GRID_VISIBLE_CHANGED` | Fired when horizontal grid visibility is toggled. |
| `PaneEvent.Y_GRID_VISIBLE_CHANGED` | Fired when vertical grid visibility is toggled. |
| `PaneEvent.PLOT_ADDED` | Fired when a plot is added to the pane. |
| `PaneEvent.PLOT_REMOVED` | Fired when a plot is removed from the pane. |
| `PaneEvent.SHAPE_ADDED` | Fired when a shape is added to the pane. |
| `PaneEvent.SHAPE_REMOVED` | Fired when a shape is removed from the pane. |
| `PaneEvent.OBJECT_ADDED` | Fired when a chart object is added to the pane. |
| `PaneEvent.OBJECT_REMOVED` | Fired when a chart object is removed from the pane. |
| `PaneEvent.DOUBLE_CLICKED` | Fired on double-click within the pane. |
| `PaneEvent.CONTEXT_MENU` | Fired when the context menu is triggered within the pane. |

---

## Enums

### PaneState

| Value | Description |
|---|---|
| `NORMAL` | Pane is displayed at its assigned height ratio. |
| `MAXIMIZED` | Pane is expanded to occupy the full container height. |

### PaneMoveDirection

| Value | Description |
|---|---|
| `NONE` | Pane movement is disabled. |
| `HORIZONTAL` | Only horizontal scrolling is allowed. |
| `VERTICAL` | Only vertical scrolling is allowed. |
| `ANY` | Both horizontal and vertical scrolling are allowed. |

### PaneMoveKind

| Value | Description |
|---|---|
| `NORMAL` | Standard move behavior. |
| `AUTOSCALED` | Move behavior is adjusted to keep the view auto-scaled. |
