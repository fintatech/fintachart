/**
 * React wrapper for FintaChart.
 *
 * Creates the chart on mount, destroys on unmount.
 * Re-creates when the instrument changes.
 * Manages L1 tick simulation lifecycle.
 */

import { useEffect, useRef } from 'react';
import { SimulatedDatafeed } from '../datafeed/SimulatedDatafeed';
import { startTickSimulation } from '../datafeed/tick-processor';
import { findInstrument, filterInstruments, exchanges } from '../data/instruments';

interface ChartProps {
  instrument: FintaChart.IInstrument;
}

export function Chart({ instrument }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<FintaChart.Chart | null>(null);
  const tickRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Resource paths ---
    FintaChart.ResourcePath.localization = 'node_modules/@fintatech/fintachart/localization/';
    FintaChart.ResourcePath.htmlDialogs = 'node_modules/@fintatech/fintachart/htmldialogs/';
    FintaChart.SvgLoader.path = 'node_modules/@fintatech/fintachart/img/svg-icons/';

    // --- Datafeed ---
    const datafeed = new SimulatedDatafeed(1500);

    // --- Chart ---
    const chart = new FintaChart.Chart({
      container: containerRef.current,
      datafeed,
      instrument,
      timeFrame: { interval: 1, periodicity: FintaChart.Periodicity.MINUTE },
      theme: defaultTheme,
      showToolbar: true,
      showScrollbar: true,
      supportedTimeFrames: ['1 Minutes', '5 Minutes', '15 Minutes', '1 Hour'],
    });

    chartRef.current = chart;

    // --- Instrument search (via Instrument.filter static override) ---
    FintaChart.Instrument.filter = (symbol, filters) =>
      Promise.resolve(filterInstruments(symbol, filters?.[0]));

    FintaChart.Instrument.filterById = (id) =>
      Promise.resolve(findInstrument(id));

    chart.exchanges = () => exchanges;

    // --- Start L1 ticks after history loads ---
    const inst = findInstrument(instrument.symbol);
    const waitForData = setInterval(() => {
      if (chart.recordsCount > 0) {
        clearInterval(waitForData);

        // Seed from last bar
        const lastBar = chart.dataContext.bar(chart.recordsCount - 1);
        const seed = lastBar ? lastBar.close : inst.seedPrice;
        tickRef.current = startTickSimulation(chart, seed);
      }
    }, 500);

    // --- Cleanup ---
    return () => {
      clearInterval(waitForData);
      tickRef.current?.stop();
      tickRef.current = null;
      try { chart.dispose(); } catch (_) { /* already disposed */ }
      chartRef.current = null;
    };
  }, [instrument]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
