import React from 'react';

import Board from './Board.jsx';

class Minesweeper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<div id="stage">
				<Board />
			</div>
		)
	}
}

export default Minesweeper;