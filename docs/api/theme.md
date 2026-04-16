# Theme Reference

FintaChart ships with a comprehensive theming system. Every visual element -- background, grid, scales, cross-hair, plots, shapes -- is controlled through a single nested theme object.

See also: [Events & Enums](events-enums.md) | [Panes API](panes.md) | [Plots API](plots.md)

---

## Theme Structure

The top-level theme object follows this hierarchy (based on `defaultTheme.js`):

```
theme
 +-- chart
 |    +-- background          (IFillTheme)
 |    +-- border              (IStrokeTheme)
 |    +-- instrumentWatermark (ITextTheme)
 +-- splitter
 |    +-- fillColor           (string)
 |    +-- hoverFillColor      (string)
 +-- pane
 |    +-- grid                ({ verticalLines, horizontalLines }: IStrokeTheme)
 |    +-- title               (ITextTheme)
 |    +-- watermark           (ITextTheme)
 +-- verticalScale
 |    +-- fill                (IFillTheme)
 |    +-- text                (ITextTheme)
 |    +-- line                (IStrokeTheme)
 |    +-- border              (IStrokeTheme)
 |    +-- label               ({ fill, text, border })
 +-- horizontalScale
 |    +-- fill                (IFillTheme)
 |    +-- text                (ITextTheme)
 |    +-- line                (IStrokeTheme)
 |    +-- border              (IStrokeTheme)
 |    +-- label               ({ fill, text, border })
 |    +-- breakLine           (IStrokeTheme)
 +-- crossHair
 |    +-- text                (ITextTheme)
 |    +-- line                (IStrokeTheme)
 |    +-- fill                (IFillTheme)
 +-- replayModeLine
 |    +-- text                (ITextTheme)
 |    +-- line                (IStrokeTheme)
 |    +-- fill                (IFillTheme)
 +-- zoomIn
 |    +-- border              (IStrokeTheme)
 |    +-- fill                (IFillTheme)
 +-- plot
      +-- point               (point plot theme)
      +-- line                (line plot theme)
      +-- histogram           (histogram plot theme)
      +-- bar                 (per-chart-type sub-themes)
           +-- candle         ({ up, down, wick })
           +-- heikinAshi     ({ up, down, wick })
           +-- hollowCandle   ({ up, down, wick })
           +-- ohlcBar        ({ up, down })
           +-- coloredBar     ({ up, down })
           +-- line           (IStrokeTheme)
           +-- mountain       ({ line, fill })
           +-- stepLine       (IStrokeTheme)
           +-- dot            ({ fill })
           +-- dash           (IStrokeTheme)
           +-- renko          ({ up, down })
           +-- lineBreak      ({ up, down })
           +-- rangeBars      ({ up, down })
           +-- kagi           ({ up, down })
           +-- pointAndFigure ({ up, down })
           +-- equiVolume     ({ up, down })
           +-- volumeCandle   ({ up, down })
```

---

## Theme Interfaces

### IStrokeTheme

Defines a stroke (line) style.

| Property | Type | Description |
|---|---|---|
| `strokeColor` | `string` | Line color (CSS color string). |
| `width` | `number` | Line width in pixels. |
| `lineStyle` | `LineStyle` | Dash pattern. See [LineStyle](events-enums.md#linestyle). |

### IFillTheme

Defines a fill style.

| Property | Type | Description |
|---|---|---|
| `fillColor` | `string` | Fill color (CSS color string or gradient). |

### ITextTheme

Defines text rendering style.

| Property | Type | Description |
|---|---|---|
| `fontFamily` | `string` | CSS font family. |
| `fontSize` | `number` | Font size in pixels. |
| `fontWeight` | `string` | Font weight (`'normal'`, `'bold'`, etc.). |
| `fontStyle` | `string` | Font style (`'normal'`, `'italic'`). |
| `fillColor` | `string` | Text color. |

---

## Constants

### LineStyle Enum

| Constant | Description |
|---|---|
| `SOLID` | Solid line. |
| `DASH` | Dashed line. |
| `DOT` | Dotted line. |
| `DASH_DOT` | Alternating dash-dot. |

### FontDefaults

| Constant | Value |
|---|---|
| `DEFAULT_FONT_FAMILY` | `'Calibri, Arial, sans-serif'` |
| `DEFAULT_FONT_SIZE` | `11` |

### StrokeDefaults

| Constant | Value |
|---|---|
| `DEFAULT_STROKE_WIDTH` | `1` |

### DashArray

Pre-defined SVG/Canvas dash arrays for each line style.

| Constant | Value |
|---|---|
| `SOLID` | `[]` |
| `DASH` | `[7, 5]` |
| `DOT` | `[3, 3]` |
| `DASH_DOT` | `[7, 5, 3, 5]` |

---

## IEnvironmentTheme

A flat map of named color properties consumed by UI components (toolbars, dialogs, popups). Properties include background colors, border colors, text colors, accent colors, hover states, and disabled states for each UI element.

```typescript
interface IEnvironmentTheme {
  primaryBackground: string;
  secondaryBackground: string;
  primaryText: string;
  secondaryText: string;
  accentColor: string;
  borderColor: string;
  hoverBackground: string;
  disabledText: string;
  // ... additional UI color properties
}
```

---

## Built-in Themes

FintaChart includes 10 ready-made themes:

| Theme Name | Key Characteristics |
|---|---|
| `default` | Light background, dark text. Standard starting point. |
| `dark` | Dark background, light text. |
| `fintatechDark` | Fintatech-branded dark theme. |
| `beet` | Deep red / beet-toned dark theme. |
| `gray` | Neutral gray palette. |
| `olive` | Olive / green-tinted dark theme. |
| `orange` | Orange accent dark theme. |
| `purple` | Purple accent dark theme. |
| `sky` | Light blue / sky palette. |
| `teal` | Teal accent dark theme. |

---

## Usage Examples

### Applying a Built-in Theme

```javascript
const chart = new FintaChart.Chart({ /* config */ });

// Apply a built-in theme by name
chart.theme = FintaChart.Themes.dark;
```

### Creating a Custom Theme

```javascript
// Start from an existing theme and override specific properties
const customTheme = FintaChart.ThemeUtils.deepMerge(
  FintaChart.Themes.dark,
  {
    chart: {
      background: { fillColor: '#1a1a2e' },
      border: { strokeColor: '#16213e', width: 1 }
    },
    pane: {
      grid: {
        horizontalLines: { strokeColor: '#16213e', width: 1, lineStyle: 'solid' },
        verticalLines: { strokeColor: '#16213e', width: 1, lineStyle: 'solid' }
      }
    },
    plot: {
      bar: {
        candle: {
          up: { fillColor: '#00d9ff', strokeColor: '#00d9ff' },
          down: { fillColor: '#e94560', strokeColor: '#e94560' }
        }
      }
    }
  }
);

chart.theme = customTheme;
```

### Changing Individual Theme Properties at Runtime

```javascript
// Update just the candle colors
chart.theme.plot.bar.candle.up.fillColor = '#26a69a';
chart.theme.plot.bar.candle.down.fillColor = '#ef5350';

// Update the background
chart.theme.chart.background.fillColor = '#131722';

// Trigger a repaint after direct property changes
chart.setNeedsUpdate();
```
