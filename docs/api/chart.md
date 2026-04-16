# Chart

`Chart` is the central class of Trading Chart Designer. It extends [EventEmitter](event-emitter.md) and manages data, indicators, shapes, scales, panes, themes, and trading objects. All interaction with the charting library starts with creating a `Chart` instance.

```
FintaChart.Chart  extends  EventEmitter  implements  IDisposable, IStateable<any>
```

## Constructor

```typescript
new FintaChart.Chart(config: IChartConfig)
```

Creates a new chart and renders it inside the given container element. The chart immediately sends a bars request to the datafeed if one is provided.

**Example**

```javascript
const chart = new FintaChart.Chart({
  container: document.getElementById('chart-container'),
  width: '100%',
  height: 600,
  theme: FintaChart.Theme.Dark,
  datafeed: new FintaChart.Datafeed({ url: '/api' }),
  instrument: { symbol: 'AAPL', exchange: 'NASDAQ', tickSize: 0.01 },
  chartType: 'candle',
  timeFrame: { interval: 1, periodicity: 'day' },
  showToolbar: true,
  showScrollbar: true,
});
```

---

## IChartConfig

All properties are optional.

| Property | Type | Description |
|----------|------|-------------|
| `container` | `HTMLElement` | DOM element that will host the chart. **Required in practice** -- the constructor throws if missing. |
| `width` | `number \| string` | Chart width. Accepts pixels or CSS strings (e.g. `'100%'`). Default: `'100%'`. |
| `height` | `number \| string` | Chart height. Accepts pixels or CSS strings. Default: `'100%'`. |
| `theme` | `any` | Theme object controlling colors, fonts, and styling. |
| `datafeed` | `IDatafeedBase` | Data provider that the chart calls to load bars. |
| `instrument` | `IInstrument` | Initial financial instrument to display. See [Instrument](instrument.md). |
| `chartType` | `string` | Initial chart type name (e.g. `'candle'`, `'line'`, `'bar'`). See [Chart Types](chart-types.md). |
| `supportedTimeFrames` | `string[]` | List of time frame labels for the toolbar (e.g. `['1 Minutes', '1 Hour', '1 Day']`). |
| `timeFrame` | `ITimeFrame` | Initial time frame (`{ interval: number, periodicity: string }`). Default: `{ interval: 1, periodicity: 'day' }`. |
| `timeInterval` | `number` | Shorthand to set the time frame as a single interval number. Overrides `timeFrame` if provided. |
| `showToolbar` | `boolean` | Show the top toolbar. Default: `true`. |
| `showScrollbar` | `boolean` | Show the bottom scrollbar. Default: `true`. |
| `enableToolPanes` | `boolean` | Enable shape-settings side pane. Default: `true`. |
| `enableHotKeys` | `boolean` | Enable keyboard shortcuts. Default: `true`. |
| `fullWindowMode` | `boolean` | Start in full-window mode. Default: `false`. |
| `ohlcShowed` | `boolean` | Show the floating OHLC data panel. |
| `barsCount` | `number` | Number of bars to request initially. Default: `500`. |
| `autoSave` | `boolean` | Automatically persist chart state via `stateHandler`. Default: `false`. |
| `useSmoothedLines` | `boolean` | Render line-based chart types with smoothed (anti-aliased) lines. Default: `false`. |
| `hideScrollToLastBar` | `boolean` | Hide the "scroll to last bar" arrow. Default: `false`. |
| `addThemeClass` | `boolean` | Add a CSS class to `<body>` for the active theme. Default: `true`. |
| `stateHandler` | `IChartStateHandler` | Custom handler for saving/loading chart state. Defaults to `LocalStorageChartStateHandler`. |
| `templateDataProvider` | `TemplatesDataProvider` | Provider for chart templates. |
| `indicatorsOverviewProvider` | `IIndicatorsOverviewProvider` | Provider for the indicators overview dialog. |
| `indicatorsRestrictionsProvider` | `IRestrictedIndicatorsProvider` | Provider that returns lists of restricted indicator types. |
| `indicatorAlertsHandler` | `IIndicatorAlertsHandler` | Handler for indicator-based alerts. |
| `tradeHandler` | `ITradeHandlerCallback` | Callback invoked when the user submits an order from the chart. |
| `marketEventsDatafeed` | `MarketEventsDatafeed` | Data provider for calendar/market events. |
| `marketEventPopupBuilder` | `IMarketEventPopupBuilder` | Builder for market-event popup content. |
| `searchInstruments` | `SearchInstrumentPredicate` | Async function for instrument search: `(query, exchange?) => Promise<IInstrument[]>`. |
| `exchanges` | `GetAllExchanges` | Function returning available exchange names: `() => string[]`. |
| `contextMenuItems` | `IContextMenuItem[]` | Extra items appended to the right-click context menu. |
| `contextMenuPlacingOrdersEnabled` | `boolean` | Enable "Place Order" entries in the context menu. |
| `showExecutionLabels` | `boolean` | Show labels on executed orders. Default: `false`. |
| `showExecution` | `boolean` | Show execution markers. Default: `false`. |
| `showLogoWatermark` | `boolean` | Show a logo watermark on the primary pane. Default: `false`. |
| `useExternalSearchInput` | `boolean` | Use an external instrument-search input instead of the built-in modal. |
| `isChartWidget` | `boolean` | Mark this instance as an embedded widget. |
| `dateTimezoneConverter` | `(date: Date, timezone: string) => Date` | Custom function for timezone conversion. |
| `onToolbarLoaded` | `any` | Callback fired after the toolbar finishes loading. |
| `onScrollbarLoaded` | `any` | Callback fired after the scrollbar finishes loading. |
| `tradingSession` | `any` | Trading-session type string (e.g. `'ETH'`, `'RTH'`). Default: `'ETH'`. |
| `tradingSessionRange` | `ITradingSessionRange` | Session time boundaries for pre/after/close-market hours. |
| `orderSettings` | `GetOrderSettingsType` | Function returning order-entry settings. |
| `crossHair` | `string` | Initial cross-hair type. |

---

## Accessors

Get/set properties exposed on a `Chart` instance.

