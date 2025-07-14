// factoryMethodExample.js

// 1. Product interface (abstractly defined via comments)
/**
 * @interface DbClient
 * @method connect()
 * @method query(sql)
 */

// 2. Concrete Products

class MySQLClient {
  constructor(config) {
    this.config = config;
  }

  connect() {
    console.log(`Connecting to MySQL at ${this.config.host}:${this.config.port}`);
    // Here you’d normally use mysql2 or similar
  }

  query(sql) {
    console.log(`MySQL executing query: ${sql}`);
    // Return fake result
    return [{ id: 1, name: 'MySQL_Result' }];
  }
}

class MongoDBClient {
  constructor(config) {
    this.config = config;
  }

  connect() {
    console.log(`Connecting to MongoDB at ${this.config.uri}`);
    // Here you’d normally use mongodb driver
  }

  query(collection) {
    console.log(`MongoDB querying collection: ${collection}`);
    // Return fake result
    return [{ _id: 'abc123', value: 'MongoDB_Result' }];
  }
}

// 3. Creator with Factory Method

class DbClientFactory {
  /**
   * Factory Method
   * @param {'mysql'|'mongodb'} type
   * @param {object} config
   * @returns {MySQLClient|MongoDBClient}
   */
  static createClient(type, config) {
    switch (type) {
      case 'mysql':
        return new MySQLClient(config);
      case 'mongodb':
        return new MongoDBClient(config);
      default:
        throw new Error(`Unsupported client type: ${type}`);
    }
  }
}

// 4. Client code uses only the interface and factory

function runDatabaseTask(type) {
  const config = type === 'mysql'
    ? { host: 'localhost', port: 3306 }
    : { uri: 'mongodb://localhost:27017/mydb' };

  // Create without knowing concrete class
  const client = DbClientFactory.createClient(type, config);

  client.connect();

  // The query signature differs in reality, but imagine a unified interface:
  const result = client.query(type === 'mysql'
    ? 'SELECT * FROM users;'
    : 'users');

  console.log('Result:', result);
}

// Example usages:
runDatabaseTask('mysql');
runDatabaseTask('mongodb');
