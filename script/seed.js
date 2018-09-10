'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({
      name: "Brach's Classic Candy Corn, 40 oz. Bag",
      price: 10.99,
      description: "Yum",
      quantity: 50,
      category: "Candy"
    }),
    Product.create({
      name: "Gummy Bears, package of 100",
      price: 15.99,
      description: "Yum",
      quantity: 50,
      category: "Candy"
    }),
    Product.create({
      name: "Wonder Woman",
      price: 45.99,
      description: "Yay",
      quantity: 50,
      category: "Costume"
    }),
    Product.create({
      name: "Taco",
      price: 20.99,
      description: "Aww",
      quantity: 50,
      category: "Pet Costume"
    }),
    Product.create({
      name: "Skull",
      price: 10.99,
      description: "Ahh",
      quantity: 50,
      category: "Decoration"
    })
  ])

  console.log(`seeded ${users.length} users & ${products.length}`)
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
