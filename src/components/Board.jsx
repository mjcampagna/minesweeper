import React from 'react';

import Loader from './Loader.jsx';

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: null,
			bombs: 10,
			gridSize: 10,
			totalRevealed: 0
		}
	}

	componentDidMount() {
		const board = this.generateNewBoard( this.state.gridSize );
		this.setState({
			board: board
		});
	}

	randomizeCoordinate(gridSize) {
		return Math.floor( Math.random() * gridSize );
	}

	nextTurn(board, row, col) {
		board = this.revealUninterestingNeighbors(board, row, col);
		this.setState({
			board: board
		})
	}

	gameOver() {
		console.log('BOOM!');
	}

	handleClickOnCell(event) {
		let board = this.state.board;
		const target = event.target;
		const row = parseInt(target.getAttribute('data-row'), 10);
		const col = parseInt(target.getAttribute('data-col'), 10);

		if ( board[row][col].bomb ) {
			if ( this.state.totalRevealed === 0 ) {
				board = this.generateNewBoard( this.state.gridSize );
				this.setState({
					board: board
				}, () => {
					this.nextTurn(board, row, col);
					return;
				});
			} else {
				this.gameOver();
			}
		}

		this.nextTurn(board, row, col);
	}

	revealUninterestingNeighbors(board, row, col) {
		if ( !board[row][col].revealed ) {
			board[row][col].revealed = true;
			this.setState({
				totalRevealed: this.state.totalRevealed + 1
			})
			for ( let r = row-1; r <= row+1; r++ ) {
				if ( board[r] ){
					for ( let c = col-1; c <= col+1; c++ ) {
						if ( board[r][c] ) {
							if ( board[row][col].near === 0 ) {
								board = this.revealUninterestingNeighbors(board, r, c);
							}
						}
					}
				}
			}	
		}
		return board;
	}

	distributeBombs(board, bombs) {
		for ( var i = 0; i < bombs; i++ ) {
			const row = this.randomizeCoordinate(this.state.gridSize);
			const col = this.randomizeCoordinate(this.state.gridSize);
			if ( board[row][col].bomb === false ) {
				board[row][col].bomb = true;
			} else {
				i--;
			}
		}
		return board;
	}

	findNeighboringBombs(board) {
		for ( let row = 0; row < this.state.gridSize; row++ ) {
			for ( let col = 0; col < this.state.gridSize; col++ ) {
				let near = board[row][col].near;
				near = board[row-1] && board[row-1][col] !== undefined && board[row-1][col].bomb ? near += 1 : near;
				near = board[row-1] && board[row-1][col+1] && board[row-1][col+1].bomb ? near += 1 : near;
				near = board[row][col+1] && board[row][col+1].bomb ? near += 1 : near;
				near = board[row+1] && board[row+1][col+1] && board[row+1][col+1].bomb ? near += 1 : near;
				near = board[row+1] && board[row+1][col] && board[row+1][col].bomb ? near += 1 : near;
				near = board[row+1] && board[row+1][col-1] && board[row+1][col-1].bomb ? near += 1 : near;
				near = board[row][col-1] && board[row][col-1].bomb ? near += 1 : near;
				near = board[row-1] && board[row-1][col-1] && board[row-1][col-1].bomb ? near += 1 : near;
				board[row][col].near = near;
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

		board = this.distributeBombs(board, this.state.bombs);
		board = this.findNeighboringBombs(board);
		return board;
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
									className={col.revealed ? null : 'hidden'} 
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