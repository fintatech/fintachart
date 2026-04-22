# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[3.1.1]: https://github.com/fintatech/fintachart/releases/tag/v3.1.1
[3.1.0]: https://github.com/fintatech/fintachart/releases/tag/v3.1.0
