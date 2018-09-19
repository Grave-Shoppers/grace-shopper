'use strict'

const db = require('../server/db')
const { User, Product, Cart } = require('../server/db/models')
const { CartProducts } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123', firstName: 'Cody', lastName: 'Puppo', address: '123 Main St', isAdmin: true }),
    User.create({ email: 'murphy@email.com', password: '123', firstName: 'Murphy', lastName: 'Doggo', address: '456 Broadway' })
  ])

  const products = await Promise.all([
    Product.create({
      name: "Brach's Classic Candy Corn, 40 oz. Bag",
      price: 1099,
      imageUrl: "https://preview.ibb.co/gE7HhK/Candy_Corn_Shutterstock.jpg",
      description: "Yummmmmmmmy. Brach's candy corn is made with real honey!",
      quantity: 50,
      category: "candy"
    }),
    Product.create({
      name: "Mars Chocolate Bars Mix",
      price: 1099,
      imageUrl: "https://image.ibb.co/hZ1opz/1444753365101.jpg",
      description: "Find all your favorite chocolate bars in the bag!",
      quantity: 50,
      category: "candy"
    }),
    Product.create({
      name: "Chocolate Eye Balls",
      price: 1099,
      imageUrl: "https://image.ibb.co/hgYZUz/googly_eyes_133616_ic.jpg",
      description: "These Halloween candy eyeballs are guaranteed to give your guests an eye-opening experience -- muahahaha!",
      quantity: 50,
      category: "candy"
    }),
    Product.create({
      name: "Brain Lollipops",
      price: 1099,
      imageUrl: "https://image.ibb.co/ipZBbe/brain_hard_candy_pop_128753_w.jpg",
      description: "Sculpted in incredible detail, these Halloween lollipops will be the 'smart' addition to your Halloween basket!",
      quantity: 50,
      category: "candy"
    }),
    Product.create({
      name: "Nerds",
      price: 1099,
      imageUrl: "https://image.ibb.co/eSkEUz/Nerds_Laffy_Taffy_Day_of_the_Dead_131410_im.jpg",
      description: "Stock your candy bowl with these classic treats!!!",
      quantity: 50,
      category: "candy"
    }),
    Product.create({
      name: "Skeleton T-Rex Inflatable Costume",
      price: 4599,
      imageUrl: "https://preview.ibb.co/gittpz/pdp_sq.jpg",
      description: "RAWRRRRRRRRRRRRRRR",
      quantity: 50,
      category: "costume"
    }),
    Product.create({
      name: "Rosie the Riveter Costume",
      price: 3099,
      imageUrl: "https://preview.ibb.co/jNkHGe/pdp_sq_1.jpg",
      description: "You can do it! Embrace girl power in our Rosie the Riveter Costume.",
      quantity: 50,
      category: "costume"
    }),
    Product.create({
      name: "Evil Sorceress",
      price: 4599,
      imageUrl: "https://preview.ibb.co/dsNuUz/pdp_sq_2.jpg",
      description: "This costume features a floor-length dress that cinches at the waist and flows out at the bottom. The gown has a lace-up bodice that flares with a pointy collar, and elegant sheer chiffon drapes the sleeves, making this beautiful dress evoke fear and envy alike.",
      quantity: 50,
      category: "costume"
    }),
    Product.create({
      name: "Wonder Woman",
      price: 2099,
      imageUrl: "https://preview.ibb.co/mWqEUz/pdp_sq_3.jpg",
      description: "Your Halloween party will be super! Dress up as your favorite heroine with a Wonder Woman Costume!",
      quantity: 50,
      category: "costume"
    }),
    Product.create({
      name: "Harry Potter Robe",
      price: 3599,
      imageUrl: "https://preview.ibb.co/fE67Ge/pdp_sq_4.jpg",
      description: "Cast a spell of envy on party guests when you show up in this Harry Potter Gryffindor Robe!",
      quantity: 50,
      category: "costume"
    }),
    Product.create({
      name: "Taco",
      price: 2099,
      imageUrl: "https://image.ibb.co/gJKBsK/Image_from_i_OS.jpg",
      description: "Do you love tacos as much as you love your dog? A Taco Dog Costume combines the two loves of your life!",
      quantity: 50,
      category: "pet-costume"
    }),
    Product.create({
      name: "Yoda",
      price: 2099,
      imageUrl: "https://image.ibb.co/cnUmsK/IMG_8139.jpg",
      description: "May the force be with you!",
      quantity: 50,
      category: "pet-costume"
    }),
    Product.create({
      name: "Reindeer",
      price: 2099,
      imageUrl: "https://preview.ibb.co/dNPY6e/Image_from_i_OS_1.jpg",
      description: "It's never to early to start getting ready for the holidays!",
      quantity: 50,
      category: "pet-costume"
    }),
    Product.create({
      name: "Shark",
      price: 2099,
      imageUrl: "https://image.ibb.co/cWkeez/144465_MAIN_AC_SL400_V1534536985.jpg",
      description: "Baby Shark Doo Doo Doo Doo Doo Doo Doo",
      quantity: 50,
      category: "pet-costume"
    }),
    Product.create({
      name: "Pumpkin",
      price: 2099,
      imageUrl: "https://preview.ibb.co/c03RRe/144441_MAIN_AC_SL1500_V1534536475.jpg",
      description: "Fresh from the paw-kin patch comes the Pumpkin Dog & Cat Costume. No pumpkins were carved in the making of this scary adorable Jack-o’-lantern costume.",
      quantity: 50,
      category: "pet-costume"
    }),
    Product.create({
      name: "Black Cat",
      price: 1099,
      imageUrl: "https://image.ibb.co/cUjKCK/download_3.png",
      description: "Spooky",
      quantity: 50,
      category: "decoration"
    }),
    Product.create({
      name: "Woulda, Coulda, Shoulda",
      price: 1099,
      imageUrl: "https://image.ibb.co/gdq9CK/download_4.png",
      description: "Woulda, Coulda, Shoulda",
      quantity: 50,
      category: "decoration"
    }),
    Product.create({
      name: "Pumpkin Lights",
      price: 1099,
      description: "Light up your house with some nice lights!!!",
      quantity: 50,
      category: "decoration"
    }),
    Product.create({
      name: "Spiderwebs",
      price: 1099,
      description: "Make your house look haunted.",
      quantity: 50,
      category: "decoration"
    })
  ])

  const carts = await Promise.all([
    Cart.create({
      status: 'open',
      userId: 1
    }),
    Cart.create({
      status: 'processing',
      userId: 1
    }),
    Cart.create({
      status: 'open',
      userId: 2
    }),
    Cart.create({
      status: 'completed',
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
    console.log('db connection ')
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
