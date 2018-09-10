const { db } = require('./server/db')
const Products = require('./server/db/models/product')

// dummy data for db
const products = [{
  name: "Brach's Classic Candy Corn, 40 oz. Bag",
  price: 10.99,
  description: "Yum",
  inventory: 50,
  category: "Candy"
}, {
  name: "Gummy Bears, package of 100",
  price: 15.99,
  description: "Yum",
  inventory: 50,
  category: "Candy"
}, {
  name: "Wonder Woman",
  price: 45.99,
  description: "Yay",
  inventory: 50,
  category: "Costume"
}, {
  name: "Taco",
  price: 20.99,
  description: "Aww",
  inventory: 50,
  category: "Pet Costume"
}, {
  name: "Skull",
  price: 10.99,
  description: "Ahh",
  inventory: 50,
  category: "Decoration"
},

]


const seed = async () => {
  await db.sync({force: true})
  await Promise.all(products.map(product => Products.create(product)))

  console.log('Seeding success!')
  db.close()
}

seed()
  .catch(err => {
    console.error('Oh noes! Something went wrong!')
    console.error(err)
    db.close()
  })
