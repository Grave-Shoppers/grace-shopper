const router = require('express').Router()
const { Cart, Product } = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const orderId = req.params.id
    const order = await Cart.findAll({
      where: {
        id: orderId,
        status: { [Op.ne]: 'open' }
      },
      include: [ Product ]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const orderHistory = await Cart.getOrdersByUser(userId)
    res.json(orderHistory)
  } catch (err) {
    next(err)
  }
})

