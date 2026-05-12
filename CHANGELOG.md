# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.5] - 2026-05-12

- Resolved `TypeError: Cannot read properties of null (reading 'appendChild')` when opening settings dialog for custom indicators by ensuring dialog panes are initialized before appending controls.
- Improved `ColorPicker` initialization to wait for DOM attachment using `MutationObserver`, preventing crashes in delayed rendering scenarios.
- Scoped bundled CSS selectors for `[type="checkbox"]` to prevent aggressive styling of elements outside the chart container.
- Fullscreen mode support via the toolbar.
- `Indicator.isOverlay` property is now immutable after construction to ensure pane/scale stability.

### Added

- `Indicator.bindToVerticalScale(verticalScale)` — public helper for overlay indicators to render on the price pane against their own y-axis (cycle composites, oscillators, ML signals).
- New example `examples/html/17-overlay-indicator-with-own-axis/` showing the integration recipe on a normalized cycle composite overlaid on price.

### Changed

- `Indicator.dispose()` now removes a custom `verticalScale` and triggers a chart relayout when `_isCustomScale` is set, not just for built-in Volume.
- `Indicator.unmerge()` now strips a custom `verticalScale` when moving an overlay indicator into its own pane via the context menu, and reassigns plots to the default scale.

### Fixed

- `VerticalAxis.layoutContentFrames()` left-side branch is now symmetric with the right side, so two or more left axes render side-by-side instead of stacking at canvas-x=0.

## [3.1.4] - 2026-05-08

### Added

- New example `examples/html/15-instrument-search/` demonstrating the toolbar search-modal integration — `FintaChart.Instrument.filter` (1-based pagination contract), `Instrument.filterById`, and `chart.exchanges()` for the filter tabs.
- Bar Replay mode now shows a "Click a bar to set the replay start point" hint when entering replay. New `ReplayModeText` UI component with localized strings (en, uk).

### Changed

- Internal axis-adapter cleanup: canvas size retrieval and per-axis height handling unified across `FloatingVerticalAxisAdapter`, `PercentageVerticalAxisAdapter`, `StaticVerticalAxisAdapter`, `HorizontalScale`, `VerticalAxis`, and `CanvasLayer`.

### Fixed

- Built-in context-menu pane-move items now work for custom indicators (`ContextMenu`, `Indicator`).
- Chart visible range is now reset on symbol switch.

## [3.1.3] - 2026-05-06

### Fixed

- Minor bug fixes and improvements.

## [3.1.2] - 2026-05-04

### Added

- `FintaChart.Themes` — public namespace exposing the 10 built-in themes (`defaultTheme`, `darkTheme`, `fintatechDarkTheme`, `beetTheme`, `grayTheme`, `oliveTheme`, `orangeTheme`, `purpleTheme`, `skyTheme`, `tealTheme`).
- `FintaChart.ThemeUtils.deepMerge(target, source)` for deriving custom themes from a base theme.
- `ChartTypeNames.LINE` (`'line'`) and `ChartTypeNames.AREA` (`'area'`) — the two chart types that were registered with `ChartTypeFactory` but missing from the public `ChartTypeNames` constant.
- New example `examples/html/14-instrument-switching/` demonstrating the programmatic instrument-change pattern with `INSTRUMENT_CHANGED` event handling.
- New custom-indicators guide at `docs/api/custom-indicators.md` covering lifecycle hooks, plot setup, parameters, the two registration patterns (direct add vs `IndicatorFactory.add` for state save/restore), and reserved-field pitfalls.
- New "Identity & equality" section in `docs/api/instrument.md` documenting the `id`-based equality contract and the silent no-op trap when instruments lack `id`.
- New "Switching instruments at runtime" section in `docs/api/data-adapters.md` documenting the unique-`id` + explicit `sendBarsRequest()` contract.
- `id` field populated on the bundled `FileDatafeed` instrument configs (`shared/file-data-adapter.js`, `src/scripts/jsdataadapters/fileDataAdapter.js`).

### Changed

- `chart.appendBars(bars)` now auto-establishes the visible range and calls `refreshAsync(true)` when called on a chart with no visible range set.
- Renamed example `examples/html/14-custom-datafeed/` to `examples/html/15-custom-datafeed/` to make room for the new instrument-switching example.

### Fixed

- Toolbar / instrument watermark duplication on chart re-create, and scrollbar theme sync when the active theme changes.
- README quick-start now lists `detectizr.min.js` and `dom-to-image-more.min.js` in the framework script block — both have always been runtime-required and were previously missing from the documented script list, causing `FintaChart.Chart is not a constructor` for anyone copy-pasting the README quick-start.
- `docs/quick-start/chart-concepts.md` quickstart switched from `chart.chartType = 'candle'` (assignment to the chart-type-instance accessor; throws on string) to `chart.applyChartType('candle')` (the public method that takes a string).
- Documentation counts unified at **19 chart types** and **114 indicators** across README, introduction, chart-concepts, chart-types, indicators, and custom-indicators (was variously 16+/17 and 95/100+ depending on the doc).
- `docs/api/events-enums.md` `ChartTypeNames` table rebuilt against the source constant — previously listed fabricated entries (`BAR`, `MOUNTAIN`, `STEP_LINE`, `DOT`, `DASH`, `VOLUME_CANDLE`, etc.) that don't exist; now lists all 19 real entries.
- `docs/api/indicators.md` "Available Indicator Types" section: removed the unregistered `Encapsulation`, added the missing `EaseOfMovement` and `WWS`. Listed types now match the 114 registered with `IndicatorFactory`.

## [3.1.1] - 2026-04-22

### Changed

- Removed the jQuery dependency. All DOM, drag, and resize behavior is now implemented with native browser APIs (`DomUtils`, `Draggable`, `Resizable`).
- Improved scrollbar styling and zoom animation smoothness in the chart container.
- Refreshed documentation and HTML/React examples.

### Removed

- `jquery`, `jquery-ui`, `jquery.ui.touch-punch`, `jquery-i18next`, and `bootstrap-select` runtime dependencies.

## [3.1.0] - 2026-04-18

### Added

- Initial public release of `@fintatech/fintachart`

[3.1.5]: https://github.com/fintatech/fintachart/releases/tag/v3.1.5
[3.1.4]: https://github.com/fintatech/fintachart/releases/tag/v3.1.4
[3.1.3]: https://github.com/fintatech/fintachart/releases/tag/v3.1.3
[3.1.2]: https://github.com/fintatech/fintachart/releases/tag/v3.1.2
[3.1.1]: https://github.com/fintatech/fintachart/releases/tag/v3.1.1
[3.1.0]: https://github.com/fintatech/fintachart/releases/tag/v3.1.0