### Layout and containers

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `panes` | `Pane[]` | get | All panes (primary + indicator panes). See [Panes](panes.md). |
| `panesContainer` | `PanesContainer` | get | The internal panes-container manager. |
| `container` | `JQuery` | get | The root container JQuery element. |
| `primaryPane` | `Pane` | get | The main (primary) price pane. |
| `size` | `ISize` | get/set | Pixel dimensions `{ width, height }` of the chart root div. |
| `cssSize` | `ICssSize` | get/set | CSS dimensions (may contain `'%'` strings). |

### Cross hair and cursor

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `crossHair` | `CrossHair` | get | The cross-hair object. |
| `crossHairType` | `string` | get/set | Current cross-hair mode string. |

### Data

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `dataContext` | `DataContext` | get | The chart's data storage. |
| `recordsCount` | `number` | get | Total number of data records currently loaded. |

### Scales

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `horizontalScale` | `HorizontalScale` | get | The horizontal (date/time) scale. |
| `verticalScale` | `VerticalScale` | get | The primary (first) vertical scale. |
| `verticalScales` | `VerticalScale[]` | get | All vertical scales. |

### Indicators and instruments

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `indicators` | `Indicator[]` | get | All indicators currently applied. |
| `instrument` | `IInstrument` | get/set | The active financial instrument. Setting fires `INSTRUMENT_CHANGED`. |

### Chart type

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `chartType` | `IChartType` | get/set | The chart-type instance. Setting fires `CHART_TYPE_CHANGED` and refreshes. |
| `chartTypeName` | `string` | get/set | The chart-type name string (e.g. `'candle'`). Setting replaces the chart type. |

### Theme

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `theme` | `any` | get/set | The full theme object. Setting fires `THEME_CHANGED` and re-applies styles. |
| `userTheme` | `any` | get/set | User-level theme overrides. |

### Time frame

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `timeFrame` | `ITimeFrame` | get/set | Current time frame `{ interval, periodicity }`. Setting fires `TIME_FRAME_CHANGED`. |
| `timeInterval` | `number` | get/set | Time interval as a single number. Setting converts to a time frame and fires `TIME_INTERVAL_CHANGED`. |

### Window and display mode

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `windowMode` | `WindowMode` | get | Current window mode (normal or full-window). |
| `locale` | `string` | get/set | Active locale code (e.g. `'en'`). Setting fires `LOCALE_CHANGED`. |

### Visibility range

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `firstVisibleIndex` | `number` | get | Index of the first visible bar. |
| `lastVisibleIndex` | `number` | get | Index of the last visible bar. |
| `firstVisibleRecord` | `number` | get/set | Record number of the first visible bar. |
| `lastVisibleRecord` | `number` | get/set | Record number of the last visible bar. |

### Interaction flags

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `hotkeysEnabled` | `boolean` | get/set | Whether keyboard shortcuts are active. Fires `ENABLE_KEYBOARD_EVENTS_CHANGED`. |
| `mouseEventsEnabled` | `boolean` | get/set | Whether mouse events are processed. Fires `ENABLE_MOUSE_EVENTS_CHANGED`. |
| `scrollEnabled` | `boolean` | get/set | Whether horizontal scrolling is allowed. |
| `zoomEnabled` | `boolean` | get/set | Whether zooming is allowed. |

### OHLC and grid

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `ohlcShowed` | `boolean` | get/set | Show/hide the floating OHLC panel. |
| `gridX` | `boolean` | get/set | Show/hide vertical grid lines. |
| `gridY` | `boolean` | get/set | Show/hide horizontal grid lines. |

### Watermarks

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `showInstrumentWatermark` | `boolean` | get/set | Show instrument symbol watermark on the primary pane. Fires `SHOW_INSTRUMENT_WATERMARK_CHANGED`. |
| `showLogoWatermark` | `boolean` | get | Show a logo watermark on the primary pane. |
| `showBarInfoInTitle` | `boolean` | get/set | Show bar info (OHLCV) in the pane title area. |

### Lines and rendering

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `smoothLines` | `boolean` | get/set | Use smoothed (anti-aliased) lines for line-type charts. |
| `showExecutionLabels` | `boolean` | get/set | Show labels on execution markers. |
| `showExecution` | `boolean` | get/set | Show/hide execution markers. Fires `CHANGE_VISIBILITY_EXECUTION`. |

### Shapes and drawing

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `selectedObject` | `SelectedObject` | get/set | The currently selected chart object (shape, order, alert, or position). |
| `showShapes` | `boolean` | get/set | Global toggle for shape visibility. |
| `adjustType` | `number` | get/set | Auto-scale adjust type: `0` = bars only, `1` = bars + shapes. Fires `ADJUST_TYPE_CHANGED`. |
| `stayInShapeMode` | `boolean` | get/set | Keep drawing the same shape type after finishing one. Fires `STAY_IN_SHAPE_MODE_CHANGED`. |
| `magnetMode` | `string` | get/set | Magnet snap mode for shape drawing (e.g. `'none'`). |
| `lockShapes` | `boolean` | get/set | Lock all shapes from editing. Fires `LOCK_SHAPES_CHANGED`. |
| `shapeTemplates` | `IShapeTemplateState` | get/set | Saved shape templates map. Fires `CHANGE_SHAPE_TEMPLATES`. |

### Trading

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `lastBid` | `number` | get/set | Last bid price. Fires `LAST_BID_CHANGED`. |
| `lastAsk` | `number` | get/set | Last ask price. Fires `LAST_ASK_CHANGED`. |
| `conversionRate` | `{ ask: number, bid: number, symbol?: string }` | get/set | Currency conversion rate. |
| `currency` | `string` | get/set | Display currency string. |
| `orderFeatures` | `OrderFeaturesInterface` | get/set | Order-type features and quantity units. Fires `ORDER_FEATURES_CHANGED`. |
| `contextMenuItems` | `IContextMenuItem[]` | get/set | Custom context menu items. |

### Indicators and favorites

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `favoriteIndicators` | `string[]` | get/set | List of favorite indicator type names. Fires `CHANGE_FAVORITE_INDICATORS`. |

### Timezone

| Accessor | Type | Access | Description |
|----------|------|--------|-------------|
| `timezone` | `ITimezone \| null` | get/set | Active timezone `{ name, timezone }`. Setting fires `TIMEZONE_CHANGED`. |

---

## Public Methods

### Data

#### addDataRows

```typescript
addDataRows(dataRows: string | DataRows, replaceIfExists?: boolean): DataRows
```

Add named data rows to the chart's data context.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dataRows` | `string \| DataRows` | Data-row name or `DataRows` instance |
| `replaceIfExists` | `boolean` *(optional)* | Replace existing rows with the same name |

