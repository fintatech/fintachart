<div align="center">
  <a href="https://fintatech.com" target="_blank">
    <img width="400" src="https://raw.githubusercontent.com/fintatech/fintachart/master/.github/logo-200x200.svg" alt="FintaChart logo">
  </a>

  <h1>FintaChart™ — Financial Charting Library</h1>

  [![npm version](https://img.shields.io/npm/v/@fintatech/fintachart.svg)](https://www.npmjs.com/package/@fintatech/fintachart)
</div>

High-performance financial charting component for web applications. Designed for trading platforms, financial dashboards, and any HTML-based project that needs interactive market data visualization.

## Features

- **16+ chart types** — Candlestick, OHLC, Heikin Ashi, Renko, Kagi, Line Break, Point & Figure, Hollow Candle, Range Bar, Candle Volume, Equi Volume, Mountain, Line, Area, and more
- **100+ technical indicators** — RSI, MACD, Bollinger Bands, Ichimoku, EMA, SMA, Stochastics, and the full range of standard analysis tools
- **Drawing and analysis tools** — Lines, channels, rectangles, circles, ellipses, polygons, freehand, arrows, text and image annotations
- **Fibonacci tools** — Retracements, Fan, Extensions, Arcs, Ellipses, Time Zones
- **Trend analysis** — Andrews' Pitchfork, Raff Regression, Error Channel, Gann Fan, Speed Lines, Quadrant Lines, Tirone Levels
- **Pattern recognition** — Head & Shoulders, ABCD, XABCD, Elliott Wave, Triangle, Kings Crown
- **Multiple data sources** — File, REST API, and WebSocket adapters with custom datafeed support
- **10 built-in themes** — Dark, Light, Gray, Olive, Orange, Purple, Sky, Teal, Beet, Fintatech Dark
- **Multi-chart layouts** — Multiple synchronized charts with shared toolbar
- **Trading integration** — Orders, alerts, positions, SL/TP with full event system
- **Calendar events** — Economic calendar overlay on chart
- **Localization** — English and Ukrainian, extensible
- **Touch support** — Mobile and tablet ready
- **State management** — Save/restore workspace, indicators, shapes, templates

## Installation

```bash
npm install @fintatech/fintachart
```

## Quick Start

### HTML

```html
<!-- 1. Styles -->
<link rel="stylesheet" href="node_modules/@fintatech/fintachart/css/external/spectrum.min.css">
<link rel="stylesheet" href="node_modules/@fintatech/fintachart/css/external/toastr.min.css">
<link rel="stylesheet" href="node_modules/@fintatech/fintachart/css/external/jqNumericField.min.css">
<link rel="stylesheet" href="node_modules/@fintatech/fintachart/css/FintaChart.min.css">

<!-- 2. Framework dependencies -->
<script src="node_modules/@fintatech/fintachart/scripts/frameworks/jquery.min.js"></script>
<script src="node_modules/@fintatech/fintachart/scripts/frameworks/jquery-ui.min.js"></script>
<script src="node_modules/@fintatech/fintachart/scripts/frameworks/moment.min.js"></script>
<script src="node_modules/@fintatech/fintachart/scripts/frameworks/Intl.min.js"></script>
<script src="node_modules/@fintatech/fintachart/scripts/frameworks/i18nextXHRBackend.min.js"></script>
<script src="node_modules/@fintatech/fintachart/scripts/frameworks/jquery-i18next.min.js"></script>

<!-- 3. Main bundle -->
<script src="node_modules/@fintatech/fintachart/scripts/FintaChart.min.js"></script>

<!-- 4. Theme -->
<script src="node_modules/@fintatech/fintachart/scripts/themes/defaultTheme.js"></script>

<div id="chart"></div>

<script>
  // 5. Resource paths — must be set before creating the chart
  FintaChart.ResourcePath.localization = 'node_modules/@fintatech/fintachart/localization/';
  FintaChart.ResourcePath.htmlDialogs  = 'node_modules/@fintatech/fintachart/htmldialogs/';
  FintaChart.SvgLoader.path            = 'node_modules/@fintatech/fintachart/img/svg-icons/';

  // 6. Create chart
  var chart = new FintaChart.Chart({
    container: '#chart',
    datafeed: myDatafeed,
    instrument: {
      symbol: 'EUR/GBP',
      exchange: 'FOREX',
      tickSize: 0.00001
    },
    timeFrame: { interval: 1, periodicity: FintaChart.Periodicity.HOUR },
    theme: defaultTheme,
    showToolbar: true,
    showScrollbar: true,
    supportedTimeFrames: ['1 Minutes', '5 Minutes', '15 Minutes', '1 Hour', '4 Hours', '1 Day', '1 Week']
  });
</script>
```

### React + TypeScript

```tsx
import { useEffect, useRef } from 'react';

interface ChartProps {
  instrument: FintaChart.IInstrument;
}

export function Chart({ instrument }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<FintaChart.Chart | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Resource paths — must be set before creating the chart
    FintaChart.ResourcePath.localization = 'node_modules/@fintatech/fintachart/localization/';
    FintaChart.ResourcePath.htmlDialogs  = 'node_modules/@fintatech/fintachart/htmldialogs/';
    FintaChart.SvgLoader.path            = 'node_modules/@fintatech/fintachart/img/svg-icons/';

    chartRef.current = new FintaChart.Chart({
      container: containerRef.current,
      datafeed: myDatafeed,
      instrument,
      timeFrame: { interval: 1, periodicity: FintaChart.Periodicity.MINUTE },
      theme: defaultTheme,
      showToolbar: true,
      showScrollbar: true,
      supportedTimeFrames: ['1 Minutes', '5 Minutes', '15 Minutes', '1 Hour', '4 Hours', '1 Day']
    });

    return () => {
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, [instrument]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
```

## Documentation

Full documentation, getting-started guides, and API reference live in [`docs/`](docs/README.md).

## Examples

14 standalone HTML examples plus a React + TypeScript example live in [`examples/`](examples/README.md).

## Browser Compatibility

| Browser | Version |
|---------|---------|
| Chrome | 29+ |
| Safari | 9+ |
| Firefox | 28+ |
| Opera | 17+ |
| Edge | 17+ |
| Android Browser | 5+ |

## License

Copyright (c) Fintatech B.V. All rights reserved.

Free to use in local development environments. A commercial license is required for any deployed or network-accessible use. See [LICENSE.md](LICENSE.md) for full terms, or contact **sales@fintatech.com**.
