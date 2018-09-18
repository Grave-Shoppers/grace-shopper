const router = require('express').Router()
const { Cart, Product } = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//ADMIN ROUTE
router.get('/all', async (req, res, next) => {
  try {
    const orders = await Cart.findAll({
      where: {
        status: { [Op.ne]: 'open'}
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/all/:id', async (req, res, next) => {
  try {
    const orderId = req.params.id
    const orders = await Cart.findAll({
      where: {
        id: orderId,
        status: { [Op.ne]: 'open' }
      },
      include: [ Product ]
    })
    res.json(orders)
  } catch (err) {
    console.error(err)
  }
 })

 router.put('/all:id', async (req, res, next) => {
   try {
     const orderId = req.params.id
     const order = await Cart.findAll({
       where: { id: orderId},
       include: [Product]
     })
     const updatedOrder = await order.updatedOrder({...req.body})
     res.json(updatedOrder)
   } catch (err) {
     next(err)
   }
 })

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