**Returns:** `DataRows` -- the added (or existing) data rows.

---

#### removeDataRows

```typescript
removeDataRows(...dataRows: (string | DataRows)[]): void
```

Remove one or more data-row sets from the data context.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dataRows` | `(string \| DataRows)[]` | Names or instances to remove |

---

#### clearDataRows

```typescript
clearDataRows(dataRows: string | DataRows): void
```

Clear the values of a data-row set without removing it.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dataRows` | `string \| DataRows` | Name or instance to clear |

---

#### findDataRows

```typescript
findDataRows(rowMarker: string): DataRows
```

Look up data rows by marker name.

| Parameter | Type | Description |
|-----------|------|-------------|
| `rowMarker` | `string` | The row marker to search for |

**Returns:** `DataRows` -- the matching data rows, or `undefined`.

---

#### getDataRows

```typescript
getDataRows(name: string): DataRows
```

Retrieve data rows by full name.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Full data-rows name |

**Returns:** `DataRows`

---

#### barDataRows

```typescript
barDataRows(): IBarDataRows
```

Retrieve the standard OHLCV bar data rows.

**Returns:** `IBarDataRows` -- object with `date`, `open`, `high`, `low`, `close`, `volume` data-row arrays.

---

#### getCommonDataRows

```typescript
getCommonDataRows(): IBarDataRows
```

Alias for `barDataRows()`.

**Returns:** `IBarDataRows`

---

#### appendBars

```typescript
appendBars(bars: IBar | IBar[]): void
```

Append one or more bars to the chart data. Fires `BARS_APPENDED`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `bars` | `IBar \| IBar[]` | Bar(s) to append |

---

#### trimDataRows

```typescript
trimDataRows(maxLength: number): void
```

Trim all data rows to a maximum length, removing the oldest entries.

| Parameter | Type | Description |
|-----------|------|-------------|
| `maxLength` | `number` | Maximum number of records to keep |

---

### Indicators

#### addIndicators

```typescript
addIndicators(
  indicators: number | number[] | Indicator | Indicator[] | IIndicatorState | IIndicatorState[]
): Indicator | Indicator[]
```

Add one or more indicators to the chart. Accepts indicator instances, state objects, or numeric IDs.

| Parameter | Type | Description |
|-----------|------|-------------|
| `indicators` | `number \| number[] \| Indicator \| Indicator[] \| IIndicatorState \| IIndicatorState[]` | Indicator(s) to add |

**Returns:** `Indicator | Indicator[]` -- the added indicator(s).

---

#### executeIndicators

```typescript
executeIndicators(
  indicators: number | number[] | Indicator | Indicator[]
): Indicator | Indicator[]
```

Execute (calculate and render) indicators without adding them through the undo/redo system. Fires `INDICATOR_ADDED` for each new indicator.

| Parameter | Type | Description |
|-----------|------|-------------|
| `indicators` | `number \| number[] \| Indicator \| Indicator[]` | Indicator(s) to execute |

**Returns:** `Indicator | Indicator[]`

---

#### removeIndicators

```typescript
removeIndicators(indicators?: Indicator | Indicator[], removePaneIfNoPlots?: boolean): void
```

Remove indicator(s) from the chart. Removes their pane if no plots remain (when `removePaneIfNoPlots` is `true`).

| Parameter | Type | Description |
|-----------|------|-------------|
| `indicators` | `Indicator \| Indicator[]` *(optional)* | Indicator(s) to remove. Omit to remove all. |
| `removePaneIfNoPlots` | `boolean` *(optional)* | Remove the pane when it has no remaining plots. Default: `true`. |

---

#### rollbackIndicators

```typescript
rollbackIndicators(indicators?: Indicator | Indicator[], removePaneIfNoPlots?: boolean): void
```

Remove indicators and their visual elements without going through the undo/redo system. Fires `INDICATOR_REMOVED` for each removed indicator.

| Parameter | Type | Description |
|-----------|------|-------------|
| `indicators` | `Indicator \| Indicator[]` *(optional)* | Indicator(s) to remove. Omit to remove all. |
| `removePaneIfNoPlots` | `boolean` *(optional)* | Remove empty panes. Default: `true`. |

---

#### mergeIndicators

```typescript
mergeIndicators(indicator1: Indicator, indicator2: Indicator): Indicator
```

Merge two indicators into the same pane.

| Parameter | Type | Description |
|-----------|------|-------------|
| `indicator1` | `Indicator` | First indicator |
| `indicator2` | `Indicator` | Second indicator |

**Returns:** `Indicator` -- the resulting merged indicator.

---

#### restoreIndicatorsState

```typescript
restoreIndicatorsState(state: string | IIndicatorState[]): void
```

Remove all current indicators and re-create them from a saved state.

| Parameter | Type | Description |
|-----------|------|-------------|
| `state` | `string \| IIndicatorState[]` | JSON string or array of indicator states |

---

#### saveIndicatorsState

```typescript
saveIndicatorsState(): IIndicatorState[]
```

Serialize the state of all current indicators.

**Returns:** `IIndicatorState[]`

---

#### refreshIndicators

```typescript
refreshIndicators(): void
```

Recalculate and repaint all indicators.

---

### Panes

#### addPane

```typescript
addPane(index?: number, heightRatio?: number, reducePrimaryPane?: boolean): Pane
```

Add a new pane to the chart. See [Panes](panes.md).

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `number` *(optional)* | Insert position |
| `heightRatio` | `number` *(optional)* | Height as a ratio of total height |
| `reducePrimaryPane` | `boolean` *(optional)* | Shrink the primary pane to make room |

**Returns:** `Pane`

---

#### findPaneAt

```typescript
findPaneAt(y: number): Pane
```

Find the pane at a given Y coordinate (relative to the chart root).

| Parameter | Type | Description |
|-----------|------|-------------|
| `y` | `number` | Y-coordinate in pixels |

**Returns:** `Pane`

---

### Scales

#### addVerticalScale

```typescript
addVerticalScale(verticalScale?: VerticalScale): VerticalScale
```

Add a vertical scale to the chart. If no instance is provided, a new default scale is created.

| Parameter | Type | Description |
|-----------|------|-------------|
| `verticalScale` | `VerticalScale` *(optional)* | Scale instance to add |

**Returns:** `VerticalScale` -- the added scale. Fires `VALUE_SCALE_ADDED`.

