# Indicator Parameters Reference

Complete reference for all built-in indicator parameters, extracted from source code in `Charts/Indicators/Impl/`.

Each indicator's parameters are set in `onResetDefaults()`. Line style parameters (`Line Color`, `Line Width`, `Line Style`, `Line Enabled`) and fill parameters (`Fill Above`, `Fill Below`, `Fill Enabled`) are added via `addLineParameters()` / `addFillParameters()` and are omitted from the tables below for brevity -- they are present on every indicator that calls `addPlot()`.

---

## 1. Moving Averages

### SMA (Simple Moving Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: SMA (line). Overlay: yes.

---

### EMA (Exponential Moving Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: EMA (line). Overlay: yes.

---

### DEMA (Double Exponential Moving Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: DEMA (line). Overlay: yes.

---

### TEMA (Triple Exponential Moving Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: TEMA (line). Overlay: yes.

---

### WMA (Weighted Moving Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: WMA (line). Overlay: yes.

---

### HMA (Hull Moving Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: HMA (line). Overlay: yes.

---

### KAMA (Kaufman Adaptive Moving Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| fastPeriods | `fastPeriods` | number | 25 | Fast smoothing constant |
| slowPeriods | `slowPeriods` | number | 40 | Slow smoothing constant |
| source | `source` | string | close | Input data row |

Plots: KAMA (line). Overlay: no.

---

### ZLEMA (Zero Lag Exponential Moving Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: ZLEMA (line). Overlay: yes.

---

### TMA (Triangular Moving Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 15 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: TMA (line). Overlay: yes.

---

### VIDYA (Variable Index Dynamic Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| r2Scale | `r2Scale` | number | 0.65 | R-squared scale factor |
| source | `source` | string | close | Input data row |

Plots: VIDYA (line). Overlay: yes.

---

### VMA (Variable Moving Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 9 | Calculation period |
| volatilityPeriod | `volatilityPeriod` | number | 9 | CMO volatility period |
| source | `source` | string | close | Input data row |

Plots: VMA (line). Overlay: yes.

---

### McGinleysDynamic (McGinley's Dynamic)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: McGinleysDynamic (line). Overlay: yes.

---

### WWS (Welles Wilder Smoothing)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: WWS (line). Overlay: yes.

---

## 2. Oscillators

### RSI (Relative Strength Index)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| smooth | `smooth` | number | 3 | Smoothing period for average line |
| source | `source` | string | close | Input data row |

Plots: RSI (line), Avg (line). Levels: 30, 70. Overlay: no.

---

### Stochastics (Stochastic Oscillator)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| kPeriods | `kPeriods` | number | 14 | %K look-back period |
| dPeriods | `dPeriods` | number | 7 | %D smoothing period |
| smooth | `smooth` | number | 3 | %K smoothing period |

Plots: StochasticsD (line), StochasticsK (line). Levels: 20, 80. Overlay: no.

---

### StochasticsFast (Fast Stochastic Oscillator)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| kPeriods | `kPeriods` | number | 14 | %K look-back period |
| dPeriods | `dPeriods` | number | 3 | %D smoothing period |

Plots: StochasticsD (line), StochasticsK (line). Levels: 20, 80. Overlay: no.

---

### StochRSI (Stochastic RSI)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: StochRSI (line). Levels: 0.2, 0.5, 0.8. Overlay: no.

---

### MACD (Moving Average Convergence Divergence)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | General period |
| fastPeriods | `fastPeriods` | number | 12 | Fast EMA period |
| slowPeriods | `slowPeriods` | number | 26 | Slow EMA period |
| smooth | `smooth` | number | 9 | Signal line smoothing period |
| source | `source` | string | close | Input data row |

Plots: MACD (line), Down/Signal (line), Diff (histogram). Levels: 0. Overlay: no.

---

### CCI (Commodity Channel Index)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |

Plots: CCI (line). Levels: -200, -100, 0, 100, 200. Overlay: no. Uses typical price internally.

---

### CMO (Chande Momentum Oscillator)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: CMO (line). Overlay: no.

---

### Momentum

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Look-back period |
| source | `source` | string | close | Input data row |

Plots: Momentum (line). Levels: 0. Overlay: no.

---

### ROC (Rate of Change)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Look-back period |
| source | `source` | string | close | Input data row |

