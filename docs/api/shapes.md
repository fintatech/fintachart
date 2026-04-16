# Shapes

`Shape` is the base class for all drawing objects on the chart: lines, geometric figures, Fibonacci tools, markers, and more. Shapes are added to a chart pane and can be interacted with via mouse (hover, select, drag, resize) or programmatically.

## Shape (base class)

### Accessors (get/set)

| Accessor | Type | Description |
|----------|------|-------------|
| `canHover` | `boolean` | Whether the shape responds to mouse hover |
| `canMove` | `boolean` | Whether the shape can be dragged |
| `canRemove` | `boolean` | Whether the shape can be deleted |
| `canResize` | `boolean` | Whether the shape supports resize handles |
| `canSelect` | `boolean` | Whether the shape can be selected by clicking |
| `type` | `string` | Shape type identifier (e.g. `'lineSegment'`, `'rectangle'`) |
| `hoverable` | `boolean` | Alias for `canHover` |
| `hovered` | `boolean` | Whether the shape is currently hovered |
| `locked` | `boolean` | When `true`, the shape cannot be moved or resized |
| `magnetMode` | `MagnetMode` | Snapping behavior when placing or moving points |
| `magnetPoint` | `MagnetPoint` | Which bar field the magnet snaps to |
| `removable` | `boolean` | Alias for `canRemove` |
| `resizable` | `boolean` | Alias for `canResize` |
| `selectable` | `boolean` | Alias for `canSelect` |
| `selected` | `boolean` | Whether the shape is currently selected |
| `tag` | `unknown` | Arbitrary user data attached to the shape |
| `theme` | `object` | Visual theme (colors, line styles, fonts) |
| `instrument` | `Instrument` | The instrument this shape is associated with |
| `points` | `DataPoint[]` | Anchor points that define the shape geometry |
| `savable` | `boolean` | Whether the shape is included when saving chart state |
| `currentPoints` | `DataPoint[]` | The resolved screen-coordinate points |
| `requiredPointsCount` | `number` | Number of anchor points needed to fully define the shape |
| `createPointBehavior` | `object` | Controls how points are placed during interactive creation |

---

### Methods

#### clone

```typescript
clone(): Shape
```

Returns a deep copy of the shape.

---

#### dispose

```typescript
dispose(): void
```

Removes the shape and releases all resources.

---

#### bounds

```typescript
bounds(): Rect
```

Returns the bounding rectangle of the shape in pixel coordinates.

---

#### cartesianPoint

```typescript
cartesianPoint(index: number): IPoint
```

Returns the Cartesian (pixel) coordinates of the anchor point at the given index.

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `number` | Zero-based index into `points` |

---

#### cartesianPoints

```typescript
cartesianPoints(): IPoint[]
```

Returns all anchor points converted to Cartesian (pixel) coordinates.

---

#### hitTest

```typescript
hitTest(point: IPoint): boolean
```

Returns `true` if the given point falls within the clickable area of the shape.

| Parameter | Type | Description |
|-----------|------|-------------|
| `point` | `IPoint` | Point in pixel coordinates to test |

---

#### hoverHitTest

```typescript
hoverHitTest(point: IPoint): boolean
```

Returns `true` if the given point falls within the hover-sensitive area of the shape.

| Parameter | Type | Description |
|-----------|------|-------------|
| `point` | `IPoint` | Point in pixel coordinates to test |

---

#### hover

```typescript
hover(): void
```

Programmatically sets the shape to the hovered state.

---

#### select

```typescript
select(): void
```

Programmatically selects the shape.

---

#### remove

```typescript
remove(): void
```

Removes the shape from the chart.

---

#### translate

```typescript
translate(dx: number, dy: number): void
```

