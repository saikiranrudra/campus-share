class Logger {
  /**
   * Logging message
   * @param {String} message 
   */
  log(message) {
    console.log(message);
  }

  /**
   * Logging Errors
   * @param {Error} error 
   */
  error(error) {
    console.log(`=================${error.message}==================`)
    console.error(error);
  }
}

export default new Logger();