Plots: ROC (line). Levels: 0. Overlay: no.

---

### WilliamsR (Williams %R)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Look-back period |

Plots: WilliamsR (line). Levels: -25, -75. Overlay: no.

---

### PPO (Percentage Price Oscillator)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| fastPeriods | `fastPeriods` | number | 12 | Fast EMA period |
| slowPeriods | `slowPeriods` | number | 26 | Slow EMA period |
| smooth | `smooth` | number | 9 | Signal smoothing period |

Plots: Default (line), PPOSmoothed (line). Levels: 0. Overlay: no.

---

### PriceOscillator

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| fastPeriods | `fastPeriods` | number | 12 | Fast EMA period |
| slowPeriods | `slowPeriods` | number | 26 | Slow EMA period |
| smooth | `smooth` | number | 9 | Signal smoothing period |

Plots: PriceOscillator (line). Levels: 0. Overlay: no.

---

### UltimateOscillator

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| fastPeriods | `fastPeriods` | number | 7 | Fast SUM period |
| intermediate | `intermediate` | number | 14 | Intermediate SUM period |
| slowPeriods | `slowPeriods` | number | 28 | Slow SUM period |

Plots: UltimateOscillator (line). Levels: 30, 50, 70. Overlay: no.

---

### AroonOscillator

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Look-back period |

Plots: AroonOscillator (line). Levels: 0. Overlay: no.

---

### BOP (Balance of Power)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| smooth | `smooth` | number | 14 | SMA smoothing period |

Plots: BOP (histogram). Overlay: no.

---

### TRIX (Triple Exponential Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | EMA period |
| signalPeriods | `signalPeriods` | number | 3 | Signal line EMA period |
| source | `source` | string | close | Input data row |

Plots: Default (line), TRIXSignal (line). Levels: 0. Overlay: no.

---

### TSI (True Strength Index)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | General period |
| fastPeriods | `fastPeriods` | number | 3 | Fast EMA period |
| slowPeriods | `slowPeriods` | number | 14 | Slow EMA period |
| source | `source` | string | close | Input data row |

Plots: TSI (line). Overlay: no.

---

### CFO (Chande Forecast Oscillator)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: CFO (line). Overlay: no.

---

### FOSC (Forecast Oscillator)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | TSF period |
| source | `source` | string | close | Input data row |

Plots: FOSC (line). Levels: 0. Overlay: no.

---

### RAVI (Range Action Verification Index)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| shortCycle | `shortCycle` | number | 9 | Short VIDYA cycle period |
| longCycle | `longCycle` | number | 14 | Long VIDYA cycle period |
| source | `source` | string | close | Input data row |

Plots: RAVI (line). Overlay: no.

---

### RIND (Range Indicator)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| qPeriods | `qPeriods` | number | 3 | Stochastic Q period |
| smooth | `smooth` | number | 10 | EMA smoothing period |

Plots: RIND (line). Overlay: no.

---

### RSS (Relative Spread Strength)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 4 | RSI period |
| ema1Periods | `ema1Periods` | number | 10 | First EMA period |
| ema2Periods | `ema2Periods` | number | 40 | Second EMA period |

Plots: RSS (line). Levels: 20, 80. Overlay: no.

---

### CRS (Comparative Relative Strength)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| source | `source` | string | close | First input data row |
| source2 | `source2` | string | open | Second input data row |

Plots: CRS (line). Overlay: no.

---

### IMI (Intraday Momentum Index)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |

Plots: IMI (line). Overlay: no.

---

### CenterOfGravity

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: CenterOfGravity (line). Overlay: no.

---

### CoppockCurve

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | General period |
| source | `source` | string | close | Input data row |

Plots: CoppockCurve (line). Overlay: no. Internally uses ROC(14), ROC(11), and WMA(11).

---

### EaseOfMovement

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| smooth | `smooth` | number | 14 | EMA smoothing period |
| volumeDivisor | `volumeDivisor` | number | 10000 | Volume divisor for box ratio |

Plots: EaseOfMovement (line). Levels: 0. Overlay: no.

---

### ElderRay

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | MA calculation period |
| maType | `maType` | number | 2 | MA type (0=EMA, 1=HMA, 2=SMA, 3=TMA, 4=TEMA, 5=WMA, 6=VMA, 7=WWS, 8=VIDYA) |

