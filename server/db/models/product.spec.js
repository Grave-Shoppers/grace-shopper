'use strict';

const Promise = require('bluebird');
const chai = require('chai');
const expect = chai.expect;

const User = require('./user')
const Product = require('./product');
const db = require('../db');

describe('The `Product` model', () => {

  before(() => {
    return db.sync({ force: true });
  });

  let product;
  beforeEach(() => {
    product = Product.build({
      name: 'Candy Corn',
      price: 100
    });
  });

  afterEach(() => {
    return Promise.all([
      Product.truncate({ cascade: true })
    ]);
  });

  describe('attributes definition', () => {

    it('includes `name` and `price` fields', async () => {

      const savedProduct = await product.save();
      expect(savedProduct.name).to.equal('Candy Corn');
      expect(savedProduct.price).to.equal(100);

    });

    it('requires `price`', async () => {

      product.price = null;

      let result, error;
      try {
        result = await product.validate();
      } catch (err) {
        error = err;
      }

      if (result) throw Error('validation should fail when price is null');

      expect(error).to.be.an.instanceOf(Error);

    })

    it('requires `description` (in a more strict way than for `price`)', async () => {

      product.description = '';

      let result, error;
      try {
        result = await product.validate();
      } catch (err) {
        error = err;
      }

      if (result) throw Error('validation should fail when title is empty');

      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.contain('Validation error');

    });


  })

})
