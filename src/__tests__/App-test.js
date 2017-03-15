import React from 'react'
import { shallow, mount, render } from 'enzyme'

import App from '../App'


//==========================================================
// Necessary BS
/*
 * Jest uses jsdom to create a browser environment.
 * JSDom doesn't however support window.matchMedia so you will have to create it yourself.
 * https://goo.gl/ewx3j3
 */
window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    }
}
//==========================================================


describe('App', () => {
  let props
  let component

  const getComponent = () => {
    if (!component) {
      component = mount(<App {...props} />)
    }
    return component
  }

  beforeEach(() => {
    props = {
      classes: {
        gameBoard: {},
        box: {}
      }
    }
    component = undefined
  })



  describe('rendering', () => {
    it('should have a header', function() {
      const actual = getComponent().find('header').length
      const expected = 1
      expect(actual).toBe(expected)
    })
    it('should have a GameBoard component', function() {
      const actual = getComponent().find('.gameBoard').length
      const expected = 1
      expect(actual).toBe(expected)
    })
    it('should have a footer', function() {
      const actual = getComponent().find('footer').length
      const expected = 1
      expect(actual).toBe(expected)
    })
  })
  describe('props', () => {
    it('should have a classes prop', function() {
      const actual = 'classes' in getComponent().props()
      const expected = true
      expect(actual).toBe(expected)
    })
  })










})
