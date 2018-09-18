const db = require('../db');
const Sequelize = require('sequelize');
const Product = require('./product')
const Op = Sequelize.Op

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('OPEN', 'PROCESSING', 'CANCELLED', 'COMPLETED'),
    defaultValue: 'OPEN'
  }
})

Cart.getOrdersByUser = function(userId) {
  return Cart.findAll({
    where: {
      userId,
      status: { [Op.ne]: 'OPEN' }
    },
    include: [Product]
  })
}

module.exports = Cart
