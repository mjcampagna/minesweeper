import 'normalize.css';
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Minesweeper from './components/Minesweeper.jsx';

ReactDOM.render(
	<Minesweeper />,
	document.getElementById('minesweeper')
);
