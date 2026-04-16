# Setup

This guide covers installing Trading Chart Designer and configuring the required resources.

## Installation

Install the package from npm:

```bash
npm install @fintatech/fintachart
```

## Package Structure

After installation, the following directories are available under `node_modules/@fintatech/fintachart/`:

| Directory | Contents |
|-----------|----------|
| `css/` | `FintaChart.min.css` and external CSS dependencies |
| `scripts/` | `FintaChart.min.js` and `frameworks/` (bundled third-party libraries) |
| `d.ts/` | TypeScript definition files |
| `htmldialogs/` | UI dialog templates (indicator settings, drawing tool options, etc.) |
| `localization/` | Language files (`en.json`, `uk.json`) |
| `data/` | Sample offline market history CSV files for development and testing |
| `img/` | SVG icons (`svg-icons/`) and favicon |
| `fonts/` | Font assets used by the chart UI |

## Include CSS and JavaScript

Add the stylesheet and script to your HTML page:

```html
<link rel="stylesheet" href="node_modules/@fintatech/fintachart/css/FintaChart.min.css">
<script src="node_modules/@fintatech/fintachart/scripts/FintaChart.min.js"></script>
```

If you use a module bundler (Webpack, Vite, etc.), import the CSS in your entry point and let the bundler resolve the script through your framework's module system.

## Resource Path Configuration

Trading Chart Designer loads dialog templates, localization files, and SVG icons at runtime. Point the library to the correct paths before creating a chart:

```javascript
FintaChart.ResourcePath.localization =
  './node_modules/@fintatech/fintachart/localization/';

FintaChart.ResourcePath.htmlDialogs =
  './node_modules/@fintatech/fintachart/htmldialogs/';

FintaChart.SvgLoader.path =
  './node_modules/@fintatech/fintachart/img/svg-icons/';
```

Adjust these paths to match your project's asset serving strategy. For example, you might copy the directories into your `public/` folder and use root-relative URLs instead.

## Data Adapter

Trading Chart Designer requires a data adapter to supply market data (OHLCV bars, tick data, etc.). The adapter bridges your data source -- whether a REST API, WebSocket feed, or static file -- with the chart's internal data model.

A minimal adapter implements methods for requesting historical bars and subscribing to real-time updates. See [Data Adapters](data-adapters.md) for a complete guide and examples.

## Theme

Apply a built-in theme or define your own. The library ships with 10 themes covering light, dark, and specialty palettes:

```javascript
FintaChart.Theme.use('Dark');
```

For customization options and the full list of available themes, see [Themes](theme.md).

## Next Steps

- [Integration](integration.md) -- Embed the chart in your application
- [Chart Concepts](chart-concepts.md) -- Understand the data flow and architecture
- [API Reference](../api/chart.md) -- Full API documentation
