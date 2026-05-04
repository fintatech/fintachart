# Data Adapters Reference

FintaChart provides three built-in data adapters (datafeeds) for loading instrument data from different sources. Each adapter implements the same internal interface, so charts work identically regardless of the data transport.

See also: [Events & Enums](events-enums.md) | [Instrument API](instrument.md)

---

## Common Interfaces

### IBar

Represents a single OHLCV bar.

| Property | Type | Description |
|---|---|---|
| `date` | `Date` | Bar timestamp. |
| `open` | `number` | Open price. |
| `high` | `number` | High price. |
| `low` | `number` | Low price. |
| `close` | `number` | Close price. |
| `volume` | `number` | Volume. |

### ITick

Represents a single real-time tick.

| Property | Type | Description |
|---|---|---|
| `date` | `Date` | Tick timestamp. |
| `price` | `number` | Last price. |
| `volume` | `number` | Tick volume. |
| `bid` | `number` | Bid price. |
| `ask` | `number` | Ask price. |

---

## FileDatafeed

Loads static data from local CSV or JSON files. Ideal for development, demos, and offline usage.

### Constructor

```javascript
const datafeed = new FintaChart.FileDatafeed(config);
```

### Config

| Property | Type | Description |
|---|---|---|
| `instruments` | `object` | Map of instrument symbols to their file configurations. |

Each instrument entry contains:

| Property | Type | Description |
|---|---|---|
| `instrument` | `IInstrument` | Instrument metadata (symbol, exchange, tickSize, etc.). |
| `data` | `Array<{ path, periodicity, interval }>` | Array of file sources for different time frames. |

### Data Formatters

| Formatter | Description |
|---|---|
| `ExternalDataFormatterCsv` | Parses CSV files with columns: `Date, Open, High, Low, Close, Volume`. |
| `ExternalDataFormatterJson` | Parses JSON arrays of bar objects. |

### Full Example

```javascript
const datafeed = new FintaChart.FileDatafeed({
  instruments: {
    'AAPL': {
      instrument: {
        symbol: 'AAPL',
        company: 'Apple Inc.',
        exchange: 'NASDAQ',
        tickSize: 0.01
      },
      data: [
        {
          path: '/data/aapl_daily.csv',
          periodicity: FintaChart.Periodicity.DAY,
          interval: 1,
          formatter: new FintaChart.ExternalDataFormatterCsv()
        },
        {
          path: '/data/aapl_1min.json',
          periodicity: FintaChart.Periodicity.MINUTE,
          interval: 1,
          formatter: new FintaChart.ExternalDataFormatterJson()
        }
      ]
    },
    'MSFT': {
      instrument: {
        symbol: 'MSFT',
        company: 'Microsoft Corp.',
        exchange: 'NASDAQ',
        tickSize: 0.01
      },
      data: [
        {
          path: '/data/msft_daily.csv',
          periodicity: FintaChart.Periodicity.DAY,
          interval: 1,
          formatter: new FintaChart.ExternalDataFormatterCsv()
        }
      ]
    }
  }
});

const chart = new FintaChart.Chart({
  container: '#chart-container',
  datafeed: datafeed,
  instrument: { symbol: 'AAPL', exchange: 'NASDAQ' }
});
```

---

## RestDatafeed

Fetches data from a REST API with periodic polling for real-time updates.

### Constructor

```javascript
const datafeed = new FintaChart.RestDatafeed(baseApiUri, realtimeUpdateInterval);
```

| Parameter | Type | Description |
|---|---|---|
| `baseApiUri` | `string` | Base URL of the REST API (e.g. `'https://api.example.com'`). |
| `realtimeUpdateInterval` | `number` | Polling interval in milliseconds for real-time bar updates (e.g. `5000`). |

### Request Formatters

Override these methods to customize outgoing API requests.