---

#### removeVerticalScale

```typescript
removeVerticalScale(verticalScale: VerticalScale | VerticalScale[]): void
```

Remove one or more vertical scales. The primary (first) scale cannot be removed.

| Parameter | Type | Description |
|-----------|------|-------------|
| `verticalScale` | `VerticalScale \| VerticalScale[]` | Scale(s) to remove |

Fires `VALUE_SCALE_REMOVED`.

---

### Shapes

#### startShape

```typescript
startShape(shape: Shape, allowEditing?: boolean): void
```

Begin drawing a shape manually. The chart enters `USER_SHAPE` state and the cursor changes.

| Parameter | Type | Description |
|-----------|------|-------------|
| `shape` | `Shape` | The shape instance to draw |
| `allowEditing` | `boolean` *(optional)* | Allow editing the shape immediately. Default: `false`. |

Fires `USER_SHAPE_STARTED`.

---

#### finishShape

```typescript
finishShape(): void
```

Complete the current manual shape drawing. If `stayInShapeMode` is `true`, a new shape of the same type starts automatically.

Fires `USER_SHAPE_FINISHED`.

---

#### cancelShape

```typescript
cancelShape(): void
```

Cancel the current manual shape drawing and remove the incomplete shape.

Fires `USER_SHAPE_CANCELLED`.

---

#### copyShape

```typescript
copyShape(shape?: Shape): void
```

Copy a shape to the global clipboard. Uses the currently selected shape if none is provided.

| Parameter | Type | Description |
|-----------|------|-------------|
| `shape` | `Shape` *(optional)* | Shape to copy |

---

#### pasteShape

```typescript
pasteShape(): Shape
```

Paste the shape from the global clipboard into the chart.

**Returns:** `Shape` -- the pasted shape, or `undefined` if the clipboard is empty.

---

#### getSelectedShape

```typescript
getSelectedShape(): Shape
```

Find and return the currently selected shape across all panes.

**Returns:** `Shape` -- the selected shape, or `undefined`.

---

#### removeShapes

```typescript
removeShapes(): void
```

Remove all shapes from all panes.

---

#### restoreShapesState

```typescript
restoreShapesState(state: string | IShapeState[]): void
```

Remove all shapes and re-create them from a saved state.

| Parameter | Type | Description |
|-----------|------|-------------|
| `state` | `string \| IShapeState[]` | JSON string or array of shape states |

---

#### saveShapesState

```typescript
saveShapesState(): IShapeState[]
```

Serialize the state of all savable shapes. Capped at 100 shapes.

**Returns:** `IShapeState[]`

---

### Zoom

#### startZoom

```typescript
startZoom(zoomMode: ZoomMode): void
```

Enter zoom mode. Fires `ZOOM_IN_STARTED`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `zoomMode` | `ZoomMode` | Zoom mode (`ZoomMode.BOUNDS` or `ZoomMode.DATE_RANGE`) |

---

#### cancelZoom

```typescript
cancelZoom(): void
```

Cancel an active zoom operation. Fires `ZOOM_IN_CANCELLED`.

---

#### zoomPixels

```typescript
zoomPixels(pixels: number): void
```

Zoom in or out by a pixel amount.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pixels` | `number` | Positive to zoom in, negative to zoom out |

---

#### zoomRecords

```typescript
zoomRecords(records: number): void
```

Zoom in or out by a number of records.

| Parameter | Type | Description |
|-----------|------|-------------|
| `records` | `number` | Positive to zoom in, negative to zoom out |

---

### Scroll

#### scrollPixels

```typescript
scrollPixels(pixels: number): void
```

Scroll the chart horizontally by a pixel amount.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pixels` | `number` | Positive scrolls right, negative scrolls left |

---

#### scrollRecords

```typescript
scrollRecords(records: number): void
```

Scroll the chart horizontally by a number of records.

| Parameter | Type | Description |
|-----------|------|-------------|
| `records` | `number` | Positive scrolls right, negative scrolls left |

---

#### scrollToRealtimeArrow

```typescript
scrollToRealtimeArrow(): void
```

Scroll the chart so that the most recent bar is visible on the right edge.

---

#### scrollChartOneCandle

```typescript
scrollChartOneCandle(multiplier?: number): void
```

Scroll the chart by one candle width, multiplied by `multiplier`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `multiplier` | `number` *(optional)* | Direction and speed. Default: `1`. Positive scrolls right. |

---

### State

#### applyTemplate

```typescript
applyTemplate(templateState: string | IChartTemplateState): void
```

Apply a chart template. Replaces indicators, chart type, and optionally the theme.

| Parameter | Type | Description |
|-----------|------|-------------|
| `templateState` | `string \| IChartTemplateState` | Template ID string or template-state object |

---

#### getChartTemplate

```typescript
getChartTemplate(): IChartTemplateState
```

Get the current chart state as a template (theme + indicators + chart type).

**Returns:** `IChartTemplateState`

---

#### saveState

```typescript
saveState(): IChartState
```

Serialize the complete chart state including options, chart type, cross hair, scales, panes, indicators, shapes, hotkeys, and market events.

**Returns:** `IChartState`

---

#### restoreState

```typescript
restoreState(state: string | IChartState, preserveObjects?: boolean, toDefault?: boolean): void
```

Restore the chart from a previously saved state. Fires `STATE_LOADED` on completion.

| Parameter | Type | Description |
|-----------|------|-------------|
| `state` | `string \| IChartState` | JSON string or state object |
| `preserveObjects` | `boolean` *(optional)* | Keep current indicators and re-apply them after restore. Default: `false`. |
| `toDefault` | `boolean` *(optional)* | Restore only basic options without applying full state details. Default: `false`. |

---

#### restoreVisibleRange

```typescript
restoreVisibleRange(recordsState: IRecordsState): void
```

Restore the visible record range, aligning the last visible record to the end of available data.

| Parameter | Type | Description |
|-----------|------|-------------|
| `recordsState` | `IRecordsState` | Object with `firstVisibleRecord`, `lastVisibleRecord`, `recordsCount` |

---

### Refresh

#### refresh

```typescript
refresh(updateInstruments?: boolean): void
```

Synchronously refresh the chart: recalculate layout, repaint all visuals.

| Parameter | Type | Description |
|-----------|------|-------------|
| `updateInstruments` | `boolean` *(optional)* | Also refresh comparison instruments. Default: `false`. |

