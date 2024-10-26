const { faker } = require('@faker-js/faker');
const Product = require('./models/Product'); // Assuming this is the correct path to Product model

// Function to insert dummy data
async function insertDummyData() {
  try {
    // Loop to create and insert 10 dummy products
    for (let i = 0; i < 100; i++) {
      const name = faker.commerce.productName();
      const description = faker.commerce.productDescription();
      const price = parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 }));
      const quantity = faker.number.int({ min: 1, max: 100 });

      // Insert into database using the Product model
      await Product.create({
        name,
        description,
        price,
        quantity,
      });

      console.log(`Inserted: ${name}, ${description}, ${price}, ${quantity}`);
    }

    console.log('Data insertion complete');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

insertDummyData();
