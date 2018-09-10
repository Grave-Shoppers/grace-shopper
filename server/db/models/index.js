/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

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
  User, Product, Review, Purchases
}
