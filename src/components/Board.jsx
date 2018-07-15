import React from 'react';

import Loader from './Loader.jsx';
import Game from './gameLogic.js';

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.game = null;
		this.state = {
			board: null
		}
	}

	componentDidMount() {
		this.newGame();
	}

	newGame() {
		this.game = new Game(
			this.props.gridSize,
			this.props.bombs
		);
		const board = this.game.generateNewBoard( this.props.gridSize );
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
		}, () => {
			if ( this.game.isGameOver ) {
				this.props.gameOver();
			}
		});
	}

	renderLoading() {
		return <Loader />;
	}

	renderBoard() {
		return (
			<React.Fragment>
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
					{this.props.isGameOver && <li id="overlay"></li>}
				</ul>
			</React.Fragment>
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