| Method | Default Behavior |
|---|---|
| `formatGetInstruments()` | Returns `GET {baseApiUri}/instruments`. |
| `formatGetLastTick(instrument)` | Returns `GET {baseApiUri}/tick?symbol={symbol}`. |
| `formatGetHistory(instrument, resolution, from, to)` | Returns `GET {baseApiUri}/history?symbol={symbol}&resolution={res}&from={from}&to={to}`. |

### Response Formatters

Override these methods to transform incoming API responses.

| Method | Input | Output |
|---|---|---|
| `formatInstruments(response)` | Raw API response | `IInstrument[]` |
| `formatBars(response)` | Raw API response | `IBar[]` |
| `formatRealtime(response)` | Raw API response | `IBar` (latest bar) |

### Periodicity Conversion

The datafeed converts `Periodicity` values to resolution strings for the API:

| Periodicity | Resolution String |
|---|---|
| `TICK` | `'tick'` |
| `SECOND` | `'{interval}S'` |
| `MINUTE` | `'{interval}'` |
| `HOUR` | `'{interval}H'` |
| `DAY` | `'{interval}D'` |
| `WEEK` | `'{interval}W'` |
| `MONTH` | `'{interval}M'` |
| `YEAR` | `'{interval}Y'` |

### Full Example

```javascript
const datafeed = new FintaChart.RestDatafeed(
  'https://api.example.com/v1',
  5000 // poll every 5 seconds
);

// Customize the history request format
datafeed.formatGetHistory = function (instrument, resolution, from, to) {
  return {
    url: `${this.baseApiUri}/bars`,
    params: {
      symbol: instrument.symbol,
      exchange: instrument.exchange,
      resolution: resolution,
      startDate: from.toISOString(),
      endDate: to.toISOString()
    }
  };
};

// Customize the response parser
datafeed.formatBars = function (response) {
  return response.data.map(item => ({
    date: new Date(item.timestamp),
    open: item.o,
    high: item.h,
    low: item.l,
    close: item.c,
    volume: item.v
  }));
};

const chart = new FintaChart.Chart({
  container: '#chart-container',
  datafeed: datafeed,
  instrument: { symbol: 'AAPL', exchange: 'NASDAQ' }
});
```

**Expected API Endpoint Structure**

| Endpoint | Method | Description |
|---|---|---|
| `/instruments` | GET | Returns the list of available instruments. |
| `/tick?symbol=X` | GET | Returns the last tick for the given symbol. |
| `/history?symbol=X&resolution=R&from=F&to=T` | GET | Returns historical bars for the given range. |

---

## WebsocketDatafeed

Streams real-time data over a persistent WebSocket connection.

### Constructor

```javascript
const datafeed = new FintaChart.WebsocketDatafeed(wsUri);
```

| Parameter | Type | Description |
|---|---|---|
| `wsUri` | `string` | WebSocket server URI (e.g. `'wss://ws.example.com/feed'`). |

### Request Formatters

Override these methods to customize outgoing WebSocket messages (sent as JSON strings).

| Method | Description |
|---|---|
| `formatGetInstruments()` | Returns the message to request the instrument list. |
| `formatGetLastTick(instrument)` | Returns the message to request the last tick. |
| `formatGetHistory(instrument, resolution, from, to)` | Returns the message to request historical bars. |

### Response Formatters

Override these methods to parse incoming WebSocket messages.

| Method | Input | Output |
|---|---|---|
| `formatInstruments(message)` | JSON string | `IInstrument[]` |
| `formatBars(message)` | JSON string | `IBar[]` |
| `formatRealtime(message)` | JSON string | `IBar` (latest bar) |

### Subscribe / Unsubscribe Flow

The WebSocket datafeed automatically manages subscriptions:

1. When a chart sets or changes its instrument, the datafeed sends a **subscribe** message.
2. The server begins streaming real-time bar/tick updates for that instrument.
3. When the instrument changes or the chart is destroyed, the datafeed sends an **unsubscribe** message.

Override `formatSubscribe(instrument, resolution)` and `formatUnsubscribe(instrument, resolution)` to customize these messages.

### Full Example

