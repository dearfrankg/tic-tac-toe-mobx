import expect from 'expect'
import game from '../store'

const isWinnerForEveryWinningCombo = (playerToTest) => {
  return game.winningCombos.reduce((status, combo) => {

    // bail if we already failed
    if (!status) return status

    // setup new game scenario
    game.cells = ['', '', '', '', '', '', '', '', '']
    game.currentPlayer = playerToTest

    // take 2 of 3 winning combo moves
    game.cells[combo[0]] = playerToTest
    game.cells[combo[1]] = playerToTest

    // take the third winning combo moves
    game.handleMove(combo[2])

    // expect a win
    const result = game.winner === playerToTest
    return result
  }, true)
}

describe('game store', () => {
  describe('with no action', () => {
    it('should contain initial state', () => {
      const actual = {
        PLAYER1_SYMBOL: game.PLAYER1_SYMBOL,
        PLAYER2_SYMBOL: game.PLAYER2_SYMBOL,
        winningCombos: game.winningCombos,
        currentPlayer: game.currentPlayer,
        cells: game.cells.toJS()
      }
      const expected = {
        PLAYER1_SYMBOL: 'X',
        PLAYER2_SYMBOL: 'O',
        winningCombos: [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ],
        currentPlayer: 'X',
        cells: ['', '', '', '', '', '', '', '', ''],
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('#resetGame', () => {
    it('should restore initial state', () => {
      game.currentPlayer = 'O'
      game.cells[1] = 'X'
      game.resetGame()
      const actual = {
        currentPlayer: game.currentPlayer,
        cells: game.cells.toJS()
      }
      const expected = {
        currentPlayer: 'X',
        cells: ['', '', '', '', '', '', '', '', ''],
      }
      expect(actual).toEqual(expected)
    })
  })

  describe('#handleMove', () => {
    it('should mark cell and switch player', () => {
      game.handleMove(0)
      const actual = {
        currentPlayer: game.currentPlayer,
        cells: game.cells.toJS()
      }
      const expected = {
        currentPlayer: 'O',
        cells: ['X', '', '', '', '', '', '', '', ''],
      }
      expect(actual).toEqual(expected)
    })

    it('should win on every winning combo for player X', () => {
      const actual = isWinnerForEveryWinningCombo('X')
      const expected = true
      expect(actual).toEqual(expected)
    })

    it('should win on every winning combo for player O', () => {
      const actual = isWinnerForEveryWinningCombo('O')
      const expected = true
      expect(actual).toEqual(expected)
    })

    it('should not write over the other players move', () => {
      game.currentPlayer = 'O'
      game.cells = ['X', '', '', '', '', '', '', '', '']
      game.handleMove(0)
      const actual = {
        currentPlayer: game.currentPlayer,
        cells: game.cells.toJS()
      }
      const expected = {
        currentPlayer: 'O',
        cells: ['X', '', '', '', '', '', '', '', ''],
      }
      expect(actual).toEqual(expected)
    })
  })
})
