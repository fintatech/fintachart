# Custom Indicators

Build your own indicators by extending `FintaChart.Indicator`. The same
class hierarchy and lifecycle is used by every built-in indicator
(SMA, EMA, RSI, MACD, …) — your code plugs into the chart on equal
footing.

This guide covers the full lifecycle, how to read input bars and emit
output values, parameters, plot/level setup, the two ways to attach
your indicator to a chart, and the gotchas worth knowing about.

A complete working example is at
[`examples/html/04-custom-indicator/`](../../examples/html/04-custom-indicator/).

## When to write a custom indicator

You probably want a custom indicator if any of the following is true:

- The calculation you need isn't in the built-in set of 114.
- You need to combine multiple inputs (for example, an oscillator
  whose `+DI` and `-DI` lines feed each other).
- You want to draw something the built-in plot styles can't express
  (custom colors per bar, conditional fills, sparse markers).

If you only need to apply a different theme or change parameters of
an existing indicator, prefer `IndicatorFactory.create('SMA', chart)`
and `updateParameters(...)` over writing a new class.

## Quickstart — a minimal indicator

```javascript
class MyIndicator extends FintaChart.Indicator {
  static get type() { return 'MyIndicator'; }

  onResetDefaults() {
    this.name = 'My Indicator';
    this.isOverlay = true;                    // draws on the price pane
    this.addPlot('#3b82f6', 'Value');         // one plot line, blue
  }

  onInitializeIndicator() {
    // (re)set per-recalc state here
  }

  onInputTick() {
    const close = this.input.get(0);          // current bar's close
    this.values.get('Value').set(close);      // emit one output point
  }
}
```

That's the whole shape: one static `type`, three lifecycle hooks,
and the `input` / `values` accessors used inside `onInputTick`.

