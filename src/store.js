import { observable, computed } from 'mobx'

class Game {
  static create = () => new Game()
  PLAYER1_SYMBOL = 'X'
  PLAYER2_SYMBOL = 'O'
  winningCombos = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ]
  currentPlayer = 'X'
  @observable cells = ['', '', '', '', '', '', '', '', '']
  @computed get winner () {
    const { PLAYER1_SYMBOL, PLAYER2_SYMBOL, winningCombos } = this
    const winningCombo = (combo, player) => combo.every(_ => this.cells[_] === player)
    const winner = winningCombos.reduce((winner, combo) => {
      if (winner)
        return winner
      else if (winningCombo(combo, PLAYER1_SYMBOL))
        return PLAYER1_SYMBOL
      else if (winningCombo(combo, PLAYER2_SYMBOL))
        return PLAYER2_SYMBOL
      else
        return ''
    }, '')
    return winner
  }
  resetGame = () => {
    this.cells = ['', '', '', '', '', '', '', '', '']
    this.currentPlayer = 'X'
  }
  handleMove (index) {
    const { currentPlayer, PLAYER1_SYMBOL, PLAYER2_SYMBOL, winner } = this
    const isNoWinner = winner === ""
    const isEmptySquare = game.cells[index] === ""
    const switchCurrentPlayer = () =>
      game.currentPlayer = currentPlayer === PLAYER1_SYMBOL ? PLAYER2_SYMBOL : PLAYER1_SYMBOL

    if (isNoWinner && isEmptySquare) {
      game.cells[index] = currentPlayer
      switchCurrentPlayer()
    }
  }
}

const game = Game.create()

export default game
