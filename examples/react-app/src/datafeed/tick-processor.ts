/**
 * Tick-to-bar aggregation for real-time updates.
 *
 * Same pattern as the Angular app's DataFeedBase._processTick():
 * - If tick time >= next bar boundary → chart.appendBars(newBar)
 * - If tick time is within current bar → update OHLCV via dataRows.updateLast()
 * - Batch refreshes via requestAnimationFrame
 */

let refreshPending = false;

function scheduleRefresh(chart: FintaChart.Chart, autoScale?: boolean) {
  if (refreshPending) return;
  refreshPending = true;
  requestAnimationFrame(() => {
    chart.refreshAsync(autoScale);
    refreshPending = false;
  });
}

function getLastBar(chart: FintaChart.Chart): FintaChart.IBar | null {
  const rows = chart.barDataRows();
  if (!rows || (rows.open as any).values.length === 0) return null;
  return {
    open: rows.open.lastValue as number,
    high: rows.high.lastValue as number,
    low: rows.low.lastValue as number,
    close: rows.close.lastValue as number,
    volume: rows.volume.lastValue as number,
    date: rows.date.lastValue as Date,
  };
}

function updateLastBar(chart: FintaChart.Chart, bar: FintaChart.IBar) {
  const rows = chart.barDataRows();
  rows.open.updateLast(bar.open);
  rows.high.updateLast(bar.high);
  rows.low.updateLast(bar.low);
  rows.close.updateLast(bar.close);
  rows.volume.updateLast(bar.volume);
  rows.date.updateLast(bar.date);
  chart.invokeValueChanged(FintaChart.ChartEvent.LAST_BAR_UPDATED, bar as any);
}

export function processTick(
  chart: FintaChart.Chart,
  price: number,
  volume: number,
  timestamp: number,
): void {
  const lastBar = getLastBar(chart);
  if (!lastBar) return;

  const currentBarStart = lastBar.date.getTime();
  const nextBarStart = currentBarStart + chart.timeInterval;

  if (timestamp >= nextBarStart) {
    // Calculate the correct bar start time
    let barStart = nextBarStart;
    while (timestamp >= barStart + chart.timeInterval) {
      barStart += chart.timeInterval;
    }

    const bar: FintaChart.IBar = {
      date: new Date(barStart),
      open: price,
      high: price,
      low: price,
      close: price,
      volume,
    };

    // Auto-scroll if viewing the latest bars
    const shouldAutoScroll =
      typeof chart.horizontalScale.lastVisibleRecord === 'number' &&
      chart.horizontalScale.lastVisibleRecord >= chart.recordsCount - 1;

    chart.appendBars(bar);

    if (shouldAutoScroll) {
      chart.horizontalScale.firstVisibleRecord = chart.horizontalScale.firstVisibleIndex + 1;
      chart.horizontalScale.lastVisibleRecord = chart.horizontalScale.lastVisibleIndex + 1;
      chart.horizontalScale.applyAutoScroll(FintaChart.DataRowsUpdateKind.NEW_BAR);
    }

    scheduleRefresh(chart, (chart.primaryPane as any).moveKind === 'autoscaled');
  } else {
    // Update current bar
    lastBar.close = price;
    lastBar.volume += volume;
    lastBar.high = Math.max(price, lastBar.high);
    lastBar.low = Math.min(price, lastBar.low);

    updateLastBar(chart, lastBar);
    scheduleRefresh(chart);
  }
}

/**
 * Start simulated L1 tick generation for an instrument.
 * Returns the interval ID for cleanup.
 */
export function startTickSimulation(
  chart: FintaChart.Chart,
  seedPrice: number,
  intervalMs = 250,
): { stop: () => void; getPrice: () => number } {
  let lastPrice = seedPrice;
  const tickVol = seedPrice * 0.0002;

  const timerId = setInterval(() => {
    lastPrice = Math.max(0.001, lastPrice + (Math.random() - 0.48) * tickVol);
    const volume = Math.floor(Math.random() * 50) + 1;
    processTick(chart, lastPrice, volume, Date.now());
  }, intervalMs);

  return {
    stop: () => clearInterval(timerId),
    getPrice: () => lastPrice,
  };
}
