'use strict'

const db = require('../server/db')
const { User, Product, Cart } = require('../server/db/models')
const { CartProducts } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123', firstName: 'Cody', lastName: 'Puppo', address: '123 Main St' }),
    User.create({ email: 'murphy@email.com', password: '123', firstName: 'Murphy', lastName: 'Doggo', address: '456 Broadway' })
  ])

  const products = await Promise.all([
    Product.create({
      name: "Brach's Classic Candy Corn, 40 oz. Bag",
      price: 1099,
      description: "Yum",
      quantity: 5,
      category: "Candy"
    }),
    Product.create({
      name: "Gummy Bears, package of 100",
      price: 1599,
      description: "Yum",
      quantity: 50,
      category: "Candy"
    }),
    Product.create({
      name: "Wonder Woman",
      price: 4599,
      description: "Yay",
      quantity: 50,
      category: "Costume"
    }),
    Product.create({
      name: "Taco",
      price: 2099,
      description: "Aww",
      quantity: 50,
      category: "Pet Costume"
    }),
    Product.create({
      name: "Skull",
      price: 1099,
      description: "Ahh",
      quantity: 50,
      category: "Decoration"
    })
  ])

  const carts = await Promise.all([
    Cart.create({
      status: 'open',
      userId: 1
    }),
    Cart.create({
      status: 'closed',
      userId: 1
    }),
    Cart.create({
      status: 'open',
      userId: 2
    }),
    Cart.create({
      status: 'closed',
      userId: 2
    })
  ])

  const cartProducts = await Promise.all([
    CartProducts.create({
      cartId: 1,
      productId: 1,
      quantity: 1
    }),
    CartProducts.create({
      cartId: 1,
      productId: 2,
      quantity: 3
    }),
    CartProducts.create({
      cartId: 2,
      productId: 4,
      quantity: 1
    }),
    CartProducts.create({
      cartId: 2,
      productId: 3,
      quantity: 5
    }),
    CartProducts.create({
      cartId: 3,
      productId: 1,
      quantity: 2
    }),
    CartProducts.create({
      cartId: 3,
      productId: 5,
      quantity: 3
    }),
    CartProducts.create({
      cartId: 4,
      productId: 2,
      quantity: 1
    }),
    CartProducts.create({
      cartId: 4,
      productId: 1,
      quantity: 2
    })
  ])

  console.log(`seeded ${users.length} users, ${products.length}, ${carts.length} carts, & ${cartProducts.length} cart products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
