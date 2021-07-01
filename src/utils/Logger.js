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
    console.log(`👉Message: ${error.message}`)
    if(error.response) {
      console.log(error.response.data.message);
    } else {
      console.error(error);
    }
  }
}

export default new Logger();