/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Cart from './cart'
import store from '../store'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('Cart', () => {
  let cart

  beforeEach(() => {
    cart = shallow(<Cart store={store} />)
  })

  it('renders empty cart', () => {
    console.info('------cart------:', cart)
    expect(cart.find('your-cart')[0].text()).to.be.equal('Your Cart Is Empty')
    // expect(cart.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
