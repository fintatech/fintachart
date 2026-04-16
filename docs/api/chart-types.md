# Chart Types API Reference

## ChartTypeBase (abstract)

All chart types extend `ChartTypeBase`. This abstract class provides the shared interface for applying, configuring, and serializing chart visualizations.

See also: [Panes API](panes.md) | [Scales API](scales.md)

### Static Members

| Member | Type | Description |
|---|---|---|
| `type` | `string` | Unique identifier for the chart type. |
| `defaults` | `IChartTypeDefaults` | Default configuration values for the chart type. |

### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `type` | `string` | readonly | Returns the chart type identifier. |
| `pane` | `Pane` | readonly | The [Pane](panes.md#pane) this chart type is applied to. |
| `isTimeBased` | `boolean` | readonly | Whether this chart type uses a time-based horizontal axis. |
| `stretchPricingLines` | `boolean` | get / set | When `true`, pricing lines stretch across the full pane width. |
| `showPricingLines` | `boolean` | get / set | Toggles visibility of pricing lines. |

### Methods

| Method | Returns | Description |
|---|---|---|
| `apply(autoScale?)` | `void` | Applies the chart type to the pane. When `autoScale` is `true`, the vertical scale adjusts automatically. |
| `refresh()` | `void` | Redraws the chart type visualization. |
| `primaryDataRowMarker()` | `DataRowMarker` | Returns the marker used for the primary data row. |
| `dispose()` | `void` | Cleans up resources held by the chart type instance. |
| `saveState()` | `object` | Serializes the chart type state. |
| `restoreState()` | `void` | Restores a previously saved chart type state. |
| `resetToDefaults()` | `void` | Resets all settings to `IChartTypeDefaults`. |

---

## ChartTypeNames Constants

Use these constants with `chart.applyChartType()` to switch between chart types.

| Constant | Value | Category |
|---|---|---|
| `ChartTypeNames.OHLC` | `'ohlc'` | Bar |
| `ChartTypeNames.COLORED_OHLC` | `'coloredOhlc'` | Bar |
| `ChartTypeNames.HLC` | `'hlc'` | Bar |
| `ChartTypeNames.COLORED_HLC` | `'coloredHlc'` | Bar |
| `ChartTypeNames.HL` | `'hl'` | Bar |
| `ChartTypeNames.COLORED_HL` | `'coloredHl'` | Bar |
| `ChartTypeNames.CANDLE` | `'candle'` | Candle |
| `ChartTypeNames.HOLLOW_CANDLE` | `'hollowCandle'` | Candle |
| `ChartTypeNames.HEIKIN_ASHI` | `'heikinAshi'` | Candle |
| `ChartTypeNames.RENKO` | `'renko'` | Special |
| `ChartTypeNames.RANGE_BAR` | `'rangeBar'` | Special |
| `ChartTypeNames.LINE_BREAK` | `'lineBreak'` | Special |
| `ChartTypeNames.POINT_AND_FIGURE` | `'pointAndFigure'` | Special |
| `ChartTypeNames.KAGI` | `'kagi'` | Special |
| `ChartTypeNames.CANDLE_VOLUME` | `'candleVolume'` | Volume |
| `ChartTypeNames.EQUI_VOLUME` | `'equiVolume'` | Volume |
| `ChartTypeNames.EQUI_VOLUME_SHADOW` | `'equiVolumeShadow'` | Volume |

### Usage

```js
// Apply a candle chart type
chart.applyChartType(FintaChart.ChartTypeNames.CANDLE);

// Apply Heikin Ashi with auto-scaling
chart.applyChartType(FintaChart.ChartTypeNames.HEIKIN_ASHI, true);
```

---

## Special Chart Types

### KagiChartType

Kagi charts track price direction changes based on a configurable reversal amount.

| Accessor | Type | Access | Description |
|---|---|---|---|
| `reversal` | `object` | get / set | Reversal configuration containing `type` and `value`. |

#### KagiReversalType Enum

| Value | Description |
|---|---|
| `ATR` | Reversal amount is derived from the Average True Range indicator. |
| `FIXED` | A fixed absolute price value is used as the reversal threshold. |
| `POINTS` | Reversal is measured in price points. |
| `TRADITIONAL` | Uses the traditional Kagi reversal calculation. |
| `PERCENTAGE` | Reversal is expressed as a percentage of the current price. |

```js
chart.applyChartType(FintaChart.ChartTypeNames.KAGI);

const kagiType = chart.primaryPane.chartType;
kagiType.reversal = { type: FintaChart.KagiReversalType.PERCENTAGE, value: 4 };
```

---

### RenkoChartType

Renko charts use fixed-size bricks to represent price movement, filtering out minor fluctuations.

| Accessor | Type | Access | Description |
|---|---|---|---|
| `boxSize` | `object` | get / set | Box size configuration containing `type` and `value`. |

#### RenkoBoxSizeType Enum

| Value | Description |
|---|---|
| `FIXED` | A fixed absolute price value defines each brick's size. |
| `ATR` | Brick size is derived from the Average True Range indicator. |
| `POINTS` | Brick size is measured in price points. |
| `TRADITIONAL` | Uses the traditional Renko brick calculation. |
| `PERCENTAGE` | Brick size is expressed as a percentage of the current price. |

```js
chart.applyChartType(FintaChart.ChartTypeNames.RENKO);

const renkoType = chart.primaryPane.chartType;
renkoType.boxSize = { type: FintaChart.RenkoBoxSizeType.ATR, value: 14 };
```
