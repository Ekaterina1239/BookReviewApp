const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/books.json');

async function readData() {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data:', err);
    return [];
  }
}

async function writeData(data) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing data:', err);
    throw err;
  }
}

async function getBookById(id) {
  const books = await readData();
  const book = books.find(b => b.id === id);
  if (!book) throw new Error('Book not found');
  return book;
}

module.exports = {
  readData,
  writeData,
  getBookById
};
