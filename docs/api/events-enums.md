# Events & Enums Reference

This document lists every event namespace and enumeration constant available in FintaChart.

See also: [EventEmitter API](event-emitter.md) | [Panes API](panes.md) | [Plots API](plots.md)

---

## Event Namespaces

### ChartEvent

Events fired by the `Chart` instance. Subscribe via `chart.on(ChartEvent.XXX, handler)`.

| Constant | String Value | Description |
|---|---|---|
| `WINDOW_MODE_CHANGED` | `'chartWindowModeChanged'` | Window mode switched (normal / full-screen / full-window). |
| `TOOLBAR_LOADED` | `'chartToolbarLoaded'` | Toolbar component finished loading. |
| `SCROLLBAR_LOADED` | `'chartScrollbarLoaded'` | Scrollbar component finished loading. |
| `STATE_CHANGED` | `'chartStateChanged'` | Any chart state property changed. |
| `TIME_INTERVAL_CHANGED` | `'chartTimeIntervalChanged'` | Active time interval changed. |
| `INDICATOR_ADDED` | `'chartIndicatorAdded'` | Indicator added to the chart. |
| `INDICATOR_REMOVED` | `'chartIndicatorRemoved'` | Indicator removed from the chart. |
| `THEME_CHANGED` | `'themeChanged'` | Chart-level theme changed. |
| `GLOBAL_THEME_CHANGED` | `'chartGlobalThemeChanged'` | Global theme changed across all charts. |
| `CHART_TYPE_CHANGED` | `'chartChartTypeChanged'` | Chart type selection changed. |
| `CHART_TYPE_APPLIED` | `'chartChartTypeApplied'` | Chart type fully applied and rendered. |
| `HOVER_RECORD_CHANGED` | `'chartHoverRecordChanged'` | Hovered data record changed. |
| `SETS_DEFAULT_SETTINGS` | `'chartsetsDefaultSettings'` | Default settings applied. |
| `INSTRUMENT_CHANGED` | `'chartInstrumentChanged'` | Active instrument changed. |
| `SYMBOL_ENTERED` | `'chartSymbolEntered'` | User entered a symbol string. |
| `TIME_FRAME_CHANGED` | `'chartTimeFrameChanged'` | Active time frame changed. |
| `TIME_FRAME_DELETED` | `'chartTimeFrameDeleted'` | A time frame removed from the list. |
| `TIME_FRAME_ADDED` | `'chartTimeFrameAdded'` | A time frame added to the list. |
| `TIMEFRAME_LIST_UPDATED` | `'chartTimeFrameAddCustom'` | Custom time frame list updated. |
| `CROSS_HAIR_CHANGED` | `'chartCrossHairChanged'` | Cross-hair type or visibility changed. |
| `STATE_LOADED` | `'chartStateLoaded'` | Saved state restored. |
| `LOCALE_CHANGED` | `'chartLocaleChanged'` | Locale / language changed. |
| `ENABLE_KEYBOARD_EVENTS_CHANGED` | | Keyboard event forwarding toggled. |
| `ENABLE_MOUSE_EVENTS_CHANGED` | | Mouse event forwarding toggled. |
| `VALUE_SCALE_ADDED` | | A value scale added to a pane. |
| `VALUE_SCALE_REMOVED` | | A value scale removed from a pane. |
| `USER_SHAPE_STARTED` | | User began drawing a shape. |
| `USER_SHAPE_FINISHED` | | User completed drawing a shape. |
| `USER_SHAPE_CANCELLED` | | User cancelled drawing a shape. |
| `PANE_ADDED` | `'paneAdded'` | A pane added to the chart. |
| `PANE_REMOVED` | `'paneRemoved'` | A pane removed from the chart. |
| `DATE_SCALE_THEME_CHANGED` | | Date scale theme updated. |
| `FIRST_VISIBLE_RECORD_CHANGED` | | First visible record index changed (scroll/zoom). |
| `LAST_VISIBLE_RECORD_CHANGED` | | Last visible record index changed (scroll/zoom). |
| `MORE_HISTORY_REQUESTED` | | Chart requests additional historical data. |
| `ZOOM_IN_STARTED` | | Zoom-in gesture started. |
| `ZOOM_IN_FINISHED` | | Zoom-in gesture finished. |
| `ZOOM_IN_CANCELLED` | | Zoom-in gesture cancelled. |
| `SHOW_INSTRUMENT_WATERMARK_CHANGED` | | Instrument watermark visibility toggled. |
| `PICKUP_COLUMN_ADDED` | | A pickup column added. |
| `PICKUP_COLUMN_REMOVED` | | A pickup column removed. |
| `BARS_SETTED` | | Bar data replaced (full set). |
| `BARS_APPENDED` | | New bars appended to the data series. |
| `BARS_INSERTED` | | Bars inserted into the data series. |
| `LAST_BAR_UPDATED` | | The most recent bar updated (real-time tick). |
| `ADJUST_TYPE_CHANGED` | | Adjust type changed (bars only / bars+shapes). |
| `VERTICAL_ADJUST_VALUE_CHANGED` | | Vertical adjustment value changed. |
| `PANE_MAXIMIZED` | | A pane maximized / restored. |
| `REPLAY_MODE_START_RECORD_SELECTED` | | Replay mode start record selected. |
| `REPLAY_MODE_STOPPED` | | Replay mode stopped. |
| `STAY_IN_SHAPE_MODE_CHANGED` | | Persistent shape-drawing mode toggled. |
| `TIMEZONE_CHANGED` | | Active timezone changed. |
| `TICK` | | A new tick received from the datafeed. |

