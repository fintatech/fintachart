# Scales API Reference

## VerticalScale

The `VerticalScale` controls the price axis displayed alongside a [Pane](panes.md#pane). Each pane can expose a left axis, a right axis, or both.

See also: [Panes API](panes.md) | [HorizontalScale](#horizontalscale)

### Configuration

| Property | Type | Default | Description |
|---|---|---|---|
| `showLeftPane` | `boolean` | `false` | Show the left vertical axis on initialization. |
| `showRightPane` | `boolean` | `true` | Show the right vertical axis on initialization. |
| `useManualWidth` | `boolean` | `false` | When `true`, the axis uses a fixed width instead of auto-sizing. |
| `width` | `number` | — | Fixed width in pixels (applies when `useManualWidth` is `true`). |

### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `index` | `number` | readonly | Index of this scale within the pane's scale collection. |
| `leftAxis` | `VerticalAxis` | readonly | Reference to the left axis instance. |
| `rightAxis` | `VerticalAxis` | readonly | Reference to the right axis instance. |
| `leftAxisVisible` | `boolean` | get / set | Controls visibility of the left axis. |
| `rightAxisVisible` | `boolean` | get / set | Controls visibility of the right axis. |
| `manualWidth` | `number` | get / set | The fixed width value (used when `useManualWidth` is `true`). |
| `useManualWidth` | `boolean` | get / set | Toggles between auto-sized and manually fixed axis width. |

### Methods

| Method | Returns | Description |
|---|---|---|
| `dispose()` | `void` | Releases resources held by the scale. |
| `saveState()` | `object` | Serializes the current scale state. |
| `restoreState()` | `void` | Restores a previously saved scale state. |

### Usage

```js
const pane = chart.primaryPane;
const scale = pane.getVerticalAxis();

// Show both axes
scale.leftAxisVisible = true;
scale.rightAxisVisible = true;

// Use a fixed width
scale.useManualWidth = true;
scale.manualWidth = 80;
```

---

## HorizontalScale

The `HorizontalScale` manages the time/date axis at the bottom of the chart. It controls scrolling behavior, zoom modes, and layout templates.

See also: [Panes API](panes.md) | [VerticalScale](#verticalscale)

### Key Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `defaultLayoutTemplate` | `LayoutTemplate` | readonly | The default layout template applied to the horizontal axis. |
| `allowPartialRecords` | `boolean` | get / set | When `true`, records that are only partially visible at the edges are rendered. |
| `autoScrollMode` | `HorizontalAxisAutoScrollMode` | get / set | Determines when auto-scrolling occurs (see [HorizontalAxisAutoScrollMode](#horizontalaxisautoscrollmode)). |
| `autoScrollKind` | `HorizontalAxisAutoScrollKind` | get / set | Determines the auto-scroll trigger condition (see [HorizontalAxisAutoScrollKind](#horizontalaxisautoscrollkind)). |

---

## Enums

### HorizontalAxisScrollKind

Controls how the horizontal axis responds to scroll operations.

| Value | Description |
|---|---|
| `NORMAL` | Standard scrolling behavior. |
| `AUTOSCALED` | Scrolling automatically adjusts the vertical scale to fit visible data. |

### HorizontalAxisZoomKind

Controls how the horizontal axis responds to zoom operations.

| Value | Description |
|---|---|
| `NORMAL` | Standard zoom behavior. |
| `AUTOSCALED` | Zooming automatically adjusts the vertical scale to fit visible data. |

### HorizontalAxisAutoScrollKind

Determines the condition under which the chart auto-scrolls to show new data.

| Value | Description |
|---|---|
| `NONE` | Auto-scrolling is disabled. |
| `HIDDEN_BAR` | Auto-scrolls only when the newest bar would otherwise be hidden. |
| `ALWAYS` | Auto-scrolls on every incoming data update. |

### HorizontalAxisAutoScrollMode

Determines at which event auto-scrolling is triggered.

| Value | Description |
|---|---|
| `NEW_BAR` | Auto-scrolls when a new bar is created. |
| `TICK` | Auto-scrolls on every incoming tick. |

### HorizontalAxisZoomMode

Controls the anchor point used during zoom operations.

| Value | Description |
|---|---|
| `PIN_CENTER` | Zoom anchors at the center of the visible range. |
| `PIN_LEFT` | Zoom anchors at the left edge of the visible range. |
| `PIN_RIGHT` | Zoom anchors at the right edge of the visible range. |
| `PIN_MOUSE` | Zoom anchors at the current mouse position. |

### Usage

```js
const hScale = chart.horizontalScale;

// Enable auto-scroll on every tick
hScale.autoScrollMode = FintaChart.HorizontalAxisAutoScrollMode.TICK;
hScale.autoScrollKind = FintaChart.HorizontalAxisAutoScrollKind.ALWAYS;
```
