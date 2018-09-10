const db = require('../db')
const Sequelize = require('sequelize')

// register models
const Product = require('../models/product')
const Review = require('../models/review')
const User = require('../models/user')

const Purchases = db.define('purchases', {
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

Product.belongsToMany(User, { through: Purchases })
User.belongsToMany(Product, { through: Purchases })


module.exports = {
  db, User, Product, Review, Purchases
}
