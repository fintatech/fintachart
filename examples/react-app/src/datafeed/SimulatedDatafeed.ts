/**
 * SimulatedDatafeed
 * -----------------
 * Extends FintaChart.DatafeedBase so that primary-instrument switches AND
 * "Compare instrument" go through the same pipeline (clearBarDataRows +
 * appendInstrumentBars + BARS_SETTED + refreshIndicators + preserveAutoScaling).
 *
 * Also runs a 250 ms L1 tick loop for the primary instrument only, with
 * automatic stop/restart on primary reload so ticks never overwrite freshly
 * loaded bars with stale prices.
 */

import { findInstrument, type InstrumentWithSeed } from '../data/instruments';

const TICK_INTERVAL_MS = 250;

export class SimulatedDatafeed extends FintaChart.DatafeedBase {
  private readonly _latencyMs: number;
  private _chart: FintaChart.Chart | null = null;
  private _lastPrice = 0;
  private _tickTimer: ReturnType<typeof setInterval> | null = null;
  private _refreshPending = false;

  constructor(latencyMs = 1500) {
    super();
    this._latencyMs = latencyMs;
  }

  override send(request: FintaChart.IRequest): void {
    super.send(request);

    const barsRequest = request as FintaChart.IBarsRequest;
    const chart = barsRequest.chart!;
    this._chart = chart;

    const targetInstrument = barsRequest.instrument || chart.instrument;
    const inst = findInstrument(targetInstrument.symbol);
    const count = barsRequest.count || 500;
    const isPrimary =
      !barsRequest.instrument ||
      barsRequest.instrument.symbol === chart.instrument.symbol;

    if (isPrimary) this._stopTicks();

    this._generateHistory(inst, chart.timeFrame, count).then(bars => {
      if (!this.isBusy(barsRequest)) return;

      (this as unknown as {
        onCompleteRequest: (r: FintaChart.IBarsRequest, b: FintaChart.IBar[]) => void;
      }).onCompleteRequest(barsRequest, bars);

      if (isPrimary && bars.length > 0) {
        this._lastPrice = bars[bars.length - 1].close;
        this._startTicks();
      }
    });
  }

  override dispose(): void {
    this._stopTicks();
    this._chart = null;
    super.dispose();
  }

  private _startTicks(): void {
    this._stopTicks();
    this._tickTimer = setInterval(() => this._tick(), TICK_INTERVAL_MS);
  }

  private _stopTicks(): void {
    if (this._tickTimer) {
      clearInterval(this._tickTimer);
      this._tickTimer = null;
    }
  }

  private _tick(): void {
    const chart = this._chart;
    if (!chart) return;

    const volatility = this._lastPrice * 0.0002;
    this._lastPrice = Math.max(0.001, this._lastPrice + (Math.random() - 0.48) * volatility);
    const volume = Math.floor(Math.random() * 50) + 1;
    this._processTick(chart, this._lastPrice, volume, Date.now());
  }

  private _processTick(chart: FintaChart.Chart, price: number, volume: number, timestamp: number): void {
    const rows = chart.barDataRows();
    if (!rows || (rows.open as unknown as { values: unknown[] }).values.length === 0) return;

    const lastBar: FintaChart.IBar = {
      open: rows.open.lastValue as number,
      high: rows.high.lastValue as number,
      low: rows.low.lastValue as number,
      close: rows.close.lastValue as number,
      volume: rows.volume.lastValue as number,
      date: rows.date.lastValue as Date,
    };

    const currentBarStart = lastBar.date.getTime();
    const nextBarStart = currentBarStart + chart.timeInterval;

    if (timestamp >= nextBarStart) {
      let barStart = nextBarStart;
      while (timestamp >= barStart + chart.timeInterval) barStart += chart.timeInterval;

      const bar: FintaChart.IBar = {
        date: new Date(barStart),
        open: price, high: price, low: price, close: price, volume,
      };

      const shouldAutoScroll =
        typeof chart.horizontalScale.lastVisibleRecord === 'number' &&
        chart.horizontalScale.lastVisibleRecord >= chart.recordsCount - 1;

      chart.appendBars(bar);

      if (shouldAutoScroll) {
        chart.horizontalScale.firstVisibleRecord = chart.horizontalScale.firstVisibleIndex + 1;
        chart.horizontalScale.lastVisibleRecord = chart.horizontalScale.lastVisibleIndex + 1;
        chart.horizontalScale.applyAutoScroll(FintaChart.DataRowsUpdateKind.NEW_BAR);
      }

      this._scheduleRefresh(chart, (chart.primaryPane as unknown as { moveKind: string }).moveKind === 'autoscaled');
    } else {
      rows.close.updateLast(price);
      rows.volume.updateLast(lastBar.volume + volume);
      rows.high.updateLast(Math.max(price, lastBar.high));
      rows.low.updateLast(Math.min(price, lastBar.low));
      chart.invokeValueChanged(FintaChart.ChartEvent.LAST_BAR_UPDATED, lastBar);
      this._scheduleRefresh(chart);
    }
  }

  private _scheduleRefresh(chart: FintaChart.Chart, autoScale?: boolean): void {
    if (this._refreshPending) return;
    this._refreshPending = true;
    requestAnimationFrame(() => {
      chart.refreshAsync(autoScale);
      this._refreshPending = false;
    });
  }

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
