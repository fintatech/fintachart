import { createRoot } from 'react-dom/client';
import { App } from './App';

// Note: StrictMode is disabled because FintaChart uses jQuery
// and does not support double-invoked effects (mount → unmount → mount).
createRoot(document.getElementById('root')!).render(<App />);
