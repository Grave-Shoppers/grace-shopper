const router = require('express').Router()
const { User, Cart, Product } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin === false) {
      res.send(404, 'You do not have access ')
    }
    const users = await User.findAll({
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user.isAdmin === false) {
      res.send(404, 'You do not have access ')
    }
    const id = req.params.id
    const user = await User.findById(id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (req.user.isAdmin === false) {
      res.send(404, 'You do not have access to that')
    }
    const id = req.params.id
    const deleted = await User.destroy({
      where: {
        id: id
      }
    })
    res.json(`User ${id} Deleted`)
  } catch (err) {
    next(err)
  }
})

router.get('/orders', async (req, res, next) => {
  try {
    if (req.user.isAdmin === false) {
      res.send(404, 'You do not have access to that')
    }
    const userId = req.user.id
    const orders = await Cart.findAll({
      where: {
        userId: userId,
        status: 'closed'
      },
      include: [Product]
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
      include: [Product]
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
