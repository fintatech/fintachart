# Providers & Handlers Reference

FintaChart uses a provider/handler pattern to let consumers customize chart behavior. Each provider is an interface or abstract class that you implement and pass via the chart configuration object (`IChartConfig`).

See also: [Chart API](chart.md) | [Indicators](indicators.md) | [Instrument API](instrument.md)

---

## Table of Contents

1. [State Management -- IChartStateHandler](#1-state-management--ichartstatehander)
2. [Templates -- TemplatesDataProvider](#2-templates--templatesdataprovider)
3. [Indicators -- IIndicatorsOverviewProvider, IIndicatorAlertsHandler, IRestrictedIndicatorsProvider](#3-indicators)
4. [Calendar / Market Events -- MarketEventsDatafeed, IMarketEventPopupBuilder, IMarketEvent](#4-calendar--market-events)
5. [Trading -- ITradeHandlerCallback, ITradeHandlerParams](#5-trading)
6. [Search -- SearchInstrumentPredicate](#6-search)

---

## 1. State Management -- IChartStateHandler

Handles persisting and restoring chart state (drawings, indicators, settings) to an external store. The chart calls these methods automatically when `autoSave` / `autoLoad` are `true`, or you can call them manually.

**Config key:** `stateHandler`

### Interface

```typescript
interface IChartStateHandler extends IChartComponent {
  autoLoad: boolean;
  autoSave: boolean;
  save(): Promise<void>;
  load(): Promise<boolean>;
  clear(): Promise<void>;
}
```

### Properties

| Property | Type | Description |
|---|---|---|
| `autoLoad` | `boolean` | When `true`, the chart automatically calls `load()` during initialization. |
| `autoSave` | `boolean` | When `true`, the chart automatically calls `save()` before the browser window unloads. |

### Methods

| Method | Returns | Description |
|---|---|---|
| `save()` | `Promise<void>` | Serializes the current chart state and persists it to your storage back-end. |
| `load()` | `Promise<boolean>` | Loads a previously saved state and applies it. Resolves to `true` on success, `false` if no state was found. |
| `clear()` | `Promise<void>` | Removes any saved state from the storage back-end. |

### Built-in Implementation

`LocalStorageChartStateHandler` stores state in the browser `localStorage` keyed by page URL.

```typescript
const stateHandler = new FintaChart.LocalStorageChartStateHandler({
  autoSave: true,
  autoLoad: true,
});
```

### Custom Implementation Example

```typescript
class ServerChartStateHandler extends FintaChart.ChartComponent
  implements FintaChart.IChartStateHandler {

  autoLoad = true;
  autoSave = true;

  async save(): Promise<void> {
    const state = JSON.stringify(this.chart.saveState());
    await fetch('/api/chart-state', {
      method: 'PUT',
      body: state,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async load(): Promise<boolean> {
    const response = await fetch('/api/chart-state');
    if (!response.ok) return false;
    const state = await response.json();
    this.chart.restoreState(state);
    return true;
  }

  async clear(): Promise<void> {
    await fetch('/api/chart-state', { method: 'DELETE' });
  }
}

// Usage
const chart = new FintaChart.Chart({
  stateHandler: new ServerChartStateHandler({ autoSave: true, autoLoad: true }),
  // ...other config
});
```

---

## 2. Templates -- TemplatesDataProvider

Manages loading, saving, editing, and deleting chart templates (pre-configured combinations of chart type, indicators, and theme). Extend the abstract class and implement all abstract methods.

**Config key:** `templateDataProvider`

### Abstract Class

```typescript
abstract class TemplatesDataProvider {
  protected templates: IChartTemplate[];

  abstract editTemplate(id: string, newName: string): Promise<string>;
  abstract templateById(id: string): IChartTemplate;
  abstract templateList(): Promise<IChartTemplate[]>;
  abstract removeTemplate(id: string): Promise<string>;
  abstract saveTemplate(name: string, state: IChartTemplateState): Promise<string>;

  subscribeOnUpdate(fn: (lists: IChartTemplate[]) => void): void;
  unsubscribeFromUpdate(fn: (lists: IChartTemplate[]) => void): void;
  notifyUpdateListeners(): void;
}
```

### Abstract Methods

| Method | Returns | Description |
|---|---|---|
| `editTemplate(id, newName)` | `Promise<string>` | Renames an existing template. Returns a status/confirmation string. |
| `templateById(id)` | `IChartTemplate` | Returns the template with the given `id` synchronously. |
| `templateList()` | `Promise<IChartTemplate[]>` | Fetches the full list of available templates. |
| `removeTemplate(id)` | `Promise<string>` | Deletes a template by `id`. Returns a status/confirmation string. |
| `saveTemplate(name, state)` | `Promise<string>` | Saves a new template with the given name and state. Returns a status/confirmation string. |

### Concrete Methods

| Method | Returns | Description |
|---|---|---|
| `subscribeOnUpdate(fn)` | `void` | Registers a callback that fires whenever the template list changes. |
| `unsubscribeFromUpdate(fn)` | `void` | Removes a previously registered update callback. |
| `notifyUpdateListeners()` | `void` | Call this from your implementation after any mutation to broadcast changes to subscribers. |

### IChartTemplate

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique template identifier. |
| `name` | `string` | Human-readable template name. |
| `state` | `IChartTemplateState` | Serialized chart state snapshot. |

### IChartTemplateState

| Property | Type | Description |
|---|---|---|
| `chartType` | `IChartTypeState` | The chart type configuration (candlestick, bar, line, etc.). |
| `indicators` | `any[]` | Serialized indicator list. |
| `theme` | `IEnvironmentTheme` *(optional)* | Theme settings applied by the template. |

### Built-in Implementation

`DummyTemplatesFileDataProvider` stores templates in browser `localStorage` and seeds from JSON files.

```typescript
const provider = new FintaChart.DummyTemplatesFileDataProvider([
  '/assets/templates/default.json',
  '/assets/templates/scalping.json',
]);
```

### Custom Implementation Example

```typescript
class ApiTemplatesProvider extends FintaChart.TemplatesDataProvider {
  constructor() {
    super();
  }

  async editTemplate(id: string, newName: string): Promise<string> {
    await fetch(`/api/templates/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ name: newName }),
      headers: { 'Content-Type': 'application/json' },
    });
    const tpl = this.templates.find(t => t.id === id);
    if (tpl) tpl.name = newName;
    this.notifyUpdateListeners();
    return 'ok';
  }

  templateById(id: string): FintaChart.IChartTemplate {
    return this.templates.find(t => t.id === id);
  }

  async templateList(): Promise<FintaChart.IChartTemplate[]> {
    const response = await fetch('/api/templates');
    this.templates = await response.json();
    return this.templates;
  }

  async removeTemplate(id: string): Promise<string> {
    await fetch(`/api/templates/${id}`, { method: 'DELETE' });
    this.templates = this.templates.filter(t => t.id !== id);
    this.notifyUpdateListeners();
    return 'removed';
  }

  async saveTemplate(
    name: string,
    state: FintaChart.IChartTemplateState
  ): Promise<string> {
    const response = await fetch('/api/templates', {
      method: 'POST',
      body: JSON.stringify({ name, state }),
      headers: { 'Content-Type': 'application/json' },
    });
    const created = await response.json();
    this.templates.push(created);
    this.notifyUpdateListeners();
    return 'saved';
  }
}

