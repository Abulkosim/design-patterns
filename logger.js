// factoryMethod.js

// 1. “Product” interface (abstract via comments)
class Logger {
  log(msg) { throw new Error('Must implement log()'); }
}

// 2. ConcreteProducts
class ConsoleLogger extends Logger {
  log(msg) { console.log(`Console: ${msg}`); }
}
class FileLogger extends Logger {
  constructor(path){ super(); this.path = path; }
  log(msg) {
    // pretend to append to a file
    console.log(`(to ${this.path}) ${msg}`);
  }
}

// 3. Factory Method
const loggerClasses = {
  console: ConsoleLogger,
  file:    FileLogger,
  // later: remote: RemoteLogger
};

class LoggerFactory {
  /**
   * @param {'console'|'file'} type
   * @param {object} opts
   * @returns {Logger}
   */
  static create(type, opts) {
    const Cls = loggerClasses[type];
    if (!Cls) throw new Error(`Unknown logger type: ${type}`);
    return new Cls(opts?.path);
  }
}

// 4. Client code
function runApp(logType) {
  const logger = LoggerFactory.create(logType, { path: '/var/log/app.log' });
  logger.log('Application started');
}

// Demo
runApp('console'); // Console: Application started
runApp('file');    // (to /var/log/app.log) Application started

