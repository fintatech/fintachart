# Trading API Reference

## ChartContainer

`ChartContainer` manages a multi-chart layout where multiple `Chart` instances live inside a single parent element. It handles shared toolbar, undo/redo, keyboard/mouse focus routing between charts, and full-screen/full-window mode transitions.

See also: [Chart API](chart.md)

### Constructor

```ts
new ChartContainer(parent: HTMLElement)
```

| Parameter | Type | Description |
|---|---|---|
| `parent` | `HTMLElement` | The DOM container that will hold all chart elements. |

### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `charts` | `Chart[]` | readonly | Array of all chart instances managed by this container. |
| `shapeSettingsDragPane` | `ShapeSettingsDragPane` | readonly | The shared shape settings drag pane. |
| `undoRedo` | `UndoRedoController` | readonly | The shared undo/redo controller. |
| `containerDislocation` | `IContainerDislocation` | get / set | Width and height offsets used when computing full-window chart sizing. |
| `parent` | `HTMLElement` | readonly | The parent DOM element. |
| `scrollbar` | `Scrollbar` | readonly | The shared scrollbar instance. |
| `toolbar` | `Toolbar` | readonly | The shared toolbar instance. |

#### IContainerDislocation

| Property | Type | Description |
|---|---|---|
| `width` | `number` | Horizontal offset in pixels. |
| `height` | `number` | Vertical offset in pixels. |

### Methods

#### addChart

```ts
addChart(config?: IChartConfig): Chart
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `config` | `IChartConfig` | no | Configuration for the new chart. If omitted, a default empty chart is created. |

Returns: `Chart` -- The new chart instance.

---

#### createMultipleCharts

```ts
createMultipleCharts(configs: IChartConfig[]): void
```

| Parameter | Type | Description |
|---|---|---|
| `configs` | `IChartConfig[]` | Array of chart configurations. |

Returns: `void`

---

#### dispose

```ts
dispose(): void
```

Cleans up event listeners and disposes the toolbar.

Returns: `void`

---

### Focus Behavior

When a user clicks (mousedown) on one of the charts in the container:

- That chart receives keyboard and mouse events.
- All other charts have their keyboard and mouse events disabled.
- The active chart container receives the CSS class `tcdActiveBorder`; inactive charts receive `tcdInactiveBorder`.
- The shared toolbar switches to control the active chart.

### Usage

```js
const parent = document.querySelector('#multi-chart-container');
const container = new ChartContainer(parent);

// Add charts with specific configs
container.createMultipleCharts([
    { width: 600, height: 400, instrument: { symbol: 'AAPL' } },
    { width: 600, height: 400, instrument: { symbol: 'GOOG' } },
]);

// Access individual charts
const charts = container.charts;
charts[0].refreshAsync();

