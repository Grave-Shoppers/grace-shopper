const db = require('./db')

// register models
const { Product, Review, User } = require('./models')

const Purchases = sequelize.define('purchases', {
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

Product.belongsToMany(User, { through: 'Purchases' })
User.belongsToMany(Product, { through: 'Purchases' })

module.exports = db
