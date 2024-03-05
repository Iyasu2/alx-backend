const express = require('express');
const redis = require('redis');
const { promisify } = require('util'); // Import the promisify function

const app = express();
const port = 1245;

// Create an array of products (same as before)
const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Function to get an item by its ID (same as before)
function getItemById(id) {
  return listProducts.find(product => product.id === id);
}

// Set up the Redis client (same as before)
const client = redis.createClient();

// Promisify the Redis client methods (new)
client.getAsync = promisify(client.get).bind(client);
client.setAsync = promisify(client.set).bind(client);

// Function to reserve stock by itemId (new)
function reserveStockById(itemId, stock) {
  client.setAsync(`item.${itemId}`, stock);
}

// Async function to get the reserved stock by itemId (new)
async function getCurrentReservedStockById(itemId) {
  const stock = await client.getAsync(`item.${itemId}`);
  return parseInt(stock) || 0;
}

// Define the /reserve_product/:itemId route (new)
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const product = getItemById(itemId);

  if (!product) {
    res.status(404).json({ status: 'Product not found' });
    return;
  }

  const currentQuantity = await getCurrentReservedStockById(itemId);

  if (currentQuantity === 0) {
    res.status(400).json({ status: 'Not enough stock available', itemId });
  } else {
    reserveStockById(itemId, currentQuantity - 1);
    res.json({ status: 'Reservation confirmed', itemId });
  }
});

// Define the /list_products route (same as before)
app.get('/list_products', (req, res) => {
  res.json(listProducts.map(product => ({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock
  })));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