**Example**

```javascript
chart.on(FintaChart.ChartEvent.INSTRUMENT_CHANGED, (event) => {
  console.log('New instrument:', event.value.symbol);
});

chart.on(FintaChart.ChartEvent.BARS_APPENDED, (event) => {
  console.log('Bars appended, count:', event.value.length);
});
```

---

### PaneEvent

Events fired by individual `Pane` instances.

| Constant | Description |
|---|---|
| `THEME_CHANGED` | Pane theme updated. |
| `X_GRID_VISIBLE_CHANGED` | Horizontal grid visibility toggled. |
| `Y_GRID_VISIBLE_CHANGED` | Vertical grid visibility toggled. |
| `PLOT_ADDED` | A plot added to the pane. |
| `PLOT_REMOVED` | A plot removed from the pane. |
| `SHAPE_ADDED` | A shape added to the pane. |
| `SHAPE_REMOVED` | A shape removed from the pane. |
| `OBJECT_ADDED` | A chart object added to the pane. |
| `OBJECT_REMOVED` | A chart object removed from the pane. |
| `DOUBLE_CLICKED` | Pane double-clicked. |
| `CONTEXT_MENU` | Context menu opened on the pane. |

**Example**

```javascript
pane.on(FintaChart.PaneEvent.PLOT_ADDED, (event) => {
  console.log('Plot added:', event.value);
});
```

---

### ShapeEvent

Events fired by shape objects (lines, rectangles, drawings, etc.).

| Constant | Description |
|---|---|
| `PANE_CHANGED` | Shape moved to a different pane. |
| `VALUE_SCALE_CHANGED` | Shape's value scale changed. |
| `VISIBLE_CHANGED` | Shape visibility toggled. |
| `POINTS_CHANGED` | Shape anchor points modified. |
| `LOCKED_CHANGED` | Shape lock state toggled. |
| `RESIZABLE_CHANGED` | Shape resizability toggled. |
| `HOVERABLE_CHANGED` | Shape hoverability toggled. |
| `SELECTABLE_CHANGED` | Shape selectability toggled. |
| `HOVERED_CHANGED` | Shape hover state changed. |
| `SELECTED_CHANGED` | Shape selection state changed. |
| `THEME_CHANGED` | Shape theme updated. |
| `DRAG_STARTED` | Shape drag operation started. |
| `DRAG_FINISHED` | Shape drag operation finished. |
| `DOUBLE_CLICK` | Shape double-clicked. |
| `CONTEXT_MENU` | Context menu opened on the shape. |

