# DataContext

`DataContext` manages all data rows -- the OHLCV bar data that drives chart rendering. It stores rows in a keyed collection and provides methods for appending, inserting, trimming, and querying bar data.

For details on the underlying `DataRows` class, see [data-rows.md](data-rows.md).

## Interfaces

### IBar

A single OHLCV bar.

| Property | Type | Description |
|----------|------|-------------|
| `date` | `Date` | Bar timestamp |
| `open` | `number` | Open price |
| `high` | `number` | High price |
| `low` | `number` | Low price |
| `close` | `number` | Close price |
| `volume` | `number` | Trade volume |

### IOHLCDataRows

A set of `DataRows` for price data (without volume).

| Property | Type | Description |
|----------|------|-------------|
| `date` | `DataRows` | Timestamp row |
| `open` | `DataRows` | Open price row |
| `high` | `DataRows` | High price row |
| `low` | `DataRows` | Low price row |
| `close` | `DataRows` | Close price row |

### IBarDataRows

Extends `IOHLCDataRows` with a volume row.

| Property | Type | Description |
|----------|------|-------------|
| `volume` | `DataRows` | Volume row |

## Accessors

### dataRows

```typescript
get dataRows(): { [key: string]: DataRows }  // readonly
```

Returns the full collection of named data rows.

---

### dateDataRows

```typescript
get dateDataRows(): DataRows  // readonly
```

Returns the primary date/time data row.

---

### dateRowsNames

```typescript
get dateRowsNames(): string[]  // readonly
```

Returns the names of all date-type data rows.

## Methods

### addBarDataRows

```typescript
addBarDataRows(symbol?: string): IBarDataRows
```

Create a new set of OHLCV data rows, optionally prefixed by symbol.

| Parameter | Type | Description |
|-----------|------|-------------|
| `symbol` | `string` *(optional)* | Symbol prefix for the row names |

**Example**

```javascript
const rows = chart.dataContext.addBarDataRows('EUR/GBP');
```

---

### addDataRows

```typescript
addDataRows(dataRows: string | DataRows, replaceIfExists?: boolean): DataRows
```

Add a named data row to the context. Returns the created or existing `DataRows` instance.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dataRows` | `string \| DataRows` | Row name or an existing `DataRows` instance |
| `replaceIfExists` | `boolean` *(optional)* | Replace an existing row with the same name |

---

### appendBars

```typescript
appendBars(...bars: (IBar | IBar[])[]): void
```

Append one or more bars to the default bar data rows.

**Example**

```javascript
chart.dataContext.appendBars(
  { date: new Date(), open: 1.10, high: 1.12, low: 1.09, close: 1.11, volume: 500 },
  { date: new Date(), open: 1.11, high: 1.13, low: 1.10, close: 1.12, volume: 620 }
);
```

---

### appendInstrumentBars

```typescript
appendInstrumentBars(instrument: IInstrument | null, ...bars: (IBar | IBar[])[]): void
```

Append bars to the data rows associated with a specific instrument.

| Parameter | Type | Description |
|-----------|------|-------------|
| `instrument` | `IInstrument \| null` | Target instrument, or `null` for the default rows |
| `bars` | `IBar \| IBar[]` | Bars to append |

---

### bar

```typescript
bar(indexOrDate: number | Date, barDataRows?: IBarDataRows): IBar
```

Retrieve a single bar by numeric index or by date.

| Parameter | Type | Description |
|-----------|------|-------------|
| `indexOrDate` | `number \| Date` | Zero-based index or a `Date` to look up |
| `barDataRows` | `IBarDataRows` *(optional)* | Specific bar data rows to read from |

**Example**

```javascript
const firstBar = chart.dataContext.bar(0);
console.log(firstBar.close);

