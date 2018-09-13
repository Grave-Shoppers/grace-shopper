const db = require('../db')
const Sequelize = require('sequelize')

const CartProducts = db.define('cartProducts', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

// register models
const Product = require('./product')
const Review = require('./review')
const User = require('./user')
const Cart = require('./cart')


Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartProducts })
Product.belongsToMany(Cart, { through: CartProducts })



module.exports = {
  db, User, Product, Review, CartProducts
}