// Usage
const chart = new FintaChart.Chart({
  templateDataProvider: new ApiTemplatesProvider(),
  // ...other config
});
```

---

## 3. Indicators

### 3a. IIndicatorsOverviewProvider

Supplies HTML documentation and configuration metadata for each indicator. Used by the indicators dialog to show descriptions, external links, and settings.

**Config key:** `indicatorsOverviewProvider`

#### Interface

```typescript
interface IIndicatorsOverviewProvider {
  getTemplate(indicatorName: string, locale?: string): string;
  getTemplatesConfig(locale?: string): IIndicatorsOverviewProviderConfig[];
}
```

#### Methods

| Method | Returns | Description |
|---|---|---|
| `getTemplate(indicatorName, locale?)` | `string` | Returns an HTML string describing the given indicator. `locale` defaults to `'en'`. |
| `getTemplatesConfig(locale?)` | `IIndicatorsOverviewProviderConfig[]` | Returns metadata for all available indicators. |

#### IIndicatorsOverviewProviderConfig

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Indicator class name (e.g. `"BollingerBands"`). |
| `name` | `string` | Display name (e.g. `"Bollinger Bands"`). |
| `description` | `string` | Short plain-text description. |
| `url` | `string` | Link to external documentation or article. |
| `setting` | `string[]` | List of human-readable setting descriptions (e.g. `["Period: 20", "Std Dev: 2"]`). |

#### Custom Implementation Example

```typescript
class MyIndicatorsOverview
  implements FintaChart.IIndicatorsOverviewProvider {

  private configs: FintaChart.IIndicatorsOverviewProviderConfig[] = [
    {
      id: 'BollingerBands',
      name: 'Bollinger Bands',
      description: 'Shows volatility bands around a moving average.',
      url: 'https://example.com/docs/bollinger',
      setting: ['Period: 20', 'Standard Deviations: 2'],
    },
    // ...more indicators
  ];

  getTemplate(indicatorName: string, locale = 'en'): string {
    const config = this.configs.find(c => c.id === indicatorName);
    if (!config) return '';
    return `<div><h3>${config.name}</h3><p>${config.description}</p></div>`;
  }

  getTemplatesConfig(locale = 'en'): FintaChart.IIndicatorsOverviewProviderConfig[] {
    return this.configs;
  }
}

