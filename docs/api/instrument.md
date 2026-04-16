# Instrument

The `IInstrument` interface describes a tradeable symbol and its properties. The `Instrument` class provides static helpers for querying and comparing instruments.

## IInstrument

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier |
| `symbol` | `string` | Display symbol (e.g. `'EUR/GBP'`) |
| `company` | `string` *(optional)* | Company or issuer name |
| `exchange` | `string` *(optional)* | Exchange code (e.g. `'FOREX'`, `'NYSE'`) |
| `datafeed` | `string` *(optional)* | Datafeed source identifier |
| `type` | `string` *(optional)* | Instrument type classification |
| `tickSize` | `number` *(optional)* | Minimum price increment (e.g. `0.00001`) |
| `pricePrecision` | `number` *(optional)* | Number of decimal places for price display |
| `mappingId` | `string` *(optional)* | Alternate identifier used for mapping across providers |
| `mappings` | `unknown` *(optional)* | Provider-specific mapping data |
| `provider` | `string` *(optional)* | Data provider name |
| `contractSize` | `number` *(optional)* | Contract size for derivatives |
| `baseCurrency` | `string` *(optional)* | Base currency code (e.g. `'EUR'`) |
| `currency` | `string` *(optional)* | Quote currency code (e.g. `'GBP'`) |
| `kind` | `string` *(optional)* | Additional instrument classification |

## Static Methods

#### all

```typescript
static all(): Promise<IInstrument[]>
```

Fetch every available instrument from the configured datafeed.

**Example**

```javascript
const instruments = await FintaChart.Instrument.all();
console.log(`Loaded ${instruments.length} instruments`);
```

---

#### filter

```typescript
static filter(symbol: string, filter?: string, page?: number, size?: number): Promise<IInstrument[]>
```

Search instruments by symbol with optional filtering and pagination.

| Parameter | Type | Description |
|-----------|------|-------------|
| `symbol` | `string` | Symbol search string |
| `filter` | `string` *(optional)* | Additional filter criteria |
| `page` | `number` *(optional)* | Page number for paginated results |
| `size` | `number` *(optional)* | Page size |

**Example**

```javascript
const results = await FintaChart.Instrument.filter('EUR', 'FOREX', 0, 20);
```

---

#### filterById

```typescript
static filterById(id: string): Promise<IInstrument>
```

Retrieve a single instrument by its unique identifier.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Instrument identifier |

**Example**

```javascript
const instrument = await FintaChart.Instrument.filterById('eur-gbp');
console.log(instrument.symbol); // 'EUR/GBP'
```

---

#### equals

```typescript
static equals(left: IInstrument, right: IInstrument): boolean
```

Compare two instruments for equality based on their identifiers.

| Parameter | Type | Description |
|-----------|------|-------------|
| `left` | `IInstrument` | First instrument |
| `right` | `IInstrument` | Second instrument |

**Example**

```javascript
if (FintaChart.Instrument.equals(instrumentA, instrumentB)) {
  console.log('Same instrument');
}
```

---

#### normalizeTickSize

```typescript
static normalizeTickSize(tickSize: number): number
```

Normalize a tick size value to avoid floating-point precision issues.

| Parameter | Type | Description |
|-----------|------|-------------|
| `tickSize` | `number` | Raw tick size value |

**Example**

```javascript
const tick = FintaChart.Instrument.normalizeTickSize(0.000010000001);
console.log(tick); // 0.00001
```

## VolumeRules

The `VolumeRules` interface defines trading volume constraints for an instrument.

| Property | Type | Description |
|----------|------|-------------|
| `min` | `number` | Minimum allowed volume |
| `max` | `number` | Maximum allowed volume |
| `step` | `number` | Volume increment step |
| `unitsPerInput` | `number` | Number of units represented by one input unit |