Plots: BullPower (line), BearPower (line). Overlay: no.

---

### PFE (Polarized Fractal Efficiency)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| smooth | `smooth` | number | 10 | EMA smoothing period |
| source | `source` | string | close | Input data row |

Plots: PFE (line). Levels: 0. Overlay: no.

---

### PGO (Pretty Good Oscillator)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |

Plots: PGO (line). Overlay: no.

---

### DeviationToMA

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Moving average period |

Plots: DeviationToMA (line). Overlay: no.

---

## 3. Volatility

### ATR (Average True Range)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |

Plots: ATR (line). Overlay: no.

---

### Bollinger (Bollinger Bands)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | SMA period |
| standardDeviations | `standardDeviations` | number | 2 | Number of standard deviations |

Plots: UpperBand (line), MiddleBand (line), LowerBand (line). Overlay: yes.

---

### StdDev (Standard Deviation)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |
| source | `source` | string | close | Input data row |

Plots: StdDev (line). Overlay: no.

---

### HistoricalVolatility

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Standard deviation period |
| source | `source` | string | close | Input data row |

Plots: HistoricalVolatility (line). Overlay: no.

---

### DonchianChannel

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Look-back period |

Plots: Upper (line), Middle (line), Lower (line). Overlay: yes.

---

### KeltnerChannel

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 10 | SMA period |
| offsetMultiplier | `offsetMultiplier` | number | 1.5 | ATR-like offset multiplier |

Plots: Upper (line), Middle (line), Lower (line). Overlay: yes.

---

### APZ (Adaptive Price Zone)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 20 | EMA period |
| bandPct | `bandPct` | number | 2 | Band percentage multiplier |

Plots: Upper (line), Lower (line). Overlay: yes.

---

### MAEnvelopes (MA Envelopes)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | MA period |
| envelopePercentage | `envelopePercentage` | number | 1.5 | Envelope percentage offset |
| maType | `maType` | number | 2 | MA type (0=EMA, 1=HMA, 2=SMA, 3=TMA, 4=TEMA, 5=WMA, 6=VMA, 7=WWS, 8=VIDYA) |
| source | `source` | string | close | Input data row |

Plots: Upper (line), Middle (line), Lower (line). Overlay: yes.

---

### HighLowBands

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | VIDYA period |

Plots: Upper (line), Middle (line), Lower (line). Overlay: yes.

---

### ChaikinVolatility

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| maPeriods | `maPeriods` | number | 10 | EMA period for range |
| rocPeriods | `rocPeriods` | number | 10 | Rate of change look-back |

Plots: ChaikinVolatility (line). Overlay: no.

---

### TrueRange

No configurable parameters.

Plots: TrueRange (line). Overlay: no.

---

### Range

No configurable parameters.

Plots: Range (line). Overlay: no.

---

### GRI (Gann Range Index)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Look-back period |

Plots: GRI (line). Overlay: no.

---

## 4. Volume

### VOLUME

No configurable parameters.

Plots: VolumeUp (histogram), VolumeDown (histogram), Equal (histogram). Overlay: yes. Colors bars green/red/black based on close vs open.

---

### VOLMA (Volume Moving Average)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | EMA period on volume |

Plots: VOLMA (line). Overlay: no.

---

### OBV (On Balance Volume)

No configurable parameters.

Plots: OBV (line). Overlay: no.

---

### ADL (Accumulation/Distribution Line)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |

Plots: ADL (line). Overlay: no.

---

### MFI (Money Flow Index)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |

Plots: MFI (line). Levels: 20, 80. Overlay: no.

---

### ChaikinMoneyFlow

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 21 | SUM period |

Plots: ChaikinMoneyFlow (line). Overlay: no.

---

### ChaikinOscillator

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| fastPeriods | `fastPeriods` | number | 3 | Fast EMA period |
| slowPeriods | `slowPeriods` | number | 10 | Slow EMA period |

Plots: ChaikinOscillator (line). Overlay: no.

---

### VolumeOscillator

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | General period |
| fastPeriods | `fastPeriods` | number | 12 | Fast SMA period on volume |
| slowPeriods | `slowPeriods` | number | 26 | Slow SMA period on volume |