// Usage
const chart = new FintaChart.Chart({
  indicatorsOverviewProvider: new MyIndicatorsOverview(),
  // ...other config
});
```

---

### 3b. IIndicatorAlertsHandler

Provides external alert creation for indicator values. When implemented, the chart UI shows an alert button on indicator context menus.

**Config key:** `indicatorAlertsHandler`

#### Interface

```typescript
interface IIndicatorAlertsHandler {
  canCreateAlertOnIndicator(indicator: Indicator, chart: Chart): boolean;
  createAlertOnIndicator(indicator: Indicator, chart: Chart): void;
}
```

#### Methods

| Method | Returns | Description |
|---|---|---|
| `canCreateAlertOnIndicator(indicator, chart)` | `boolean` | Returns `true` if an alert can be created for this indicator. Controls visibility of the alert UI action. |
| `createAlertOnIndicator(indicator, chart)` | `void` | Called when the user clicks the alert action. Implement your alert creation logic here (e.g. open a dialog, call an API). |

#### Implementation Example

```typescript
const alertsHandler: FintaChart.IIndicatorAlertsHandler = {
  canCreateAlertOnIndicator(indicator, chart) {
    // Only allow alerts on moving averages
    return indicator.constructor.name.includes('MovingAverage');
  },

  createAlertOnIndicator(indicator, chart) {
    const currentValue = indicator.dataRows[0]?.lastValue;
    openAlertDialog({
      indicatorName: indicator.name,
      symbol: chart.instrument.symbol,
      value: currentValue,
    });
  },
};

// Usage
const chart = new FintaChart.Chart({
  indicatorAlertsHandler: alertsHandler,
  // ...other config
});
```

---

### 3c. IRestrictedIndicatorsProvider

Controls which indicators are available based on external conditions (e.g. subscription tier, user role). When provided, indicators whose class names appear in the returned array are hidden from the add-indicator dialog.

**Config key:** `indicatorsRestrictionsProvider`

#### Interface

```typescript
interface IRestrictedIndicatorsProvider {
  restrictedIndicators(): string[];
}
```

#### Methods

| Method | Returns | Description |
|---|---|---|
| `restrictedIndicators()` | `string[]` | Returns an array of indicator class names that should be hidden/disabled. |

#### Implementation Example

```typescript
const restrictionsProvider: FintaChart.IRestrictedIndicatorsProvider = {
  restrictedIndicators() {
    // Free-tier users cannot access premium indicators
    if (userSubscription === 'free') {
      return ['Ichimoku', 'VWAP', 'BreakfreeTradingPro'];
    }
    return [];
  },
};