Moves the shape by the specified pixel offset.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dx` | `number` | Horizontal offset in pixels |
| `dy` | `number` | Vertical offset in pixels |

---

#### showSettingsDialog

```typescript
showSettingsDialog(): void
```

Opens the settings dialog for this shape.

---

#### startNewShape

```typescript
startNewShape(): void
```

Begins interactive creation of the shape, listening for point placement clicks.

---

#### finishNewShape

```typescript
finishNewShape(): void
```

Completes the interactive creation process and finalizes the shape.

---

#### saveState

```typescript
saveState(): object
```

Serializes the shape into a plain object suitable for persistence.

---

#### restoreState

```typescript
restoreState(state: object): void
```

Restores the shape from a previously saved state object.

| Parameter | Type | Description |
|-----------|------|-------------|
| `state` | `object` | State object produced by `saveState()` |

---

#### moveHorizontally

```typescript
moveHorizontally(offset: number): void
```

Shifts all anchor points horizontally by the given number of bars.

| Parameter | Type | Description |
|-----------|------|-------------|
| `offset` | `number` | Number of bars to shift (positive = right) |

---

#### moveVertically

```typescript
moveVertically(offset: number): void
```

Shifts all anchor points vertically by the given price offset.

| Parameter | Type | Description |
|-----------|------|-------------|
| `offset` | `number` | Price units to shift (positive = up) |

---

## ShapeEvent

String constants used with `EventEmitter.on()` / `EventEmitter.off()` to subscribe to shape lifecycle events.

| Constant | Description |
|----------|-------------|
| `PANE_CHANGED` | The shape was moved to a different pane |
| `VALUE_SCALE_CHANGED` | The shape's value scale changed |
| `VISIBLE_CHANGED` | The shape's visibility changed |
| `POINTS_CHANGED` | One or more anchor points were modified |
| `LOCKED_CHANGED` | The `locked` property changed |
| `RESIZABLE_CHANGED` | The `resizable` property changed |
| `HOVERABLE_CHANGED` | The `hoverable` property changed |
| `SELECTABLE_CHANGED` | The `selectable` property changed |
| `HOVERED_CHANGED` | The `hovered` state changed |
| `SELECTED_CHANGED` | The `selected` state changed |
| `THEME_CHANGED` | The shape theme was updated |
| `DRAG_STARTED` | The user began dragging the shape |
| `DRAG_FINISHED` | The user finished dragging the shape |
| `DOUBLE_CLICK` | The shape was double-clicked |
| `CONTEXT_MENU` | A context menu was requested on the shape |

---

## MagnetMode

Controls whether shape anchor points snap to bar data.

| Constant | Description |
|----------|-------------|
| `NONE` | No snapping; points are placed freely |
| `ALWAYS` | Points always snap to the nearest bar value |
| `NEAR` | Points snap only when close to a bar value |

---

## MagnetPoint

Determines which price field the magnet targets.

| Constant | Description |
|----------|-------------|
| `BAR` | Snap to the nearest bar value (closest of OHLC) |
| `HIGH` | Snap to the bar's high |
| `LOW` | Snap to the bar's low |
| `OPEN` | Snap to the bar's open |
| `CLOSE` | Snap to the bar's close |

---

## Shape Subclasses

### Lines

| Class | Description |
|-------|-------------|
| `LineSegmentShape` | Finite line between two points |
| `HorizontalLineShape` | Infinite horizontal line at a fixed price |
| `VerticalLineShape` | Infinite vertical line at a fixed date |
| `HorizontalRayShape` | Ray extending horizontally from a single point |
| `RayShape` | Ray defined by two points, extending infinitely in one direction |
| `ExtendedLineShape` | Line defined by two points, extending infinitely in both directions |

### Geometric

| Class | Description |
|-------|-------------|
| `RectangleShape` | Axis-aligned rectangle |
| `TriangleShape` | Triangle defined by three anchor points |
| `CircleShape` | Circle defined by center and radius point |
| `EllipseShape` | Ellipse defined by center and two radius points |

### Fibonacci

`FibonacciShape` is the abstract base class for all Fibonacci drawing tools. Concrete implementations are registered through the shape type system.

### Trend

| Class | Description |
|-------|-------------|
| `TrendChannelShape` | Parallel channel defined by three points |
| `AndrewsPitchforkShape` | Andrew's Pitchfork with median and parallel lines |
| `ErrorChannelShape` | Channel based on linear regression error bands |
| `RaffRegressionShape` | Raff Regression Channel |
| `GannFanShape` | Gann Fan with multiple angle lines |
| `SpeedLinesShape` | Speed resistance lines |
| `QuadrantLinesShape` | Quadrant lines dividing a range into quarters |
| `TironeLevelsShape` | Tirone Levels |
| `TrendAngleShape` | Line displaying the angle of a trend |

### Markers

| Class | Description |
|-------|-------------|
| `DotShape` | Small circle marker at a single point |
| `ImageShape` | Custom image placed on the chart |
| `TextShape` | Text label at a fixed position |
| `NoteShape` | Anchored note with text content |
| `BalloonShape` | Callout balloon with pointer |

### Drawing

| Class | Description |
|-------|-------------|
| `FreeHandShape` | Free-form drawing path |
| `CyclicLinesShape` | Evenly spaced vertical cyclic lines |

### Patterns

`PatternShape` is an abstract base class used by the indicator system to render pattern overlays on the chart.

### Other

| Class | Description |
|-------|-------------|
| `MeasureShape` | Displays price and bar distance between two points |
| `MeasureToolShape` | Interactive measure tool with crosshair |
| `ProfileDrawingTool` | Volume profile drawn over a selected range |

---

## Example

Creating and adding a shape programmatically using `DataPoint`:

```javascript
const chart = new FintaChart.Chart({ /* config */ });

// Create a horizontal line shape
const line = new FintaChart.HorizontalLineShape();
line.theme = {
  line: {
    strokeColor: '#FF0000',
    width: 2
  }
};

// Set the anchor point using a DataPoint (date + value)
line.points = [
  new FintaChart.DataPoint({ date: new Date(), value: 150.25 })
];

// Configure behavior
line.locked = false;
line.magnetMode = FintaChart.MagnetMode.NONE;
line.selectable = true;
line.hoverable = true;

// Add to the first pane
chart.primaryPane.addShape(line);

// Listen for selection changes
chart.on(FintaChart.ShapeEvent.SELECTED_CHANGED, (event) => {
  console.log('Shape selected:', event.target.selected);
});
```
