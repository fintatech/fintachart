# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.12] - 2026-08-11

### Added

- Added **date-range presets bar** in the bottom toolbar (`1D 5D 1M 3M 6M YTD 1Y 5Y All` + a calendar button opening a **custom date range** popup with From/To inputs). Presets switch to a suitable timeframe (resolved against `supportedTimeFrames`) and show the requested period; the custom range auto-picks a timeframe targeting ~200 bars. New public API `Chart.setVisibleDateRange(startDate, endDate?, timeFrame?)` — loads missing history (batched `moreBars` requests) before applying the range; `startDate: null` shows all available history. New `calendar` SVG icon and `dateRange.*` localization keys (en, uk).
- Custom in-house **date picker** for the date-range popup (`ToolbarCalendar`). The native `<input type="date">` fields are replaced with read-only text fields carrying a `calendar` icon and a themed calendar panel with month/year navigation, "Today" and "Clear" actions. New `dateRange.clear`, `dateRange.today`, `dateRange.months` and `dateRange.weekdaysShort` localization keys (en, uk).
- Compact **drop-up menu** for the date range, shown whenever the inline preset chips no longer fit the bottom bar. Lists every preset with a descriptive hint (e.g. "5 days in 15 minutes intervals") plus a "Go to…" item that opens the custom-range popup. New `dateRange.label`, `dateRange.goto` and `dateRange.menu.*` localization keys (en, uk).
- Mobile layout for the bottom toolbar: phones always get the drop-up menu (inline chips are too small as touch targets and never fit), and the bar gains responsive `tcdBarNarrow` (< 480 px) / `tcdBarTiny` (< 330 px) modes so the timezone selector shrinks instead of breaking the layout. A new `onDocumentTap` helper de-duplicates `touchend` / `click` (700 ms window) so a single tap doesn't both open and close the menu (`Toolbar`).
- **Render Quality** setting (Low / Medium / High) in the Main Settings dialog (`tcdMainSettings_renderQuality`). Exposed as `Chart.renderQuality`, it caps device-pixel-ratio (`HtmlHelper.dprCap` → 1 / 2 / unlimited), scales `horizontalScale.maxVisibleBars` (base 750 mobile / 2000 desktop, ×0.5 / ×1 / ×1.5) and clamps `RefreshOptimizer.interval` (30 fps / 60 fps / native), trading sharpness for speed on weak devices. New `theme.dialog.renderQuality.*` localization keys (en, uk).
- Indicator values in the **OHLC card**. New public `Indicator.hoverValues(record?)` returning one `IIndicatorHoverValue { name, color, value }` per plot (falling back to the last record when the hovered one is out of range). The primary pane's card lists every indicator on the chart, including those living on their own sub-panes; sub-pane cards list only their own. New `tcdOHLCCard_indicators*` style hooks (`Indicator`, `Pane`, `Toolbar`, `OHLCCard.scss`).
- Shape rendering driven by indicator data: an indicator can now emit drawing shapes together with its values, including shapes arriving with real-time stream updates (`Indicator`).
- **BBCode** parsing and rendering in text shapes — new `Utils/BBCode.ts` module wired into `TextShape`, so indicator-supplied and user text can carry inline markup.

### Changed

- Chart rendering optimization pass (`Chart`, `Pane`, `CanvasRenderer`, `CanvasLayer`, `RefreshOptimizer`, `DomUtils`): `window.resize` handling is now `requestAnimationFrame`-throttled behind a pending guard with `isDisposed` / `_rootDiv` checks; new throttled `Chart.refreshOnTickAsync()` (25 ms floor, called from `DatafeedCore`) keeps an active feed from forcing a full repaint every tick, and its timer is cleared in `dispose()`; bounding rects are cached via `DomUtils.cachedBoundingRect` (used by `CrossHairComponent` instead of `offsetWidth`, removing layout thrash); gradients are cached; wheel and move events accumulate before dispatch (`MouseWheelMotionEvent`, `MoveMotionEvent`); horizontal-scale ticks are built only for the visible window (`FloatingHorizontalAxisAdapter`).
- `BarPlot.drawBars` accepts an optional `yCache: Float64Array[]`, so open/close/high/low pixel coordinates are computed once per repaint instead of calling `coordinateMapper.yByValue` per bar.
- `TradingSessionHoursCheck()` re-enabled (`ChartTypeBase`) — the whole body had been commented out. RTH/ETH bar recalculation, the `TRADING_SESSION_UPDATE` event, indicator refresh and scale refresh work again.
- Dev-only on-screen FPS / frame-time meter added to `Chart` (localhost and private IPs only) for rendering diagnostics.

