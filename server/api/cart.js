const router = require('express').Router()
const Cart = require('../db/models/cart')

module.exports = router

router.get('/', async (req, res, next) => {
  const userId = req.user.id
  try {
    const products = await Cart.findAll({ where: { userId } })
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const userId = req.user.id
  const productId = req.params.id
  try {
    await Cart.create({ userId, productId, quantity: 1 })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  const userId = req.user.id
  const productId = req.params.productId
  try {
    const product = await Cart.findAll({
      where: {
        userId,
        productId
      }
    })
    const updatedCart = await product.update({ quantity: req.body.quantity })
    res.send(updatedCart)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  const userId = req.user.id
  const productId = req.params.productId
  try {
    await Cart.destroy({
      where: {
        userId,
        productId
      }
    })
  } catch (error) {
    next(error)
  }
})
