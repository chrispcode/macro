import { createRoot } from 'react-dom/client'

import Navbar from './components/Navbar';

export function bootstrap() {
  const domNode = document.getElementById('navbar-root');
  const root = createRoot(domNode);

  root.render(<Navbar />);
}