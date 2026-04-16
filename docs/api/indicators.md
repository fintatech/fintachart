# Indicators

`Indicator` (extending `AbstractIndicator`) is the base class for all technical analysis indicators. Indicators are created via `IndicatorFactory`, configured through parameters, and rendered on chart panes.

## Indicator (AbstractIndicator base class)

### Accessors

| Accessor | Access | Type | Description |
|----------|--------|------|-------------|
| `period` | get/set | `number` | Primary calculation period |
| `smooth` | get/set | `number` | Smoothing period |
| `limitValue` | get/set | `number` | Limit value for clipping |
| `displacement` | get/set | `number` | Bar offset for the plotted output |
| `plotTheme` | get | `object` | Theme applied to the indicator's plot lines |
| `levelsTheme` | get | `object` | Theme applied to horizontal level lines |
| `name` | get | `string` | Display name of the indicator |
| `options` | get | `object` | Current option values |
| `hasInputParameters` | get | `boolean` | Whether the indicator exposes user-editable parameters |
| `inputDataRowName` | get/set | `string` | Name of the primary input data row |
| `inputDataRowName2` | get/set | `string` | Name of the secondary input data row |
| `defaultTheme` | get | `object` | Factory-default theme for this indicator type |
| `theme` | get/set | `object` | Current visual theme |
| `lineLevels` | get | `object[]` | Configured horizontal level lines |
| `allowSettingsDialog` | get | `boolean` | Whether the settings dialog is available |
| `canHover` | get | `boolean` | Whether the indicator responds to mouse hover |
| `canMergeDown` | get | `boolean` | Whether the indicator can be merged into the pane below |
| `canMergeUp` | get | `boolean` | Whether the indicator can be merged into the pane above |
| `canSelect` | get | `boolean` | Whether the indicator can be selected by clicking |
| `canChangePane` | get | `boolean` | Whether the indicator can be moved to a different pane |
| `type` | get | `string` | Indicator type identifier (e.g. `'SMA'`, `'RSI'`) |

---

### Methods

#### parameterValue

```typescript
parameterValue(paramName: string): unknown
```

Returns the current value of the named parameter.

| Parameter | Type | Description |
|-----------|------|-------------|
| `paramName` | `string` | Parameter name (e.g. `'period'`, `'source'`) |

---

#### containsParameter

```typescript
containsParameter(paramName: string): boolean
```

Returns `true` if the indicator defines a parameter with the given name.

| Parameter | Type | Description |
|-----------|------|-------------|
| `paramName` | `string` | Parameter name to check |

---

#### updateParameter

```typescript
updateParameter(name: string, value: unknown): void
```

Updates a single parameter and recalculates the indicator.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Parameter name |
| `value` | `unknown` | New value |

---

#### updateParameters

```typescript
updateParameters(updates: object): void
```

Updates multiple parameters at once and recalculates the indicator.

| Parameter | Type | Description |
|-----------|------|-------------|
| `updates` | `object` | Key-value pairs of parameter names and values |

---

#### refreshParameterTitles

```typescript
refreshParameterTitles(): void
```

Recalculates the display titles shown in the indicator legend.

---

## IIndicatorState

Interface used to save and restore indicator configuration.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | No | Unique identifier |
| `parentId` | `string` | No | ID of the parent indicator (for chained indicators) |
| `type` | `string` | **Yes** | Indicator type name (e.g. `'SMA'`, `'MACD'`) |
| `paneIndex` | `number` | No | Index of the pane to place the indicator in |
| `parameters` | `object` | No | Key-value pairs of parameter overrides |
| `isAutoScale` | `boolean` | No | Whether the pane auto-scales to fit this indicator |
| `visible` | `boolean` | No | Whether the indicator is visible |
| `showTitle` | `boolean` | No | Show the indicator name in the legend |
| `showValuesInTitle` | `boolean` | No | Show current values in the legend |
| `showParamsInTitle` | `boolean` | No | Show parameter values in the legend |
| `showLineLevels` | `boolean` | No | Show horizontal level lines |
| `hoverable` | `boolean` | No | Whether the indicator responds to hover |
| `selectable` | `boolean` | No | Whether the indicator can be selected |
| `allowSettingsDialog` | `boolean` | No | Whether the settings dialog is available |
| `applyIndicator` | `string` | No | Indicator to apply this indicator on top of |
| `enableVerticalAxisLabels` | `boolean` | No | Show values on the vertical axis |
| `zIndex` | `number` | No | Rendering order within the pane |
| `paneHeightRatio` | `number` | No | Height ratio when the indicator creates its own pane |
| `verticalScaleIndex` | `number` | No | Index of the vertical scale to use |
| `canChangePane` | `boolean` | No | Whether the indicator can be moved between panes |
| `theme` | `object` | No | Visual theme overrides |

