const db = require('../db');
const Sequelize = require('sequelize');

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open'
  }
})

module.exports = Cart