**Example**

```javascript
shape.on(FintaChart.ShapeEvent.POINTS_CHANGED, (event) => {
  console.log('Shape moved:', event.value);
});
```

---

### PlotEvent

Events fired by `Plot` objects. See also: [Plots API](plots.md).

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

---

### IndicatorEvent

Events fired by `Indicator` instances.

| Constant | Description |
|---|---|
| `SELECTED_CHANGED` | Indicator selection state changed. |
| `HOVERED_CHANGED` | Indicator hover state changed. |
| `SHOWED_CONTEXT_MENU` | Context menu opened on the indicator. |
| `SELECTABLE_CHANGED` | Indicator selectability toggled. |
| `HOVERABLE_CHANGED` | Indicator hoverability toggled. |

---

## Enumerations

### Periodicity

Defines the granularity of a time interval.

| Constant | Value | Description |
|---|---|---|
| `TICK` | `'t'` | Tick-level data. |
| `SECOND` | `'s'` | Second bars. |
| `MINUTE` | `''` | Minute bars (default). |
| `HOUR` | `'h'` | Hourly bars. |
| `DAY` | `'d'` | Daily bars. |
| `WEEK` | `'w'` | Weekly bars. |
| `MONTH` | `'m'` | Monthly bars. |
| `YEAR` | `'y'` | Yearly bars. |

---

### TimeSpan

Pre-computed millisecond constants for common durations.

| Constant | Value |
|---|---|
| `MILLISECONDS_IN_SECOND` | `1000` |
| `MILLISECONDS_IN_MINUTE` | `60000` |
| `MILLISECONDS_IN_HOUR` | `3600000` |
| `MILLISECONDS_IN_DAY` | `86400000` |
| `MILLISECONDS_IN_WEEK` | `604800000` |
| `MILLISECONDS_IN_MONTH` | `2592000000` |
| `MILLISECONDS_IN_YEAR` | `31536000000` |

---

### WindowMode

| Constant | Description |
|---|---|
| `NORMAL` | Default embedded mode. |
| `FULL_SCREEN` | Browser full-screen (Fullscreen API). |
| `FULL_WINDOW` | Fills the entire browser window. |

---

### CrossHairType

| Constant | Description |
|---|---|
| `NONE` | Cross-hair disabled. |
| `LABELS` | Value labels only (no lines). |
| `CROSS` | Full cross-hair lines. |
| `CROSS_BARS` | Cross-hair with highlighted bar markers. |
| `DOT` | Dot marker on the data point. |

---

### ChartTypeNames

String constants identifying each built-in chart type.

| Constant | Description |
|---|---|
| `CANDLE` | Japanese candlestick chart. |
| `HEIKIN_ASHI` | Heikin-Ashi candles. |
| `HOLLOW_CANDLE` | Hollow candlestick chart. |
| `BAR` | OHLC bar chart. |
| `COLORED_BAR` | OHLC bar chart with up/down coloring. |
| `LINE` | Simple line chart. |
| `MOUNTAIN` | Filled area (mountain) chart. |
| `STEP_LINE` | Step-line chart. |
| `DOT` | Dot chart. |
| `DASH` | Dash chart. |
| `RENKO` | Renko chart. |
| `LINE_BREAK` | Line-break chart. |
| `RANGE_BARS` | Range bar chart. |
| `KAGI` | Kagi chart. |
| `POINT_AND_FIGURE` | Point & Figure chart. |
| `EQUI_VOLUME` | Equi-volume chart. |
| `VOLUME_CANDLE` | Volume-weighted candle chart. |

---

### PaneMoveDirection

| Constant | Description |
|---|---|
| `NONE` | Movement disabled. |
| `HORIZONTAL` | Horizontal scrolling only. |
| `VERTICAL` | Vertical scrolling only. |
| `ANY` | Unrestricted movement. |

---

### PaneMoveKind