Plots: VolumeOscillator (histogram). Overlay: no.

---

### EFI (Elder's Force Index)

No configurable parameters. Internally uses EMA(2).

Plots: Indicator (line), Signal (line). Overlay: no.

---

### PVT (Price Volume Trend)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| source | `source` | string | close | Input data row |

Plots: PVT (line). Overlay: no.

---

### NVI (Negative Volume Index)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| source | `source` | string | close | Input data row |

Plots: NVI (line). Overlay: no.

---

### PVI (Positive Volume Index)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| source | `source` | string | close | Input data row |

Plots: PVI (line). Overlay: no.

---

### TVI (Trade Volume Index)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| source | `source` | string | close | Input data row |
| limitValue | `limitValue` | number | 0.5 | Minimum tick change threshold |

Plots: TVI (line). Overlay: no.

---

### TMF (Twiggs Money Flow)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | EMA period |

Plots: TMF (line). Overlay: no.

---

### VROC (Volume Rate of Change)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Look-back period |
| smooth | `smooth` | number | 3 | SMA smoothing period |

Plots: VROC (line). Levels: 0. Overlay: no.

---

### VWAP (Volume Weighted Average Price)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Look-back period |

Plots: VWAP (line). Overlay: yes.

---

### VolumeUpDown

No configurable parameters.

Plots: VolumeUp (histogram, green), VolumeDown (histogram, red). Levels: 0. Overlay: no.

---

### WAD (Williams Accumulation/Distribution)

No configurable parameters.

Plots: WAD (line). Overlay: no.

---

### MarketFacilitationIndex

No configurable parameters.

Plots: MarketFacilitationIndex (line). Overlay: no.

---

## 5. Trend

### ADXR (Average Directional Movement Rating)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | ADX calculation period |

Plots: ADXR (line). Levels: 25, 75. Overlay: no.

---

### ADIndex (Average Directional Index)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |

Plots: ADX (line). Levels: 25, 75. Overlay: no.

---

### DM (Directional Movement)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Calculation period |

Plots: ADX (line), +DI (line), -DI (line). Overlay: no.

---

### Aroon

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Look-back period |

Plots: Up (line), Down (line). Levels: 30, 70. Overlay: no.

---

### Ichimoku

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| CLP | `CLP` | number | 9 | Conversion line (Tenkan Sen) periods |
| BLP | `BLP` | number | 26 | Base line (Kijun Sen) periods |
| LS2P | `LS2P` | number | 52 | Lagging Span 2 (Senkou Span B) periods |
| displacement | `displacement` | number | 26 | Cloud displacement (shift forward) |

Plots: Tenkan Sen (line), Kijun Sen (line), Chikou Span (line), Senkou Span A (line), Senkou Span B (line). Fill area between Senkou Span A and Senkou Span B. Overlay: yes.

---

### Trend

No configurable parameters. Internally uses EMA(high, 6) and EMA(low, 3).

Plots: Trend (histogram). Overlay: no.

---

### LinearRegression (Linear Regression R-Squared)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Regression period |
| source | `source` | string | close | Input data row |

Plots: LinearRegression (line). Overlay: no.

---

### LinearRegressionForecast

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Regression period |
| source | `source` | string | close | Input data row |

Plots: LinearRegressionForecast (line). Overlay: yes.

---

### LinearRegressionIntercept

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Regression period |
| source | `source` | string | close | Input data row |

Plots: LinearRegressionIntercept (line). Overlay: yes.

---

### LinearRegressionSlope

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Regression period |
| source | `source` | string | close | Input data row |

Plots: LinearRegressionSlope (line). Overlay: no.

---

### TSF (Time Series Forecast)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Regression period |
| forecast | `forecast` | number | 3 | Forecast bars ahead |
| source | `source` | string | close | Input data row |

Plots: TSF (line). Overlay: yes.

---

### PerformanceIndex

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| source | `source` | string | close | Input data row |

Plots: PerformanceIndex (line). Overlay: no.

---

## 6. Other

### ASI (Accumulative Swing Index)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| limitValue | `limitValue` | number | 0.5 | Swing index limit value |

Plots: ASI (line). Overlay: no.

---

