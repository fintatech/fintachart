# DataRows

`DataRows` is the core data container for time-series values in the chart. Each `DataRows` instance holds a typed array of `Date` or `number` values and provides efficient lookup, insertion, and range queries. Bar data (OHLCV) is represented by `BarDataRows`, which bundles multiple `DataRows` instances together.

## Types

```typescript
type TDataRowsValue = Date | number;
type TDataRowsValues = Date[] | number[];
```

---

## DataRows

### Accessors

| Accessor | Access | Type | Description |
|----------|--------|------|-------------|
| `firstValue` | get | `TDataRowsValue` | First element in the data row |
| `lastValue` | get | `TDataRowsValue` | Last element in the data row |
| `length` | get | `number` | Number of elements |
| `name` | get/set | `string` | Descriptive name (e.g. `'close'`, `'date'`) |
| `nameMarker` | get | `DataRowsMarker` | Semantic marker identifying the data type |
| `recordsCount` | get | `number` | Alias for `length` |
| `values` | get/set | `TDataRowsValues` | The underlying typed array |
| `dateDataRows` | get | `DataRows` | Reference to the associated date data row |
| `pricesDataRows` | get | `DataRows` | Reference to the associated prices data row |

---

### Methods

#### add

```typescript
add(...value: TDataRowsValue[]): void
```

Appends one or more values to the end of the data row.

| Parameter | Type | Description |
|-----------|------|-------------|
| `...value` | `TDataRowsValue[]` | Values to append |

---

#### binaryIndexOf

```typescript
binaryIndexOf(searchElement: TDataRowsValue): number
```

Performs a binary search and returns the index of the element, or `-1` if not found.

| Parameter | Type | Description |
|-----------|------|-------------|
| `searchElement` | `TDataRowsValue` | Value to search for |

---

#### ceilIndex

```typescript
ceilIndex(searchValue: TDataRowsValue): number
```

Returns the index of the smallest element that is greater than or equal to the search value.

| Parameter | Type | Description |
|-----------|------|-------------|
| `searchValue` | `TDataRowsValue` | Value to search for |

---

#### clear

```typescript
clear(): void
```

Removes all elements from the data row.

---

#### floorIndex

```typescript
floorIndex(search: TDataRowsValue): number
```

Returns the index of the largest element that is less than or equal to the search value.

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | `TDataRowsValue` | Value to search for |

---

#### fromDataRow

```typescript
fromDataRow(row: DataRows, startIndex: number): void
```

Copies values from another `DataRows` instance starting at the given index.

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `DataRows` | Source data row |
| `startIndex` | `number` | Index in the source to begin copying from |

---

#### initialize

```typescript
initialize(recordsCount: number, rowName: string): void
```

Pre-allocates storage and assigns a name to the data row.

| Parameter | Type | Description |
|-----------|------|-------------|
| `recordsCount` | `number` | Number of elements to allocate |
| `rowName` | `string` | Name for the data row |

---

#### insert

```typescript
insert(index: number, value: TDataRowsValue): void
```

Inserts a value at the specified index, shifting subsequent elements.

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `number` | Position to insert at |
| `value` | `TDataRowsValue` | Value to insert |

---

#### itemsCountBetweenValues

```typescript
itemsCountBetweenValues(startValue: TDataRowsValue, endValue: TDataRowsValue): number
```

Returns the number of elements between two boundary values (inclusive).

| Parameter | Type | Description |
|-----------|------|-------------|
| `startValue` | `TDataRowsValue` | Lower bound |
| `endValue` | `TDataRowsValue` | Upper bound |

---

#### leftVisibleIndexValue

```typescript
leftVisibleIndexValue(index: number): number
```

Returns the value at the left edge of the visible range closest to the given index.

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `number` | Reference index |

---

#### rightVisibleIndexValue

```typescript
rightVisibleIndexValue(index: number): number
```

Returns the value at the right edge of the visible range closest to the given index.

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `number` | Reference index |

---

#### minMaxValues

```typescript
minMaxValues(startIndex?: number, count?: number): IMinMax<number>
```

Returns the minimum and maximum values within the specified range.

| Parameter | Type | Description |
|-----------|------|-------------|
| `startIndex` | `number` *(optional)* | Start of the range (defaults to `0`) |
| `count` | `number` *(optional)* | Number of elements to scan (defaults to all) |

---

#### setValue

```typescript
setValue(index: number, value: TDataRowsValue): void
```

Replaces the value at the specified index.

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `number` | Index to update |
| `value` | `TDataRowsValue` | New value |

---

#### toDataRow

```typescript
toDataRow(name: string): DataRows
```

Creates a new `DataRows` instance containing a copy of this data row's values with the given name.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Name for the new data row |

---

#### trim

```typescript
trim(maxLength: number): number
```

Removes elements from the beginning so that the length does not exceed `maxLength`. Returns the number of elements removed.

| Parameter | Type | Description |
|-----------|------|-------------|
| `maxLength` | `number` | Maximum allowed length |

---

#### updateLast

```typescript
updateLast(value: TDataRowsValue): void
```

Replaces the last element in the data row.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `TDataRowsValue` | New value for the last element |

---

#### value

```typescript
value(index: number): number
```

Returns the numeric value at the specified index.

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `number` | Index to read |

---

#### valueAtIndex

```typescript
valueAtIndex(index: number, value?: TDataRowsValue): TDataRowsValue
```

Gets or sets the value at the specified index. When `value` is provided, sets and returns it; otherwise returns the existing value.

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `number` | Index to access |
| `value` | `TDataRowsValue` *(optional)* | Value to set |

---

### Static Methods

#### DataRows.fromDataRow

```typescript
static fromDataRow(row: DataRows, startIndex: number): DataRows
```

Creates a new `DataRows` instance from a subset of an existing data row.

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `DataRows` | Source data row |
| `startIndex` | `number` | Index in the source to begin copying from |

---

## BarDataRows

`BarDataRows` implements the `IBarDataRows` interface and bundles the standard OHLCV fields into a single object. Each field is a `DataRows` instance.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `date` | `DataRows` | Timestamps for each bar |
| `open` | `DataRows` | Opening prices |
| `high` | `DataRows` | High prices |
| `low` | `DataRows` | Low prices |
| `close` | `DataRows` | Closing prices |
| `volume` | `DataRows` | Volume values |

`BarDataRows` also extends `IOHLCDataRows`, which provides the same `open`, `high`, `low`, `close` fields.

---

## DataRowsMarker

Constants that identify the semantic type of a `DataRows` instance. Used by indicators and the chart engine to locate the correct data row.

| Constant | Description |
|----------|-------------|
| `DATE` | Bar timestamps |
| `OPEN` | Opening prices |
| `HIGH` | High prices |
| `LOW` | Low prices |
| `CLOSE` | Closing prices |
| `VOLUME` | Volume values |
| `HEIKIN_ASHI` | Heikin-Ashi transformed data |
| `RENKO` | Renko brick data |
| `RANGE_BAR` | Range bar data |
| `LINE_BREAK` | Line break chart data |
| `POINT_AND_FIGURE` | Point and figure chart data |
| `KAGI` | Kagi chart data |
| `MEDIAN` | Median price `(high + low) / 2` |
| `TYPICAL` | Typical price `(high + low + close) / 3` |
| `WEIGHTED` | Weighted close `(high + low + close + close) / 4` |
