# Plots API Reference

Plots are the visual representations of data series within a pane. Every indicator, chart type, and custom overlay renders through one or more `Plot` subclasses.

See also: [Panes API](panes.md) | [Events & Enums](events-enums.md) | [Theme Reference](theme.md)

---

## Plot (Abstract Base)

All plot types extend this abstract base class.

### PlotType Enum

| Constant | Description |
|---|---|
| `INDICATOR` | Plot belongs to an indicator. |
| `CHART_TYPE` | Plot renders the main chart type. |
| `USER` | User-defined / custom plot. |

### Key Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `dataRows` | `DataRow[]` | get / set | The data rows rendered by this plot. |
| `enableVerticalAxisLabels` | `boolean` | get / set | Whether axis labels are drawn for this plot's values. |
| `stretchPricingLines` | `boolean` | get / set | Whether pricing lines stretch across the full pane width. |
| `hoverable` | `boolean` | get / set | Whether the plot responds to hover events. |
| `plotStyle` | `number` | get / set | Style variant (meaning depends on the subclass). |
| `plotType` | `PlotType` | readonly | The type of this plot (indicator, chart type, or user). |
| `selectable` | `boolean` | get / set | Whether the plot can be selected by the user. |
| `selected` | `boolean` | get / set | Whether the plot is currently selected. |
| `showPricingLines` | `boolean` | get / set | Whether horizontal pricing lines are drawn at the last value. |
| `theme` | `object` | get / set | Theme object controlling this plot's visual appearance. |
| `isVolume` | `boolean` | get / set | Indicates this plot renders volume data (affects scaling). |

### Methods

#### findDataRows

```ts
findDataRows(rowMarker: DataRowsMarker): DataRow[]
```

| Parameter | Type | Description |
|---|---|---|
| `rowMarker` | `DataRowsMarker` | The marker identifying which data rows to return. |

Returns: `DataRow[]` -- Data rows matching the given marker.

---

#### handleEvent

```ts
handleEvent(event: object): void
```

| Parameter | Type | Description |
|---|---|---|
| `event` | `object` | The incoming event (e.g. mouse interaction). |

Processes an incoming event.

Returns: `void`

---

#### hover

```ts
hover(): void
```

Programmatically triggers the hover state.

Returns: `void`

---

#### minMaxValues

```ts
minMaxValues(startIndex: number, count: number): { min: number, max: number }
```

| Parameter | Type | Description |
|---|---|---|
| `startIndex` | `number` | The first index of the visible range. |
| `count` | `number` | The number of items in the visible range. |

Returns: `{ min, max }` -- The minimum and maximum values within the visible range.

---

#### paintVerticalAxisLabels

```ts
paintVerticalAxisLabels(): void
```

Renders axis labels for this plot on the vertical scale.

Returns: `void`

---

## PlotEvent

Events fired by all plot types. Subscribe via `plot.on(PlotEvent.XXX, handler)`.

| Constant | Description |
|---|---|
| `DATA_ROWS_CHANGED` | Plot data rows replaced or updated. |
| `PANE_CHANGED` | Plot moved to a different pane. |
| `THEME_CHANGED` | Plot theme updated. |
| `STYLE_CHANGED` | Plot style changed (e.g. line to area). |
| `ENABLE_AXIS_LABELS` | Axis label visibility toggled. |
| `SHOW_VALUE_LINES_CHANGED` | Value lines visibility toggled. |
| `STRETCH_VALUE_LINES_CHANGED` | Value line stretching toggled. |
| `VISIBLE_CHANGED` | Plot visibility toggled. |
| `VALUE_SCALE_CHANGED` | Plot's value scale changed. |
| `BASE_VALUE_CHANGED` | Plot base value changed. |
| `SELECTED_CHANGED` | Plot selection state changed. |
| `HOVERED_CHANGED` | Plot hover state changed. |
| `CONTEXT_MENU` | Context menu opened on the plot. |

**Example**

```javascript
plot.on(FintaChart.PlotEvent.SELECTED_CHANGED, (event) => {
  console.log('Plot selected:', event.value);
});
```

---

## LinePlot

Renders data as a continuous line.

### LinePlotStyle

| Constant | Description |
|---|---|
| `SIMPLE` | Plain line connecting data points. |
| `AREA` | Line with a filled area between the line and the baseline. |
| `STEP` | Staircase / step line (horizontal then vertical segments). |