### SwingIndex

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| limitValue | `limitValue` | number | 0.5 | Limit value for calculation |

Plots: SwingIndex (line). Overlay: no.

---

### NBarsUp (N Bars Up)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| barCount | `barCount` | number | 3 | Consecutive up bars required |

Plots: NBarsUp (histogram). Overlay: no.

---

### NBarsDown (N Bars Down)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| barCount | `barCount` | number | 3 | Consecutive down bars required |

Plots: NBarsDown (histogram). Overlay: no.

---

### KeyReversalUp

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 1 | Look-back period for minimum |

Plots: KeyReversalUp (line). Overlay: no.

---

### KeyReversalDown

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 1 | Look-back period for maximum |

Plots: KeyReversalDown (line). Overlay: no.

---

### ElderThermometer

No configurable parameters.

Plots: ElderThermometer (line). Overlay: no.

---

### EFT (Ehlers Fisher Transform)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Look-back period |

Plots: Indicator (line), Indicator Trigger (line). Overlay: no.

---

### FractalsIndicator

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| precision | `precision` | number | 3 | Fractal precision (bars on each side) |

Overlay: yes. Renders fractal markers on the price chart.

---

### ZigZagIndicator

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| Deviation | `Deviation` | number | 5 | Minimum price deviation (%) |
| depth | `depth` | number | 10 | Minimum bars between pivots |
| backstep | `backstep` | number | 3 | Minimum bars for reversal |

Overlay: yes. Renders zigzag lines connecting swing highs/lows.

---

### PNB (Prime Number Bands)

No configurable parameters.

Plots: Prime Bands Top (line), Prime Bands Bottom (line). Overlay: yes.

---

### PNO (Prime Number Oscillator)

No configurable parameters.

Plots: PNO (line). Overlay: no.

---

### LogChange

No configurable parameters.

Plots: LogChange (line). Overlay: no.

---

### HML (High Minus Low)

No configurable parameters.

Plots: HML (line). Overlay: no.

---

### MedianPrice

No configurable parameters.

Plots: MedianPrice (line). Overlay: yes.

---

### TypicalPrice

No configurable parameters.

Plots: TypicalPrice (line). Overlay: yes.

---

### WeightedClose

No configurable parameters (period set to 14 but unused in calculation).

Plots: WeightedClose (line). Overlay: yes.

---

### SUM (Summation)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Summation window |
| source | `source` | string | close | Input data row |

Plots: SUM (line). Overlay: no.

---

### MAXIMUM

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Look-back period |
| source | `source` | string | close | Input data row |

Plots: MAXIMUM (line). Overlay: yes.

---

### MINIMUM

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 14 | Look-back period |
| source | `source` | string | close | Input data row |

Plots: MINIMUM (line). Overlay: yes.

---

### ATS (Adaptive Trend System)

No user-configurable parameters. Overlay indicator with built-in adaptive trend calculation.

Plots: multiple signal lines. Overlay: yes.

---

### DBox (Darvas Box)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| periods | `periods` | number | 5 | Look-back period |

Plots: upper/lower box lines. Overlay: yes.

---

### DailyProfiles (Daily Volume Profiles)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| rowsNumber | `rowsNumber` | number | 100 | Number of price rows |
| VAPercent | `VAPercent` | number | 70 | Value area percentage |
| step | `step` | number | 0 | Step size (0 = auto) |

Plots: row histogram. Overlay: yes.

---

### MoonPhases

No user-configurable parameters. Displays lunar phase markers on chart.

Plots: overlay markers. Overlay: yes.

---

### PatternsIndicator (Chart Patterns Scanner)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| scannerType | `scannerType` | number | 0 (Fractals) | Pattern scanner type |

Plots: pattern shapes. Overlay: yes.

---

### VisibleRangeProfiles (Visible Range Volume Profiles)

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| rowsNumber | `rowsNumber` | number | 100 | Number of price rows |
| VAPercent | `VAPercent` | number | 70 | Value area percentage |
| step | `step` | number | 0 | Step size (0 = auto) |

Plots: row histogram over visible range. Overlay: yes.

---

## Appendix: Common Line and Fill Parameters

Every indicator that calls `addPlot()` automatically gets line style parameters for each plot line (indexed starting at 0):

