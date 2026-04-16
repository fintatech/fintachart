/**
 * Simulated datafeed implementing FintaChart.IDatafeedBase.
 *
 * Generates random OHLCV history when the chart requests bars.
 * In a real app, send() would call your REST API.
 */

import { findInstrument, type InstrumentWithSeed } from '../data/instruments';

export class SimulatedDatafeed implements FintaChart.IDatafeedBase {
  private _latencyMs: number;

  constructor(latencyMs = 1500) {
    this._latencyMs = latencyMs;
  }

  send(request: FintaChart.IRequest): void {
    const barsRequest = request as FintaChart.IBarsRequest;
    const chart = barsRequest.chart!;
    const instrument = barsRequest.instrument || chart.instrument;
    const tf = chart.timeFrame;
    const inst = findInstrument(instrument.symbol);

    chart.showWaitingBar();

    this._generateHistory(inst, tf, 500).then(bars => {
      chart.dataContext.clearBarDataRows();
      chart.dataContext.appendBars(bars);
      chart.canLoadMoreBars = false;

      const total = bars.length;
      chart.firstVisibleRecord = Math.max(0, total - 100);
      chart.lastVisibleRecord = total + 20;

      chart.hideWaitingBar();
      chart.refreshAsync(true);
    });
  }

  cancel(): void {}
  isBusy(): boolean { return false; }
  dispose(): void {}
  notifyCompareError(): void {}

  private _generateHistory(
    inst: InstrumentWithSeed,
    tf: FintaChart.ITimeFrame,
    count: number,
  ): Promise<FintaChart.IBar[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const bars: FintaChart.IBar[] = [];
        let price = inst.seedPrice;
        const volatility = inst.seedPrice * 0.001;
        const now = Date.now();

        const periodicityMs: Record<string, number> = {
          [FintaChart.Periodicity.MINUTE]: 60_000,
          [FintaChart.Periodicity.HOUR]: 3_600_000,
          [FintaChart.Periodicity.DAY]: 86_400_000,
        };
        const barMs = tf.interval * (periodicityMs[tf.periodicity] || 60_000);
        const startTime = now - count * barMs;

        for (let i = 0; i < count; i++) {
          const open = price;
          const c1 = (Math.random() - 0.48) * volatility;
          const c2 = (Math.random() - 0.48) * volatility;
          const close = open + c1;
          const high = Math.max(open, close) + Math.abs(c2);
          const low = Math.min(open, close) - Math.abs(c2) * 0.8;

          bars.push({
            date: new Date(startTime + i * barMs),
            open, high, low, close,
            volume: Math.floor(Math.random() * 200) + 50,
          });
          price = close;
        }

        resolve(bars);
      }, this._latencyMs);
    });
  }
}