| Constant | Description |
|---|---|
| `NORMAL` | Standard panning. |
| `AUTOSCALED` | Panning with automatic vertical rescaling. |

---

### PlotType

| Constant | Description |
|---|---|
| `INDICATOR` | Plot belongs to an indicator. |
| `CHART_TYPE` | Plot renders the main chart type. |
| `USER` | User-defined / custom plot. |

---

### LinePlotStyle

| Constant | Description |
|---|---|
| `SIMPLE` | Plain line. |
| `AREA` | Line with filled area beneath. |
| `STEP` | Step / staircase line. |

---

### HistogramPlotStyle

| Constant | Description |
|---|---|
| `LINE` | Histogram rendered as vertical lines. |
| `COLORED_LINE` | Vertical lines with up/down coloring. |
| `COLORED_BAR_LINE` | Bar-width lines with up/down coloring. |
| `COLORED_MEAN_BAR_LINE` | Bar-width lines colored relative to the mean. |
| `COLUMN` | Solid columns. |
| `COLORED_COLUMN` | Solid columns with up/down coloring. |
| `BYDATES` | Columns colored by date grouping. |

---

### PointPlotStyle

| Constant | Description |
|---|---|
| `DOT` | Circular dot marker. |

---

### AdjustType

| Constant | Value | Description |
|---|---|---|
| `BARS` | `0` | Auto-scale considers bar data only. |
| `BARSANDSHAPES` | `1` | Auto-scale considers bars and shapes. |

---

### MovingAverageType

| Constant | Value | Description |
|---|---|---|
| `EXPONENTIAL` | `0` | Exponential Moving Average (EMA). |
| `HULL` | `1` | Hull Moving Average (HMA). |
| `SIMPLE` | `2` | Simple Moving Average (SMA). |
| `TRIANGULAR` | `3` | Triangular Moving Average (TMA). |
| `TEMA` | `4` | Triple Exponential Moving Average. |
| `WEIGHTED` | `5` | Weighted Moving Average (WMA). |
| `VARIABLE` | `6` | Variable Moving Average (VMA). |
| `WWS` | `7` | Welles Wilder Smoothing. |
| `VIDYA` | `8` | Variable Index Dynamic Average. |

---

### KagiReversalType

| Constant | Description |
|---|---|
| `ATR` | Reversal based on Average True Range. |
| `FIXED` | Fixed-value reversal. |
| `POINTS` | Point-based reversal. |
| `TRADITIONAL` | Traditional reversal logic. |
| `PERCENTAGE` | Percentage-based reversal. |

---

### RenkoBoxSizeType

| Constant | Description |
|---|---|
| `FIXED` | Fixed box size. |
| `ATR` | Box size from Average True Range. |
| `POINTS` | Box size in points. |
| `TRADITIONAL` | Traditional Renko sizing. |
| `PERCENTAGE` | Percentage-based box size. |

---

### DataRowsMarker

Identifies standard data-row columns in a plot's data.

| Constant | Description |
|---|---|
| `DATE` | Timestamp column. |
| `OPEN` | Open price. |
| `HIGH` | High price. |
| `LOW` | Low price. |
| `CLOSE` | Close price. |
| `VOLUME` | Volume. |

---

### LineStyle

| Constant | Description |
|---|---|
| `SOLID` | Solid line. |
| `DASH` | Dashed line. |
| `DOT` | Dotted line. |
| `DASH_DOT` | Alternating dash-dot line. |

---

### MagnetMode

Controls how shape anchor points snap to bar data.

| Constant | Description |
|---|---|
| `NONE` | No snapping. |
| `ALWAYS` | Always snap to nearest bar value. |
| `NEAR` | Snap only when the cursor is near a bar. |

---

### MagnetPoint

Specifies which bar value the magnet snaps to.

| Constant | Description |
|---|---|
| `BAR` | Nearest point on the bar. |
| `HIGH` | Bar high. |
| `LOW` | Bar low. |
| `OPEN` | Bar open. |
| `CLOSE` | Bar close. |