| Parameter | Key Pattern | Type | Default | Description |
|-----------|-------------|------|---------|-------------|
| Line Color | `Line Color` / `Line Color_N` | string | theme default | Stroke color for plot line |
| Line Width | `Line Width` / `Line Width_N` | number | 1 | Line width in pixels |
| Line Style | `Line Style` / `Line Style_N` | string | solid | Line dash style |
| Line Enabled | `Line Enabled` / `Line Enabled_N` | boolean | true | Whether line is visible |

Indicators that call `addFillParameters()` or `addPlotArea()` also get:

| Parameter | Key | Type | Default | Description |
|-----------|-----|------|---------|-------------|
| Fill Above | `Fill Above` | string | rgba(24, 172, 8, 0.5) | Fill color when first series is above second |
| Fill Below | `Fill Below` | string | rgba(255, 0, 0, 0.5) | Fill color when first series is below second |
| Fill Enabled | `Fill Enabled` | boolean | true | Whether fill area is rendered |

## Appendix: MA Type Enum Values

Used by `MAEnvelopes` and `ElderRay`:

| Value | MA Type |
|-------|---------|
| 0 | EMA |
| 1 | HMA |
| 2 | SMA |
| 3 | TMA |
| 4 | TEMA |
| 5 | WMA |
| 6 | VMA |
| 7 | WWS |
| 8 | VIDYA |

## Appendix: IndicatorParam Constants

Defined in `IndicatorParam.ts`:

| Constant | Key String | Used By |
|----------|-----------|---------|
| SOURCE | `"source"` | Most indicators with configurable input |
| SOURCE2 | `"source2"` | CRS |
| PERIODS | `"periods"` | Most indicators |
| STANDARD_DEVIATIONS | `"standardDeviations"` | Bollinger |
| MA_PERIOD | `"maPeriods"` | ChaikinVolatility |
| ROC_PERIOD | `"rocPeriods"` | ChaikinVolatility |
| SMOOTH | `"smooth"` | RSI, Stochastics, MACD, PPO, PriceOscillator, PFE, VROC, RIND, EaseOfMovement, BOP |
| MA_TYPE | `"maType"` | MAEnvelopes, ElderRay |
| BAND_PCT | `"bandPct"` | APZ |
| PCT_K_PERIODS | `"kPeriods"` | Stochastics, StochasticsFast |
| PCT_D_PERIODS | `"dPeriods"` | Stochastics, StochasticsFast |
| FAST | `"fastPeriods"` | MACD, KAMA, PPO, PriceOscillator, UltimateOscillator, ChaikinOscillator, VolumeOscillator, TSI |
| SLOW | `"slowPeriods"` | MACD, KAMA, PPO, PriceOscillator, UltimateOscillator, ChaikinOscillator, VolumeOscillator, TSI |
| SIGNAL_PERIODS | `"signalPeriods"` | TRIX |
| OFFSET_MULTIPLIER | `"offsetMultiplier"` | KeltnerChannel |
| ENVELOPE_PERCENTAGE | `"envelopePercentage"` | MAEnvelopes |
| BAR_COUNT | `"barCount"` | NBarsUp, NBarsDown |
| FORECAST | `"forecast"` | TSF |
| INTERMEDIATE | `"intermediate"` | UltimateOscillator |
| VOLATILITY_PERIOD | `"volatilityPeriod"` | VMA |
| EMA1 | `"ema1Periods"` | RSS |
| EMA2 | `"ema2Periods"` | RSS |
| CONVERSION_PERIODS | `"CLP"` | Ichimoku |
| BASE_PERIODS | `"BLP"` | Ichimoku |
| LOGIN_SPAN2_PERIODS | `"LS2P"` | Ichimoku |
| DISPLACEMENT | `"displacement"` | Ichimoku |
| LIMIT_VALUE | `"limitValue"` | ASI, SwingIndex, TVI |
| R2_SCALE | `"r2Scale"` | VIDYA |
| VOLUME_DIVISOR | `"volumeDivisor"` | EaseOfMovement |
| SHORT_CYCLE | `"shortCycle"` | RAVI |
| LONG_CYCLE | `"longCycle"` | RAVI |
| Q_PERIODS | `"qPeriods"` | RIND |
