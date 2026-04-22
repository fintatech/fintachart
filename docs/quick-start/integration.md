# Integration

FintaChart runs wherever a modern browser engine is available: web platforms served directly in the browser, mobile apps using a WebView, and desktop apps built with Electron or similar frameworks.

## Basic HTML Integration

The simplest way to get a chart on screen is a standalone HTML page. The example below creates a single chart with an offline CSV data source:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FintaChart</title>
  <link rel="stylesheet" href="node_modules/@fintatech/fintachart/css/FintaChart.min.css">
</head>
<body>
  <div id="chartContainer" style="width: 100%; height: 600px;"></div>

  <script src="node_modules/@fintatech/fintachart/scripts/FintaChart.min.js"></script>
  <script>
    // Configure resource paths
    FintaChart.ResourcePath.localization =
      './node_modules/@fintatech/fintachart/localization/';
    FintaChart.ResourcePath.htmlDialogs =
      './node_modules/@fintatech/fintachart/htmldialogs/';
    FintaChart.SvgLoader.path =
      './node_modules/@fintatech/fintachart/img/svg-icons/';

    // Create the chart
    var chart = new FintaChart.Chart({
      container: '#chartContainer',
      instrument: {
        symbol: 'AAPL',
        exchange: 'NASDAQ',
        tickSize: 0.01
      },
      timeFrame: {
        periodicity: 'day',
        period: 1
      },
      chartType: 'candle',
      theme: 'Dark'
    });
  </script>
</body>
</html>
```

## Constructor API

Create a chart instance directly with `new FintaChart.Chart(config)`:

```javascript
var chart = new FintaChart.Chart({
  container: '#chartContainer',   // CSS selector or DOM element
  instrument: { symbol: 'EURUSD', exchange: 'FOREX', tickSize: 0.00001 },
  timeFrame: { periodicity: 'minute', period: 5 },
  chartType: 'candle',
  theme: 'Light'
});
```

The `config` object accepts all options documented in the [Chart API Reference](../api/chart.md).

## Multi-Chart Layouts

Use `ChartsContainer` to display multiple synchronized charts in a single view:

```javascript
var container = new FintaChart.ChartsContainer({
  container: '#multiChartContainer',
  layout: { rows: 1, columns: 2 }
});

// Access individual chart instances
var leftChart = container.charts[0];
var rightChart = container.charts[1];

// Configure each chart independently
leftChart.instrument = { symbol: 'AAPL', exchange: 'NASDAQ', tickSize: 0.01 };
rightChart.instrument = { symbol: 'MSFT', exchange: 'NASDAQ', tickSize: 0.01 };
```

Charts within a container can share a time axis for synchronized scrolling, or operate independently.

## Angular Integration

FintaChart can be wrapped in an Angular component. A typical approach:

1. Install the npm package as a project dependency.
2. Add the CSS to your `angular.json` styles array or import it in a global stylesheet.
3. Add the script to `angular.json` scripts, or load it with a dynamic script loader.
4. Create a wrapper component that initializes the chart in `ngAfterViewInit` and tears it down in `ngOnDestroy`.

```typescript
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

declare var FintaChart: any;

@Component({
  selector: 'app-chart',
  template: '<div #chartHost style="width:100%; height:100%;"></div>'
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartHost') chartHost: ElementRef;
  private chart: any;

  ngAfterViewInit() {
    this.chart = new FintaChart.Chart({
      container: this.chartHost.nativeElement,
      instrument: { symbol: 'AAPL', exchange: 'NASDAQ', tickSize: 0.01 },
      timeFrame: { periodicity: 'day', period: 1 },
      chartType: 'candle'
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
```

Ensure the chart's `destroy()` method is called on component teardown to free canvas resources and remove event listeners.

## Mobile Integration

For mobile apps, embed FintaChart inside a WebView (Android WebView, iOS WKWebView, or a cross-platform equivalent).

Key considerations:

- **Viewport meta tag** -- Include `<meta name="viewport" content="width=device-width, initial-scale=1.0">` so the chart scales correctly on high-DPI screens.
- **Touch events** -- The library handles pinch-to-zoom, panning, and long-press gestures out of the box. No additional configuration is required.
- **Responsive sizing** -- Set the chart container to percentage-based dimensions (`width: 100%; height: 100%`) and listen for orientation changes or resize events to call `chart.update()`.
- **Performance** -- On lower-end devices, consider reducing the number of visible data points or disabling expensive indicators to maintain smooth frame rates.

## Next Steps

- [Chart Concepts](chart-concepts.md) -- Understand panes, plots, and data flow
- [Setup](setup.md) -- Package installation and resource configuration
- [API Reference](../api/chart.md) -- Full API documentation
