/**
 * React wrapper for FintaChart.
 *
 * All tick lifecycle (start on primary load, stop on primary reload, never
 * touch compare bars) is encapsulated inside SimulatedDatafeed. This component
 * just: creates the chart on mount, wires the instrument-search override,
 * disposes on unmount.
 */

import { useEffect, useRef } from 'react';
import { SimulatedDatafeed } from '../datafeed/SimulatedDatafeed';
import { findInstrumentById, filterInstruments, exchanges } from '../data/instruments';

interface ChartProps {
  instrument: FintaChart.IInstrument;
}

export function Chart({ instrument }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<FintaChart.Chart | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Static paths for SVG icons / localization / html dialogs.
    FintaChart.ResourcePath.localization = 'node_modules/@fintatech/fintachart/localization/';
    FintaChart.ResourcePath.htmlDialogs = 'node_modules/@fintatech/fintachart/htmldialogs/';
    FintaChart.SvgLoader.path = 'node_modules/@fintatech/fintachart/img/svg-icons/';

    const datafeed = new SimulatedDatafeed(1500);

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

    // Instrument search overrides — these drive the toolbar's built-in picker
    // *and* the "Compare instrument" dialog. `filters` is the array of selected
    // exchange chips from the popup. filterById receives an instrument id
    // (e.g. '3'), not a symbol — use the id-based lookup.
    FintaChart.Instrument.filter = (symbol, filters) =>
      Promise.resolve(filterInstruments(symbol, filters));
    FintaChart.Instrument.filterById = (id) =>
      Promise.resolve(findInstrumentById(id));

    chart.exchanges = () => exchanges;

    return () => {
      try { chart.dispose(); } catch (_) { /* already disposed */ }
      chartRef.current = null;
    };
  }, [instrument]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
