import React from 'react';

import Loader from './Loader.jsx';

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: null,
			bombs: 10,
			gridSize: 10
		}
	}

	randomizeCoordinate(gridSize) {
		return Math.floor( Math.random() * gridSize );
	}

	distributeBombs(board, bombs) {
		for ( var i = 0; i < bombs; i++ ) {
			const row = this.randomizeCoordinate(this.state.gridSize);
			const col = this.randomizeCoordinate(this.state.gridSize);
			if ( board[row][col].bomb === false ) {
				board[row][col].bomb = true;
			}
		}
		return board;
	}

	generateNewBoard(size) {
		let board = [];
		for ( let y = 0; y < size; y++ ) {
			let newArray = new Array(size);
			for ( let i = 0; i < newArray.length; i++ ) {
				newArray[i] = {
					bomb: false,
					near: 0,
					revealed: false
				};
			}
			board.push(newArray);
		}
		this.setState({
			board: this.distributeBombs(board, this.state.bombs)
		});
	}

	renderLoading() {
		return <Loader />;
	}

	renderBoard() {
		return (
			<ul id="board">
				{this.state.board.map( (row, y) => (
					<li key={'row' + y} className="row"><ul>
						{row.map( (col, x) => (
							<li key={'col' + x} className="col">
								<button type="button" data-row={y} data-col={x}>
									{col.bomb ? 'B' : col.near}
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