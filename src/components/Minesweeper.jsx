import React from 'react';

import Board from './Board.jsx';

class Minesweeper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			games: 0,
			gameOver: false
		}
		this.handleGameOver = this.handleGameOver.bind(this);
	}

	handleGameOver() {
		this.setState({
			gameOver: true
		}, () => {
			const overlay = document.getElementById('overlay');
			if ( overlay ) {
				setTimeout((overlay) => {
					overlay.classList.add('hidden');
				}, 50, overlay);
			}
		});
	}

	render() {
		return (
			<div id="stage">
				<h1>Minesweeper</h1>
				<Board 
					gameOver={this.handleGameOver} 
					isGameOver={this.state.gameOver} 
				/>
			</div>
		)
	}
}

export default Minesweeper;