const router = require('express').Router()
const {Product} = require('../db/models')
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
      if (!foundProduct) res.sendStatus(404)
      res.status(200).json(foundProduct)
  } catch (err) {
      res.status(err)
      next(err)
  }
})

