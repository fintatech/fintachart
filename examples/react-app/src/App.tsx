import { Chart } from './components/Chart';
import { instruments } from './data/instruments';

export function App() {
  return (
    <div style={{ height: '100vh' }}>
      <Chart instrument={instruments[0]} />
    </div>
  );
}
