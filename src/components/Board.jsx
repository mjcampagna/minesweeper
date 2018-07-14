import React from 'react';

import Loader from './Loader.jsx';

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: null,
			gridSize: 10
		}
	}

	generateNewBoard(size) {
		let board = [];
		for ( let y = 0; y < size; y++ ) {
			board.push(Array.from(Array(size).fill({
				bomb: false,
				display: 0,
				near: 0,
				revealed: false
			})));
		}
		this.setState({
			board: board
		});
	}

	renderLoading() {
		return <Loader />;
	}

	renderBoard() {
		return (
			<ul id="board">
				{this.state.board.map( (row, y) => (
					<li key={y} className="row"><ul>
						{row.map( (col, x) => (
							<li key={x} className="col">
								<button type="button" data-row={y} data-col={x}>
									{col.display}
								</button>
							</li>
						))}
					</ul></li>
				))}
			</ul>
		)
	}

	componentDidMount() {
		this.generateNewBoard( this.state.gridSize );
	}

	render() {
		if ( this.state.board === null ) {
			return this.renderLoading();
		} else {
			return this.renderBoard();
		}
	}
}