// Usage
const chart = new FintaChart.Chart({
  indicatorsRestrictionsProvider: restrictionsProvider,
  // ...other config
});
```

---

## 4. Calendar / Market Events

The market events system displays economic calendar events, earnings, dividends, and other time-anchored markers directly on the chart.

### 4a. IMarketEvent / IEconomicalMarketEvent

Data interfaces that describe a single market event.

#### IMarketEvent

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique event identifier. |
| `title` | `string` | Event title displayed in the popup. |
| `time` | `number` | Unix timestamp (milliseconds) of the event. |
| `type` | `MarketEventType` | Either `ECONOMICAL` or `SIMPLE`. |
| `groupingId` | `string` | Events with the same `groupingId` at the same bar are grouped together visually. |
| `volatility` | `CalendarEventVolatility` | Expected volatility impact. |
| `iconUrl` | `string` | URL to an icon displayed on the chart for this event. |
| `priority` | `number` *(optional)* | Sort order within a group (lower numbers appear first). |

#### IEconomicalMarketEvent

Extends `IMarketEvent` with economic data fields.

| Property | Type | Description |
|---|---|---|
| `actual` | `string` | Actual reported value. |
| `consensus` | `string` | Market consensus / forecast value. |
| `previous` | `string` | Previous period value. |

#### MarketEventType Enum

| Value | Description |
|---|---|
| `MarketEventType.ECONOMICAL` | Economic data release with actual/consensus/previous values. |
| `MarketEventType.SIMPLE` | Simple event marker (earnings, dividends, etc.). |

#### CalendarEventVolatility Enum

| Value | Numeric | Color |
|---|---|---|
| `VERY_LOW` | `1` | Green (`#27cf6d`) |
| `LOW` | `2` | Yellow (`#ffff00`) |
| `MEDIUM` | `3` | Orange (`#ff8000`) |
| `HIGH` | `4` | Red-Orange (`#ff4000`) |
| `VERY_HIGH` | `5` | Red (`#ff0000`) |

#### CalendarEventsVisibilityMode Enum

Controls which events are visible on the chart.

| Value | Description |
|---|---|
| `CalendarEventsVisibilityMode.ALL` | Show all events. |
| `CalendarEventsVisibilityMode.FUTURE` | Show only events after the last bar. |
| `CalendarEventsVisibilityMode.NONE` | Hide all events. |

---

### 4b. MarketEventsDatafeed

Provides the data source for market events. Extend this class and override the `load` method to fetch events from your API. The base class handles request deduplication and forwards results to the internal `MarketEventsManager`.

**Config key:** `marketEventsDatafeed`

#### Class

```typescript
class MarketEventsDatafeed {
  protected eventsManager: MarketEventsManager;

  init(eventsManager: MarketEventsManager): void;
  loadEvents(params: IMarketEventsRequest): Promise<void>;
  setEvents(events: IMarketEvent[]): void;
  addEvents(events: IMarketEvent[]): void;
  updateEvents(events: IMarketEvent[]): void;
  removeEvents(eventIds: string[]): void;

  // Override this in your subclass
  protected load(params: IMarketEventsRequest): Promise<IMarketEvent[]>;
}
```

#### IMarketEventsRequest

| Property | Type | Description |
|---|---|---|
| `instrument` | `IInstrument` | The instrument for which to fetch events. |
| `fromDate` | `number` | Start of the date range (Unix ms). |
| `toDate` | `number` | End of the date range (Unix ms). |

#### Methods

| Method | Returns | Description |
|---|---|---|
| `init(eventsManager)` | `void` | Called internally by the chart. Do not call directly. |
| `loadEvents(params)` | `Promise<void>` | Fetches events by calling `load()` and adds them to the manager. Handles stale-request cancellation. |
| `setEvents(events)` | `void` | Replaces all events with the provided array. |
| `addEvents(events)` | `void` | Adds events to the existing set (updates duplicates by `id`). |
| `updateEvents(events)` | `void` | Updates existing events matched by `id`. |
| `removeEvents(eventIds)` | `void` | Removes events by their `id` values. |
| `load(params)` | `Promise<IMarketEvent[]>` | **Override this.** Fetches events from your data source. Default returns `[]`. |

#### Implementation Example

