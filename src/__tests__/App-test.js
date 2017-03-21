import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'mobx-react'
import { shallow, mount } from 'enzyme'
import { getSpecWrapper } from '../utils/unit'
import 'jest-enzyme';

import game from '../store'
import App, { GameBoard } from '../App'

const clickSequence = (wrapper, sequence) => {
  sequence.forEach(square =>
    getSpecWrapper(wrapper, 'box').at(square).simulate('click')
  )
}

describe('tic-tac-toe', () => {
  describe('render', () => {
    it('should render at target divq', () => {
      render(
        <Provider game={game} >
          <App />
        </Provider>, 
        document.createElement('div')
      )
    })
  })

  describe('the first move', () => {
    it('should render X', () => {
      game.resetGame()
      const wrapper = mount(<Provider game={game} ><App /></Provider>)
      clickSequence(wrapper, [0])
      const actual = getSpecWrapper(wrapper, 'game-board').text()
      const expected = 'X'
      expect(actual).toBe(expected)
    })
  })

  describe('multiple moves', () => {
    it('should alternate between player X and O', () => {
      game.resetGame()
      const wrapper = mount(<Provider game={game} ><App /></Provider>)
      clickSequence(wrapper, [0,1,2,3])
      const actual = getSpecWrapper(wrapper, 'game-board').text()
      const expected = 'XOXO'
      expect(actual).toBe(expected)
    })
  })

  describe('winning the game', () => {
    it('should be possible for player X', () => {
      game.resetGame()
      const wrapper = mount(<Provider game={game} ><App /></Provider>)
      clickSequence(wrapper, [0,3,1,4,2])
      const actual = getSpecWrapper(wrapper, 'winner').text()
      const expected = 'Player X wins!!'
      expect(actual).toBe(expected)
    })

    it('should be possible for player O', () => {
      game.resetGame()
      const wrapper = mount(<Provider game={game} ><App /></Provider>)
      clickSequence(wrapper, [0,3,1,4,8,5])
      const actual = getSpecWrapper(wrapper, 'winner').text()
      const expected = 'Player O wins!!'
      expect(actual).toBe(expected)
    })
  })

  describe('game reset', () => {
    it('should clear board and winner', () => {
      game.resetGame()
      const wrapper = mount(<Provider game={game} ><App /></Provider>)
      clickSequence(wrapper, [0,3,1,4,2])
      const hasWinnerBeingPlayerX = getSpecWrapper(wrapper, 'winner').text() === 'Player X wins!!'
      expect(hasWinnerBeingPlayerX).toBe(true)

      getSpecWrapper(wrapper, 'reset-game').simulate('click')

      const noWinner = getSpecWrapper(wrapper, 'winner').text() === ''
      const noMoves = getSpecWrapper(wrapper, 'game-board').text() === ''
      expect(noWinner).toBe(true)
      expect(noMoves).toBe(true)
    })
  })

  // describe('testing issues ', () => {
  //   xit('should work ;)', () => {
  //     //
  //     // trying to deal with HOC wrappers
  //     //
  //     const wrapper = mount(<Provider game={game} ><App /></Provider>)

  //     // ROUND1
  //     // use enzyme find method
  //     // FAIL: does not provide component props
  //     const app = wrapper.find(App)
  //     console.log('props', app.props());
  //     console.log('children.length', app.children().length);
      
  //     // ROUND2 
  //     // use getSpecWrapper (Eventbrite React Testing util)
  //     // success finds data-spec='app'
  //     let myApp = getSpecWrapper(wrapper, 'app')
  //     console.log('props', myApp.props());
  //     console.log('children.length', myApp.children().length);
  //   })
  // })
})
