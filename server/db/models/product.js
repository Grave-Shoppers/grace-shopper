const db = require('../db');
const Sequelize = require('sequelize');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      validate: {
        min: 0.01
      }
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: 'https://i.ytimg.com/vi/cnhY4rDRRp4/maxresdefault.jpg'
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  })

  module.exports = Product
