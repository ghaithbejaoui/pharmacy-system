const bcrypt = require('bcrypt');

async function generateHash() {
  const hash = await bcrypt.hash('ghaith12300', 10);
  console.log('Password hash:', hash);
}

generateHash();