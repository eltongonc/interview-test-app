import React from 'react';
import { createRoot } from 'react-dom/client';

import './assets/style/root.scss';
import App from './components/App';

const container = document.getElementById('root');

const root = createRoot(container!);
root.render(<App />);
