# Formatters Reference

FintaChart provides several number and date/time formatters used to display values on axes, labels, cross-hair overlays, and data windows.

See also: [Scales API](scales.md) | [Panes API](panes.md)

---

## IntlNumberFormatter

Formats numbers using the browser's built-in `Intl.NumberFormat` API. This is the default number formatter.

### Constructor

```javascript
const formatter = new FintaChart.IntlNumberFormatter(locale, options);
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `locale` | `string` | `undefined` (browser default) | BCP 47 locale string (e.g. `'en-US'`, `'de-DE'`). |
| `options` | `Intl.NumberFormatOptions` | `undefined` | Standard `Intl.NumberFormat` options. |

### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `options` | `Intl.NumberFormatOptions` | get / set | The active formatting options. |

### Methods

| Method | Returns | Description |
|---|---|---|
| `format(value, tickSize?)` | `string` | Formats `value` as a localized string. When `tickSize` is provided, the decimal precision is derived from it. |
| `decimalDigits(value)` | `number` | Returns the number of decimal digits needed to represent `value`. |
| `parseNumber(formattedValue)` | `number` | Parses a previously formatted string back into a number. |
| `saveState()` | `object` | Serializes the formatter configuration for persistence. |
| `restoreState(state)` | `void` | Restores a previously saved configuration. |

### Example

```javascript
const formatter = new FintaChart.IntlNumberFormatter('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 4
});

formatter.format(1234.5);       // "1,234.50"
formatter.format(0.123, 0.001); // "0.123" (3 decimal digits from tickSize)
formatter.decimalDigits(0.001); // 3
formatter.parseNumber('1,234.50'); // 1234.5
```

---

## CustomNumberFormatter

Formats numbers using a printf-style format string. Useful when you need explicit control over padding, sign display, and precision.

### Constructor

```javascript
const formatter = new FintaChart.CustomNumberFormatter(locale, formatString);
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `locale` | `string` | `undefined` | BCP 47 locale string. |
| `formatString` | `string` | `undefined` | Printf-style format (e.g. `'%+08.2f'`). |

### Format String Syntax

```
%[sign][width][.precision]type
```

| Component | Description |
|---|---|
| `sign` | `+` forces sign display; `-` left-aligns within `width`. |
| `width` | Minimum total characters (zero-padded if prefixed with `0`). |
| `.precision` | Number of decimal places. |
| `type` | `f` = fixed-point, `e` = exponential, `d` = integer. |

### Accessors

| Accessor | Type | Access | Description |
|---|---|---|---|
| `formatString` | `string` | get / set | The active format string. |
| `precision` | `number` | get | Decimal precision extracted from the format string. |
| `sign` | `string` | get | Sign character (`'+'` or `''`). |
| `type` | `string` | get | Format type character (`'f'`, `'e'`, `'d'`). |
| `width` | `number` | get | Minimum width extracted from the format string. |

### Methods

| Method | Returns | Description |
|---|---|---|
| `format(value, tickSize?)` | `string` | Formats `value` using the format string. `tickSize` overrides precision when provided. |
| `saveState()` | `object` | Serializes the formatter for persistence. |
| `restoreState(state)` | `void` | Restores a previously saved state. |

### Example

```javascript
const formatter = new FintaChart.CustomNumberFormatter('en-US', '%+08.2f');

formatter.format(42.5);   // "+0042.50"
formatter.format(-3.1);   // "-0003.10"
formatter.precision;       // 2
formatter.sign;            // "+"
formatter.type;            // "f"
formatter.width;           // 8
```

---

## DateTimeFormatter

Default date/time formatter that selects an appropriate format based on the chart's periodicity and locale.

### Constructor

```javascript
const formatter = new FintaChart.DateTimeFormatter(locale);
```

| Parameter | Type | Description |
|---|---|---|
| `locale` | `string` | BCP 47 locale string. |

Automatically adjusts output between time-only (`HH:mm`), date-only (`MMM dd`), and full date-time depending on the data's periodicity.

---

## CustomDateTimeFormatter

Formats dates using an explicit pattern string.

### Constructor

```javascript
const formatter = new FintaChart.CustomDateTimeFormatter(locale, formatString);
```

| Parameter | Type | Description |
|---|---|---|
| `locale` | `string` | BCP 47 locale string. |
| `formatString` | `string` | Pattern string (e.g. `'yyyy-MM-dd HH:mm'`). |

### Common Pattern Tokens

| Token | Description | Example |
|---|---|---|
| `yyyy` | 4-digit year | `2025` |
| `MM` | 2-digit month | `03` |
| `dd` | 2-digit day | `15` |
| `HH` | 24-hour hours | `14` |
| `mm` | Minutes | `30` |
| `ss` | Seconds | `45` |

### Example

```javascript
const formatter = new FintaChart.CustomDateTimeFormatter(
  'en-US',
  'yyyy-MM-dd HH:mm'
);

// Output: "2025-03-15 14:30"
```

---

## IntervalDateTimeFormatter

Formats dates relative to the chart's time interval, automatically choosing the best representation for the current zoom level.

### Constructor

```javascript
const formatter = new FintaChart.IntervalDateTimeFormatter(locale, timeInterval);
```

| Parameter | Type | Description |
|---|---|---|
| `locale` | `string` | BCP 47 locale string. |
| `timeInterval` | `ITimeInterval` | The chart's active time interval. |

This formatter adapts its output based on the interval:

| Interval | Typical Output |
|---|---|
| Tick / Second / Minute | `HH:mm:ss` or `HH:mm` |
| Hour | `MMM dd HH:mm` |
| Day | `MMM dd, yyyy` |
| Week / Month | `MMM yyyy` |
| Year | `yyyy` |
