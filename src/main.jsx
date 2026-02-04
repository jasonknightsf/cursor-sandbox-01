import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div>
      <h1>Cursor Sandbox</h1>
      <p>React is running.</p>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(<App />);