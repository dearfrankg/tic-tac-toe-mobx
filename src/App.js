import React from 'react'
import { observer } from "mobx-react"
import { Flex } from 'reflexbox'
import { inject } from 'mobx-react'
import injectSheet from 'react-jss'

@injectSheet(styles())
@inject('game') @observer
class GameBoard extends React.Component {
  render = () => {
    const { game, classes } = this.props
    return (
      <Flex className={[classes.gameBoard, 'gameBoard'].join(' ')} style={{boxSizing: 'unset'}} align='flex-start' wrap >
        { game.cells.map((cell, i) =>
          <div key={i} onClick={() => game.handleMove(i)} >
            <Flex className={classes.box} align='center' justify='center' >
              <span>{cell}</span>
            </Flex>
          </div>
        )}
      </Flex>
    )
  }
}

@injectSheet(styles())
@inject('game') @observer
export default class App extends React.Component {
  render () {
    const {classes, game} = this.props
    return (
      <div className='app'>
        <header style={{textAlign: 'center'}}>
          <h1>Tic Tac Toe</h1>
        </header>

        <GameBoard />

        <footer style={{textAlign: 'center'}}>
          <h2>{game.winner && `Player ${game.winner} wins!!`}</h2>
          <button onClick={game.resetGame}>New Game</button>
        </footer>
      </div>
    )
  }
}

function styles() {
  return {
    gameBoard: {
      width: 450,
      height: 450,
      border: '4px solid black',
      backgroundColor: 'limegreen',
      margin: '30px auto 0 auto',
    },
    box: {
      width: 150,
      height: 150,
      boxSizing: 'border-box',
      border: '4px solid black',
      fontSize: 100,
      cursor: 'pointer',
    }
  }
}