```javascript
const datafeed = new FintaChart.WebsocketDatafeed('wss://ws.example.com/feed');

// Customize the subscribe message
datafeed.formatSubscribe = function (instrument, resolution) {
  return JSON.stringify({
    action: 'subscribe',
    channel: 'bars',
    symbol: instrument.symbol,
    resolution: resolution
  });
};

// Customize the unsubscribe message
datafeed.formatUnsubscribe = function (instrument, resolution) {
  return JSON.stringify({
    action: 'unsubscribe',
    channel: 'bars',
    symbol: instrument.symbol,
    resolution: resolution
  });
};

// Customize the history request
datafeed.formatGetHistory = function (instrument, resolution, from, to) {
  return JSON.stringify({
    action: 'history',
    symbol: instrument.symbol,
    resolution: resolution,
    from: from.getTime(),
    to: to.getTime()
  });
};

// Customize the response parser
datafeed.formatBars = function (message) {
  const data = JSON.parse(message);
  return data.bars.map(item => ({
    date: new Date(item.t),
    open: item.o,
    high: item.h,
    low: item.l,
    close: item.c,
    volume: item.v
  }));
};

const chart = new FintaChart.Chart({
  container: '#chart-container',
  datafeed: datafeed,
  instrument: { symbol: 'AAPL', exchange: 'NASDAQ' }
});
```

## Switching instruments at runtime

Once a chart is mounted, the host application typically needs to swap the active instrument — for example when the user picks a different symbol from a sidebar, watchlist, or search dropdown. The contract is small but has two requirements that are not enforced by the type system, so getting either one wrong produces a silent no-op rather than an error.

### Requirements

1. **Every `IInstrument` must have a unique `id`.** Identity throughout the chart — including `Instrument.equals(a, b)` and the `chart.instrument` setter's change detection — is keyed off `id` only. Two instruments without an `id` compare as equal (`undefined === undefined`), and the setter then skips the entire update block. See [Identity & equality](instrument.md#identity--equality) for the full rationale.
2. **The setter stages a request; the consumer flushes it.** Assigning `chart.instrument = next` populates an internal `_newBarsRequest` and fires `INSTRUMENT_CHANGED`, but it does **not** call `datafeed.send(...)` itself. The consumer must invoke `chart.sendBarsRequest()` to flush the staged request through the datafeed.

### Recommended pattern

```javascript
async function switchTo(id) {
  // 1. Fetch a canonical instrument by id. Backed by your own catalog
  //    in production; FintaChart.Instrument.filterById is the documented
  //    entry point and returns an IInstrument with `id` populated.
  const next = await FintaChart.Instrument.filterById(id);

  // 2. Assign — this stages a bars request and emits INSTRUMENT_CHANGED.
  chart.instrument = next;

  // 3. Flush. Without this call the datafeed never sees the new request.
  chart.sendBarsRequest();
}
```

### Lifecycle

```
chart.instrument = next
        │
        ▼
   Instrument.equals(old, next)
        │
        ├── true  ──▶  no-op (setter returns early)
        │
        └── false ──▶  this._instrument = next
                       this._newBarsRequest = { kind: BARS, count: 500 }
                       fire INSTRUMENT_CHANGED

chart.sendBarsRequest()
        │
        ▼
   datafeed.cancel(currentRequest)   // if any in flight
   datafeed.send(newBarsRequest)     // chart now waits for bars
```

### Common mistakes

| Symptom | Cause | Fix |
|---------|-------|-----|
| Symbol label updates but no new bars load | `sendBarsRequest()` not called after assignment | Call `chart.sendBarsRequest()` |
| Assignment appears to do nothing; `INSTRUMENT_CHANGED` does not fire | Both old and new instrument lack `id`, so `Instrument.equals` returns `true` | Populate `id` on every instrument |
| Stale bars from the previous instrument briefly visible | Previous request was not cancelled | Use `chart.sendBarsRequest()` instead of calling `datafeed.send()` directly — `sendBarsRequest()` cancels any in-flight request first |

A complete working example is at [`examples/html/14-instrument-switching/`](../../examples/html/14-instrument-switching/).