### Fixed

- Flickering and initialization errors for charts in inactive (hidden) tabs (`Chart`, `HorizontalScale`). The `hasRenderSize()` guards were removed from `paint()`, `refresh()` and `InitializeVisualDimensions()` so a hidden chart still initializes and paints at 0 px — canvases, axes and renderers exist by the time positions or orders arrive in a background tab. `HorizontalScale` keeps the last valid column width instead of poisoning pixel→record conversions (and ignores pixel scrolls with an invalid width), and the hidden→visible transition refreshes synchronously so the first painted frame is already correct.
- Trade label overlapping when several positions are on the chart (`PositionBar`, `PositionTPSL`, `STTP`, `OrderBar`, `OrderLabel`, `StopLoss`, `TakeProfit`, `HorizontalAxis`). The `kind` / `quantity` text widths were module-level globals shared by every position bar and are now per-instance fields.
- OHLC cards could be dragged outside the chart and break; they are now clamped to the chart bounds (`Chart`, `Pane`, `Draggable`, `OHLCCard.scss`).
- Volume bar normalization in the OHLC card (`Pane`).
- Duplicate indicator "frames" appearing on save, caused by an unmanaged restore-indicators timer (`Chart`).
- Incorrect rendering of shapes arriving with real-time indicator updates (`Indicator`, `TextShape`).
- Incorrect parsing of numbers written with a thousand separator in the shape settings "Points" tab (`ShapeCoordinatePane`).
- Horizontal-scale glitches when applying a custom date range (`Chart`, `FloatingHorizontalAxisAdapter`).
- Assorted mobile fixes: compare-instrument settings, chart snapshot handling, pane interaction, shape templates, instrument search, toolbar drop-downs and drag panes (`CompareInstrumentSettings`, `ChartSnapshotHandler`, `Pane`, `ShapeTemplateSettings`, `InstrumentSearch`, `Toolbar`, `ToolbarDropDownButton`, `DragPane`, `Draggable`).

## [3.1.11] - 2026-07-06

### Added

- Position drawing shape: leverage-based position sizing. New `leverage` option on `PositionDrawingShape` (defaults to `1`) drives `Qty = (accountSize × leverage) / entryPrice` — stop distance no longer affects sizing. New calc outputs `accountTooSmall` / `minLotSize` (derived from `instrument.mappings[provider].minOrderSize / contractSize`), new `ShapeEvent.ACCOUNT_TOO_SMALL_CHANGED` event, and an in-canvas "Account size is too small for this instrument" warning. Settings dialog gains a Leverage input. Aligns with TradingView's position-tool sizing model.
- **"Default"** button in the Indicator Settings dialog (`tcdIndicatorDialog_btn_default`) resets the indicator's parameters via a confirmation prompt: builds a fresh indicator of the same type, applies `resetDefaults()`, dispatches an `UpdateIndicatorCommand` (so the change is undoable), and rebuilds all tab controls without closing the dialog. Visibility tab is now also revealed when applicable.
- `TradingTool.getDisplayedBidAsk(fallbackPrice?)` protected helper returning current `{ bid, ask }` from `chart.lastBid` / `chart.lastAsk`, falling back to the last close or supplied price when the live quote is missing or non-positive. Used by SL/TP validation for open positions.
- New chart-level toast localization keys for the copy-image flow: `toolbar.snapshot.copyImageSuccess`, `toolbar.snapshot.copyImageDownloaded`, `toolbar.snapshot.copyImageFailed` (en, uk).
- Draggable **OHLC card** overlay showing O/H/L/C plus **Volume** and **Change**, toggled from a new toolbar **"OHLC Cards"** menu. Ships five display variants — Compact, Outline, Compact Row, Bluetab, and Progress Bars — with an `open-OHLC-card` toolbar icon and en/uk localization (`OHLCCard`, `Pane`, `Toolbar`, `Draggable`).
- Two new indicator parameters — **Multiplier** and **Box Ratio Smoothing** — exposed across the volume/flow indicators (AD Index, Chaikin Money Flow, Chaikin Oscillator, Ease of Movement, OBV, TRIX, Volume Oscillator), wired through `IndicatorParam` and the parameter-control factory with en/uk labels.
- Pending-confirmation state for chart trading via `TradingTool.setDimmed(value)`: an order or position dims (its theme colors multiplied) while a placement or modification awaits backend confirmation, preventing duplicate actions. Take-profit and stop-loss lines are now also supported on open-position bars (`OrderBar`, `PositionBar`, `StopLoss`, `TakeProfit`, `TradingTool`).

