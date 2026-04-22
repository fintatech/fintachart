/**
 * Typed instrument catalog.
 * In a real app, this would come from a REST API.
 */

export interface InstrumentWithSeed extends FintaChart.IInstrument {
  seedPrice: number;
}

export const instruments: InstrumentWithSeed[] = [
  { id: '1', symbol: 'EUR/USD', exchange: 'FOREX', type: 'FOREX', company: 'Euro / US Dollar',         tickSize: 0.00001, seedPrice: 1.0850 },
  { id: '2', symbol: 'GBP/USD', exchange: 'FOREX', type: 'FOREX', company: 'British Pound / US Dollar', tickSize: 0.00001, seedPrice: 1.2650 },
  { id: '3', symbol: 'USD/JPY', exchange: 'FOREX', type: 'FOREX', company: 'US Dollar / Japanese Yen',  tickSize: 0.001,   seedPrice: 155.50 },
  { id: '4', symbol: 'EUR/GBP', exchange: 'FOREX', type: 'FOREX', company: 'Euro / British Pound',      tickSize: 0.00001, seedPrice: 0.8580 },
  { id: '5', symbol: 'AAPL',    exchange: 'NASDAQ', type: 'Stock', company: 'Apple Inc.',                tickSize: 0.01,    seedPrice: 195.00 },
  { id: '6', symbol: 'MSFT',    exchange: 'NASDAQ', type: 'Stock', company: 'Microsoft Corp.',           tickSize: 0.01,    seedPrice: 420.00 },
  { id: '7', symbol: 'BTC/USD', exchange: 'CRYPTO', type: 'Crypto', company: 'Bitcoin / US Dollar',      tickSize: 0.01,    seedPrice: 67500.00 },
  { id: '8', symbol: 'ETH/USD', exchange: 'CRYPTO', type: 'Crypto', company: 'Ethereum / US Dollar',     tickSize: 0.01,    seedPrice: 3400.00 },
];

export const exchanges = ['FOREX', 'NASDAQ', 'CRYPTO'];

export function findInstrument(symbol: string): InstrumentWithSeed {
  return instruments.find(i => i.symbol === symbol) || instruments[0];
}

export function findInstrumentById(id: string): InstrumentWithSeed {
  return instruments.find(i => i.id === id) || instruments[0];
}

export function filterInstruments(query: string, exchanges?: string[]): InstrumentWithSeed[] {
  const q = (query || '').toLowerCase();
  const filterSet = exchanges && exchanges.length ? new Set(exchanges) : null;
  return instruments.filter(inst => {
    const matchesQuery = !q
      || inst.symbol.toLowerCase().includes(q)
      || (inst.company || '').toLowerCase().includes(q);
    const matchesExchange = !filterSet || filterSet.has(inst.exchange);
    return matchesQuery && matchesExchange;
  });
}