---

#### refreshAsync

```typescript
refreshAsync(makeAutoScale?: boolean): void
```

Schedule an asynchronous (optimized, batched) chart refresh.

| Parameter | Type | Description |
|-----------|------|-------------|
| `makeAutoScale` | `boolean` *(optional)* | Recalculate auto-scale before painting |

---

#### refreshLayout

```typescript
refreshLayout(): void
```

Recalculate all visual dimensions (panes, scales, splitters) without repainting.

---

#### refreshSize

```typescript
refreshSize(): void
```

Refresh component sizes (toolbar, scrollbar).

---

#### refreshAutoScaleAsync

```typescript
refreshAutoScaleAsync(): void
```

Recalculate auto-scale for the panes container asynchronously.

---

#### refreshAutoScaleAllAsync

```typescript
refreshAutoScaleAllAsync(): void
```

Recalculate auto-scale for both horizontal and vertical axes asynchronously.

---

#### autoScalePanes

```typescript
autoScalePanes(kind?: AutoScalePanesKind): void
```

Trigger auto-scaling on panes.

| Parameter | Type | Description |
|-----------|------|-------------|
| `kind` | `AutoScalePanesKind` *(optional)* | `AllPanes` (default) or `PanesWithPreservingAutoScaling` |

---

#### paint

```typescript
paint(): void
```

Repaint the horizontal scale and all panes.

---

### Chart Type

#### applyChartType

```typescript
applyChartType(typeName: string, dateRange?: any): void
```

Switch to a different chart type by name, optionally preserving a date range. Fires `CHART_TYPE_CHANGED`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `typeName` | `string` | Chart type name (e.g. `'candle'`, `'line'`) |
| `dateRange` | `any` *(optional)* | `{ startDate, endDate }` to preserve. Defaults to current visible range. |

---

### Range

#### dateRange

```typescript
dateRange(startDate?: Date, endDate?: Date): any
```

Get or set the visible date range. When called without arguments, returns `{ startDate, endDate }`. When called with arguments, scrolls the chart to that range.

| Parameter | Type | Description |
|-----------|------|-------------|
| `startDate` | `Date` *(optional)* | Start of the range |
| `endDate` | `Date` *(optional)* | End of the range |

**Returns:** `{ startDate: Date, endDate: Date }` when called as a getter.

---

#### recordRange

```typescript
recordRange(firstRecord?: number, lastRecord?: number): any
```

Get or set the visible record range. When called without arguments, returns `{ firstVisibleRecord, lastVisibleRecord }`. When `lastRecord` is `null`, scrolls to show the last N records.

| Parameter | Type | Description |
|-----------|------|-------------|
| `firstRecord` | `number` *(optional)* | First record index |
| `lastRecord` | `number` *(optional)* | Last record index |

**Returns:** `{ firstVisibleRecord: number, lastVisibleRecord: number }` when called as a getter.

---

#### visibleDataRange

```typescript
visibleDataRange(): any
```

Get the visible data record range clamped to actual data bounds.

**Returns:** `{ firstVisibleDataRecord: number, lastVisibleDataRecord: number }`

---

#### barsBetweenPoints

```typescript
barsBetweenPoints(startPoint: IPoint | IDataPoint, endPoint: IPoint | IDataPoint): number
```

Count the number of bars between two points on the chart.

| Parameter | Type | Description |
|-----------|------|-------------|
| `startPoint` | `IPoint \| IDataPoint` | Start point |
| `endPoint` | `IPoint \| IDataPoint` | End point |

**Returns:** `number`

---

#### primaryBar

```typescript
primaryBar(indexOrDate: number | Date, symbol?: string): IBar
```

Get a single bar by index or date.

| Parameter | Type | Description |
|-----------|------|-------------|
| `indexOrDate` | `number \| Date` | Bar index or date |
| `symbol` | `string` *(optional)* | Symbol for comparison instruments |

**Returns:** `IBar`

---

#### primaryBarDataRows

```typescript
primaryBarDataRows(symbol?: string): IBarDataRows
```

Get the OHLCV data rows used by the primary chart type.

| Parameter | Type | Description |
|-----------|------|-------------|
| `symbol` | `string` *(optional)* | Symbol for comparison instruments |

**Returns:** `IBarDataRows`

---

#### primaryDataRows

```typescript
primaryDataRows(rowMarker: string, symbol?: string): DataRows
```

Get a specific data-row set from the primary chart type.

| Parameter | Type | Description |
|-----------|------|-------------|
| `rowMarker` | `string` | Row marker (e.g. `'.close'`, `'.date'`) |
| `symbol` | `string` *(optional)* | Symbol prefix |

**Returns:** `DataRows`

---

### Selection

#### selectObject

```typescript
selectObject(obj: SelectedObject): boolean
```

Select a chart object (shape, order, alert, or position). Pass `null` to deselect.

| Parameter | Type | Description |
|-----------|------|-------------|
| `obj` | `SelectedObject` | Object to select, or `null` |

**Returns:** `boolean` -- `true` if the selection changed.

---

#### updateHoverRecord

```typescript
updateHoverRecord(x: number): void
```

Update the hovered record based on an X coordinate. Fires `HOVER_RECORD_CHANGED` when the record changes.

| Parameter | Type | Description |
|-----------|------|-------------|
| `x` | `number` | X-coordinate in chart-local pixels |

---

#### hoverObject

```typescript
hoverObject(obj: IChartObject): boolean
```

Set the hovered chart object.

| Parameter | Type | Description |
|-----------|------|-------------|
| `obj` | `IChartObject` | Object to hover |

**Returns:** `boolean` -- `true` if the hover changed.

---

### Locale

#### localize

```typescript
localize(element?: JQuery): void
```

Trigger localization on the chart or a specific element.

| Parameter | Type | Description |
|-----------|------|-------------|
| `element` | `JQuery` *(optional)* | Element to localize. Defaults to the entire chart. |

---

#### localizeText

```typescript
localizeText(key: string, replace?: object): Promise<string>
```

Get a localized string by key.

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | `string` | Localization key |
| `replace` | `object` *(optional)* | Replacement values for interpolation |

**Returns:** `Promise<string>`

---

### Theme

#### getTheme

```typescript
getTheme(): IEnvironmentTheme
```

Extract the current theme as an `IEnvironmentTheme` object with flattened color properties.

**Returns:** `IEnvironmentTheme`

