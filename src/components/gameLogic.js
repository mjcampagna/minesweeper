export default class Game {
	constructor(gridSize, bombs) {
		this.isGameOver = false;
		this.gridSize = gridSize;
		this.bombs = bombs;
		this.totalRevealed = 0;
	}

	generateNewBoard(gridSize) {
		let board = [];
		for ( let y = 0; y < gridSize; y++ ) {
			let newArray = new Array(gridSize);
			for ( let i = 0; i < newArray.length; i++ ) {
				newArray[i] = {
					bomb: false,
					flag: false,
					near: 0,
					revealed: false
				};
			}
			board.push(newArray);
		}
		board = this.distributeBombs(board, this.bombs);
		board = this.findNeighboringBombs(board);
		return board;
	}

	randomizeCoordinate(gridSize) {
		return Math.floor( Math.random() * gridSize );
	}

	distributeBombs(board, bombs) {
		for ( var i = 0; i < bombs; i++ ) {
			const row = this.randomizeCoordinate(this.gridSize);
			const col = this.randomizeCoordinate(this.gridSize);
			if ( board[row][col].bomb === false ) {
				board[row][col].bomb = true;
			} else {
				i--;
			}
		}
		return board;
	}

	findNeighboringBombs(board) {
		for ( let row = 0; row < this.gridSize; row++ ) {
			for ( let col = 0; col < this.gridSize; col++ ) {
				let near = board[row][col].near;

				for ( let r = row-1; r <= row+1; r++ ) {
					if ( board[r] ){
						for ( let c = col-1; c <= col+1; c++ ) {
							if ( board[r][c] ) {
								near = board[r][c].bomb ? near += 1 : near;
							}
						}
					}
				}

				board[row][col].near = near;
			}
		}
		return board;
	}

	revealUninterestingNeighbors(board, row, col) {
		if ( !board[row][col].revealed ) {
			board[row][col].revealed = true;
			this.totalRevealed += 1;

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

	revealAllBombs(board) {
		for ( let row = 0; row < this.gridSize; row++ ) {
			for ( let col = 0; col < this.gridSize; col++ ) {
				if ( board[row][col].bomb ) {
					board[row][col].revealed = true;
				} else {
					board[row][col].near = '';
				}
				board[row][col].revealed = true;
			}
		}
		return board;
	}

	playerAction(event, board, row, col) {
		if ( !board[row][col].revealed ) {

			// toggle flag
			if ( event.ctrlKey || event.metaKey ) {
				board[row][col].flag = !board[row][col].flag;
				return board;
			}
			if ( !board[row][col].flag ) {

				// is bomb?
				if ( board[row][col].bomb ) {
					if ( this.totalRevealed === 0 ) {
						board = this.generateNewBoard( this.gridSize );
					} else {
						board = this.gameOver(board);
						return board;
					}
				}

				// reveal tile(s)
				board = this.revealUninterestingNeighbors(board, row, col);

			}
		}
		return board;
	}

	gameOver(board) {
		this.isGameOver = true;
		return this.revealAllBombs(board);
	}

} // Game 
