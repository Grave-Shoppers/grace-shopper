const db = require('../db');
const Sequelize = require('sequelize');

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Cart
