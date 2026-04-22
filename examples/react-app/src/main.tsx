import { createRoot } from 'react-dom/client';
import { App } from './App';

// React.StrictMode is intentionally not enabled in this example for
// compatibility. Production builds are unaffected.
createRoot(document.getElementById('root')!).render(<App />);
