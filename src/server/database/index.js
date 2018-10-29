const mongoose = require('mongoose');

class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`);
      console.log('Database connected successfully');
    }
    catch (err) {
      console.error('Database connection error');
    }
  }
}

module.exports = new Database();