const barByDate = chart.dataContext.bar(new Date('2024-01-15'));
```

---

### barDataRows

```typescript
barDataRows(prefix?: string, createIfNotFound?: boolean): IBarDataRows
```

Get the `IBarDataRows` set for a given prefix.

| Parameter | Type | Description |
|-----------|------|-------------|
| `prefix` | `string` *(optional)* | Symbol or row prefix |
| `createIfNotFound` | `boolean` *(optional)* | Create the rows if they do not exist |

---

### clearBarDataRows

```typescript
clearBarDataRows(instrument?: IInstrument | null): void
```

Remove all values from bar data rows, optionally scoped to an instrument.

| Parameter | Type | Description |
|-----------|------|-------------|
| `instrument` | `IInstrument \| null` *(optional)* | Instrument whose rows to clear, or `null`/omitted for default rows |

---

### clearDataRows

```typescript
clearDataRows(dataRows?: string | DataRows): void
```

Remove all values from a specific data row, or from all rows if no argument is given.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dataRows` | `string \| DataRows` *(optional)* | Row name or instance to clear |

---

### cutDataRows

```typescript
cutDataRows(record: number, length: number): void
```

Remove a slice of values from all data rows.

| Parameter | Type | Description |
|-----------|------|-------------|
| `record` | `number` | Start index |
| `length` | `number` | Number of records to remove |

---

### cutBarDataRows

```typescript
cutBarDataRows(record: number, length: number): void
```

Remove a slice of values from all bar data rows.

| Parameter | Type | Description |
|-----------|------|-------------|
| `record` | `number` | Start index |
| `length` | `number` | Number of records to remove |

---

### findDataRows

```typescript
findDataRows(rowMarker: string): DataRows
```

Look up a data row by its marker string.

| Parameter | Type | Description |
|-----------|------|-------------|
| `rowMarker` | `string` | Marker identifying the row |

---

### getDataRows

```typescript
getDataRows(name: string, addIfNotFound?: boolean): DataRows
```

Retrieve a data row by name, optionally creating it if absent.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Row name |
| `addIfNotFound` | `boolean` *(optional)* | Create the row when it does not exist |

---

### indexByDate

```typescript
indexByDate(date: Date): number
```

Return the numeric index of the bar closest to the given date.

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date` | Target date |

**Example**

```javascript
const idx = chart.dataContext.indexByDate(new Date('2024-06-01'));
```

---

### insertBars

```typescript
insertBars(index: number, bars: IBar | IBar[]): void
```

Insert one or more bars at a specific index in the default bar data rows.

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `number` | Insertion position |
| `bars` | `IBar \| IBar[]` | Bars to insert |

---

### insertInstrumentBars

```typescript
insertInstrumentBars(instrument: IInstrument | null, index: number, bars: IBar | IBar[]): void
```

Insert bars at a specific index for a given instrument.

| Parameter | Type | Description |
|-----------|------|-------------|
| `instrument` | `IInstrument \| null` | Target instrument |
| `index` | `number` | Insertion position |
| `bars` | `IBar \| IBar[]` | Bars to insert |

---

### ohlcDataRows

```typescript
ohlcDataRows(prefix?: string, createIfNotFound?: boolean): IOHLCDataRows
```

Get the `IOHLCDataRows` set (without volume) for a given prefix.

| Parameter | Type | Description |
|-----------|------|-------------|
| `prefix` | `string` *(optional)* | Symbol or row prefix |
| `createIfNotFound` | `boolean` *(optional)* | Create the rows if they do not exist |

---

### removeDataRows

```typescript
removeDataRows(dataRows?: string | DataRows): void
```

Remove a named data row from the context entirely.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dataRows` | `string \| DataRows` *(optional)* | Row name or instance to remove. Omit to remove all rows |

---

### trimDataRows

```typescript
trimDataRows(maxLength: number): void
```

Trim all data rows to a maximum number of records, removing the oldest values first.

| Parameter | Type | Description |
|-----------|------|-------------|
| `maxLength` | `number` | Maximum number of records to keep |

**Example**

```javascript
// Keep only the most recent 500 bars
chart.dataContext.trimDataRows(500);
```
