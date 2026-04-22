# Chart Concepts

This page explains the core architecture and data model behind FintaChart. Understanding these concepts makes it easier to configure charts, build custom indicators, and work with the API.

## Architecture

A chart is composed of a hierarchy of visual containers:

```
Chart
 └── PanesContainer
      ├── Pane (price pane)
      │    ├── Plot (candlestick series)
      │    ├── Plot (moving average overlay)
      │    └── Plot (volume overlay)
      └── Pane (indicator pane)
           └── Plot (RSI line)
```

- **Chart** -- The top-level object. Manages the instrument, time frame, theme, and overall lifecycle.
- **PanesContainer** -- Holds one or more vertically stacked panes and manages their relative sizing.
- **Pane** -- A single drawing area with its own Y-axis scale. The main pane shows price data; additional panes display indicators like RSI or MACD.
- **Plot** -- A visual series rendered inside a pane. Each plot draws one data series (candlesticks, a line, a histogram, etc.).

## Data Flow

Data moves through the chart in a well-defined pipeline:

```
Datafeed (your server / API)
  → DataAdapter (translates API responses)
    → DataContext (stores and indexes bars)
      → DataRows (individual OHLCV records)
        → Pane rendering (Canvas draw calls)
```

1. The **Datafeed** is your external data source -- a REST endpoint, WebSocket stream, or static file.
2. A **DataAdapter** translates raw responses into the format the chart expects. See [Data Adapters](data-adapters.md) for implementation details.
3. The **DataContext** is the chart's internal data store. It holds an ordered collection of bars, manages appending new data, and notifies the rendering engine of changes.
4. Each bar is a **DataRow** containing fields like `open`, `high`, `low`, `close`, `volume`, and `date`.
5. Panes read from the DataContext and render plots onto an HTML5 Canvas.

## Instruments

An instrument describes the financial asset displayed on the chart:

```javascript
chart.instrument = {
  symbol: 'AAPL',       // Ticker symbol
  exchange: 'NASDAQ',   // Exchange or market identifier
  tickSize: 0.01        // Minimum price increment
};
```

The `tickSize` controls price axis formatting and snap behavior for drawing tools.

## Time Frames and Periodicity

A time frame defines how raw data is aggregated into bars:

```javascript
chart.timeFrame = {
  periodicity: 'minute',  // Unit of time
  period: 5               // Number of units per bar
};
```

Supported periodicity values:

| Periodicity | Description |
|-------------|-------------|
| `tick` | Individual trades |
| `second` | Second-based bars |
| `minute` | Minute-based bars (1, 5, 15, 30, etc.) |
| `hour` | Hourly bars |
| `day` | Daily bars |
| `week` | Weekly bars |
| `month` | Monthly bars |
| `year` | Yearly bars |

## Chart Types

FintaChart supports 17 chart types. Set the type through the `chartType` property:

```javascript
chart.chartType = 'candle';
```

| Chart Type | Key |
|------------|-----|
| OHLC | `ohlc` |
| Colored OHLC | `coloredOhlc` |
| HLC | `hlc` |
| Colored HLC | `coloredHlc` |
| HL | `hl` |
| Colored HL | `coloredHl` |
| Candle | `candle` |
| Hollow Candle | `hollowCandle` |
| Heikin Ashi | `heikinAshi` |
| Renko | `renko` |
| Range Bar | `rangeBar` |
| Line Break | `lineBreak` |
| Point & Figure | `pointAndFigure` |
| Kagi | `kagi` |
| Candle Volume | `candleVolume` |
| Equi Volume | `equiVolume` |
| Equi Volume Shadow | `equiVolumeShadow` |

## Indicators

Indicators are added through the `IndicatorFactory`. FintaChart ships with 95 built-in indicator types covering moving averages, oscillators, volatility measures, volume studies, and more.

```javascript
// Add a 20-period simple moving average to the price pane
var sma = FintaChart.IndicatorFactory.create('SMA', {
  periods: 20,
  source: 'close'
});
chart.mainPane.addIndicator(sma);

// Add RSI in a new pane
var rsi = FintaChart.IndicatorFactory.create('RSI', {
  periods: 14
});
chart.addIndicatorInNewPane(rsi);
```

Each indicator exposes configurable parameters (periods, source field, colors, line width) that can be set at creation time or modified later through the indicator's settings dialog.

## Shapes (Drawing Tools)

Shapes are user-drawn or programmatically placed annotations on the chart -- trend lines, rectangles, Fibonacci retracements, text labels, and more.

```javascript
// Programmatically add a horizontal line at a specific price
var line = new FintaChart.HorizontalLine({
  value: 150.00,
  stroke: { color: '#FF0000', width: 2 }
});
chart.mainPane.addShape(line);
```

Shapes are interactive by default: users can drag, resize, and delete them. Lock a shape by setting `shape.locked = true`.

## Themes

FintaChart includes 10 built-in themes. Apply a theme globally or per chart:

```javascript
// Apply globally before creating charts
FintaChart.Theme.use('Dark');

// Or set on an individual chart
chart.theme = 'Dark';
```

Themes control colors for the background, grid, axes, candles, crosshair, and overlays. To create a custom theme, extend an existing one and override specific properties. See [Themes](theme.md) for the full customization API.

## State Management

Charts support saving and restoring their entire configuration -- chart type, indicators, drawings, zoom level, and visible range.

```javascript
// Save current state as a JSON-serializable object
var state = chart.saveState();

// Store it (localStorage, server, etc.)
localStorage.setItem('chartState', JSON.stringify(state));

// Restore later
var saved = JSON.parse(localStorage.getItem('chartState'));
chart.restoreState(saved);
```

State objects work as portable templates. Save a state from one chart and apply it to another to replicate layouts, indicator sets, or analysis workspaces.

## Events

FintaChart uses an EventEmitter pattern for lifecycle and interaction events:

```javascript
// Subscribe to an event
chart.on('crosshairMoved', function(event) {
  console.log('Price:', event.price, 'Date:', event.date);
});

// Unsubscribe
chart.off('crosshairMoved', handler);

// Emit a custom event
chart.invoke('customEvent', { detail: 'value' });
```

Common events include `crosshairMoved`, `instrumentChanged`, `timeFrameChanged`, `indicatorAdded`, `indicatorRemoved`, `shapeAdded`, and `dataLoaded`. See the [API Reference](../api/chart.md) for the complete event list.

## Next Steps

- [Introduction](introduction.md) -- Feature overview and browser support
- [Setup](setup.md) -- Installation and resource configuration
- [Integration](integration.md) -- Embedding charts in your application
- [API Reference](../api/chart.md) -- Full API documentation