---

#### getModifiedTheme

```typescript
getModifiedTheme(config: IEnvironmentTheme): any
```

Apply an `IEnvironmentTheme` config to the current theme and return the resulting full theme object.

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `IEnvironmentTheme` | Environment theme overrides |

**Returns:** `any` -- the modified theme object.

---

#### setupLayoutTheme

```typescript
setupLayoutTheme(): void
```

Apply the current theme to the chart's DOM elements and refresh indicators.

---

### Export

#### exportChartData

```typescript
exportChartData(): void
```

Export all chart data (bars + indicator values) as a CSV file download.

---

### Events

#### subscribeWindowEvents

```typescript
subscribeWindowEvents(): void
```

Attach global `mousemove` and `mouseup` handlers for drag operations.

---

#### unsubscribeWindowEvents

```typescript
unsubscribeWindowEvents(): void
```

Remove global `mousemove` and `mouseup` handlers.

---

### Display

#### addCssClass

```typescript
addCssClass(cssClass: string): void
```

Add a CSS class to the chart root div.

| Parameter | Type | Description |
|-----------|------|-------------|
| `cssClass` | `string` | CSS class name |

---

#### removeCssClass

```typescript
removeCssClass(cssClass: string): void
```

Remove a CSS class from the chart root div.

| Parameter | Type | Description |
|-----------|------|-------------|
| `cssClass` | `string` | CSS class name |

---

#### removeActiveClass

```typescript
removeActiveClass(): void
```

Remove the `tcdActiveChart` CSS class from the chart container.

---

#### toggleDataInfo

```typescript
toggleDataInfo(show: boolean): void
```

Toggle the OHLC data-info panel activation state.

| Parameter | Type | Description |
|-----------|------|-------------|
| `show` | `boolean` | `true` to activate, `false` to deactivate |

---

#### setWindowMode

```typescript
setWindowMode(mode: WindowMode): void
```

Switch between normal and full-window mode.

| Parameter | Type | Description |
|-----------|------|-------------|
| `mode` | `WindowMode` | Target window mode |

---

#### showWaitingBar

```typescript
showWaitingBar(): void
```

Show a loading/waiting indicator over the chart.

---

#### hideWaitingBar

```typescript
hideWaitingBar(): void
```

Hide the loading/waiting indicator.

---

#### saveImage

```typescript
saveImage(): void
```

Save the chart as an image. Opens a save dialog or triggers a download depending on the browser.

---

#### saveImageToClipboard

```typescript
saveImageToClipboard(): void
```

Copy the chart image to the system clipboard.

---

#### showDemoModePopup

```typescript
showDemoModePopup(closable?: boolean): void
```

Display the demo mode popup overlay.

| Parameter | Type | Description |
|-----------|------|-------------|
| `closable` | `boolean` *(optional, default `true`)* | Whether the popup can be dismissed |

---

#### showTimeFrameChangePopup

```typescript
showTimeFrameChangePopup(value: string): void
```

Show a popup notifying the user of a time frame change.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `string` | The new time frame display string |

---

#### showInstrumentChangePopup

```typescript
showInstrumentChangePopup(value: string): void
```

Show a popup notifying the user of an instrument change.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `string` | The new instrument symbol |

---

#### hideInstrumentChangePopup

```typescript
hideInstrumentChangePopup(): void
```

Hide the instrument change popup.

---

#### addTimeFrame

```typescript
addTimeFrame(data: TimeFrame): void
```

Add a custom time frame to the chart's supported time frames list. Fires `TIME_FRAME_ADDED`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `TimeFrame` | Time frame to add |

---

#### deleteTimeFrame

```typescript
deleteTimeFrame(data: TimeFrame, strTimeFrame: string): void
```

Remove a custom time frame from the chart. Fires `TIME_FRAME_DELETED`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `TimeFrame` | Time frame to remove |
| `strTimeFrame` | `string` | String representation of the time frame |

---

### Data loading

#### sendBarsRequest

```typescript
sendBarsRequest(): void
```

Send the pending bars request to the datafeed. Cancels any in-flight request first.

---

#### requestMoreBars

```typescript
requestMoreBars(): void
```

Request additional historical bars from the datafeed. Fires `MORE_HISTORY_REQUESTED`.

---

### Ticks

#### processTick

```typescript
processTick(tick: ITick): void
```

Feed a real-time tick into the chart. Only processes ticks matching the current instrument symbol. Fires `TICK`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `tick` | `ITick` | Tick data with `symbol` property |

---

### Orders

#### addOrder

```typescript
addOrder(order: OrderBar): void
```

Add an order bar to the primary pane.

| Parameter | Type | Description |
|-----------|------|-------------|
| `order` | `OrderBar` | Order bar instance |

---

#### removeOrder

```typescript
removeOrder(order: OrderBar): Promise<void>
```

Remove an order bar from the primary pane and dispose of it.

| Parameter | Type | Description |
|-----------|------|-------------|
| `order` | `OrderBar` | Order bar instance |

---

#### updateOrderTPSL

```typescript
updateOrderTPSL(orderId: string | number): void
```

Update take-profit and stop-loss lines for an order by its ID.

| Parameter | Type | Description |
|-----------|------|-------------|
| `orderId` | `string \| number` | Order ID |

---

#### addAlert

```typescript
addAlert(alert: AlertBar): void
```

Add an alert bar to the primary pane. Automatically creates a low-bound alert bar when applicable.

| Parameter | Type | Description |
|-----------|------|-------------|
| `alert` | `AlertBar` | Alert bar instance |

---

#### removeAlert

```typescript
removeAlert(alertId: string): void
```

Remove all alert bars matching the given alert ID.

| Parameter | Type | Description |
|-----------|------|-------------|
| `alertId` | `string` | Alert ID |

---

#### addPosition

```typescript
addPosition(order: PositionBar): void
```

Add a position bar to the primary pane.

| Parameter | Type | Description |
|-----------|------|-------------|
| `order` | `PositionBar` | Position bar instance |

---

#### removePosition

```typescript
removePosition(position: PositionBar): void
```

Remove a position bar from the primary pane.

| Parameter | Type | Description |
|-----------|------|-------------|
| `position` | `PositionBar` | Position bar instance |

---

### Other

#### dispose

```typescript
dispose(removeContainer?: boolean): void
```

Destroy the chart and free all resources.

