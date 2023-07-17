import { createRoot } from 'react-dom/client'

import Navbar from './components/Navbar';

function bootstrap() {
  const domNode = document.getElementById('navbar');
  const root = createRoot(domNode);

  root.render(<Navbar />);
}

export default bootstrap;