// Clean up
container.dispose();
```

---

## OrderBar

`OrderBar` represents a pending or working order displayed as a horizontal line on the chart. It extends `TradingTool` and provides interactive drag-to-modify, stop-loss/take-profit child lines, and label rendering.

See also: [PositionBar](#positionbar) | [AlertBar](#alertbar)

### Constructor

```ts
new OrderBar(config: IOrderBarConfig)
```

#### IOrderBarConfig

| Property | Type | Required | Description |
|---|---|---|---|
| `order` | `IOrder` | yes | The order data object to display. |
| `allowPriceChange` | `boolean` | no | Whether the user can drag the order line to change its price. |

### Key Properties

| Property | Type | Access | Description |
|---|---|---|---|
| `order` | `IOrder` | get / set | The underlying order data object. |
| `selected` | `boolean` | get / set | Whether this order bar is currently selected. Deselecting removes the SL/TP overlay. |
| `theme` | `IOrderBarTheme` | get / set | Custom theme override. Falls back to `actualTheme`. |
| `actualTheme` | `IOrderBarTheme` | readonly | Resolved theme (custom > chart default > built-in default). |
| `profit` | `number` | get / set | The profit value displayed for market orders. |
| `stopLossLine` | `StopLoss` | get / set | The attached stop-loss line, if any. |
| `takeProfitLine` | `TakeProfit` | get / set | The attached take-profit line, if any. |
| `stTpLine` | `STTP` | get / set | The combined SL/TP interactive control. |
| `orderLabel` | `OrderLabel` | readonly | The label control attached to this order bar. |
| `mouseHover` | `boolean` | get / set | Whether the cursor is hovering over the order bar. |
| `dragFinished` | `boolean` | get / set | Flag indicating whether a drag operation has completed. |
| `orderQuantity` | `number` | readonly | The quantity from the underlying order. |
| `isSelected` | `boolean` | readonly | Whether this order bar is the chart's currently selected object. |
| `showlabel` | `boolean` | readonly | Whether the order label should be displayed (from `chart.showOrdersLabel`). |

### IOrderBarTheme

| Property | Type | Description |
|---|---|---|
| `line` | `IStrokeTheme` | Line color, width, and dash style. |
| `name.text` | `ITextTheme` | Text style for the order kind/action label. |
| `price.fill` | `IFillTheme` | Fill color for the price label on the vertical axis. |
| `price.text` | `ITextTheme` | Text style for the price label. |
| `quantity.text` | `ITextTheme` | Text style for the quantity display. |
| `profit.fill` | `IFillTheme` | Fill color for the profit label. |
| `profit.text` | `ITextTheme` | Text style for the profit label. |
| `fill` | `IFillTheme` | Background fill for the order rectangle. |
| `shadow` | `IShadowRenderingOptions` | Optional shadow effect. |

### Methods

#### paint

```ts
paint(): void
```

Renders the order line, label rectangle, quantity, action/kind text, and close button onto the canvas.

Returns: `void`

---

#### hitTest

```ts
hitTest(point: IPoint): boolean
```

| Parameter | Type | Description |
|---|---|---|
| `point` | `IPoint` | The point to test against the order's y-coordinate. |

Returns: `boolean` -- `true` if the point is near the order's y-coordinate on the chart.

---

#### setSelected

```ts
setSelected(): void
```

Marks this order as selected, finishes modify mode on other orders, and shows the SL/TP controls.

Returns: `void`

---

#### finishModifyMode

```ts
finishModifyMode(): void
```

Exits modify mode: removes SL/TP overlapping lines and refreshes the display.

Returns: `void`

---

#### refresh

```ts
refresh(localize?: boolean): Promise<void>
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `localize` | `boolean` | no | Whether to re-localize label text. |

Recalculates label widths, validates SL/TP prices, creates/removes SL/TP lines as needed, and triggers a repaint.

Returns: `Promise<void>`

---

#### drawScaleVerticalFloatingLabels

```ts
drawScaleVerticalFloatingLabels(): void
```

Paints the floating price label on the vertical axis at the order price.

Returns: `void`

---

#### dispose

```ts
dispose(): void
```

Removes associated labels and SL/TP lines, resets global text widths, and cleans up.

Returns: `void`

---

### Events

Events are emitted via the `invoke()` mechanism. Subscribe on the chart instance.

| Event Constant | Value | Payload | Description |
|---|---|---|---|
| `OrderBarEvents.ORDER_SETTINGS_CLICKED` | `"orderSettingsClicked"` | `IOrder` | Fired on double-click; open the order settings dialog. |
| `OrderBarEvents.ACCEPT_ORDER_CLICKED` | `"acceptOrderClicked"` | `IOrder` | Fired when the accept (checkmark) button is clicked. |
| `OrderBarEvents.CANCEL_ORDER_CLICKED` | `"cancelOrderClicked"` | `IOrder` | Fired when the cancel (X) button is clicked. |
| `OrderBarEvents.ORDER_PRICE_CHANGED` | `"orderPriceChanged"` | `IOrder, IOrder` | Fired when a drag completes with a new price. Payload is (newOrder, oldOrder). |
| `OrderBarEvents.ORDER_DRAG` | `"orderDrag"` | `IOrder, IOrder` | Fired continuously during a drag. Payload is (currentOrder, originalOrder). |

### Usage

```js
// Listen for order events on the chart
chart.on('cancelOrderClicked', (event) => {
    const order = event.value;
    console.log('Cancel order:', order.id);
});

chart.on('orderPriceChanged', (event) => {
    const newOrder = event.value;
    const oldOrder = event.value2;
    console.log(`Price changed from ${oldOrder.price} to ${newOrder.price}`);
});
```

---

## AlertBar

`AlertBar` represents a price alert displayed as a horizontal line on the chart. It extends `AlertTool` and supports interactive dragging, hover labels, and value-range highlighting.