```typescript
class EconomicCalendarDatafeed extends FintaChart.MarketEventsDatafeed {
  protected async load(
    params: FintaChart.IMarketEventsRequest
  ): Promise<FintaChart.IMarketEvent[]> {
    const response = await fetch(
      `/api/calendar?symbol=${params.instrument.symbol}` +
      `&from=${params.fromDate}&to=${params.toDate}`
    );
    const data = await response.json();

    return data.map(item => ({
      id: item.eventId,
      title: item.name,
      time: new Date(item.date).getTime(),
      type: FintaChart.MarketEventType.ECONOMICAL,
      groupingId: 'economic',
      volatility: item.impact,  // 1-5
      iconUrl: `/icons/flags/${item.country}.png`,
      actual: item.actual ?? '',
      consensus: item.forecast ?? '',
      previous: item.previous ?? '',
    }));
  }
}

// Usage
const chart = new FintaChart.Chart({
  marketEventsDatafeed: new EconomicCalendarDatafeed(),
  // ...other config
});
```

#### Pushing Events from Outside

You can also push events to the chart at any time through the datafeed instance:

```typescript
const datafeed = new EconomicCalendarDatafeed();

const chart = new FintaChart.Chart({
  marketEventsDatafeed: datafeed,
  // ...other config
});

// Later, when new events arrive via WebSocket:
datafeed.addEvents([newEvent]);
datafeed.updateEvents([updatedEvent]);
datafeed.removeEvents(['event-id-123']);
```

---

### 4c. IMarketEventPopupBuilder

Builds the popup DOM element shown when the user clicks on an event marker. Override to fully customize event popup appearance.

**Config key:** `marketEventPopupBuilder`

#### Interface

```typescript
interface IMarketEventPopupBuilder {
  createPopupElement(event: IMarketEvent, chart: Chart): Promise<JQuery>;
}
```

#### Methods

| Method | Returns | Description |
|---|---|---|
| `createPopupElement(event, chart)` | `Promise<JQuery>` | Creates and returns a jQuery-wrapped DOM element for the event popup. |

#### Implementation Example

```typescript
const popupBuilder: FintaChart.IMarketEventPopupBuilder = {
  async createPopupElement(event, chart) {
    const $popup = $('<div class="custom-event-popup"></div>');
    $popup.append(`<h4>${event.title}</h4>`);
    $popup.append(`<span>${new Date(event.time).toLocaleString()}</span>`);

    if (event.type === FintaChart.MarketEventType.ECONOMICAL) {
      const econ = event as FintaChart.IEconomicalMarketEvent;
      $popup.append(`
        <table>
          <tr><td>Actual</td><td>${econ.actual}</td></tr>
          <tr><td>Consensus</td><td>${econ.consensus}</td></tr>
          <tr><td>Previous</td><td>${econ.previous}</td></tr>
        </table>
      `);
    }

    return $popup;
  },
};

// Usage
const chart = new FintaChart.Chart({
  marketEventPopupBuilder: popupBuilder,
  // ...other config
});
```

---

## 5. Trading

### ITradeHandlerCallback / ITradeHandlerParams

A callback invoked when the user places an order from the chart UI (via context menu or order-entry panel). Implement this to bridge chart order actions to your trading back-end.

**Config key:** `tradeHandler`

#### Type Definition

```typescript
type ITradeHandlerCallback = (params: ITradeHandlerParams) => void;
```

#### ITradeHandlerParams

| Property | Type | Description |
|---|---|---|
| `action` | `OrderAction` | `'buy'` or `'sell'`. |
| `price` | `number` | The price at which the order is placed. |
| `amount` | `number` | Order quantity. |
| `orderKind` | `OrderKind` | Order type. |
| `limitPrice` | `number` | Limit price (for `limit` and `stop-limit` orders). |
| `stopPrice` | `number` | Stop price (for `stop` and `stop-limit` orders). |
| `takeProfit` | `number` *(optional)* | Take-profit price. |
| `stopLoss` | `number` *(optional)* | Stop-loss price. |
| `tif` | `OrderTifEnum` *(optional)* | Time-in-force qualifier. |
| `tifDate` | `string` *(optional)* | Expiration date for GTD orders. |

#### OrderAction Enum

| Value | Description |
|---|---|
| `'buy'` | Buy order. |
| `'sell'` | Sell order. |

#### OrderKind Enum