### Changed

- Order-entry panel ("trade from the chart"): the quantity calculator gains preset value buttons populated from the instrument's static quantities plus a toggleable "set" action, and limit/stop inputs now seed through `NumericField.setValue` for correct tick formatting (`Toolbar`).
- Stop-limit order rendering improved (`OrderBar`, `STTP`, `Chart`), with dedicated stop-limit color tokens added to all bundled themes (default, dark, fintatech dark, gray, olive, orange, purple, sky, teal).
- Position drawing tool: Open P&L formula corrected, and its color rendering and context menu updated (`PositionDrawingShape`, `OrderBar`, `PositionShapeContextMenu`, en/uk).
- Fibonacci drawing settings and drawing-template behavior reworked (`FibonacciShapeSettings`, `ShapeCoordinatePane`, `ShapeSettingsDragPane`, `ShapeTemplateSettings`, `ColorPicker`), including the templates drop-down styling.
- Shape settings dialog restyled with updated drop-down handling and a refreshed "Points" modal (`ShapeSettingsDialog`, `ToolbarDropDownButton`).
- Alert editing from the chart's trading context menu improved (`TradingContextMenu`).
- `ChartSnapshotHandler.saveToClipboard()` rewritten: now uses the async `navigator.clipboard.write([new ClipboardItem({ 'image/png': blobPromise })])` pattern that satisfies Safari/Firefox's "user activation must be the same task as the write" rule. Adds a one-shot `window.focus` retry on `NotAllowedError: document is not focused`, a `clipboardUnavailableReason()` pre-check, and a graceful fallback that downloads the image and surfaces a `copyImageDownloaded` / `copyImageFailed` chart toast when the clipboard write cannot succeed. Fixes "Impossible to copy chart image" in the embedded widget.
- SL/TP validation for an open position now clamps against the live bid/ask instead of the position's entry price (`PositionBar`, `StopLoss`, `TakeProfit`, `TradingTool`): longs require `SL < bid` and `TP > ask`; shorts require `SL > ask` and `TP < bid`. Shift-key bypass remains available only for pending orders — for positions, validation always runs. Out-of-range values now snap via `formatValue(...)` to honor tick precision.
- Crosshair behavior on touch devices (`Chart.bindTouchPan`, `Pane`): when `crossHairType` is `CROSS` or `CROSS_BARS`, touch-pan is now disabled on `Chart` and pane drag short-circuits on mobile, so the crosshair stays put under the finger instead of scrolling the chart. Desktop crosshair drag is unaffected; the non-crosshair drag path no longer requires `PointerKind.MOUSE`, restoring touch-scroll parity when the crosshair is off.
- Scroll-to-latest-bar, zoom hotkeys, and arrow-key panning now refresh with `primaryPane.isPreservingAutoScaling` instead of forcing auto-scale on every refresh (`Chart`, `HotkeysHandler`, `Pane`). The user's current vertical zoom is preserved across these actions when auto-scale has been opted out of.
- Currency conversion in `TradingTool` simplified to `profitUSD = profitInQuote * rate`. Removed the prior USD-base branch that inverted the rate based on `conversionRate.symbol` (caused incorrect P/L when the conversion symbol parser misclassified the pair).
- Instrument watermark now reads the exchange from `instrument.mappings[provider].exchange` and only appends the " - exchange" suffix when that mapping exists; missing `provider` / `mappings` no longer throws (`InstrumentWatermark`).
- Mobile shape selection: tapping a selectable drawing now opens its settings pane — the previous `!UserAgent.isMobile` gate on `Shape.showSettingsPane()` blocked this on phones/tablets. Now gated on `selected && _shapeState !== MOVING` instead.
- Mobile shape interaction: pane click now hides all shape tooltips first (so a stale tooltip can't intercept the next tap); long-press context menu uses `clickHitTest(point)` so the press only fires on the shape's hit region; touch-pan is suppressed only when the touch starts outside the panes frame or hits a shape. Toolbar drop-down buttons with children on mobile always toggle the dropdown on tap, regardless of which sub-target was hit.
- Toolbar "remove all" interactions on mobile: lock-shapes button now calls `e.preventDefault()` so the click doesn't bubble to the dropdown and dismiss it before the action runs.
- `Dialog.close()` preserves the prior `hotkeysEnabled` state when `_keyboardEnabledState` is null (`?? this.config.chart.hotkeysEnabled`), so closing a freshly-opened "reset to defaults" dialog no longer leaves hotkeys disabled.
- `ChartSnapshotHandler` now reads `this.chart.rootDiv` directly (previously `this.chart.rootDiv.get(0)`, a leftover jQuery-style access) and removed the unused `MimeType.PNG` enum export.
- Event-handler typing: `event.evt` is explicitly narrowed to `globalThis.MouseEvent` for the `shiftKey` check in `StopLoss` / `TakeProfit` to avoid a Konva ambient-type collision.

### Fixed

- Chart logo/asset now re-renders correctly when a chart is restored from saved state (`InstrumentWatermark`).
- `Chart.restoreVisibleRange` now handles edge cases where the chart has few visible records.
- Chart navigation: the timeframe picker and toolbar drop-down toggle no longer misbehave (`TimeFramePicker`, `ToolbarDropDownButton`).
- Incorrect take-profit / stop-loss label behavior on the chart (`PositionTPSL`, `STTP`).
- Chart-type selector failing to open on Chrome (`Toolbar`, `ToolbarDropDownButton`).
- Incorrect chart behavior while the chart is inactive or backgrounded (`Chart`).
- Mobile chart lag during history scrolling (`Chart`, `Pane`, `HorizontalAxis`, `RefreshOptimizer`).
- Duplicated indicator title "frames" on the chart (`Chart`).
- Assorted mobile chart-behavior fixes across dialogs, context menu, instrument search, and toolbar (`Chart`, `Dialog`, `ContextMenu`, `InstrumentSearch`, `Toolbar`).

## [3.1.10] - 2026-05-18

### Fixed

- Minor bug fixes and improvements.

## [3.1.9] - 2026-05-15

### Fixed

- Bar replay now preserves trailing future-projection placeholder bars instead of cutting them when replay engages, so forward-projecting indicators (e.g. composite cycle forecasts) keep their future slots and continue plotting ahead of the replay cursor (`ReplayModeManager`).

## [3.1.8] - 2026-05-15

### Fixed

- Minor bug fixes and improvements.

## [3.1.7] - 2026-05-14

### Added

- Right-click context-menu item **"Move to price pane"** for indicators (`moveToPrice`). One-click promotion of a custom-pane indicator onto the primary pane as an overlay — creates a dedicated `VerticalScale` with `leftAxisVisible = true` so the indicator's axis labels are drawn, migrates plots, rebuilds the title bar, and removes the source pane when it becomes empty. Reverse direction reuses the existing **"Separate pane bottom"** (`unmergeDown`), which already detaches a primary-pane overlay back into its own pane and disposes the custom scale. Closes the long-standing gap that forced consumers to ship their own "own pane ↔ price overlay" UI toggle (`Indicator`, `IndicatorContextMenu`, `IndicatorContextMenu.html`, en/uk localizations).
- `docs/api/data-adapters.md`: new "Search modal: install hooks before chart construction" section documenting the `InstrumentSearch` constructor-timing race — installing `Instrument.filter`/`filterById` after `new FintaChart.Chart(...)` may produce a no-op modal.

### Changed

- `docs/api/instrument.md`: `Instrument.filter` first parameter renamed `symbol` → `query`; description now states the toolbar modal matches against both `instrument.symbol` and `instrument.company`.
- `examples/html/15-instrument-search/`: restructured so `Instrument.filter` and `Instrument.filterById` are installed before chart construction (matching the documented safe pattern). `chart.exchanges` stays after the constructor (per-instance).

### Fixed

- Toolbar search modal now matches the query against both `instrument.symbol` and `instrument.company`. Previously only `symbol` was checked, so backends returning instruments by company name (e.g. typing "Apple" → `AAPL`, `0R2V`, `603020`) silently rendered zero results (`InstrumentSearch`).
- Text overlap in the instrument search modal; the search window has been widened to prevent clipping.
- `TypeError: Cannot read properties of null (reading 'appendChild')` when adding an indicator to a freshly-created pane via `Chart.addIndicatorInNewPane(...)` or `Pane.addIndicator(...)`. `Indicator.placeOnPane` now drives `chart.InitializeVisualDimensions()` and `pane.refreshScaleAsync()` on the new pane, mirroring the standard `Indicator.addPane()` bring-up, so the pane's title container is materialized before `initPaneTitle()` runs.

## [3.1.6] - 2026-05-13

### Fixed

- Minor bug fixes and improvements.

## [3.1.5] - 2026-05-12

### Added

- `Indicator.bindToVerticalScale(verticalScale)` — public helper for overlay indicators to render on the price pane against their own y-axis (cycle composites, oscillators, ML signals).
- New example `examples/html/17-overlay-indicator-with-own-axis/` showing the integration recipe on a normalized cycle composite overlaid on price.

### Changed

- `Indicator.dispose()` now removes a custom `verticalScale` and triggers a chart relayout when `_isCustomScale` is set, not just for built-in Volume.
- `Indicator.unmerge()` now strips a custom `verticalScale` when moving an overlay indicator into its own pane via the context menu, and reassigns plots to the default scale.
- Resolved `TypeError: Cannot read properties of null (reading 'appendChild')` when opening settings dialog for custom indicators by ensuring dialog panes are initialized before appending controls.
- Improved `ColorPicker` initialization to wait for DOM attachment using `MutationObserver`, preventing crashes in delayed rendering scenarios.
- Scoped bundled CSS selectors for `[type="checkbox"]` to prevent aggressive styling of elements outside the chart container.
- Fullscreen mode support via the toolbar.
- `Indicator.isOverlay` property is now immutable after construction to ensure pane/scale stability.

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

[3.1.12]: https://github.com/fintatech/fintachart/releases/tag/v3.1.12
[3.1.11]: https://github.com/fintatech/fintachart/releases/tag/v3.1.11
[3.1.10]: https://github.com/fintatech/fintachart/releases/tag/v3.1.10
[3.1.9]: https://github.com/fintatech/fintachart/releases/tag/v3.1.9
[3.1.8]: https://github.com/fintatech/fintachart/releases/tag/v3.1.8
[3.1.7]: https://github.com/fintatech/fintachart/releases/tag/v3.1.7
[3.1.6]: https://github.com/fintatech/fintachart/releases/tag/v3.1.6
[3.1.5]: https://github.com/fintatech/fintachart/releases/tag/v3.1.5
[3.1.4]: https://github.com/fintatech/fintachart/releases/tag/v3.1.4
[3.1.3]: https://github.com/fintatech/fintachart/releases/tag/v3.1.3
[3.1.2]: https://github.com/fintatech/fintachart/releases/tag/v3.1.2
[3.1.1]: https://github.com/fintatech/fintachart/releases/tag/v3.1.1
[3.1.0]: https://github.com/fintatech/fintachart/releases/tag/v3.1.0