---

## IndicatorFactory

Static factory for creating and restoring indicator instances.

### knownTypes

```typescript
static knownTypes: IterableIterator<string>
```

Returns an iterator over all registered indicator type names.

---

### create

```typescript
static create(typeName: string, chart: Chart): Indicator
```

Creates a new indicator instance of the specified type.

| Parameter | Type | Description |
|-----------|------|-------------|
| `typeName` | `string` | Indicator type name (e.g. `'SMA'`, `'Bollinger'`) |
| `chart` | `Chart` | Chart instance the indicator belongs to |

---

### restore

```typescript
static restore(state: IIndicatorState): Indicator
```

Restores an indicator from a saved state object.

| Parameter | Type | Description |
|-----------|------|-------------|
| `state` | `IIndicatorState` | Previously saved indicator state |

---

## IndicatorEvent

String constants used with `EventEmitter.on()` / `EventEmitter.off()` to subscribe to indicator events.

| Constant | Description |
|----------|-------------|
| `SELECTED_CHANGED` | The indicator's selected state changed |
| `HOVERED_CHANGED` | The indicator's hovered state changed |
| `SHOWED_CONTEXT_MENU` | A context menu was requested on the indicator |
| `SELECTABLE_CHANGED` | The `selectable` property changed |
| `HOVERABLE_CHANGED` | The `hoverable` property changed |

---

## Available Indicator Types

The library ships with 95 built-in indicator types. Use the type name string with `IndicatorFactory.create()`.

### Trend & Moving Averages

`DEMA`, `EMA`, `HMA`, `KAMA`, `LinearRegression`, `LinearRegressionForecast`, `LinearRegressionIntercept`, `LinearRegressionSlope`, `McGinleysDynamic`, `SMA`, `TEMA`, `TMA`, `Trend`, `TSF`, `VIDYA`, `VMA`, `VOLMA`, `WMA`, `ZLEMA`

### Oscillators

`ADIndex`, `AroonOscillator`, `ASI`, `BOP`, `CCI`, `CFO`, `CMO`, `CoppockCurve`, `DM`, `FOSC`, `IMI`, `LogChange`, `MACD`, `Momentum`, `PFE`, `PGO`, `PPO`, `PriceOscillator`, `RAVI`, `RIND`, `ROC`, `RSI`, `RSS`, `StochRSI`, `Stochastics`, `StochasticsFast`, `SwingIndex`, `TRIX`, `TSI`, `UltimateOscillator`, `VolumeOscillator`, `WilliamsR`

### Volatility & Bands

`APZ`, `ATR`, `ATS`, `Bollinger`, `ChaikinVolatility`, `DonchianChannel`, `HighLowBands`, `HistoricalVolatility`, `KeltnerChannel`, `MAEnvelopes`, `Range`, `StdDev`, `TrueRange`

### Volume

`ADL`, `ChaikinMoneyFlow`, `ChaikinOscillator`, `EFI`, `EFT`, `MarketFacilitationIndex`, `MFI`, `NVI`, `OBV`, `PVI`, `PVT`, `TMF`, `TVI`, `VOLUME`, `VolumeUpDown`, `VROC`, `VWAP`, `WAD`

### Price & Statistical

`CenterOfGravity`, `CRS`, `DBox`, `DeviationToMA`, `ElderRay`, `ElderThermometer`, `Encapsulation`, `GRI`, `HML`, `MedianPrice`, `PerformanceIndex`, `SUM`, `TypicalPrice`, `WeightedClose`

### Pattern & Special

`Aroon`, `ADXR`, `FractalsIndicator`, `Ichimoku`, `KeyReversalDown`, `KeyReversalUp`, `MAXIMUM`, `MINIMUM`, `MoonPhases`, `NBarsDown`, `NBarsUp`, `PatternsIndicator`, `PNB`, `PNO`, `ZigZagIndicator`

### Profile

`DailyProfiles`, `VisibleRangeProfiles`

---

## Example

Adding an SMA indicator programmatically:

```javascript
const chart = new FintaChart.Chart({ /* config */ });

// Create an SMA indicator via the factory
const sma = FintaChart.IndicatorFactory.create('SMA', chart);

// Configure parameters
sma.updateParameters({ period: 20 });

// Customize the theme
sma.theme = {
  plot: {
    lines: [{ strokeColor: '#2196F3', width: 2 }]
  }
};

// Add to the primary (price) pane
chart.primaryPane.addIndicator(sma);

// Listen for selection
chart.on(FintaChart.IndicatorEvent.SELECTED_CHANGED, (event) => {
  console.log('Indicator selected:', event.target.name);
});

// Save state for later restoration
const state = sma.saveState();

// Restore from state
const restored = FintaChart.IndicatorFactory.restore(state);
```