| Value | Description |
|---|---|
| `'market'` | Market order -- executes immediately at best available price. |
| `'stop'` | Stop order -- triggers at the stop price. |
| `'limit'` | Limit order -- executes at the limit price or better. |
| `'stop-limit'` | Stop-limit -- triggers at stop price, then becomes a limit order. |
| `'take-profit'` | Take-profit order. |
| `'stop-loss'` | Stop-loss order. |

#### OrderTifEnum

| Value | Description |
|---|---|
| `'day'` | Valid for the current trading day. |
| `'gtc'` | Good Till Cancelled. |
| `'gtd'` | Good Till Date (use with `tifDate`). |
| `'fok'` | Fill Or Kill -- must be filled immediately and completely. |
| `'ioc'` | Immediate Or Cancel -- fills what is possible, cancels the rest. |

#### Implementation Example

```typescript
function handleTrade(params: FintaChart.ITradeHandlerParams): void {
  console.log(`${params.action} ${params.amount} @ ${params.price}`);

  tradingApi.placeOrder({
    side: params.action,
    type: params.orderKind,
    quantity: params.amount,
    price: params.price,
    limitPrice: params.limitPrice,
    stopPrice: params.stopPrice,
    takeProfit: params.takeProfit,
    stopLoss: params.stopLoss,
    timeInForce: params.tif,
    expireDate: params.tifDate,
  });
}

// Usage
const chart = new FintaChart.Chart({
  tradeHandler: handleTrade,
  // ...other config
});
```

---

## 6. Search -- SearchInstrumentPredicate

A function type used to search for instruments when the user types in the instrument search bar. Implement this to connect the chart to your instrument database.

**Config key:** `searchInstruments`

#### Type Definition

```typescript
type SearchInstrumentPredicate =
  (query: string, exchange?: string) => Promise<IInstrument[]>;
```

#### Parameters

| Parameter | Type | Description |
|---|---|---|
| `query` | `string` | The search text entered by the user. |
| `exchange` | `string` *(optional)* | Exchange filter selected by the user. |

#### Returns

`Promise<IInstrument[]>` -- an array of instruments matching the query.

#### IInstrument

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique instrument identifier. |
| `symbol` | `string` | Instrument symbol (e.g. `"AAPL"`). |
| `company` | `string` *(optional)* | Company or description name. |
| `exchange` | `string` *(optional)* | Exchange name (e.g. `"NASDAQ"`). |
| `datafeed` | `string` *(optional)* | Datafeed identifier. |
| `type` | `string` *(optional)* | Instrument type (e.g. `"Stock"`, `"Crypto"`). |
| `tickSize` | `number` *(optional)* | Minimum price increment. |
| `pricePrecision` | `number` *(optional)* | Number of decimal places for price display. |
| `contractSize` | `number` *(optional)* | Contract size for derivatives. |
| `baseCurrency` | `string` *(optional)* | Base currency (e.g. `"EUR"`). |
| `currency` | `string` *(optional)* | Quote currency (e.g. `"USD"`). |
| `kind` | `string` *(optional)* | Instrument kind classifier. |

#### Implementation Example

```typescript
async function searchInstruments(
  query: string,
  exchange?: string
): Promise<FintaChart.IInstrument[]> {
  const params = new URLSearchParams({ q: query });
  if (exchange) params.set('exchange', exchange);

  const response = await fetch(`/api/instruments/search?${params}`);
  return response.json();
}

// Usage
const chart = new FintaChart.Chart({
  searchInstruments: searchInstruments,
  // ...other config
});
```

---

## Configuration Summary

All providers are passed through the `IChartConfig` object when creating a chart:

```typescript
const chart = new FintaChart.Chart({
  // State persistence
  stateHandler: myStateHandler,

  // Templates
  templateDataProvider: myTemplatesProvider,

  // Indicators
  indicatorsOverviewProvider: myOverviewProvider,
  indicatorAlertsHandler: myAlertsHandler,
  indicatorsRestrictionsProvider: myRestrictionsProvider,

  // Market events
  marketEventsDatafeed: myEventsDatafeed,
  marketEventPopupBuilder: myPopupBuilder,

  // Trading
  tradeHandler: myTradeCallback,

  // Search
  searchInstruments: mySearchFunction,

  // ...other config (datafeed, instrument, theme, etc.)
});
```