See also: [OrderBar](#orderbar)

### Constructor

```ts
new AlertBar(config: IAlertBarConfig, isLowBound?: boolean)
```

#### IAlertBarConfig

| Property | Type | Required | Description |
|---|---|---|---|
| `Alert` | `IAlert` | yes | The alert data object to display. |
| `allowPriceChange` | `boolean` | no | Whether the user can drag the alert line. |

| Parameter | Type | Description |
|---|---|---|
| `isLowBound` | `boolean` | When `true`, this bar represents the lower bound of a range alert. |

### Key Properties

| Property | Type | Access | Description |
|---|---|---|---|
| `Alert` | `IAlert` | get / set | The underlying alert data object. |
| `selected` | `boolean` | get / set | Selection state. |
| `theme` | `IAlertBarTheme` | get / set | Custom theme override. |
| `actualTheme` | `IAlertBarTheme` | readonly | Resolved theme from chart theme or built-in defaults. |
| `alertValue` | `number` | get / set | The price value of this alert line. Reads/writes `valueLowBound` or `value` depending on `isLowBound`. |
| `AlertLabel` | `AlertLabel` | readonly | The label control for this alert. |
| `mouseHover` | `boolean` | get / set | Hover state. Setting triggers label updates and position recalculation. |
| `isSelected` | `boolean` | readonly | Whether this is the chart's currently selected object. |
| `dragFinished` | `boolean` | get / set | Whether a drag has completed. |
| `isLowBound` | `boolean` | readonly | Whether this alert bar represents the lower bound of a range. |

### IAlertBarTheme

| Property | Type | Description |
|---|---|---|
| `text` | `ITextTheme` | Main label text style. |
| `markerText` | `ITextTheme` | Vertical axis marker text style. |
| `line` | `IStrokeTheme` | Alert line style (color, width, dash pattern). |
| `fill` | `IFillTheme` | Marker fill. |
| `markerFill` | `IFillTheme` | Marker background fill. |
| `fillRect` | `IFillTheme` | Range highlight fill (used for low-bound alerts). |
| `background` | `string` | Background color for the label rectangle. |

### Methods

#### paint

```ts
paint(): void
```

Renders the alert line, triangle marker, label rectangle with name, and close button. For range alerts, also renders the highlighted area between bounds.

Returns: `void`

---

#### hitTest

```ts
hitTest(point: IPoint): boolean
```

| Parameter | Type | Description |
|---|---|---|
| `point` | `IPoint` | The point to test against the alert's y-coordinate. |

Returns: `boolean` -- `true` if the point is near the alert's y-coordinate.

---

#### setSelected

```ts
setSelected(): void
```

Selects this alert, deselects others, and refreshes.

Returns: `void`

---

#### refresh

```ts
refresh(localize?: boolean): void
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `localize` | `boolean` | no | Whether to re-localize label text. |

Recalculates text widths and triggers a repaint.

Returns: `void`

---

#### paintVerticalAxisLabels

```ts
paintVerticalAxisLabels(): void
```

Renders the floating price label on the vertical axis.

Returns: `void`

---

#### dispose

```ts
dispose(): void
```

Removes label, cleans up references, and refreshes sibling alerts.

Returns: `void`

---

### Events

| Event Constant | Value | Payload | Description |
|---|---|---|---|
| `AlertBarEvents.Alert_SETTINGS_CLICKED` | `"AlertSettingsClicked"` | `AlertBar` | Fired on double-click; open alert settings. |
| `AlertBarEvents.ACCEPT_Alert_CLICKED` | `"acceptAlertClicked"` | `IAlert` | Fired when the accept button is clicked. |
| `AlertBarEvents.CANCEL_Alert_CLICKED` | `"cancelAlertClicked"` | `IAlert` | Fired when the cancel button is clicked. |
| `AlertBarEvents.Alert_PRICE_CHANGED` | `"AlertPriceChanged"` | `IAlert, IAlert` | Fired when a drag completes with a changed value. Payload is (newAlert, oldAlert). |
| `AlertBarEvents.Alert_DRAG` | `"AlertDrag"` | `AlertBar, IAlert` | Fired continuously during drag. Payload is (alertBar, originalAlert). |

### Usage

```js
chart.on('cancelAlertClicked', (event) => {
    const alert = event.value;
    console.log('Remove alert:', alert.id);
});

chart.on('AlertPriceChanged', (event) => {
    const newAlert = event.value;
    const oldAlert = event.value2;
    console.log(`Alert moved from ${oldAlert.value} to ${newAlert.value}`);
});
```

---

## PositionBar

`PositionBar` represents an open position displayed as a horizontal line on the chart. It extends `TradingTool` and shows position kind (long/short), quantity, unrealized P&L, and interactive stop-loss/take-profit controls.

See also: [OrderBar](#orderbar)

### Constructor

```ts
new PositionBar(config: IPositionBarConfig)
```

#### IPositionBarConfig

| Property | Type | Required | Description |
|---|---|---|---|
| `position` | `IPosition` | yes | The position data object to display. |

### Key Properties

| Property | Type | Access | Description |
|---|---|---|---|
| `position` | `IPosition` | get / set | The underlying position data object. |
| `selected` | `boolean` | get / set | Selection state. |
| `stopLossLine` | `StopLoss` | get / set | The attached stop-loss line. |
| `takeProfitLine` | `TakeProfit` | get / set | The attached take-profit line. |
| `stTpLine` | `PositionSLTP` | get / set | The combined SL/TP interactive control. |
| `positionLabel` | `PositionLabel` | readonly | The label control for this position. |
| `mouseHover` | `boolean` | get / set | Hover state. |
| `actualTheme` | `IPositionBarTheme` | readonly | Resolved theme based on position kind (long/short). |
| `defaultTheme` | `IPositionBarTheme` | readonly | Theme from `chart.theme.positionBar[kind]`. |
| `positionQuantity` | `number` | readonly | Quantity from the underlying position. |
| `isSelected` | `boolean` | readonly | Whether this is the chart's currently selected object. |
| `dragFinished` | `boolean` | get / set | Whether a drag has completed. |

### IPositionBarTheme

| Property | Type | Description |
|---|---|---|
| `line` | `IStrokeTheme` | Position line style. |
| `kind.text` | `ITextTheme` | Text style for the position kind label. |
| `price.fill` | `IFillTheme` | Fill for the price marker on the vertical axis. |
| `price.text` | `ITextTheme` | Text style for the price marker. |
| `quantity.text` | `ITextTheme` | Text style for the quantity display. |

### Methods

#### paint

```ts
paint(): void
```

Renders the position line, label rectangle with kind/quantity text, UPL/PnL blocks, close button, and SL/TP fill areas.

Returns: `void`

---

#### hitTest

```ts
hitTest(point: IPoint): boolean
```

| Parameter | Type | Description |
|---|---|---|
| `point` | `IPoint` | The point to test against the position's price y-coordinate. |

Returns: `boolean` -- `true` if the point is near the position's price y-coordinate. Returns `false` if SL/TP lines overlap the position price.

---

#### setSelected

```ts
setSelected(): void
```

Selects this position, finishes modify mode on others, and shows SL/TP controls.

Returns: `void`

---

#### finishModifyMode

```ts
finishModifyMode(): void
```

Removes overlapping SL/TP lines and refreshes.

Returns: `void`

---

#### refresh

```ts
refresh(localize?: boolean): Promise<void>
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `localize` | `boolean` | no | Whether to re-localize label text. |

Re-localizes text, validates SL/TP prices against entry price, creates/removes SL/TP lines, and triggers repaint.

Returns: `Promise<void>`

---

#### updateSLTP

```ts
updateSLTP(): void
```

Creates the interactive `PositionSLTP` control and refreshes.

Returns: `void`

---

#### drawScaleVerticalFloatingLabels

```ts
drawScaleVerticalFloatingLabels(): void
```

Paints the position price label on the vertical axis, colored by kind (green for long, red for short).

Returns: `void`

---

#### dispose

```ts
dispose(): void
```

Removes label, SL/TP lines, and the SL/TP control, then cleans up.

Returns: `void`

---

### Events

| Event Constant | Value | Description |
|---|---|---|
| `PositionBarEvents.POSITION_ADDED` | `"positionAdded"` | A position was added to the chart. |
| `PositionBarEvents.POSITION_REMOVED` | `"positionRemoved"` | A position was removed from the chart. |
| `PositionBarEvents.CLOSE_POSITION_CLICKED` | `"closePositionClicked"` | The close button was clicked. |
| `PositionBarEvents.ADD_STOP_LOSS` | `"addPositionStopLoss"` | A stop-loss should be added to the position. |
| `PositionBarEvents.ADD_TAKE_PROFIT` | `"addPositionTakeProfit"` | A take-profit should be added to the position. |
| `PositionBarEvents.REMOVE_POSITION` | `"removePosition"` | The position should be removed. |

### Usage

```js
chart.on('closePositionClicked', (event) => {
    const positionBar = event.value;
    console.log('Close position:', positionBar.position.id);
});

// Add a position to the chart
const positionBar = new PositionBar({
    position: {
        id: 'pos-1',
        kind: 'long',
        price: 1.2345,
        quantity: 100,
    },
});
chart.primaryPane.addObjects(positionBar);
```

---

## OrderFeaturesInterface

`OrderFeaturesInterface` describes the supported features for each order type on the chart. It is set on the `Chart` instance via `chart.orderFeatures`.

### Interface

```ts
interface OrderFeaturesInterface {
    featuresByOrderType: Record<OrderKind, OrderTypeFeature>;
    quantityUnit: string;
}

interface OrderTypeFeature {
    supportedTimeInForce: OrderTifEnum[];
}
```

### Properties

| Property | Type | Description |
|---|---|---|
| `featuresByOrderType` | `Record<OrderKind, OrderTypeFeature>` | A mapping from each `OrderKind` to its supported features. |
| `quantityUnit` | `string` | The display unit for order quantities (e.g. `"shares"`, `"lots"`, `"contracts"`). |

### OrderTypeFeature

| Property | Type | Description |
|---|---|---|
| `supportedTimeInForce` | `OrderTifEnum[]` | Array of supported time-in-force options for this order type. |

### OrderTifEnum

| Value | Description |
|---|---|
| `Day` | Order expires at end of trading day. |
| `Gtc` | Good Till Cancelled. |
| `Gtd` | Good Till Date. |
| `Fok` | Fill or Kill. |
| `Ioc` | Immediate or Cancel. |

### Usage

```js
chart.orderFeatures = {
    quantityUnit: 'lots',
    featuresByOrderType: {
        limit: { supportedTimeInForce: ['day', 'gtc', 'gtd'] },
        stop:  { supportedTimeInForce: ['day', 'gtc'] },
        market: { supportedTimeInForce: ['day'] },
    },
};
```

---

## IContextMenuItem

`IContextMenuItem` defines a single item in the chart's trading context menu. Menu items are set on the chart via `chart.contextMenuItems` and rendered by `TradingContextMenu`.

### Interface

```ts
interface IContextMenuItem {
    id: string;
    label: string;
    event?: IWindowEvent;
    subMenu?: IContextMenuItem[];
    indicator?: IContextMenuIndicatorItem;
}
```

### Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | yes | Unique identifier for the menu item. Used in `CONTEXT_MENU_ITEM_SELECTED` event payloads. |
| `label` | `string` | yes | Display text for the menu item. |
| `event` | `IWindowEvent` | no | The original window event that triggered the context menu. |
| `subMenu` | `IContextMenuItem[]` | no | Nested sub-menu items. When present, the item renders as an expandable sub-menu. |
| `indicator` | `IContextMenuIndicatorItem` | no | Indicator data attached to the menu item (used for indicator-based alerts). |

### IContextMenuIndicatorItem

| Property | Type | Description |
|---|---|---|
| `name` | `string` | Indicator name. |
| `parameters.period` | `number` | Indicator period parameter. |
| `parameters.source` | `string` | Indicator data source. |
| `value` | `number` | The y-coordinate / value at which the alert is placed. |
| `plot.seriesName` | `string` | Name of the indicator plot series. |

### Context Menu Event

When a menu item is selected, the chart fires `ChartEvent.CONTEXT_MENU_ITEM_SELECTED` with a payload containing:

| Field | Type | Description |
|---|---|---|
| `id` | `string` | The selected menu item's `id`. |
| `label` | `string` | The selected item's label text. |
| `event` | `IWindowEvent` | The original context menu event. |
| `pathId` | `string[]` | Array of `id` values from root to the selected item (for nested menus). |
| `orderConfig` | `SelectedObjConfig` | Order configuration (when a trading action is selected). |
| `positionConfig` | `SelectedObjConfig` | Position configuration (when SL/TP is set on a position). |

### Usage

```js
// Define custom context menu items
chart.contextMenuItems = [
    { id: 'trading-buy', label: 'Buy' },
    { id: 'trading-sell', label: 'Sell' },
    { id: 'add-to-watchlist', label: 'Add to Watchlist' },
    {
        id: 'indicators',
        label: 'Indicators',
        subMenu: [
            { id: 'add-sma', label: 'Add SMA' },
            { id: 'add-ema', label: 'Add EMA' },
        ],
    },
];

// Listen for context menu selections
chart.on(ChartEvent.CONTEXT_MENU_ITEM_SELECTED, (event) => {
    const { id, pathId, orderConfig } = event.value;
    console.log('Selected:', id, 'Path:', pathId);

    if (orderConfig) {
        console.log('Order action:', orderConfig.action, 'kind:', orderConfig.kind);
    }
});
```
