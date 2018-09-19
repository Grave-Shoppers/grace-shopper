/* global describe beforeEach it */
const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')
const User = db.model('user')
describe('Cart routes', () => {
  const codysEmail = 'cody@puppybook.com'
  beforeEach(() => {
    return db.sync({ force: true })
  })
  beforeEach(() => {
    return User.create({
      email: codysEmail
    })
  })
  describe('/api/cart/:id', () => {
    beforeEach(() => {
      return Cart.create({
        status: 'open'
      })
    })
    it('GET /api/cart/:cartId', async () => {
      const res = await request(app)
        .get(`/api/cart/1`)
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].status).to.be.equal('open')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