| Parameter | Type | Description |
|-----------|------|-------------|
| `removeContainer` | `boolean` *(optional)* | Remove the container element from DOM. Default: `true`. |

---

#### lock

```typescript
lock(): void
```

Permanently lock the chart: disable mouse events, toolbar, scrollbar, and horizontal scale. This is irreversible.

---

#### updateSupportedTimeFrames

```typescript
updateSupportedTimeFrames(list: string[]): void
```

Replace the supported time frames list and refresh the toolbar. Fires `TIMEFRAME_LIST_UPDATED`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `list` | `string[]` | New list of time frame labels |

---

#### searchInstruments

```typescript
searchInstruments(query: string, exchange?: string): Promise<IInstrument[]>
```

Search for instruments using the configured search predicate.

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | `string` | Search query |
| `exchange` | `string` *(optional)* | Filter by exchange |

**Returns:** `Promise<IInstrument[]>`

---

#### exchanges

```typescript
exchanges(): string[]
```

Get all available exchange names.

**Returns:** `string[]`

---

#### getBounds

```typescript
getBounds(): Bounds
```

Get the chart root element's bounding rectangle.

**Returns:** `Bounds`

---

#### openContextMenu

```typescript
openContextMenu(motionEvent: MotionEvent, event: IWindowEvent): void
```

Programmatically open the context menu on the primary pane.

| Parameter | Type | Description |
|-----------|------|-------------|
| `motionEvent` | `MotionEvent` | Motion event data |
| `event` | `IWindowEvent` | Window event data |

---

### Static

#### Chart.version

```typescript
static get version(): string
```

Get the library version string.

**Returns:** `string` -- currently `"2.0.0"`.

---

## ChartEvent

Constants for all events emitted by `Chart`. Use with the [EventEmitter](event-emitter.md) `on()` / `off()` methods.

```javascript
chart.on(FintaChart.ChartEvent.INSTRUMENT_CHANGED, (event) => {
  console.log('New instrument:', event.value.symbol);
});
```

| Constant | String Value | Description |
|----------|-------------|-------------|
| `WINDOW_MODE_CHANGED` | `'chartWindowModeChanged'` | Window mode (normal/full) changed |
| `TOOLBAR_LOADED` | `'chartToolbarLoaded'` | Toolbar finished loading |
| `SCROLLBAR_LOADED` | `'chartScrollbarLoaded'` | Scrollbar finished loading |
| `STATE_CHANGED` | `'chartStateChanged'` | Internal chart state (normal/resizing/shape/zoom) changed |
| `TIME_INTERVAL_CHANGED` | `'chartTimeIntervalChanged'` | Time interval changed |
| `INDICATOR_ADDED` | `'chartIndicatorAdded'` | An indicator was added |
| `INDICATOR_REMOVED` | `'chartIndicatorRemoved'` | An indicator was removed |
| `THEME_CHANGED` | `'themeChanged'` | Theme changed |
| `GLOBAL_THEME_CHANGED` | `'chartGlobalThemeChanged'` | Global theme changed |
| `CHART_TYPE_CHANGED` | `'chartChartTypeChanged'` | Chart type changed |
| `CHART_TYPE_APPLIED` | `'chartChartTypeApplied'` | Chart type applied |
| `HOVER_RECORD_CHANGED` | `'chartHoverRecordChanged'` | Hovered record index changed |
| `SETS_DEFAULT_SETTINGS` | `'chartsetsDefaultSettings'` | Default settings applied |
| `INSTRUMENT_CHANGED` | `'chartInstrumentChanged'` | Instrument changed |
| `SYMBOL_ENTERED` | `'chartSymbolEntered'` | Symbol entered in search |
| `TIME_FRAME_CHANGED` | `'chartTimeFrameChanged'` | Time frame changed |
| `TIME_FRAME_DELETED` | `'chartTimeFrameDeleted'` | A custom time frame was deleted |
| `TIME_FRAME_ADDED` | `'chartTimeFrameAdded'` | A custom time frame was added |
| `TIMEFRAME_LIST_UPDATED` | `'chartTimeFrameAddCustom'` | Supported time frames list updated |
| `CROSS_HAIR_CHANGED` | `'chartCrossHairChanged'` | Cross-hair type changed |
| `STATE_LOADED` | `'chartStateLoaded'` | Chart state restored from save |
| `LOCALE_CHANGED` | `'chartLocaleChanged'` | Locale changed |
| `ENABLE_KEYBOARD_EVENTS_CHANGED` | `'chartEnableKeyboardEventsChanged'` | Keyboard events enabled/disabled |
| `ENABLE_MOUSE_EVENTS_CHANGED` | `'chartEnableMouseEventsChanged'` | Mouse events enabled/disabled |
| `VALUE_SCALE_ADDED` | `'chartVerticalScaleAdded'` | A vertical scale was added |
| `VALUE_SCALE_REMOVED` | `'chartVerticalScaleRemoved'` | A vertical scale was removed |
| `USER_SHAPE_STARTED` | `'chartChreateShapeManuallyStarted'` | Manual shape drawing started |
| `USER_SHAPE_FINISHED` | `'chartChreateShapeManuallyFinished'` | Manual shape drawing finished |
| `USER_SHAPE_CANCELLED` | `'chartChreateShapeManuallyCancelled'` | Manual shape drawing cancelled |
| `PANE_ADDED` | `'paneAdded'` | A pane was added |
| `PANE_REMOVED` | `'paneRemoved'` | A pane was removed |
| `DATE_SCALE_THEME_CHANGED` | `'horizontalScaleThemeChanged'` | Horizontal scale theme changed |
| `FIRST_VISIBLE_RECORD_CHANGED` | `'firstVisibleRecordChanged'` | First visible record changed |
| `LAST_VISIBLE_RECORD_CHANGED` | `'lastVisibleRecordChanged'` | Last visible record changed |
| `MORE_HISTORY_REQUESTED` | `'chartMoreHistoryRequested'` | More historical bars requested |
| `ZOOM_IN_STARTED` | `'chartZoomInStarted'` | Zoom-in mode started |
| `ZOOM_IN_FINISHED` | `'chartZoomInFinished'` | Zoom-in mode finished |
| `ZOOM_IN_CANCELLED` | `'chartZoomInCancelled'` | Zoom-in mode cancelled |
| `SHOW_INSTRUMENT_WATERMARK_CHANGED` | `'chartShowInstrumentWatermarkChanged'` | Instrument watermark visibility changed |
| `PICKUP_COLUMN_ADDED` | `'pickupColumnAdded'` | A pickup column was added |
| `PICKUP_COLUMN_REMOVED` | `'pickupColumnRemoved'` | A pickup column was removed |
| `BARS_SETTED` | `'barsSetted'` | Bars data was set |
| `BARS_APPENDED` | `'barsAppended'` | Bars were appended |
| `BARS_INSERTED` | `'barsInserted'` | Bars were inserted |
| `LAST_BAR_UPDATED` | `'lastBarUpdated'` | The last bar was updated |
| `ADJUST_TYPE_CHANGED` | `'adjustTypeChanged'` | Adjust type (bars/bars+shapes) changed |
| `VERTICAL_ADJUST_VALUE_CHANGED` | `'verticalAdjustValueChanged'` | Vertical adjust value changed |
| `PANE_MAXIMIZED` | `'paneMaximized'` | A pane was maximized |
| `REPLAY_MODE_START_RECORD_SELECTED` | `'replayModeStartRecordSelected'` | Replay mode start record selected |
| `REPLAY_MODE_STOPPED` | `'replayModeStopped'` | Replay mode stopped |
| `STAY_IN_SHAPE_MODE_CHANGED` | `'stayInShapeModeChanged'` | Stay-in-shape-mode toggled |
| `TIMEZONE_CHANGED` | `'timezoneChanged'` | Timezone changed |
| `TICK` | `'tick'` | A real-time tick was processed |
| `PANE_AUTOSCALE_PRESERVING_CHANGED` | `'paneAutoScalePreservingChanged'` | Pane auto-scale preserving flag changed |
| `VERTICAL_SCALE_PANE_NAME_CHANGED` | `'verticalScalePaneNameChanged'` | Vertical scale pane name changed |
| `VERTICAL_SCALE_ADAPTER_CHANGED` | `'verticalScaleAdapterChanged'` | Vertical scale adapter changed |
| `CONTEXT_MENU_ITEM_SELECTED` | `'contextMenuItemSelected'` | A context menu item was selected |
| `TRADING_SESSION_UPDATE` | `'tradingSessionUpdate'` | Trading session updated |
| `OPEN_SEARCH_MODAL` | `'openSearchModal'` | Instrument search modal opened |
| `CHANGE_FAVORITE_INDICATORS` | `'changeFavoriteIndicators'` | Favorite indicators list changed |
| `CHANGE_SHAPE_TEMPLATES` | `'changeShapeTemplates'` | Shape templates changed |
| `MAGNET_MODE_CHANGED` | `'changeMagnetMode'` | Magnet mode changed |
| `SHOW_INDICATORS_DIALOG` | `'showIndicatorsDialog'` | Indicators dialog opened |
| `SNAPSHOT_COPY_LINK` | `'snapshotCopyLink'` | Chart snapshot link copied |
| `SNAPSHOT_COPY_IMAGE_FAILED` | `'snapshotCopyImageFailed'` | Chart snapshot image copy failed |
| `SNAPSHOT_TWEET_IMAGE` | `'snapshotTweetImage'` | Chart snapshot tweeted |
| `LAST_BID_CHANGED` | `'lastBidChanged'` | Last bid price changed |
| `LAST_ASK_CHANGED` | `'lastAskChanged'` | Last ask price changed |
| `LOCK_SHAPES_CHANGED` | `'lockShapesChanged'` | Shape lock toggled |
| `CHANGE_VISIBILITY_EXECUTION` | `'changeVisibilityExecution'` | Execution visibility changed |
| `ORDER_FEATURES_CHANGED` | `'orderFeaturesChanged'` | Order features changed |
| `LOGO_WATERMARK_CLICKED` | `'logoWatermarkClicked'` | Logo watermark clicked |