### Example

```javascript
const plot = new FintaChart.LinePlot();
plot.plotStyle = FintaChart.LinePlotStyle.AREA;
plot.theme = {
  line: { strokeColor: '#2196F3', width: 2, lineStyle: 'solid' },
  fill: { fillColor: 'rgba(33, 150, 243, 0.15)' }
};
```

---

## HistogramPlot

Renders data as vertical bars or columns.

### HistogramBars

Constants identifying individual histogram bar categories:

| Constant | Description |
|---|---|
| `UP_BAR` | Bar where the value increased. |
| `DOWN_BAR` | Bar where the value decreased. |
| `MEAN_BAR` | Bar at or near the mean value. |

### HistogramPlotStyle

| Constant | Description |
|---|---|
| `LINE` | Thin vertical lines. |
| `COLORED_LINE` | Thin vertical lines with up/down coloring. |
| `COLORED_BAR_LINE` | Bar-width lines with up/down coloring. |
| `COLORED_MEAN_BAR_LINE` | Bar-width lines colored relative to the mean value. |
| `COLUMN` | Solid filled columns. |
| `COLORED_COLUMN` | Solid filled columns with up/down coloring. |
| `BYDATES` | Columns colored by date grouping. |

### Example

```javascript
const plot = new FintaChart.HistogramPlot();
plot.plotStyle = FintaChart.HistogramPlotStyle.COLORED_COLUMN;
plot.theme = {
  upBar: { fillColor: '#26a69a' },
  downBar: { fillColor: '#ef5350' }
};
```

---

## PointPlot

Renders data as discrete point markers.

### PointPlotStyle

| Constant | Description |
|---|---|
| `DOT` | Circular dot marker at each data point. |

### Example

```javascript
const plot = new FintaChart.PointPlot();
plot.plotStyle = FintaChart.PointPlotStyle.DOT;
plot.theme = {
  point: { fillColor: '#FF9800', radius: 3 }
};
```

---

## BarPlot

Renders OHLC bar data (used internally by chart types such as candlestick, OHLC bar, etc.).

### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `columnWidthRatio` | `number` | get / set | Width of each bar as a ratio of the available column space (0..1). |
| `minWidth` | `number` | get / set | Minimum bar width in pixels. Bars never render narrower than this value. |

### Example

```javascript
const plot = new FintaChart.BarPlot();
plot.columnWidthRatio = 0.8;
plot.minWidth = 1;
```

---

## AreaPlot

Renders a filled area between two data series or between a data series and a baseline.

### Methods

#### drawArea

```ts
drawArea(isAbove: boolean, theme: object): void
```

| Parameter | Type | Description |
|---|---|---|
| `isAbove` | `boolean` | Controls whether the fill is above or below the baseline. |
| `theme` | `object` | Provides the fill and stroke colors. |

Returns: `void`

---

### Example

```javascript
const plot = new FintaChart.AreaPlot();
plot.drawArea(true, {
  line: { strokeColor: '#4CAF50', width: 1 },
  fill: { fillColor: 'rgba(76, 175, 80, 0.2)' }
});
```

---

## RowHistogramPlot (Volume Profile)

Renders horizontal histogram rows across a price range, typically used for Volume Profile overlays.

### IVolumeProfile Interface

| Property | Type | Description |
|---|---|---|
| `rows` | `IVolumeProfileRow[]` | Array of row data. |
| `startIndex` | `number` | First bar index of the profile range. |
| `endIndex` | `number` | Last bar index of the profile range. |
| `highPrice` | `number` | Highest price in the profile. |
| `lowPrice` | `number` | Lowest price in the profile. |
| `pocIndex` | `number` | Index of the Point of Control row (highest volume). |

### PlotRowStyle

| Constant | Description |
|---|---|
| `RANGE` | Single profile over a user-defined range. |
| `DAILY` | Separate profiles computed for each trading day. |
| `HEATMAP` | Color-gradient heatmap based on volume density. |

### Example

```javascript
const plot = new FintaChart.RowHistogramPlot();
plot.plotStyle = FintaChart.PlotRowStyle.RANGE;
plot.theme = {
  upRow: { fillColor: 'rgba(38, 166, 154, 0.4)' },
  downRow: { fillColor: 'rgba(239, 83, 80, 0.4)' },
  poc: { strokeColor: '#FFD600', width: 2 }
};
```
