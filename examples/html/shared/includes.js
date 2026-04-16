/**
 * Dynamic loader for Trading Chart Designer framework dependencies.
 * Include this script FIRST, before FintaChart.min.js.
 *
 * Usage:
 *   <script src="../shared/includes.js"></script>
 *   <!-- all framework + TCD scripts are injected automatically -->
 */

(function () {
  var PKG = '../node_modules/@fintatech/fintachart';

  var scripts = [
    PKG + '/scripts/frameworks/jquery.min.js',
    PKG + '/scripts/frameworks/jquery-ui.min.js',
    PKG + '/scripts/frameworks/jquery.ui.touch-punch.min.js',
    PKG + '/scripts/frameworks/moment.min.js',
    PKG + '/scripts/frameworks/Intl.min.js',
    PKG + '/scripts/frameworks/detectizr.min.js',
    PKG + '/scripts/frameworks/dom-to-image-more.min.js',
    PKG + '/scripts/frameworks/i18nextXHRBackend.min.js',
    PKG + '/scripts/frameworks/jquery-i18next.min.js',
    PKG + '/scripts/frameworks/bootstrap.v3.datetimepicker.min.js',
  ];

  for (var i = 0; i < scripts.length; i++) {
    document.write('<script src="' + scripts[i] + '"><\/script>');
  }

  // Main bundle (after frameworks)
  document.write('<script src="' + PKG + '/scripts/FintaChart.min.js"><\/script>');
})();