To attach it to a chart, see [Adding to a chart](#adding-to-a-chart) below.

## Lifecycle

Three hooks, called in this order:

```
construction
   │
   ▼
onResetDefaults()                  // once, when the indicator is created or "Reset to defaults"
   │
   ▼
onInitializeIndicator()            // once before each full recalculation pass
   │
   ▼
onInputTick()  ← per bar           // chronological, oldest -> newest
onInputTick()
onInputTick()
   …
```

A *full recalculation pass* re-runs `onInitializeIndicator()` followed
by one `onInputTick()` per bar. It is triggered by:

- the indicator being added,
- the source bars changing (new instrument, timeframe switch, datafeed
  refresh),
- a parameter being updated,
- the user invoking *Reset to defaults*.

### `onResetDefaults()`

Called when the indicator is constructed *and* when the user resets
the indicator to defaults. Use it to:

- set the display name (`this.name = 'EMA'`)
- choose where the indicator lives (`this.isOverlay = true` puts it on
  the price pane; `false` opens its own oscillator pane)
- declare any tunable parameters (see [Parameters](#parameters))
- declare every plot line via `addPlot(...)` (see [Plots](#plots))
- declare any horizontal level lines via `addLine(...)`

Anything you create here survives across recalculations.

### `onInitializeIndicator()`

Called *before* every recalculation pass. Use it to (re)set internal
accumulators — running sums, prior-bar values, exponential coefficients
derived from the current `period`, etc. Don't allocate plots here;
they're already in place from `onResetDefaults`.

### `onInputTick()`

Called once per bar in chronological order. This is where the actual
computation happens. Inside the body you have:

| Accessor | Meaning |
|----------|---------|
| `this.input.get(N)` | The input value `N` bars back. `0` is the current bar. |
| `this.currentBar` | Zero-based index of the bar being processed. |
| `this.firstTickOfBar` | `true` when this is the first tick of a new bar (relevant for live updates inside a forming bar). |
| `this.values.get(plotName)` | The output `DataRow` for the plot named `plotName`. |
| `this.values.get(plotName).get(N)` | The previously emitted output value `N` bars back. `1` = previous bar's output. |
| `this.values.get(plotName).set(value)` | Write the current bar's output value. |
| `this.period` | The period parameter, when declared (see [Parameters](#parameters)). |

## Working with input bars

The default input for an indicator is the close price. You can change
it by setting `this.inputDataRowName` in `onResetDefaults` — for
example to `FintaChart.DataRowsMarker.OPEN`, `HIGH`, `LOW`, `VOLUME`,
or any custom data row name your datafeed exposes.

```javascript
onResetDefaults() {
  this.inputDataRowName = FintaChart.DataRowsMarker.HIGH;
  // …
}
```

To consume *multiple* input rows (e.g. an indicator that needs both
high and low on the current bar), don't change `inputDataRowName` —
instead read directly from the chart's data context inside
`onInputTick`:

```javascript
onInputTick() {
  const high = this.chart.dataContext.dataRows.get('high').get(0);
  const low  = this.chart.dataContext.dataRows.get('low').get(0);
  // …
}
```

`firstTickOfBar` is the right place to "freeze" the previous bar's
output before recomputing this bar:

```javascript
onInputTick() {
  if (this.firstTickOfBar) {
    this._priorEma = this._ema;     // stash before overwriting
  }
  this._ema = /* … */;
  this.values.get('EMA').set(this._ema);
}
```

Without that guard, intra-bar ticks would corrupt your previous-value
reference.

## Plots

Every visible line on an indicator is a *plot*. Declare them in
`onResetDefaults`; never inside `onInputTick`.

```javascript
this.addPlot('#3b82f6', 'Fast');
this.addPlot('#ef4444', 'Slow');
```

Signature:

```typescript
addPlot(color: string, name: string, plotStyle?: string, width?: number, style?: string): Plot
```

| Argument | Description |
|----------|-------------|
| `color` | Hex / CSS color for the line. |
| `name` | The plot's identifier — used as the key in `this.values.get(name)`. Must be unique within the indicator. |
| `plotStyle` *(optional)* | Plot style constant (line, histogram, etc.). Defaults to a solid line. |
| `width` *(optional)* | Stroke width in pixels. |
| `style` *(optional)* | Dash style (`'solid'`, `'dash'`, `'dot'`, …). |

Inside `onInputTick`, look up the plot's data row by name and call
`set(value)`:

```javascript
this.values.get('Fast').set(this._fastEma);
this.values.get('Slow').set(this._slowEma);
```

You can also read prior outputs from any plot — useful for indicators
whose current output depends on the previous one:

```javascript
const prevSignal = this.values.get('Signal').get(1);   // 1 bar ago
```

### Skipping a bar

Calling `set(NaN)` skips the bar cleanly: the line breaks, *and* the
bar is excluded from the pane's auto-scale (so a single-day spike on
day 1 doesn't pin the y-axis range for the rest of the chart).

```javascript
onInputTick() {
  if (this.currentBar < this.period) {
    this.values.get(this.name).set(NaN);    // not enough data yet
    return;
  }
  // …
}
```

This is the idiomatic "no value for this bar" signal — much better
than emitting `0`, which would pull the auto-scale toward zero.

### Horizontal level lines

For oscillator-style indicators that want overbought/oversold
reference lines, use `addLine(color, value)` inside `onResetDefaults`:

```javascript
onResetDefaults() {
  this.name = 'My RSI';
  this.isOverlay = false;                   // own pane

  this.addPlot('#3b82f6', this.name);

  this.addLine(this.levelsTheme.line5.strokeColor, 30);   // oversold
  this.addLine(this.levelsTheme.line5.strokeColor, 70);   // overbought
}
```

`this.levelsTheme.line1` … `line5` provide preset colors that
respect the active chart theme. Use them rather than hard-coding
colors so the levels remain readable when the user switches themes.

## Parameters

Parameters give the user (or programmatic callers) a way to tune the
indicator without rewriting code. The built-in indicators expose them
through the indicator settings dialog and via
`indicator.updateParameters({ … })`.

### Built-in convenience: `period`

If your indicator only needs a period, set it in `onResetDefaults` and
read it via `this.period`:

```javascript
onResetDefaults() {
  this.name = 'SMA';
  this.period = 14;
  this.isOverlay = true;
  this.addPlot(this.plotTheme.lines[0].strokeColor, this.name);
}

onInputTick() {
  if (this.currentBar < this.period) { /* … */ }
}
```

`period` is backed by the `IndicatorParam.PERIODS` parameter, so the
user sees and edits it in the indicator settings UI for free.

### Custom parameters

For anything beyond `period`, declare parameters via the
`addParameter`/`addParameters` family. See
[`indicator-params.md`](indicator-params.md) for the full list of
parameter types and the built-in indicator declarations to copy from.

Read them inside `onInitializeIndicator` or `onInputTick` via
`this.parameterValue('NameOfParam')`, and write them via
`this.updateParameter('NameOfParam', value)`.

## Adding to a chart

There are two distinct ways to attach a custom indicator. Both are
supported; pick based on whether you also need state save/restore.

### Pattern A — direct, no registration

```javascript
chart.addIndicators(new MyIndicator());
```

This works the moment your class is defined — no factory call needed.
Use it when:

- Your indicator is added in code at runtime by your own application.
- You don't rely on `chart.saveState()` / `chart.restoreState()` to
  reconstitute it.

The `chart.addIndicators(...)` method accepts an `Indicator` instance
directly (or an array of them) and attaches it to the chart via the
internal `AddIndicatorCommand`.

### Pattern B — register with the factory, then add by type name

```javascript
FintaChart.IndicatorFactory.add(MyIndicator);    // once, at module load

// …later, when adding to a chart:
chart.addIndicators({ type: 'MyIndicator' });
```

This is required when:

- You want the chart's **state save/restore** to reconstitute your
  indicator. `chart.saveState()` serializes every indicator as
  `{ type: 'TypeName', /* params, theme, … */ }`. On
  `chart.restoreState(state)`, the chart calls
  `IndicatorFactory.restore(state)`, which looks up `state.type` in
  the factory's registry to instantiate the right class. **Without
  registration, restore throws** — the type name is unknown.
- You want callers to construct the indicator by string name —
  `FintaChart.IndicatorFactory.create('MyIndicator', chart)` — for
  example to drive it from a saved workspace JSON file or a remote
  config.
- You want your indicator to appear in the built-in *Indicators*
  picker dialog.

`IndicatorFactory.add(MyIndicator)` reads `MyIndicator.type` (the
static getter) and registers the class under that key. Call it
exactly once per indicator class, typically at the bottom of the file
that declares the class — every built-in indicator does the same
(see for example `IndicatorFactory.add(SMA)` at the end of `SMA.ts`).

### Which pane?

`chart.addIndicators(...)` decides automatically:

- If `indicator.isOverlay === true`, it goes onto the **primary
  (price) pane** as an overlay.
- Otherwise it gets its own **new pane** below the price (the
  oscillator pattern — RSI, MACD, etc.).

If you want explicit control, drop down a level:

```javascript
chart.primaryPane.addIndicator(new MyIndicator());     // force onto price pane
const pane = chart.addPane();                          // create a new pane…
pane.addIndicator(new MyOscillator());                 // …and put it there
```

## Pitfalls

### Reserved private fields

The `Indicator` base class uses `_values`, `_plots`, `_parameters`,
`_chart`, and a number of other single-underscore fields internally.
**Do not assign to them from your subclass.** Writes go through the
public APIs:

| Don't | Do |
|-------|----|
| `this._values = newDataRows` | Use `this.values.get(name).set(value)` per bar |
| `this._plots.push({ … })` | Use `this.addPlot(color, name)` in `onResetDefaults` |
| `this._parameters.set(...)` | Use `this.updateParameter(name, value)` |

Direct writes appear to work but are clobbered by the next lifecycle
pass — the symptom is "my indicator draws nothing" with no error.

### Don't allocate plots inside `onInputTick`

`addPlot` is a one-time setup call. If you call it per bar, you'll
accumulate hundreds of stale plots and the chart will redraw them all.

### Don't forget the `static type` getter

`IndicatorFactory.add(MyIndicator)` reads `MyIndicator.type`. If the
getter is missing or returns a duplicate of an existing type, the
factory call silently overwrites the previous registration (or
registers under `undefined`). Pick a unique string and stick with it
— `chart.saveState()` output depends on it for restore to work later.

### `onInitializeIndicator` runs before every recalc, not just once

Stash anything that should survive across recalcs in
`onResetDefaults`. State that has to be reset for each fresh
left-to-right pass (running sums, EMA seeds) goes in
`onInitializeIndicator`.

## Reference: full EMA crossover

A complete, runnable EMA crossover indicator — the same one used in
[`examples/html/04-custom-indicator/`](../../examples/html/04-custom-indicator/)
— shown here as an ES6 class:

```javascript
class EMACrossover extends FintaChart.Indicator {
  static get type() { return 'EMACrossover'; }

  onResetDefaults() {
    this.name = 'EMA Crossover';
    this.isOverlay = true;
    this.addPlot('#3b82f6', 'Fast');
    this.addPlot('#ef4444', 'Slow');
  }

  onInitializeIndicator() {
    this._fastEma = 0;
    this._slowEma = 0;
    this._priorFast = 0;
    this._priorSlow = 0;
  }

  onInputTick() {
    const FAST_PERIOD = 9;
    const SLOW_PERIOD = 21;
    const fastK = 2 / (FAST_PERIOD + 1);
    const slowK = 2 / (SLOW_PERIOD + 1);
    const close = this.input.get(0);

    if (this.firstTickOfBar) {
      this._priorFast = this._fastEma;
      this._priorSlow = this._slowEma;
    }

    if (this.currentBar === 0) {
      this._fastEma = close;
      this._slowEma = close;
    } else {
      this._fastEma = close * fastK + this._priorFast * (1 - fastK);
      this._slowEma = close * slowK + this._priorSlow * (1 - slowK);
    }

    this.values.get('Fast').set(this._fastEma);
    this.values.get('Slow').set(this._slowEma);
  }
}

FintaChart.IndicatorFactory.add(EMACrossover);

// …somewhere after the chart is created:
chart.addIndicators({ type: 'EMACrossover' });
```

## See also

- [`indicators.md`](indicators.md) — the `Indicator` base class API,
  `IndicatorFactory.create` / `restore`, and the list of built-in
  indicators.
- [`indicator-params.md`](indicator-params.md) — every parameter type
  used across the built-ins, with declarations to copy from.
- [`plots.md`](plots.md) — the `Plot` / plot-style reference.
- [`data-rows.md`](data-rows.md) — the `DataRow` / `DataRowsMarker`
  reference (for `inputDataRowName` and the values returned by
  `this.values.get(name)`).
- [`examples/html/04-custom-indicator/`](../../examples/html/04-custom-indicator/) —
  a complete, runnable EMA crossover example.
