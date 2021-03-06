const router = require('express').Router()
const Product = require('../db/models/product')
const Review = require('../db/models/review')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const foundProduct = await Product.findById(id)
    res.json(foundProduct)
  } catch (err) {
    res.status(err)
    next(err)
  }
})

router.post('/:id/review', async (req, res, next) => {
  let userId = req.user
  try {
    if (userId) {
      const id = req.params.id
      const newReview = await Review.create(req.body, {
        where: {
          productId: id
        }
      })

      res.status(201).json(newReview)
    } else {
      res.sendStatus(403).send('No access')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  if (req.user.isAdmin === false) {
    res.send(404, 'You do not have access ')
  }
  try {
    await Product.create({ ...req.body })
    res.status(201).send('product added!')
  } catch (err) {
    next(err)
  }
})

router.get('/:id/review', async (req, res, next) => {
  try {
    const id = req.params.id
    const reviews = await Review.findAll({
      where: {
        productId: id
      }
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/category/:categoryId', async (req, res, next) => {
  try {
    const category = req.params.categoryId
    const foundCategory = await Product.findByCategory(category)
    if (!foundCategory) res.sendStatus(404)
    res.status(200).json(foundCategory)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  if (req.user.isAdmin === false) {
    res.send(404, 'You do not have access ')
  }
  const id = req.params.id
  try {
    const product = await Product.findById(id)
    const updatedProduct = await product.update({ ...req.body })
    res.send(updatedProduct)
  } catch (err) {
    next(err)
  }
})
