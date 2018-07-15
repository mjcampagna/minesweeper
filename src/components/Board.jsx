import React from 'react';

import Loader from './Loader.jsx';
import Game from './gameLogic.js';

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.game = null;
		this.state = {
			board: null,
			bombs: 10,
			gridSize: 10
		}
	}

	componentDidMount() {
		this.game = new Game(
			this.state.gridSize,
			this.state.bombs
		);
		const board = this.game.generateNewBoard( this.state.gridSize );
		this.setState({
			board: board
		});
	}

	handleClickOnCell(event) {
		let board = this.state.board;
		const target = event.target;
		const row = parseInt(target.getAttribute('data-row'), 10);
		const col = parseInt(target.getAttribute('data-col'), 10);

		board = this.game.playerAction(event, board, row, col);
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
					<li key={'row' + y} className="row"><ul>
						{row.map( (col, x) => (
							<li key={'col' + x} className="col">
								<button type="button" data-row={y} data-col={x} 
									className={[
										col.revealed ? null : 'hidden', 
										col.flag ? 'flagged' : null
									].join(' ')} 
									onClick={(e) => this.handleClickOnCell(e)} 
								>
									{col.bomb ? 'B' : col.near}
								</button>
							</li>
						))}
					</ul></li>
				))}
			</ul>
		)
	}

	render() {
		if ( this.state.board === null ) {
			return this.renderLoading();
		} else {
			return this.renderBoard();
		}
	}
}