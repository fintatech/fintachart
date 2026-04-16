# CrossHair API Reference

## CrossHair

The `CrossHair` provides a visual cursor overlay on the chart, displaying coordinate information as the user moves the mouse across panes. It supports several display modes controlled by the [CrossHairType](#crosshairtype-enum) enum.

See also: [Panes API](panes.md) | [Scales API](scales.md)

### Configuration

| Property | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `'cross'` | Initial crosshair type. Must be a valid [CrossHairType](#crosshairtype-enum) value. |

### Members

| Member | Type | Description |
|---|---|---|
| `component` | `Component` | The underlying rendering component for the crosshair. |
| `showReplayModeLine` | `boolean` | When `true`, displays a vertical line indicating the replay-mode position. |
| `visible` | `boolean` | Controls overall crosshair visibility. |

### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `type` | `CrossHairType` | get / set | Gets or sets the current crosshair display mode. |

### Methods

#### applyTheme

```typescript
applyTheme(): void
```

Re-applies the current theme to the crosshair visuals.

---

#### show

```typescript
show(): void
```

Makes the crosshair visible.

---

#### hide

```typescript
hide(): void
```

Hides the crosshair.

---

#### resize

```typescript
resize(): void
```

Recalculates crosshair dimensions after a layout change.

---

#### refresh

```typescript
refresh(): void
```

Redraws the crosshair at its current position.

---

#### moveTo

```typescript
moveTo(point: { x: number, y: number }, optimize?: boolean): void
```

Moves the crosshair to the specified `{ x, y }` point. When `optimize` is `true`, redundant redraws are skipped if the position has not changed.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `point` | `{ x: number, y: number }` | Yes | Target position in pixel coordinates. |
| `optimize` | `boolean` | No | When `true`, skips redraw if position is unchanged. |

Returns: `void`

---

#### dispose

```typescript
dispose(): void
```

Releases all resources held by the crosshair.

---

#### saveState

```typescript
saveState(): object
```

Serializes the current crosshair state.

Returns: `object`

---

#### restoreState

```typescript
restoreState(): void
```

Restores a previously saved crosshair state.

---

## CrossHairType Enum

| Value | String | Description |
|---|---|---|
| `NONE` | `'none'` | Crosshair is disabled; no overlay is drawn. |
| `LABELS` | `'labels'` | Only axis labels are shown at the cursor position (no lines). |
| `CROSS` | `'cross'` | A full crosshair with horizontal and vertical lines intersecting at the cursor. |
| `CROSS_BARS` | `'crossBars'` | Crosshair lines are drawn only within the axis bars (gutters), not across the pane content. |
| `DOT` | `'dot'` | A dot marker is shown at the data point nearest to the cursor. |

---

## Usage

### Setting the crosshair type

```js
// Via the chart shorthand
chart.crossHairType = FintaChart.CrossHairType.CROSS;

// Via the crosshair instance
chart.crossHair.type = FintaChart.CrossHairType.LABELS;
```

### Showing and hiding

```js
chart.crossHair.show();
chart.crossHair.hide();
```

### Moving programmatically

```js
// Move to a specific pixel coordinate within the chart
chart.crossHair.moveTo({ x: 350, y: 200 });

// Move with optimization (skip redraw if position unchanged)
chart.crossHair.moveTo({ x: 350, y: 200 }, true);
```

### Replay mode line

```js
// Enable the replay-mode position indicator
chart.crossHair.showReplayModeLine = true;
```
