const router = require('express').Router()
const Product = require('../db/models/product')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:categoryId', async (req, res, next) => {
  try{
  const category = req.params.categoryId
  const foundCategory = await Product.findByCategory(category)
  if(!foundCategory) res.sendStatus(404)
  res.status(200).json(foundCategory)
} catch (err) {
  next(err)
}
})

router.get('/:categoryId/:id', async(req, res, next) => {
 try{ const category = req.params.categoryId
  const id =req.params.id
  const findCategory = await Product.findByCategory(category)
  if(findCategory){
    const idSearch = await Product.findById(id)
    if(!idSearch) res.sendStatus(404)
    res.status(200).json(idSearch)
  }
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
