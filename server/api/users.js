const router = require('express').Router()
const { User, Cart, Product } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/orders', async (req, res, next) => {
  try {
    const userId = req.user.id
    const orders = await Cart.findAll({
      where: {
        userId: userId,
        status: 'closed'
      },
      include: [ Product ]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/orders/:id', async (req, res, next) => {
  try {
    const orderId = req.params.id
    const order = await Cart.findAll({
      where: {
        id: orderId
      },
      include: [ Product ]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findAll({ where: { id } })
    const updatedUser = await user[0].update({ ...req.body })
    res.send(updatedUser)
  } catch (error) {
    next(error)
  }
})
