const db = require('../db');
const Sequelize = require('sequelize');

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      min: 0.01
    }
  }
})

module.exports = Cart
