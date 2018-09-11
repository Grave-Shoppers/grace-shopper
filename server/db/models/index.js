const db = require('../db')
const Sequelize = require('sequelize')

// register models
const Product = require('./product')
const Review = require('./review')
const User = require('./user')
const Cart = require('./cart')

const Purchases = db.define('purchases', {
  products: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

Cart.belongsTo(User)
Product.belongsToMany(User, { through: Cart })
User.belongsToMany(Product, { through: Cart })

Purchases.belongsTo(User)
User.hasMany(Purchases)


module.exports = {
  db, User, Product, Review, Purchases
}
