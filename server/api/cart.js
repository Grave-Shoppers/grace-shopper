const router = require('express').Router()
const Cart = require('../db/models/cart')
const User = require('../db/models/user')
const { CartProducts } = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  console.log(req.sessionID)
  const sessionId = req.sessionID
  let userId = req.user
  try {
    if (!userId) {
      const user = await User.findOrCreate({ where: { sessionId: sessionId } })
      console.log(user)
      userId = user[0].dataValues.id
      console.log(userId)
      const products = await Cart.findAll({ where: { userId } })
      res.status(200).json(products)
    } else {
      userId = userId.id
      const products = await Cart.findAll({ where: { userId } })
      res.status(200).json(products)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  const sessionId = req.sessionID
  const productId = req.params.productId
  try {
    let userId = req.user
    if (!userId) {
      const userResponse = await User.findAll({ where: { sessionId } })
      userId = userResponse[0].id
    } else {
      userId = userId.id
    }
    const cart = await Cart.findAll({
      where: {
        userId,
        status: 'open'
      }
    })
    const cartId = cart[0].id
    await CartProducts.destroy({
      where: {
        cartId,
        productId
      }
    })
    res.status(204).send('item deleted')
  } catch (error) {
    next(error)
  }
})

//--------DELETE THE BELOW WHEN EVERYTHING IS WORKING-----------

// router.post('/', async (req, res, next) => {
//   const sessionId = req.sessionID
//   let userId = req.user
//   const productId = req.body.productId
//   try {
//     if (!userId) {
//       const user = await User.findOrCreate({ where: { sessionId: sessionId }})
//       userId = user[0].dataValues.id
//       console.log('user id type', userId)
//       await Cart.create({ userId, productId, quantity: 1 })
//       res.sendStatus(201)
//     } else {
//       userId = userId.id
//       await Cart.create({ userId, productId, quantity: 1 })
//       res.sendStatus(201)
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/:productId', async (req, res, next) => {
//   const userId = req.sessionID
//   const productId = req.params.productId
//   try {
//     const product = await Cart.findAll({
//       where: {
//         userId,
//         productId
//       }
//     })
//     const updatedCart = await product.update({ quantity: req.body.quantity })
//     res.send(updatedCart)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:productId', async (req, res, next) => {
//   const userId = req.sessionID
//   const productId = req.params.productId
//   try {
//     await Cart.destroy({
//       where: {
//         userId,
//         productId
//       }
//     })
//   } catch (error) {
//     next(error)
//   }
// })
