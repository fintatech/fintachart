## Examples

### HTML

14 standalone HTML examples in [`html/`](html/):

| # | Example | What it demonstrates |
|---|---------|---------------------|
| 01 | [All Themes](html/01-all-themes/) | Theme switcher — all 10 built-in themes |
| 02 | [Chart Types](html/02-chart-types/) | Switch between 19 chart types (candle, OHLC, Renko, Kagi, etc.) |
| 03 | [Indicators](html/03-indicators/) | Add/remove SMA, EMA, Bollinger, MACD, RSI, Volume |
| 04 | [Custom Indicator](html/04-custom-indicator/) | Build an EMA crossover indicator from scratch |
| 05 | [Drawing Tools](html/05-drawing-tools/) | Shapes, annotations, and Fibonacci analysis tools |
| 06 | [Multiple Charts](html/06-multiple-charts/) | 2x2 grid with different instruments and timeframes |
| 07 | [Events](html/07-events/) | Subscribe to chart events with live log panel |
| 08 | [State Management](html/08-state-management/) | Save/restore workspace, indicators, shapes via localStorage |
| 09 | [Trading UI](html/09-trading-ui/) | Orders, alerts, positions with context menu |
| 10 | [Crosshair Modes](html/10-crosshair-modes/) | Switch between None, Labels, Cross, CrossBars, Dot |
| 11 | [Timeframes](html/11-timeframes/) | Timeframe switching (1m to 1M) |
| 12 | [Localization](html/12-localization/) | English / Ukrainian language toggle |
| 13 | [Programmatic API](html/13-programmatic-api/) | Scroll, zoom, export CSV, save image, toggle grid |
| 14 | [Custom Datafeed](html/14-custom-datafeed/) | Simulated REST + L1 ticks with instrument search |

### React + TypeScript

A minimal [Vite + React + TypeScript app](react-app/) showing FintaChart integrated as a typed React component, with proper lifecycle handling (mount, unmount, dispose).

### Running the examples

Each example is a self-contained project. From either folder:

```bash
npm install
npm run serve
```

- **HTML** (`examples/html`) — serves on http://localhost:3000/
- **React** (`examples/react-app`) — serves on http://localhost:5173/