---

## Full Working Example

```javascript
// 1. Create the chart
const chart = new FintaChart.Chart({
  container: document.getElementById('chart-container'),
  width: '100%',
  height: 600,
  theme: FintaChart.Theme.Dark,
  datafeed: new FintaChart.Datafeed({ url: '/api/bars' }),
  instrument: { symbol: 'AAPL', exchange: 'NASDAQ', tickSize: 0.01 },
  chartType: 'candle',
  timeFrame: { interval: 1, periodicity: 'day' },
  showToolbar: true,
  showScrollbar: true,
  enableHotKeys: true,
  supportedTimeFrames: ['1 Minutes', '5 Minutes', '15 Minutes', '1 Hour', '1 Day', '1 Week'],
  searchInstruments: async (query, exchange) => {
    const response = await fetch(`/api/instruments?q=${query}&exchange=${exchange || ''}`);
    return response.json();
  },
});

// 2. Listen for events
chart.on(FintaChart.ChartEvent.INSTRUMENT_CHANGED, (event) => {
  console.log('Instrument changed from', event.oldValue?.symbol, 'to', event.value.symbol);
});

chart.on(FintaChart.ChartEvent.TIME_FRAME_CHANGED, (event) => {
  console.log('Time frame changed:', event.value);
});

chart.on(FintaChart.ChartEvent.TICK, (event) => {
  console.log('Tick received:', event.value);
});

// 3. Change instrument programmatically
chart.instrument = { symbol: 'MSFT', exchange: 'NASDAQ', tickSize: 0.01 };

// 4. Add an indicator
chart.addIndicators({ type: 'SMA', parameters: { period: 20 } });

// 5. Switch chart type
chart.applyChartType('line');

// 6. Scroll and zoom
chart.scrollRecords(-50);  // Scroll 50 bars to the left
chart.zoomRecords(20);     // Zoom in by 20 records

// 7. Save and restore state
const state = chart.saveState();
localStorage.setItem('chartState', JSON.stringify(state));

// Later...
const saved = JSON.parse(localStorage.getItem('chartState'));
chart.restoreState(saved);

// 8. Feed real-time ticks
chart.processTick({ symbol: 'MSFT', price: 425.50, timestamp: Date.now() });

// 9. Export data
chart.exportChartData(); // Downloads CSV

// 10. Dispose when done
chart.dispose();
```

---

## See Also

- [EventEmitter](event-emitter.md) -- base class with `on()`, `off()`, `invoke()` methods
- [Panes](panes.md) -- pane layout and management
- [Chart Types](chart-types.md) -- available chart type names and configuration
- [Instrument](instrument.md) -- instrument interface
