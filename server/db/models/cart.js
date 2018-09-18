const db = require('../db');
const Sequelize = require('sequelize');
const Product = require('./product')
const Op = Sequelize.Op

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('open', 'processing', 'cancelled', 'completed'),
    defaultValue: 'open'
  }
})

Cart.getOrdersByUser = function(userId) {
  return Cart.findAll({
    where: {
      userId,
      status: { [Op.ne]: 'open' }
    },
    include: [Product]
  })
}

module.exports = Cart
