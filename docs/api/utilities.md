# Utilities API Reference

Low-level geometry primitives, data-point abstractions, shape helpers, UI base classes, and the event system used throughout FintaChart.

---

## 1. Geometry

### IPoint

Describes a cartesian point.

| Property | Type | Description |
|---|---|---|
| `x` | `number` | The X coordinate. |
| `y` | `number` | The Y coordinate. |

---

### ISize

Describes the size of an element.

| Property | Type | Description |
|---|---|---|
| `width` | `number` | The width of the element. |
| `height` | `number` | The height of the element. |

---

### IPadding

Describes a padding area around an element.

| Property | Type | Description |
|---|---|---|
| `left` | `number` | The width of the padding area on the left. |
| `top` | `number` | The height of the padding area on the top. |
| `right` | `number` | The width of the padding area on the right. |
| `bottom` | `number` | The height of the padding area on the bottom. |

---

### IBounds

Describes a bounds rectangle. See also [Bounds](#bounds).

| Property | Type | Description |
|---|---|---|
| `left` | `number` | The left X coordinate of the rectangle. |
| `top` | `number` | The top Y coordinate of the rectangle. |
| `width` | `number` | The width of the rectangle. |
| `height` | `number` | The height of the rectangle. |

---

### Bounds

Represents a bounds rectangle. Implements `IBounds` and `ICloneable<Bounds>`.

#### Constructor

| Parameter | Type | Required | Description |
|---|---|---|---|
| `bounds` | `IBounds` | No | Source bounds to copy from. When omitted all fields default to `0`. |

#### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `left` | `number` | `0` | The left X coordinate. |
| `top` | `number` | `0` | The top Y coordinate. |
| `width` | `number` | `0` | The width. |
| `height` | `number` | `0` | The height. |

#### Computed Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `bottom` | `number` | readonly | Computed as `top + height`. |
| `right` | `number` | readonly | Computed as `left + width`. |

#### Methods

| Method | Returns | Description |
|---|---|---|
| `applyPadding(padding: IPadding)` | `void` | Shrinks the rectangle inward by the given padding values. |
| `clone()` | `Bounds` | Creates a deep copy of this bounds instance. |
| `containsPoint(point: IPoint)` | `boolean` | Returns `true` if the given point lies inside (or on the edge of) this rectangle. |
| `copyFrom(bounds: IBounds)` | `void` | Copies all values from another bounds object. |
| `cropBottom(bounds: Bounds)` | `void` | Crops this rectangle so it does not extend below the top edge of `bounds`. |
| `cropLeft(bounds: Bounds)` | `void` | Crops this rectangle so it does not extend to the left of the right edge of `bounds`. |
| `cropRight(bounds: Bounds)` | `void` | Crops this rectangle so it does not extend to the right of the left edge of `bounds`. |
| `cropTop(bounds: Bounds)` | `void` | Crops this rectangle so it does not extend above the bottom edge of `bounds`. |
| `equals(bounds: IBounds)` | `boolean` | Returns `true` when all four fields match. |
| `toString()` | `string` | Returns a human-readable string such as `[left: 0, top: 0, width: 100, height: 50]`. |

#### Usage

```js
const bounds = new Bounds({ left: 10, top: 20, width: 300, height: 200 });
bounds.applyPadding({ left: 5, top: 5, right: 5, bottom: 5 });
console.log(bounds.right);  // 300
console.log(bounds.bottom); // 210
```

---

### MinMax

Simple model holding a minimum and maximum numeric value. Defined in `Chart.ts`.

| Property | Type | Description |
|---|---|---|
| `min` | `number` | The minimum value. |
| `max` | `number` | The maximum value. |

---

## 2. Data Points

### IDataPoint

Describes a data point with multiple possible coordinate representations.

| Property | Type | Required | Description |
|---|---|---|---|
| `x` | `number` | No | The X pixel coordinate. |
| `date` | `Date` | No | The date as a horizontal coordinate. |
| `record` | `number` | No | The record index as a horizontal coordinate. |
| `y` | `number` | No | The Y pixel coordinate. |
| `value` | `number` | No | The price/value as a vertical coordinate. |

At least one horizontal property (`x`, `date`, or `record`) and one vertical property (`y` or `value`) should be set for a fully usable data point.

---

### DataPoint

Represents a data point with coordinate conversion capabilities. Implements `IDataPoint` and `ICloneable<DataPoint>`.

#### Constructor

| Parameter | Type | Required | Description |
|---|---|---|---|
| `config` | `IDataPoint` | No | Initial coordinate values. String dates are automatically parsed. |

#### Properties

| Property | Type | Description |
|---|---|---|
| `x` | `number` | The X pixel coordinate. |
| `date` | `Date` | The date horizontal coordinate. |
| `record` | `number` | The record-index horizontal coordinate. |
| `y` | `number` | The Y pixel coordinate. |
| `value` | `number` | The price/value vertical coordinate. |

#### Static Methods

| Method | Returns | Description |
|---|---|---|
| `DataPoint.convert(point: IPoint, behavior: IPointBehavior, coordinateMapper: ScaleCoordinateMapper)` | `DataPoint` | Creates a `DataPoint` from raw pixel coordinates, converting according to the specified [PointBehavior](#ipointbehavior). |

#### Instance Methods

| Method | Returns | Description |
|---|---|---|
| `clear()` | `void` | Deletes all coordinate properties from this instance. |
| `clone()` | `DataPoint` | Creates a deep copy. |
| `getDate(coordinateMapper)` | `Date` | Resolves the date from whichever horizontal property is set. |
| `getRecord(coordinateMapper)` | `number` | Resolves the record index from whichever horizontal property is set. |
| `getValue(coordinateMapper)` | `number` | Resolves the price/value from whichever vertical property is set. |
| `getX(coordinateMapper)` | `number` | Resolves the X pixel coordinate from whichever horizontal property is set. |
| `getY(coordinateMapper)` | `number` | Resolves the Y pixel coordinate from whichever vertical property is set. |
| `moveTo(x, y, coordinateMapper)` | `DataPoint` | Moves the point to absolute pixel coordinates, updating the underlying storage accordingly. Returns `this`. |
| `moveToPoint(point: IPoint, coordinateMapper)` | `DataPoint` | Convenience wrapper around `moveTo`. Returns `this`. |
| `moveToX(x, coordinateMapper)` | `DataPoint` | Moves only the horizontal component. Returns `this`. |
| `moveToY(y, coordinateMapper)` | `DataPoint` | Moves only the vertical component. Returns `this`. |
| `toPoint(coordinateMapper)` | `IPoint` | Converts to a plain `{ x, y }` pixel point. |
| `translate(offset: IPoint, coordinateMapper)` | `DataPoint` | Translates the point by the given pixel offset. Returns `this`. |

#### Usage

```js
const dp = new DataPoint({ date: new Date(), value: 105.50 });

// Resolve to pixel coordinates
const px = dp.getX(coordinateMapper);
const py = dp.getY(coordinateMapper);

// Translate by offset
dp.translate({ x: 10, y: -5 }, coordinateMapper);
```

---

## 3. Shape Helpers

### IPointBehavior

Describes how raw pixel coordinates should be interpreted when converting to data coordinates.

| Property | Type | Description |
|---|---|---|
| `x` | `XPointBehavior` | Interpretation mode for the horizontal axis. |
| `y` | `YPointBehavior` | Interpretation mode for the vertical axis. |

### XPointBehavior (enum)

| Value | String | Description |
|---|---|---|
| `X` | `'x'` | Keep as raw pixel X coordinate. |
| `RECORD` | `'record'` | Convert to a record index. |
| `DATE` | `'date'` | Convert to a `Date`. |

### YPointBehavior (enum)

| Value | String | Description |
|---|---|---|
| `Y` | `'y'` | Keep as raw pixel Y coordinate. |
| `VALUE` | `'value'` | Convert to a price/value. |

---

### IFibonacciLevel

Represents a single Fibonacci level used by Fibonacci drawing shapes.

| Property | Type | Required | Description |
|---|---|---|---|
| `value` | `number` | Yes | The Fibonacci level value (e.g. `0.236`, `0.382`, `0.618`). |
| `visible` | `boolean` | No | Whether the level line is visible. |
| `theme` | `IFibonacciLevelTheme` | No | Per-level theme overrides. |

### IFibonacciLevelTheme

| Property | Type | Required | Description |
|---|---|---|---|
| `fill` | `IFillTheme` | No | Fill theme for the level background band. |
| `line` | `IStrokeTheme` | No | Stroke theme for the level line. |
| `text` | `ITextTheme` | No | Text theme for the level label. |

### FibonacciLevelTextHorPosition (constant)

Horizontal position for Fibonacci level text labels.

| Value | Description |
|---|---|
| `LEFT` | Text aligned to the left. |
| `CENTER` | Text centered. |
| `RIGHT` | Text aligned to the right. |

### FibonacciLevelTextVerPosition (constant)

Vertical position for Fibonacci level text labels.

| Value | Description |
|---|---|
| `TOP` | Text placed at the top of the level band. |
| `MIDDLE` | Text vertically centered. |
| `BOTTOM` | Text placed at the bottom of the level band. |

### FibonacciLevelLineExtension (constant)

Controls how Fibonacci level lines extend beyond the shape boundaries.

| Value | Description |
|---|---|
| `NONE` | No extension. |
| `LEFT` | Extend to the left. |
| `RIGHT` | Extend to the right. |
| `TOP` | Extend upward. |
| `BOTTOM` | Extend downward. |
| `BOTH` | Extend in both directions. |

---

## 4. UI Base Classes

### IDisposable

Interface for releasing internal resources.

| Method | Returns | Description |
|---|---|---|
| `dispose()` | `void` | Cleanup memory and dispose the class instance. |

---

### ICloneable\<T\>

Supports creating a new instance with the same values as an existing instance.

| Method | Returns | Description |
|---|---|---|
| `clone()` | `T` | Creates a new object that is a copy of the current instance. |

---

### IStateable\<T\>

Supports serialization and restoration of instance state.

| Method | Returns | Description |
|---|---|---|
| `saveState()` | `T` | Returns a serializable representation of the current state. |
| `restoreState(state: T)` | `void` | Restores a previously saved state. |

---

### IComponent

Describes an abstract component. Extends `IDisposable`. This is the root interface for all chart components.

---

### Component (abstract class)

Abstract base class implementing `IComponent`.

| Method | Returns | Description |
|---|---|---|
| `dispose()` | `void` | **Abstract.** Subclasses must provide cleanup logic. |

---

### IControl

Describes an abstract control. Extends `IComponent`.

| Method | Returns | Description |
|---|---|---|
| `paint()` | `void` | Paints the control. |
| `onEvent(event: IWindowEvent)` | `boolean` | Handles a window event. Returns `true` if the event was handled. |
| `hitTest(point: IPoint)` | `boolean` | Returns `true` if the given point is inside the control. |
| `resize(frame: Bounds)` | `void` | Updates the control size to fit the given frame. |

---

### Control (abstract class)

Base class for all controls. Extends `Component`, implements `IControl`.

#### Constructor

Takes no parameters. Internally initializes a `MotionEventArray` via the overridable `initMotionEvents()` hook.

#### Methods

| Method | Returns | Description |
|---|---|---|
| `paint()` | `void` | Default no-op. Override to draw the control. |
| `onEvent(event: IWindowEvent, inBounds?: boolean)` | `boolean` | Delegates to the internal `MotionEventArray`. |
| `hitTest(point: IPoint)` | `boolean` | Default returns `false`. Override for custom hit detection. |
| `resize(frame: Bounds)` | `void` | Default no-op. Override to handle layout changes. |

#### Protected Methods

| Method | Returns | Description |
|---|---|---|
| `initMotionEvents()` | `MotionEventArray` | Override to return the motion events this control needs. Return `null` for an empty set. |

---

### IHtmlControl

Describes an HTML-based control. Extends `IControl`.

| Property | Type | Description |
|---|---|---|
| `container` | `JQuery` | The parent jQuery container element. |
| `frame` | `Bounds` | The frame rectangle. |

---

### HtmlControl (abstract class)

Base class for controls backed by a DOM element. Extends `Control`, implements `IHtmlControl`.

#### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `container` | `JQuery` | get (public) / set (protected) | The jQuery container element. |
| `frame` | `Bounds` | readonly | The current frame rectangle. |

#### Methods

| Method | Returns | Description |
|---|---|---|
| `dispose()` | `void` | Removes the container element from the DOM. |
| `hitTest(point: IPoint)` | `boolean` | Returns `true` if the point is inside or near the frame. |
| `resize(frame: Bounds)` | `void` | Creates the container on first call, then positions it to match the frame. |

#### Protected Methods

| Method | Returns | Description |
|---|---|---|
| `createContainer()` | `JQuery` | **Abstract.** Subclasses must return a new jQuery container element. |
| `removeContainer()` | `void` | Removes and nullifies the container element. |

---

### Pane

Represents a chart pane -- a horizontal section of the chart that contains plots, shapes, and axes. Extends `HtmlControl`, implements `IStateable<any>`.

See also: [Panes API](panes.md)

#### Constructor

| Parameter | Type | Description |
|---|---|---|
| `config` | `IPaneConfig` | Configuration object containing the parent `PanesContainer` and optional pane options. |

#### Key Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `chart` | `Chart` | readonly | The parent chart instance. |
| `contentFrame` | `Bounds` | readonly | The inner content frame (excludes axes). |
| `coordinateMapper` | `ScaleCoordinateMapper` | readonly | The coordinate mapper for the primary vertical axis. |
| `formatter` | `INumberFormatter` | get / set | The number formatter used for value display. |
| `heightRatio` | `number` | get / set | The pane's height as a ratio of total chart height (0..1). |
| `minHeightRatio` | `number` | get / set | Minimum allowed height ratio. |
| `maxHeightRatio` | `number` | get / set | Maximum allowed height ratio. |
| `moveDirection` | `PaneMoveDirection` | get / set | Allowed drag/scroll direction. |
| `moveKind` | `PaneMoveKind` | get / set | Scroll behavior mode. |
| `indicators` | `Indicator[]` | readonly | Indicators attached to this pane. |
| `layer` | `CanvasLayer` | readonly | The canvas rendering layer. |
| `objects` | `IPaneObject[]` | readonly | All objects (plots + shapes) in the pane. |
| `plots` | `Plot[]` | readonly | Plot objects in the pane. |
| `shapes` | `Shape[]` | readonly | Shape objects in the pane. |
| `positions` | `PositionBar[]` | readonly | Trading position bars in the pane. |
| `orders` | `OrderBar[]` | readonly | Trading order bars in the pane. |
| `alerts` | `AlertBar[]` | readonly | Alert bars in the pane. |
| `panePadding` | `IPadding` | get / set | Padding inside the pane. |
| `panesContainer` | `PanesContainer` | readonly | The parent panes container. |
| `verticalAxis` | `VerticalAxis` | readonly | The primary vertical axis. |
| `verticalAxes` | `VerticalAxis[]` | readonly | All vertical axes. |
| `showCompareTitles` | `boolean` | get / set | Toggle compare instrument titles visibility. |
| `showIndicatorTitles` | `boolean` | get / set | Toggle indicator titles visibility. |
| `state` | `PaneState` | get / set | Current pane state (NORMAL or MAXIMIZED). |
| `theme` | `IPaneTheme` | get / set | Pane visual theme. |
| `visible` | `boolean` | get / set | Pane visibility. |
| `gridX` | `boolean` | get / set | Vertical grid line visibility. |
| `gridY` | `boolean` | get / set | Horizontal grid line visibility. |

#### Methods

| Method | Returns | Description |
|---|---|---|
| `addObjects(...objects: IPaneObject[])` | `void` | Adds one or more pane objects (plots, shapes, etc.). |
| `addPlot(...plots: Plot[])` | `void` | Adds one or more plots. |
| `addShapes(...shapes: Shape[])` | `void` | Adds one or more shapes. |
| `addComponent(component)` | `void` | Adds an HTML component to the pane. |
| `containsObject(object)` | `boolean` | Checks if the pane contains a given object. |
| `containsPlot(plot)` | `boolean` | Checks if the pane contains a given plot. |
| `containsShape(shape)` | `boolean` | Checks if the pane contains a given shape. |
| `dispose()` | `void` | Releases all resources and removes the pane from the DOM. |
| `executeShapes(...shapes: Shape[])` | `void` | Activates shapes for user interaction. |
| `unExecuteShapes(...shapes: Shape[])` | `void` | Deactivates shapes from user interaction. |
| `forceRemoveShapes(...shapes: Shape[])` | `void` | Immediately removes shapes, bypassing undo. |
| `formatValue(value: number)` | `string` | Formats a numeric value using the pane's formatter. |
| `getIndex()` | `number` | Returns the index of this pane within the panes container. |
| `getCoordinateMapper(verticalScale)` | `ScaleCoordinateMapper` | Gets the coordinate mapper for a specific vertical scale. |
| `getVerticalAxis(verticalScale)` | `VerticalAxis` | Gets the vertical axis for a specific vertical scale. |
| `getShapesBetweenDates(startDate, endDate)` | `Shape[]` | Returns shapes that fall within the given date range. |
| `hitTest(point: IPoint)` | `boolean` | Tests if a point is inside the pane. |
| `minMax(startIndex, count, verticalScale)` | `IMinMax<number>` | Calculates min/max values for visible data. |
| `autoScaledMinMax(verticalScale)` | `IMinMax<number>` | Calculates auto-scaled min/max for the vertical scale. |
| `onEvent(event: IWindowEvent)` | `boolean` | Handles a window event. |
| `paint()` | `void` | Renders the pane and all its contents. |
| `refresh()` | `void` | Synchronous refresh of the pane. |
| `refreshAsync(makeAutoScale?)` | `void` | Asynchronous refresh with optional auto-scaling. |
| `refreshScaleAsync()` | `void` | Asynchronously refreshes the vertical scale. |
| `removeComponent(component)` | `void` | Removes an HTML component from the pane. |
| `removeObjects(...objects: IPaneObject[])` | `void` | Removes one or more pane objects. |
| `removePlot(...plots: Plot[])` | `void` | Removes one or more plots. |
| `removeShapes(...shapes: Shape[])` | `void` | Removes one or more shapes. |
| `resize(frame: Bounds)` | `void` | Resizes the pane to fit the given frame. |
| `saveState()` | `any` | Serializes the current pane state. |
| `restoreState(state)` | `void` | Restores a previously saved pane state. |
| `setHeightRatio(ratio: number)` | `void` | Sets the height ratio. |
| `preserveAutoScaling()` | `void` | Preserves current auto-scaling settings. |
| `cancelAutoScaling()` | `void` | Cancels auto-scaling. |

---

### PaneState (enum)

| Value | Description |
|---|---|
| `NORMAL` | Standard pane display. |
| `MAXIMIZED` | Pane fills the entire chart area. |

### PaneMoveDirection (enum)

| Value | String | Description |
|---|---|---|
| `NONE` | `'none'` | Dragging is disabled. |
| `HORIZONTAL` | `'horizontal'` | Only horizontal drag allowed. |
| `VERTICAL` | `'vertical'` | Only vertical drag allowed. |
| `ANY` | `'any'` | Free drag in any direction. |

### PaneMoveKind (enum)

| Value | String | Description |
|---|---|---|
| `NORMAL` | `'normal'` | Standard scrolling behavior. |
| `AUTOSCALED` | `'autoscaled'` | Auto-adjusts the vertical scale while scrolling. |

---

## 5. Events

### IWindowEvent

Describes a window-level event dispatched through the chart framework.

| Property | Type | Description |
|---|---|---|
| `evt` | `JQueryEventObject` | The underlying jQuery event object. |
| `pane` | `Pane` (optional) | The pane where the event originated, if applicable. |
| `pointerPosition` | `IPoint` | The pointer position in chart coordinates. |
| `stopPropagation` | `boolean` | Set to `true` to prevent further event handling. |
| `touches` | `TouchList` (optional) | Touch points for touch events. |

---

### MouseButton (enum)

| Value | Numeric | Description |
|---|---|---|
| `LEFT` | `1` | Left mouse button. |
| `SCROLL` | `2` | Middle (scroll) mouse button. |
| `RIGHT` | `3` | Right mouse button. |

### MouseEvent (enum)

| Value | String | Description |
|---|---|---|
| `ENTER` | `'mouseenter'` | Mouse enters the element. |
| `LEAVE` | `'mouseleave'` | Mouse leaves the element. |
| `MOVE` | `'mousemove'` | Mouse moves within the element. |
| `DOWN` | `'mousedown'` | Mouse button pressed. |
| `UP` | `'mouseup'` | Mouse button released. |
| `CLICK` | `'click'` | Mouse click. |
| `DOUBLE_CLICK` | `'dblclick'` | Mouse double-click. |
| `CONTEXT_MENU` | `'contextmenu'` | Right-click context menu triggered. |
| `WHEEL` | `'mousewheel'` | Mouse wheel scrolled. |
| `SCROLL` | `'DOMMouseScroll'` | DOM mouse scroll (Firefox). |
| `OVER` | `'mouseover'` | Mouse over the element. |

### TouchEvent (enum)

| Value | String | Description |
|---|---|---|
| `START` | `'touchstart'` | Touch begins. |
| `MOVE` | `'touchmove'` | Touch moves. |
| `END` | `'touchend'` | Touch ends. |

### PointerKind (enum)

| Value | Description |
|---|---|
| `NONE` | No pointer detected. |
| `MOUSE` | Mouse pointer. |
| `TOUCH` | Touch pointer. |

### MotionEventState (enum)

| Value | Description |
|---|---|
| `NONE` | No active motion. |
| `STARTED` | Motion has just started. |
| `CONTINUED` | Motion is ongoing. |
| `FINISHED` | Motion has completed. |

---

### MotionEvent

Represents a motion event that tracks pointer interactions through their lifecycle (start, continue, finish). Used as the base class for specific motion types such as click, drag, and hover events.

#### Constructor

| Parameter | Type | Required | Description |
|---|---|---|---|
| `config` | `IMotionEventConfig` | No | Configuration for the motion event. |

#### IMotionEventConfig

| Property | Type | Required | Description |
|---|---|---|---|
| `button` | `number` | No | The mouse button that triggers this event. |
| `context` | `object` | No | The `this` context for handler and hitTest callbacks. |
| `handler` | `MotionEventHandler` | No | Callback invoked when the event fires. |
| `hitTest` | `MotionEventHitTestHandler` | No | Callback to test if the pointer is over the target. |
| `keys` | `number[]` | No | Required modifier keys (Shift, Ctrl, Alt). |

#### Type Aliases

```ts
type MotionEventHandler = (motionEvent: MotionEvent, event: IWindowEvent) => void;
type MotionEventHitTestHandler = (position: IPoint) => boolean;
```

#### Properties

| Property | Type | Description |
|---|---|---|
| `button` | `MouseButton` | The mouse button associated with this event (readonly). |
| `context` | `unknown` | The `this` context used when invoking callbacks. |
| `handler` | `MotionEventHandler` | The callback invoked when the event fires. |
| `hitTest` | `MotionEventHitTestHandler` | The hit-test callback. |

#### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `pointerKind` | `PointerKind` | readonly | The type of pointer that generated the event. |
| `state` | `MotionEventState` | readonly | The current lifecycle state. |

#### Methods

| Method | Returns | Description |
|---|---|---|
| `handleEvent(event: IWindowEvent)` | `boolean` | Processes a window event. Returns `true` if the event was handled. |
| `isActive()` | `boolean` | Returns `true` if the motion is in `STARTED` or `CONTINUED` state. |
| `reset()` | `void` | Resets the motion event to the `NONE` state. |

---

### MotionEventArray

A collection of `MotionEvent` instances that dispatches window events to all contained motion events.

#### Constructor

| Parameter | Type | Required | Description |
|---|---|---|---|
| `motionEvents` | `MotionEvent \| MotionEvent[]` | No | Initial motion event(s) to add. |
| `context` | `unknown` | No | Default context applied to events that lack one. |
| `hitTestFunc` | `MotionEventHitTestHandler` | No | Default hit-test applied to events that lack one. |

#### Properties

| Property | Type | Description |
|---|---|---|
| `motionEvents` | `MotionEvent[]` | The underlying array of motion events (readonly). |

#### Methods

| Method | Returns | Description |
|---|---|---|
| `add(motionEvents: MotionEvent \| MotionEvent[])` | `void` | Adds one or more motion events. Duplicates are ignored. |
| `contains(motionEvent: MotionEvent)` | `boolean` | Returns `true` if the event is already in the collection. |
| `handleEvent(event: IWindowEvent, inBounds?: boolean)` | `boolean` | Dispatches a window event to all contained motion events. Returns `true` if any event was handled. |
| `reset()` | `void` | Resets all motion events to their initial state. |

---

## 6. UI Form Controls

### CheckBox

Static helper for jQuery checkbox elements.

| Method | Returns | Description |
|---|---|---|
| `CheckBox.checked(control: JQuery)` | `boolean` | Returns whether the checkbox is checked. |
| `CheckBox.check(control: JQuery, value: boolean)` | `void` | Sets the checked state. |

---

### NumericField

Static helper for the `jqNumericField` jQuery plugin.

| Method | Returns | Description |
|---|---|---|
| `NumericField.getValue(control: JQuery)` | `number` | Gets the current numeric value. |
| `NumericField.setValue(control: JQuery, value: number)` | `void` | Sets the numeric value. |

### INumericFieldConfig

Configuration for the `jqNumericField` jQuery plugin.

| Property | Type | Description |
|---|---|---|
| `allowNegative` | `boolean` | Whether negative values are permitted. |
| `maxValue` | `number` | Maximum allowed value. |
| `minValue` | `number` | Minimum allowed value. |
| `priceDecimals` | `number` | Number of decimal places. |
| `showArrows` | `boolean` | Whether to display up/down arrow buttons. |
| `value` | `number` | The initial value. |
| `onChange(value, obj)` | `void` | Callback invoked when the value changes. |

---

### DropDown

A custom styled dropdown (select) control. Implements `IDisposable`.

#### Constructor

| Parameter | Type | Description |
|---|---|---|
| `container` | `JQuery` | A jQuery `<select>` element to enhance. The original element is hidden and replaced by the styled dropdown. |

#### Methods

| Method | Returns | Description |
|---|---|---|
| `dispose()` | `void` | Removes the dropdown from the DOM. |
| `selected()` | `IDropDownItem` | Returns the currently selected item. |
| `on(event: string, callback: VoidFunction)` | `void` | Subscribes to events. Currently supports `'change'`. |
| `select(value: unknown, performOnChange?: boolean)` | `void` | Programmatically selects an item by value. Triggers the change callback unless `performOnChange` is `false`. |

### IDropDownItem

| Property | Type | Description |
|---|---|---|
| `dataAttr` | `string` (optional) | Optional `data-i18n` attribute for localization. |
| `selected` | `boolean` | Whether this item is currently selected. |
| `style` | `CSSStyleDeclaration` | The inline style of the source `<option>` element. |
| `title` | `string` | Display text. |
| `value` | `any` | The option value. |
