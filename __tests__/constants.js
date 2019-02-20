const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000'
const MAX_TIMEOUT = process.env.MAX_TIMEOUT || 10000
const WAIT_DATALOAD = process.env.WAIT_DATALOAD || 1000

module.exports = {
  SERVER_URL, MAX_TIMEOUT, WAIT_DATALOAD
}
