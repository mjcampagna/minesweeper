import 'normalize.css';
import './style.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import Minesweeper from './components/Minesweeper.jsx';

createRoot(document.getElementById('minesweeper')).render(<Minesweeper />);
