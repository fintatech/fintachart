# EventEmitter

`EventEmitter` is the base class for `Chart` and other event-capable objects. It provides a pub/sub mechanism with support for namespaced events, multi-event subscriptions, and event propagation control.

## Interfaces

### IEvent

Base event object passed to every handler.

| Property | Type | Description |
|----------|------|-------------|
| `sender` | `unknown` | The object that fired the event |
| `target` | `unknown` | The intended target of the event |
| `type` | `string` | Event name (e.g. `'click'`, `'instrumentChanged'`) |

### IValueChangedEvent\<T\>

Extends `IEvent` with before/after values.

| Property | Type | Description |
|----------|------|-------------|
| `oldValue` | `T` *(optional)* | Previous value before the change |
| `value` | `T` *(optional)* | New value after the change |

### IEventHandler

```typescript
type IEventHandler = (eventObject: IEvent) => void;
```

Callback signature for all event subscriptions.

## Methods

### on

```typescript
on(events: string, handler: IEventHandler, target?: unknown): EventEmitter
```

Subscribe to one or more events. Returns the `EventEmitter` instance for chaining.

| Parameter | Type | Description |
|-----------|------|-------------|
| `events` | `string` | Space-separated event names. Supports namespaces (e.g. `'click.custom'`) |
| `handler` | `IEventHandler` | Callback invoked when the event fires |
| `target` | `unknown` *(optional)* | Owner reference used for bulk unsubscription via `off()` |

**Examples**

Subscribe to a single event:

```javascript
chart.on(FintaChart.ChartEvent.INSTRUMENT_CHANGED, (event) => {
  console.log('Instrument changed:', event.value);
}, this);
```

Subscribe to multiple events at once:

```javascript
chart.on('doubleclick click.custom', function (event) {
  console.log('Received:', event.type);
});
```

---

### off

```typescript
off(events: string, target?: unknown): EventEmitter
```

Unsubscribe from events. Returns the `EventEmitter` instance for chaining.

| Parameter | Type | Description |
|-----------|------|-------------|
| `events` | `string` | Event name(s) to unsubscribe from. Pass `null` to unsubscribe by `target` only |
| `target` | `unknown` *(optional)* | Remove only handlers registered with this target |

**Examples**

Unsubscribe from a specific event:

```javascript
chart.off(FintaChart.ShapeEvent.RESIZABLE_CHANGED);
```

Unsubscribe all handlers registered with a given target:

```javascript
chart.off(null, this);
```

Unsubscribe by namespace:

```javascript
chart.off('click.custom');
```

---

### invoke

```typescript
invoke(eventName: string, data: IEvent): void
```

Fire an event, notifying all registered handlers.

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventName` | `string` | Name of the event to fire |
| `data` | `IEvent` | Event payload delivered to each handler |

**Example**

```javascript
chart.invoke('click', {
  sender: chart,
  target: null,
  type: 'click'
});
```

---

### invokeValueChanged

```typescript
invokeValueChanged<T>(eventType: string, newValue?: T, oldValue?: T): void
```

Convenience method that constructs an `IValueChangedEvent<T>` and fires it.

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventType` | `string` | Name of the event to fire |
| `newValue` | `T` *(optional)* | The new value |
| `oldValue` | `T` *(optional)* | The previous value |

---

### invokeTargetValueChanged

```typescript
invokeTargetValueChanged<T>(target: unknown, eventType: string, newValue?: T, oldValue?: T): void
```

Same as `invokeValueChanged` but sets the `target` field on the event object.

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | `unknown` | Target reference placed on the event |
| `eventType` | `string` | Name of the event to fire |
| `newValue` | `T` *(optional)* | The new value |
| `oldValue` | `T` *(optional)* | The previous value |

---

### preventPropagation

```typescript
preventPropagation(preventEvents?: boolean): void
```

Pause or resume event delivery. While propagation is prevented, calls to `invoke` and related methods are silently ignored.

| Parameter | Type | Description |
|-----------|------|-------------|
| `preventEvents` | `boolean` *(optional)* | `true` to pause, `false` to resume. Defaults to `true` |
