/**
 * Shared file-based data adapter for all examples.
 * Uses offline CSV market data bundled with the npm package.
 *
 * Provides:
 *   - fileDatafeedConfig.instruments  — instrument definitions
 *   - fileDatafeed                    — initialized FileDatafeed instance
 */

'use strict';

var PKG = '../node_modules/@fintatech/fintachart';

var fileDatafeedConfig = {
  instruments: {

    'EUR/GBP': {
      instrument: {
        symbol: 'EUR/GBP',
        exchange: 'FOREX',
        type: 'FOREX',
        company: '',
        tickSize: 0.00001,
      },
      info: [
        { interval: 1,  periodicity: FintaChart.Periodicity.MINUTE,  path: PKG + '/data/offline-market-history/EUR_GBP/Minute/1.csv' },
        { interval: 5,  periodicity: FintaChart.Periodicity.MINUTE,  path: PKG + '/data/offline-market-history/EUR_GBP/Minute/5.csv' },
        { interval: 15, periodicity: FintaChart.Periodicity.MINUTE,  path: PKG + '/data/offline-market-history/EUR_GBP/Minute/15.csv' },
        { interval: 1,  periodicity: FintaChart.Periodicity.HOUR, path: PKG + '/data/offline-market-history/EUR_GBP/Hour/1.csv' },
        { interval: 4,  periodicity: FintaChart.Periodicity.HOUR, path: PKG + '/data/offline-market-history/EUR_GBP/Hour/4.csv' },
        { interval: 1,  periodicity: FintaChart.Periodicity.DAY, path: PKG + '/data/offline-market-history/EUR_GBP/Day/1.csv' },
        { interval: 1,  periodicity: FintaChart.Periodicity.WEEK, path: PKG + '/data/offline-market-history/EUR_GBP/Weekly/1.csv' },
        { interval: 1,  periodicity: FintaChart.Periodicity.MONTH, path: PKG + '/data/offline-market-history/EUR_GBP/Monthly/1.csv' },
        { interval: 1,  periodicity: FintaChart.Periodicity.YEAR, path: PKG + '/data/offline-market-history/EUR_GBP/Yearly/1.csv' },
      ],
    },

    'EUR/CAD': {
      instrument: {
        symbol: 'EUR/CAD',
        exchange: 'FOREX',
        type: 'FOREX',
        company: '',
        tickSize: 0.00001,
      },
      info: [
        { interval: 1,  periodicity: FintaChart.Periodicity.MINUTE,  path: PKG + '/data/offline-market-history/EUR_CAD/Minute/1.csv' },
        { interval: 5,  periodicity: FintaChart.Periodicity.MINUTE,  path: PKG + '/data/offline-market-history/EUR_CAD/Minute/5.csv' },
        { interval: 15, periodicity: FintaChart.Periodicity.MINUTE,  path: PKG + '/data/offline-market-history/EUR_CAD/Minute/15.csv' },
        { interval: 1,  periodicity: FintaChart.Periodicity.HOUR, path: PKG + '/data/offline-market-history/EUR_CAD/Hour/1.csv' },
        { interval: 4,  periodicity: FintaChart.Periodicity.HOUR, path: PKG + '/data/offline-market-history/EUR_CAD/Hour/4.csv' },
        { interval: 1,  periodicity: FintaChart.Periodicity.DAY, path: PKG + '/data/offline-market-history/EUR_CAD/Day/1.csv' },
        { interval: 1,  periodicity: FintaChart.Periodicity.WEEK, path: PKG + '/data/offline-market-history/EUR_CAD/Weekly/1.csv' },
        { interval: 1,  periodicity: FintaChart.Periodicity.MONTH, path: PKG + '/data/offline-market-history/EUR_CAD/Monthly/1.csv' },
        { interval: 1,  periodicity: FintaChart.Periodicity.YEAR, path: PKG + '/data/offline-market-history/EUR_CAD/Yearly/1.csv' },
      ],
    },
  },

  externalDataFormatter: new FintaChart.Formatters.ExternalDataFormatterCsv(),
};

var fileDatafeed = new FintaChart.FileDatafeed(fileDatafeedConfig);
